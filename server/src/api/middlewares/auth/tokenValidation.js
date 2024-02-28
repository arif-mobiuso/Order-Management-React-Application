import pkg from 'jsonwebtoken';
const { verify } = pkg;




export const checkToken = (req,res , next) =>{
    let token = req.get("authorization");
    if(token){
        token = token.slice(7);
        verify(token , process.env.SECRET_KEY , (err , decoded)=>{
            if(err){
                return res.status(401).json({message : "Invalid Token !"});
            }
            else{
                next();
            }
        });
    }
    else{
        return res.status(403).json({message : "Access denied unauthorized user !"});
    }
};



