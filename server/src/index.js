import express  from "express";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
// importing routes
import routes from "./api/routes/routes.js"; 



//  creating express server 
const app = express() ; 
// const PORT = 4242 ;
app.use(express.json()) ; 
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
//     // res.header(
//     //     "Access-Control-Allow-Headers",
//     //     "Origin , X-Requested-With,Content-Type,Accept"
//     // );
//     next();
// })



app.use("/api/v1", routes);


app.listen(process.env.PORT , ()=>{
    console.log(`server running on port number ${process.env.PORT} .`);
}) ;

