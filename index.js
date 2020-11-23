const inquirer = require('inquirer');
const cTable = require("console.table");
const EmployeeDB = require('./employeeDB');
const { cachedDataVersionTag } = require('v8');

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
            empDB.getAllEmployees().then(employees => dataTable(employees));;
        }
        else if(answer.userChoice === "Exit"){
            exit();
        }
    })
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