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

function validateAge(age) {
  var reg = /^\d+$/;
 return reg.test(age) || "Amount should be a number!";
}

function go() {
  inquirer.prompt([
  {
    message: "Enter the product id (1-10)",
    name: "id_input",
    type: "input"
  },
  {
    message: "How many units would you like to purchase",
    name: "amount_input",
    type: "input",
    validate: validateAge
  }
]).then(function(answers) {
    findID(answers);
    updateTable(answers);
  })
}

function findID(answers) {
  var query = "SELECT * FROM products WHERE item_id=?";
  var choice = answers.id_input;
  var userAmount = answers.amount_input;

  connection.query(query, [choice], function(err, res) {
    var stockAmount = res[0].stock_quantity;
    console.log("\nBEFORE PURCHASE\n----------------\n");
    console.log("Product Name: " + res[0].product_name + "\n\nDepartment Name: " + res[0].department_name + "\n\nAmount In Stock: " + res[0].stock_quantity + "\n\nPrice: $" + res[0].price);
    res[0].stock_quantity -= userAmount;

    if (res[0].stock_quantity >= 0) {
      var receipt = userAmount * res[0].price;
      console.log("\nAFTER PURCHASE\n----------------\n");
      console.log("Product Name: " + res[0].product_name + "\n\nDepartment Name: " + res[0].department_name + "\n\nAmount In Stock: " + res[0].stock_quantity + "\n\nPrice: $" + res[0].price);
      console.log("\nTotal Purchased: " + userAmount + "\nAmount Spent: $" + receipt);
    } else {
      console.log("Insufficient stock_quantity!!");
    }
    go();
  });


}


function updateTable(answers) {
  var sql = "UPDATE products SET stock_quantity =?";
  connnection.query(sql, [res[0].stock_quantity],function (err, res) {
    console.log(res[0].stock_quantity)
    if (err) throw err;
    console.log(res.affectedRows + " record(s) updated");
  });

}
