const mongoose=require('mongoose')
// const {model,schema}=require('mongoose')
const cnt_schema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true, 
    },
    num:{
        type:Number,
        required:true,
        unique: true
    },
    loc:{
        type:String,
        required:true,
        // default--->only one value
        enum:['mobile','sim','email']  //for multiple values
    }

},{Timestamp:true})

module.exports=mongoose.model('cnt_schema',cnt_schema,'cnt_schema')

// cnt_schema is created as plural at databasae==>(cnt_schemas)
// to restrict this we can write like module.exports=mongoose.model('cnt_schema',cnt_schema,'cnt_schema')