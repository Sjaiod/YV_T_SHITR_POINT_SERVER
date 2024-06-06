const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config({})

require("./db")

const app=express()
const router = require("./routes/router")

app.use(express.json())
app.use(cors({
  origin: 'https://yv-t-shirt-point.netlify.app', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
  credentials: true // Allow credentials
}))

app.use("/api",router)



app.listen(process.env.PORT,()=>{
  console.log(`Server is runnign on http://localhost:${process.env.PORT}`);
})