const mySQL = require("mysql");

var con = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database :"ecommerce"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
  });

module.exports = con;
