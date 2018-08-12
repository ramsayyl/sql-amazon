var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'luke',
  database: 'bamazon'
});

connection.connect(function(err) {

  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  go();
});

function go() {

  inquirer.prompt([
  {
    message: "What would you like to do",
    name: "options",
    type: "list",
    choices: ['View Products for sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
  }
]).then(function(answers) {
    switch (answers.options) {
      case 'View Products for sale':
        queryProducts();
        break;

      case 'View Low Inventory':
        viewLowInv();
        break;

      case 'Add to Inventory':
        break;

      case 'Add New Product':
        break;


      default:

    }
  })

}


function queryProducts() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      console.log("-----------------------------------");
    }
  });
}

function viewLowInv() {
  var query = "SELECT * FROM products WHERE stock_quantity < 6";

  connection.query(query, function(err, res) {
    if (res.length > 0) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        console.log("-----------------------------------");
      }
    } else {
      console.log("No products with low stock.");
    }
  })
}
