const router = require("express").Router();

router.get("/latestUsers", (req,resp) =>
{
    const db_con = require("../DB_Connection_Establishment");

         db_con.query('SELECT * FROM users order by Date_Create desc limit 5 ',(err,res) => {
        if (err) 
        {
        resp.status(500).json({responseCode : '500' , message : 'Error while creating user'});
        console.log(err);
        throw err;
        };
        resp.status(201).json(res);
      }); 
});

router.post("/userPost",(req,resp) => {

    const userName = req.body.userName;
    resp.send("User is " + userName);
});

module.exports = router;
