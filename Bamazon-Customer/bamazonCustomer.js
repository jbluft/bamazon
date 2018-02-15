var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rush2112",
  database: "BamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
//    connection.end();
start();
  });


function start() {
// query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, results) {
       console.table(results);
      chooseItem();
    });
}

function chooseItem(){

  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "pick",
          type: "input",
          message: "What is the ID of the item you would like to purchase? [Quit with Q]",
        }])
      .then(function(answer) {
        // get the information of the chosen item
        // console.log(answer.pick);

        var chosenItem;
        if (answer.pick === "Q"){
            console.log("Thank you come again");
            connection.end();
        } else {

        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id == answer.pick) {
            chosenItem = results[i];            
            // console.table(chosenItem);
        howMany(chosenItem);
                }
            }
        };
    });


    function howMany(chosenItem){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;

    inquirer
      .prompt([
        {
          name: "amount",
          type: "input",
          message: "How many would you like?"
        }])
      .then(function(answer) {
        var chosenAmount = answer.amount;
        if (chosenItem.stock_quantity < parseInt(chosenAmount)){
                console.log("Insufficient quantity!");
                start();
        } else {
   
            console.log("Thank you for your purchase");
            console.log("A drone is on its way to your house with your " + chosenItem.product_name);
             updateProduct(chosenItem, chosenAmount);
     
        }
    });
})};

    

   function updateProduct(chosenItem, chosenAmount) {
            var query = connection.query("UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: parseInt(chosenItem.stock_quantity) - parseInt(chosenAmount)
                },
                {
                  item_id: chosenItem.item_id
                }
              ]);
            // logs the actual query being run
            // console.log(query.sql);
            start();

          }
    
});
}