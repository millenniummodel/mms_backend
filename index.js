const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const cors=require("cors");

const facultyRoute=require('./routes/faculty')
const noticeRoute=require('./routes/notice')
const studentRoute=require('./routes/student')
const authRoute=require('./routes/auth')
const tcRoute=require('./routes/tc')
const resultRoute=require('./routes/result')
const userRoute=require('./routes/user')

const app=express()

const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions))


dotenv.config()

const port=process.env.PORT || 8000

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('DB connected successfully!');
    }
    catch(err){
        console.log(err.message);
    }
}



app.use(express.json())
app.use('/api/v1/faculty',facultyRoute)
app.use('/api/v1/notice',noticeRoute)
app.use('/api/v1/student', studentRoute)
app.use('/api/v1/tc', tcRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/result', resultRoute)
app.use('/api/v1/user', userRoute)



app.listen(port,()=>{
    connectDB()
    console.log('Server Started on port',port);
})