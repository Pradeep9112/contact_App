// package.json
// server .js
// .env
const path=require('path')
const express =require('express')
const app=express();
const routing=require('./router/router')
const mongoose=require('mongoose');
let {PORT,MONGODB_URI}=require('./config/index')
const schema=require('./schema/schema')
const{engine}=require('express-handlebars');
app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public'))) 

let connectDb=async()=>{
    await mongoose.connect(MONGODB_URI)
    console.log('database connected')
}
connectDb();
app.get('/',(req,res)=>{
    res.render('home',{title:'home'})
})
app.use('/api',routing)
app.listen(PORT,err=>{
    if (err) throw err
    console.log("server running on port 5000")
})