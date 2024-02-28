import mysql from "mysql" ; 

const db = mysql.createConnection({
    host:"localhost" ,
    user:"root" , 
    password:"password" , 
    database:"orders" 
})

db.connect(function(err){
    if(err){
        console.log("Error in connecting database");
    }else{
        console.log("Database Succesfully connected!");
    }
}); 





export default db ; 