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
  database: "BamazonSuperDB"
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
      // console.table(results);
      inquirer
        .prompt([
          {
            name: "select",
            type: "list",
            message: "What would you like to do? [Use arrow keys]",
            choices: ["View Product Sales by Department", "Create New Department", "Quit"]
          }])
        .then(function(answer) {
  
          switch (answer.select) {
              case "View Product Sales by Department":
               viewProductSales();
                break;
            
              case "Create New Department":
               createDept();
                break;
            
              case "Quit":
               connection.end();
                break;
            }
          });
      });
  }

  function viewProductSales(){

    connection.query("SELECT ...", function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
})}

function createDept(){
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // console.table(results);
    inquirer
      .prompt([
        {
          name: "select",
          type: "input",
          message: "What is the name of the department?"
        }])
      .then(function(answer) {
        var newDeptName = answer.select;
        var departmentsNames = [];
        for (var i = 0; i < results.length; i++){
          departmentsNames.push(results[i].department_name);
        }

        if (departmentsNames.includes(newDeptName)){
          console.log("That department already exists");
          start();
        } else {
          updateDepartments();
        }

        });
    });
}

function updateDepartments(){
  connection.query("SELECT * FROM departments", function(err, results) {
    if (err) throw err;
    // console.table(results);
}

