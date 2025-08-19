const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const Product = require('./routes/productRoutes')
const Tags = require('./routes/TagRoutes')
const Categories = require('./routes/CategoryRoutes')
const SubCategories = require('./routes/SubCategoryRoute')
const bannerRoutes = require('./routes/BannerRoute')
const userRoutes = require('./routes/UserRoutes')
const couponRoutes = require('./routes/CouponRoutes')
const orderRoutes = require('./routes/OrderRoutes')


const app = express()
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI).then(()=> console.log('MongoDB Connected')).catch(err=>console.log('Connection Error',err))

app.get('/',(req,res)=>{
    res.send('Saaj Riwaaj Backend Running!')
})

app.get('/ping',(req,res)=>{
    res.send('pong')
})


app.use('/product',Product) 
app.use('/tag',Tags)
app.use('/category',Categories)
app.use('/subcategory',SubCategories)
app.use('/banner', bannerRoutes); 
app.use('/user',userRoutes)
app.use('/coupon',couponRoutes)
app.use('/order',orderRoutes);







app.listen(5000,()=>{
    console.log('server running on http://localhost:5000')
})