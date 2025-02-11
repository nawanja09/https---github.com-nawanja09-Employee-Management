import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/adminlogin',(req,res) => {
    const sql = "SELECT * from admin WHERE email = ? and password = ?"
    con.query(sql,[req.body.emai, req.body.password], (err,result) => {
        if (err) return res.json({loginStatus: false, Error: "Query error"})
            if (result.length > 0) {
                const email = result[0].email;
                const token = jwt.sign(
                    {role: "admin", email : email},
                    "jwt_secret_key",
                    {expirsIn: '1d'}
                    
                );
                res.clearCookie('token',token);
                return res.json({loginStatus: true});
            }else{
                return res.json({loginStatus: false, Error: "Wrong email or password"});
            }
    });
});

export {router as adminRouter}