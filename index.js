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
const path=require('path')


//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))
app.use(express.static('public', { dotfiles: 'allow' }));



//configure dotenv
dotenv.config()

//database config
connectDb()


//routes

app.use('/auth',authRoutes)
app.use('/category',categoryRoutes)
app.use('/product',productRoutes)


//rest api
app.use('*',function(req,res){
    res.sendFile(__dirname,'/client/build/index.html')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Your url is http://localhost:${PORT}`.bgCyan.white)
})