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
        }else if(answer.userChoice === "View All Roles"){
            empDB.getAllRoles().then(allRoles => {
                const roleTitles = allRoles.map(role => { return {roles: role.title}});
                dataTable(roleTitles);
            })
        }else if(answer.userChoice === "Add Employee"){
            addEmployee();
        }else if(answer.userChoice === "View All Departments"){
            empDB.getAllDepartments().then(departments => dataTable(departments));;
        }
        else if(answer.userChoice === "Exit"){
            exit();
        }
    })
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name"
        }
    ]).then(answer => {
        empDB.getAllRoles().then(roles => {

            inquirer.prompt([
                {
                    type: "list",
                    message: "What is the employee's role?",
                    name: "role_id",
                    choices: roles.map(role => {return {name: role.title, value: role.id}})
                }
            ]).then(roleAnswer => {
                answer.role_id = roleAnswer.role_id;
                
                empDB.getAllEmployees().then(employees => {
                    let managers = [{name: "None", value: null}];
                    
                    employees.forEach(emp => managers.push({name: `${emp.first_name} ${emp.last_name}`, value: emp.id}));

                    inquirer.prompt([
                        {
                            type: "list",
                            message: "Who is the employee's manager?",
                            name: "manager_id",
                            choices: managers
                        }
                    ]).then(managerAnswer => {
                        answer.manager_id = managerAnswer.manager_id;
                        empDB.addEmployee(answer).then(newEmployee => {
                            console.log(`Added ${newEmployee.first_name} ${newEmployee.last_name} to the database.`);
                            start();
                        })
                    })
                })
            })
        })     
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