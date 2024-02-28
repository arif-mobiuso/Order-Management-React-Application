import { error } from "console";
import db from "../../../config/databaseConfig.js";

import { genSaltSync , hashSync  , compareSync} from "bcrypt";
export const newUser = (userDetails , customerId) =>{
    return new Promise(async (resolve , reject)=>{
        try{
            const salt = genSaltSync(10);
            userDetails.password = hashSync(userDetails.password  , salt); 
            const newUserQuery = `insert into users  ( CUSTOMER_ID, name , email , password) values (  ${customerId} , "${userDetails.userName}" , "${userDetails.email}" , "${userDetails.password}")` ;
            db.query(newUserQuery , function(error , result){
                if(error){
                    reject(error); 
                }
                else{
                    resolve({
                        statusCode : 201 , 
                        status : {message : " new user created !"}
                    });
                }
            });

        }
        catch(error){
            console.log(error);
            reject(error);
        }
    }) ;

} ;


export const getUsers = () =>{
    return new Promise(async (resolve , reject)=>{
        try{
            const getUsersQuery = `select id , name , email  from users ` ;
            db.query(getUsersQuery , function(error , result){
                if(error){
                    reject(error); 
                }
                else{
                    resolve({
                        statusCode : 200 , 
                        status : {message : "sucessfully  fetched user details !" , result : result}
                    });
                }
            });

        }
        catch(error){
            console.log(error);
            reject(error);
        }
    }) ;
} ;


export const getUserByEmail = (email) =>{
    return new Promise(async (resolve , reject)=>{
        try{
            const getUserByEmailQuery = `select *   from users where email = "${email}"` ;
            db.query(getUserByEmailQuery , function(error , result){
                if(error){
                    reject(error); 
                }
                else{
                    resolve({
                        message : `sucessfully  fetched user details with email : "${email}" !` ,
                        result : result
                    });
                }
            });

        }
        catch(error){
            reject({message : error.message});
        }
    }) ;
} ;



export const deleteUser = (customerId) =>{
    return new Promise(async (resolve , reject)=>{
        try{
            const deleteUserQuery = `delete from users where CUSTOMER_ID = ${customerId}` ;
            db.query(deleteUserQuery , function(error , result){
                if(error){
                    reject({ error}); 
                }
                return resolve({
                    message : "deleted user successfully"  
                })
            });

        }
        catch(error){
            console.log(error);
            reject(error);
        }
    }) ;
} ;


