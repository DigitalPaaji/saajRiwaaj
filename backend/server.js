const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Product = require('./routes/productRoutes')
const Tags = require('./routes/TagRoutes')
const Categories = require('./routes/CategoryRoutes')
const SubCategories = require('./routes/SubCategoryRoute')




const app = express()
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=> console.log('MongoDB Connected')).catch(err=>console.log('Connection Error',err))

app.get('/',(req,res)=>{
    res.send('Saaj Riwaaj Backend Running!')
})


app.use('/product',Product) 
app.use('/tag',Tags)
app.use('/category',Categories)
app.use('/subcategory',SubCategories)





app.listen(5000,()=>{
    console.log('server running on http://localhost:5000')
})