const express =require("express")
const dotenv=require("dotenv").config()
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
const ConnectDB=require("../Backend/config/db")
ConnectDB()
app.use("/User",require("./routes/User"))
PORT=process.env.PORT

app.listen(PORT,()=>{
console.log("Listen in port ",PORT)
})