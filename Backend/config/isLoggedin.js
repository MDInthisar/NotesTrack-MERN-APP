import jwt from "jsonwebtoken";

const isLoggedIn = (req,res,next)=>{
    jwt.verify(req.cookies.token, process.env.JWT_SCERET, (err, result)=>{
        if(err) return res.json({error: 'user not authorized'});
        if(result){
            req.user = result
            next()
            return 
        }
        else{
            return res.json({error: 'user not authorized'});
        }
    })
}

export default isLoggedIn;
