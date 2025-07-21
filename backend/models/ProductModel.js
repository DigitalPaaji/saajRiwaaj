const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref :'Category',
        // enum:['modern','oxidised', 'weddding'],
        // lowercase:true
    },
    subCategory:{
          type: String,
        default:''
    },
    description:{
          type: String,
    default: '',
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tag'
    }],
    isFeatured:{
        type:Boolean,
        default:false
    },
    isNewArrival:{
        type:Boolean,
        default:false
    },
    price:{
        type:Number,
        required:true
    },
        discount:{type:Number,default:0},
        finalPrice:{type:Number,default:0},
        images:[{type:String}],
        colorVariants:[{
        colorName:{type:String,required:true},
        quantity:{type:Number,default:1},
        
    }]

})

module.exports = mongoose.model('Product', productSchema)