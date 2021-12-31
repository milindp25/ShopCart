const router = require("express").Router();
const mysql = require('mysql');
const { randomUUID } = require('crypto');

router.post("/placeOrder",(req,resp) => {

    const db_con = require("../DB_Connection_Establishment");
    const orderID = randomUUID();
    console.log(JSON.stringify(req.body.products).slice(1,-1));
    const orderDetails = {Order_Id : orderID,User_Id : req.body.userId , Products : JSON.stringify(req.body.products).slice(1,-1),
        Address : req.body.address.line1 + " " +  req.body.address.line2 + " " + req.body.address.city + " "+ req.body.address.country, 
        Amount : req.body.amount};
         db_con.query('Insert into ORDERS SET ?',orderDetails,(err,res) => {
        if (err) 
        {
        resp.status(500).json(err);
        throw err;
        };
        resp.status(201).json({res,orderID});
        console.log("Insert Successfull");
      }); 
    
});

router.get("/getOrders", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  
  var result = db_con.query(`Select * from ORDERS Order by Order_Time DESC`,(err,res,fields) => {
    if (err) 
    {
    resp.status(500).json(err);
    throw err;
    };
    resp.status(200).json(res);
});

  try {
  } catch (err) {
    resp.status(500).json(err);
  }
});


module.exports = router;