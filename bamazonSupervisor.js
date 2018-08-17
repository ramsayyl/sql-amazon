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

// Command line prompts using Inquirer NPM
function go() {

  inquirer.prompt([
  {
    message: "What would you like to do",
    name: "options",
    type: "list",
    choices: ['View Product Sales by Department', 'Create New Department', 'Close Application']
  }
  ]).then(function(answers) {
    switch (answers.options) {
      case 'View Product Sales by Department':
        viewSales();
        break;

      case 'Create New Department':
        addDept();
        break;

      case 'Close Application':
        process.exit(1);
        break;

    }
  })

}

function viewSales() {
  console.log("not working");
  go();
}

function addDept() {
  console.log("not working");
  go();
}
