const { ObjectId } = require('mongodb')
const MongoClient = require('mongodb').MongoClient


const initializeClient = () => {
    try {
        
        const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@moondao.ftqqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  })
        client.connect()
        const getClient = () => client
        return {client, getClient}
    }
    catch(err) {
        console.log(err)
    }
}

const { client, getClient } = initializeClient()

 
updateMooneyData = async (chainData, client) => {
    try {
        const database = client.db('mooney')
        const collection = database.collection('supply')
        chainData.timestamp = Date.now()
        let newChainData = Object.assign({}, chainData)
        newChainData._id = ObjectId()
        let deleteResult = await collection.deleteMany( { timestamp : {"$lt" : Date.now() - 60 * 1000 }}) 
        console.log(`Deleted: ${deleteResult.deletedCount}`)
        await collection.insertOne(newChainData)
        console.log("Inserted new entries")
    } 
    catch(err) {
        console.log(err)
    }
}




getCachedMooneyData = async (client) => {
    try {
        const database = client.db('mooney')
        const collection = database.collection('supply')
        cachedData = await collection.find().sort({ _id: -1 }).limit(1).toArray()
        cachedData = cachedData[0]
        return cachedData    
    } 
    catch(err) {
        console.log(err)
    }
}





module.exports = {
    getClient,
    updateMooneyData,
    getCachedMooneyData,
}

