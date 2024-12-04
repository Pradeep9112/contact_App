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
   await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('MongoDB connected');
      }).catch((err) => {
        console.error('MongoDB connection error:', err);
      });
      
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