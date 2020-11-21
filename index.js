const inquirer = require('inquirer');

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

    })
}