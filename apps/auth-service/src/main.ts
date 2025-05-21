import express from 'express';
import cors from "cors"
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 6001;
import { errorMiddleware } from '../../../packages/error-handler/error-handler';
import cookieParser from 'cookie-parser';
const app = express();
app.use(
  cors({
    origin:["http://localhost:3000"],
    allowedHeaders:['Authorization',"Content-Type"],
    credentials:true
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(errorMiddleware)
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/auth/login',(req,res)=>{
  return res.status(200).json({
    message:"User Logged in Successfully"
  })
})
const server =app.listen(port,()=>{
  console.log(`Auth service is running at http://${host}:${port}/api`)
})

server.on("error",(err)=>{
  console.log("Server Error:",err)
})

