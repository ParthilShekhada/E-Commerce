const mongoose = require('mongoose')
const colors = require('colors')

const connectDb = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connection Succesful to mongoDb`.bgMagenta.white)


    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white)
    }
}

module.exports = connectDb;