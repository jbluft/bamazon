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

function start(){

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "select",
          type: "list",
          message: "What would you like to do? [Use arrow keys]",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
      .then(function(answer) {

        switch (answer.select) {
            case "View Products for Sale":
             viewProducts();
              break;
          
            case "View Low Inventory":
             lowInventory();
              break;
          
            case "Add to Inventory":
             addInventory();
              break;
          
            case "Add New Product":
            newProduct();
              break;
          }
        });
    });
}


function viewProducts(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
    console.table(results);
    start();
});
}

function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 50", function(err, result){
        if (err) throw err;
console.table(result)
start();
})}


function addInventory(){

    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    console.table(results);

    inquirer
      .prompt([
        {
          name: "pickadd",
          type: "input",
          message: "What is the ID of the item you would like to add to?",
        }])
      .then(function(answer) {

        var chosenItemAdd;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id == answer.pickadd) {
            chosenItemAdd = results[i];            
        howManyAdd(chosenItemAdd);
                }
            }
        })
    });
}

function howManyAdd(chosenItemAdd){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;

    inquirer
      .prompt([
        {
          name: "amountadd",
          type: "input",
          message: "How many would you like to add?"
        }])
      .then(function(answer) {
        var chosenAmountAdd = answer.amountadd;
        console.log(chosenAmountAdd);

    updateProductAdd(chosenItemAdd, chosenAmountAdd);
        })
    });
}

function updateProductAdd (chosenItemAdd, chosenAmountAdd){

    var query = connection.query("UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: parseInt(chosenItemAdd.stock_quantity) + parseInt(chosenAmountAdd)
            },
            {
              item_id: chosenItemAdd.item_id
            }
          ]);
        // logs the actual query being run
        console.log("Successfully added "+chosenAmountAdd+" "+chosenItemAdd.product_name+"s");
        start();
}


function newProduct (){
    inquirer
    .prompt([
      {
        name: "newproduct",
        type: "input",
        message: "What is the name of the product you would like to add?",
      }])
    .then(function(answer) {
      // get the information of the chosen item
        var newItem = answer.newproduct;
        whatDept(newItem);
              }
    )}

function whatDept(newItem){

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        
        var departments = [];
        for (var i = 0; i < results.length; i++){
            departments.push(results[i].department_name);
            }
    
        departments = departments.filter( function( item, index, inputArray ) {
                       return inputArray.indexOf(item) == index;
                });

    inquirer
    .prompt([
      {
        name: "department",
        type: "list",
        message: "What department would you like to add it to?",
        choices: departments
      }])
    .then(function(answer) {
      // get the information of the chosen item
        var newDepartment = answer.department;
        newCost(newItem, newDepartment);
              })
            
            }
    )}

function newCost (newItem, newDepartment){
    inquirer
    .prompt([
        {
        name: "newprice",
        type: "input",
        message: "How much does it cost?",
        }])
        .then(function(answer) {
          // get the information of the chosen item
            var newPrice = answer.newprice;
            parseFloat(newPrice);
            howManyDept(newItem, newDepartment, newPrice);

          }
)}

function howManyDept(newItem, newDepartment, newPrice){
    inquirer
      .prompt([
        {
          name: "manynewitems",
          type: "input",
          message: "How many do we have?"
        }])
      .then(function(answer) {
        var howManyNew = answer.manynewitems;
        addToTable(newItem, newDepartment, newPrice, howManyNew);
        })
    }

function addToTable(newItem, newDepartment, newPrice, howManyNew) {

    var query = connection.query("INSERT INTO products SET ?",
    {
      product_name: newItem,
      department_name: newDepartment,
      price: newPrice,
      stock_quantity: howManyNew
    });

console.log(newItem+" " + "ADDED TO BAMAZON!");
start();
}