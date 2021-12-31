const router = require("express").Router()
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const mysql = require('mysql');
// Register user

router.post("/registerUser",(req,resp) => {

    const db_con = require("../DB_Connection_Establishment");

    const userDetails = {User_id : req.body.userName,First_Name : req.body.First_Name , Last_Name : req.body.LastName ,
        Email : req.body.Email , PASSWORD : CryptoJS.AES.encrypt(req.body.password,process.env.AES_KEY).toString()  ,Date_Create : new Date()};
         db_con.query('Insert into Users SET ?',userDetails,(err,res) => {
        if (err) 
        {
        resp.status(500).json({responseCode : '500' , message : 'Error while creating user'});
        console.log(err);
        throw err;
        };
        resp.status(201).json(res);
        console.log("Insert Successfull");
        db_con.commit();
      }); 

    
});

router.post("/login",(req,resp) => {

    const db_con = require("../DB_Connection_Establishment");
    console.log(process.env.AES_KEY);
        const userName = req.body.userName;
        var result = db_con.query(`Select * from Users where upper(User_id) =${mysql.escape(userName.toUpperCase())}`,(err,res) => {
        if (err) 
        {
        resp.status(500).json(err);
        console.log(err);
        throw err;
        };
        if(res.length <= 0)
        {
            console.log(res);
            resp.status(401).json(res.concat({responseCode : '401' , message : 'User not found'}));
        }
        else
        {
            var encrypted_Password ="";
            res.forEach(row => {
                encrypted_Password = row.PASSWORD;
            });

            const original_Password = CryptoJS.AES.decrypt(encrypted_Password,process.env.AES_KEY).toString(CryptoJS.enc.Utf8);
            if(req.body.password === original_Password)
            {
                console.log(res[0].User_id);
	    	    const accessToken = jwt.sign(
                {
                    id: res[0].User_id,
                    isAdmin: res[0].isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn:"3d"}
                );
                const { password, ...others } = res[0];
                resp.status(200).json({...others, accessToken});
            }
            else
            {
                resp.status(401).json(err);
            }

        }
      }); 
    
});


module.exports = router;