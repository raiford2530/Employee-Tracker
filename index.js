const inquirer = require('inquirer');
const cTable = require("console.table");
const EmployeeDB = require('./employeeDB');

const empDB = new EmployeeDB();

function start(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "userChoice",
            choices: [
                "View All Employees",
                "Add Employee",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Exit"
            ]
        }
       
    ]).then(answer => {
        if(answer.userChoice === "View All Employees"){
            viewAllEmployees();
        }
        else if(answer.userChoice === "Exit"){
            exit();
        }
    })
}

function viewAllEmployees(){
    empDB.getAllEmployees(dataTable);  
}

function exit(){
    empDB.close();
}

function dataTable(data){
    console.log();
    console.table(data);
    start();
}

start();