const Product = require('../models/ProductModel')

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
        .populate('category','name')
        .populate('tags','name')
        .populate('subcategory','name')


        res.status(200).json({products})
    }
    catch(err){
        res.status(500).json({error:err.message})
        
    }
}

exports.getProductById = async (req,res)=>{
      try{
        const product = await Product.findById(req.params.id)
         .populate('category', 'name')
      .populate('tags', 'name')
        .populate('subcategory','name')

        if(!product) return res.status(404).json({message:'Not Found'})
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({error:err.message})
        
    }
}

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId })
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteProductById = async (req,res)=>{
      try{
        const deleted = await Product.findByIdAndDelete(req.params.id)
        if(!deleted) return res.status(404).json({message:'Not Found'})
        res.status(200).json({message:'Product Deleted Successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
        
    }
}

exports.updateProductById = async (req,res)=>{
      try{
        const updated = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        if(!updated) return res.status(404).json({message:'Not Found'})
        res.status(200).json(updated)
    }
    catch(err){
        res.status(500).json({error:err.message})
        
    }
}
