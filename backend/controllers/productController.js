const Product = require('../models/Product')

exports.createProduct = async (req,res)=>{
    try{
        const newProduct = new Product(req.body)
        const saved = await newProduct.save()
        res.status(200).json(saved)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.getAllProducts = async (req,res)=>{
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json({error:err.message})
        
    }
}

exports.getProductById = async (req,res)=>{
      try{
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(404).json({message:'Not Found'})
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({error:err.message})
        
    }
}

exports.deleteProductById = async (req,res)=>{
      try{
        const deleted = await Product.findByIdAndDelete(req.params.id)
        if(!deleted) return res.status(404).json({message:'Not Found'})
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({error:err.message})
        
    }
}

exports.updateProductById = async (req,res)=>{
      try{
        const updated = await Product.findByIdAndUpdate(req.params.id)
        if(!updated) return res.status(404).json({message:'Not Found'})
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({error:err.message})
        
    }
}