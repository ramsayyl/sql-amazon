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
    message: "Enter the product id",
    name: "id_input",
    type: "input",
    vaidate: validateNum
  },
  {
    message: "How many units would you like to purchase",
    name: "amount_input",
    type: "input",
    validate: validateNum
  }
]).then(function(answers) {
    findID(answers);
  })
}

function validateNum(num) {
  var reg = /^\d+$/;
  return reg.test(num) || "Amount should be a number!";
}

function findID(answers) {
  var choice = answers.id_input;
  var userAmount = answers.amount_input;
  var query = "SELECT * FROM products WHERE item_id=?";

  connection.query(query, [choice], function(err, res) {
    if (err) throw err;
    var stockAmount = res[0].stock_quantity;
    var sales = res[0].product_sales;

    console.log("\nBEFORE PURCHASE\n----------------\n");
    console.log("Product Name: " + res[0].product_name + "\n\nDepartment Name: " + res[0].department_name + "\n\nAmount In Stock: " + res[0].stock_quantity + "\n\nPrice: $" + res[0].price + "\n\nTotal Sold: " + res[0].product_sales);
    res[0].stock_quantity -= userAmount;
    res[0].product_sales += parseFloat(userAmount);

      if (res[0].stock_quantity >= 0) {
        var updateQuery = 'UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ' + choice;

        var receipt = userAmount * res[0].price;

            connection.query(updateQuery,[res[0].stock_quantity, res[0].product_sales], function(err, res) {
  						if (err) throw err;
  					});

            console.log("\nAFTER PURCHASE\n----------------\n");
            console.log("Product Name: " + res[0].product_name + "\n\nDepartment Name: " + res[0].department_name + "\n\nAmount In Stock: " + res[0].stock_quantity + "\n\nPrice: $" + res[0].price + "\n\nTotal Sold: " + res[0].product_sales);
            console.log("\nTotal Purchased: " + userAmount + "\nAmount Spent: $" + receipt + "\n\nProfit made on " + res[0].product_name + ": $" + (res[0].product_sales * res[0].price));
      } else {
        console.log("Insufficient stock_quantity!!");
      }
    go();
  });

}
