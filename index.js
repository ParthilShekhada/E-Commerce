const express = require('express')
const app = express()
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDb = require('./config/db.js')
const authRoutes=require('./routes/authRoute.js')
const cors=require('cors')
const categoryRoutes=require('./routes/categoryRoutes.js')
const productRoutes=require('./routes/productRoute.js')


//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//configure dotenv
dotenv.config()

//database config
connectDb()


//routes

app.use('/auth',authRoutes)
app.use('/category',categoryRoutes)
app.use('/product',productRoutes)


//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Ecommerce app")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Your url is http://localhost:${PORT}`.bgCyan.white)
})