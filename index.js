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
            empDB.getAllEmployees().then(employees => dataTable(employees));
        }else if(answer.userChoice === "View All Roles"){
            empDB.getAllRoles().then(allRoles => dataTable(allRoles));
        }else if(answer.userChoice === "Add Employee"){
            addEmployee();
        }else if(answer.userChoice === "View All Departments"){
            empDB.getAllDepartments(false).then(departments =>{
                dataTable(departments)
            });
        }else if(answer.userChoice === "Add Role"){
            addRole();
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

function addRole(){
    empDB.getAllDepartments().then(departments => {

        inquirer.prompt([
            {
                type: "input",
                message: "What is the title of the new role?",
                name: "title"
            },
            {
                type: "input",
                message: "What is the salary for the new role?",
                name: "salary"
            },
            {
                type: "list",
                message: "In what department is the new role?",
                name: "department_id",
                choices: departments.map(department => { return {name: department.name, value: department.id}})
            }
        ]).then(roleAnswer => {
            empDB.addRole(roleAnswer)
            .then(role => {
                console.log(`${role.title} role successfully added to the database.`);
                start();
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