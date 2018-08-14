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
    choices: ['View Products for sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Close Application']
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
        addInv(answers);
        break;

      case 'Add New Product':
        addNewProduct(answers);
        break;

      case 'Close Application':
        process.exit(1);
        break;


    }
  })

}

function validateNum(num) {
  var reg = /^\d+$/;
  return reg.test(num) || "Amount should be a number!";
}


function queryProducts() {
  var query = "SELECT * FROM products";

  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("\n" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      console.log("-----------------------------------");
    }
  });
  go();
}

function viewLowInv() {
  var query = "SELECT * FROM products WHERE stock_quantity <= 5";

  connection.query(query, function(err, res) {
    if (res.length > 0) {
      for (var i = 0; i < res.length; i++) {
        console.log("\n" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        console.log("-----------------------------------");
      }
    } else {
      console.log("No products with low stock.");
    }
  })
  go();
}

function addInv(answers) {

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the ID for the item you would like to update',
			validate: validateNum,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to add?',
			validate: validateNum,
			filter: Number
		}
	]).then(function(answers) {
		var choice = answers.item_id;
		var addQuantity = answers.quantity;
		var queryStr = 'SELECT * FROM products WHERE item_id=?';

		connection.query(queryStr, [choice], function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				addInventory();

			} else {
				var productData = data[0];

				console.log('\nUpdating Inventory...');

				var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + choice;
				connection.query(updateQueryStr, function(err, data) {
					if (err) throw err;

					console.log('\nStock count for Item ID ' + choice + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
					console.log("\n---------------------------------------------------------------------\n");

				})
			}
		})
    go();
	})
}

function addNewProduct(answers) {

	inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the products name',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'Please enter the selling price',
			validate: validateNum
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are in stock?',
			validate: validateNum
		}
	]).then(function(answers) {

		console.log('Adding New Item: \n   Product Name = ' + answers.product_name + '\n' +
									   '    Department Name = ' + answers.department_name + '\n' +
									   '    Price = ' + answers.price + '\n' +
									   '    Amount in Stock = ' + answers.stock_quantity);

		var queryStr = 'INSERT INTO products SET ?';

		connection.query(queryStr, answers, function (err, res, fields) {
			if (err) throw err;

			console.log('New product has been added to the inventory under Item ID ' + res.insertId + '.');
			console.log("\n---------------------------------------------------------------------\n");

		});
    go();
	})
}
