const router = require("express").Router();
const mysql = require('mysql');


router.get("/getAllProducts", async (req, resp) => {

    const db_con = require("../DB_Connection_Establishment");
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {

      if (qCategory) {
      var result = db_con.query(`Select * from products where categories like ?`, '%' + qCategory + '%',(err,res) => {
        if (err) 
        {
            resp.status(500).json(err);
        console.log(err);
        throw err;
        };
        test= JSON.parse(JSON.stringify(res));
        //console.log(test[0].Product_Id);
        resp.status(200).json(res);
    }); 
        }
      else if(qNew && qNew ==='newest')  {
        
            var result = db_con.query(`Select * from products order by created DESC`,(err,res,fields) => {
                if (err) 
                {
                    resp.status(500).json(err);
                console.log(err);
                throw err;
                };
                test= JSON.parse(JSON.stringify(res));
                //console.log(test[0].Product_Id);
                resp.status(200).json(res);
            }); 
      }
      else 
        {
            var sortOrder = 'ASC';
            if(qNew ==='desc')
             sortOrder = 'DESC';

             var result = db_con.query(`Select * from products `,(err,res,fields) => {
                if (err) 
                {
                resp.status(500).json(err);
                console.log(err);
                throw err;
                };
                test= JSON.parse(JSON.stringify(res));
                //console.log(test[0].Product_Id);
                resp.status(200).json(res);
            });
        }
    } catch (err) {
      resp.status(500).json(err);
    }
  });

router.get("/find", async (req, resp) => {

    const db_con = require("../DB_Connection_Establishment");
    const id = req.query.id;
    
    var result = db_con.query(`Select * from products where id =${id}`,(err,res,fields) => {
      if (err) 
      {
      resp.status(500).json(err);
      console.log(err);
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