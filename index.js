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
                "Update Employee Role",
                "Update Employee Manager",
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
        }else if(answer.userChoice === "Add Department"){
            addDepartment();
        }else if(answer.userChoice === "Update Employee Role"){
            updateEmployeeRole();
        }
        else if(answer.userChoice === "Update Employee Manager"){
            updateEmployeeManager();
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

function updateEmployeeRole(){
    empDB.getAllEmployees().then(employees => {
        empDB.getAllRoles().then(roles => {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee's role would you like to update?",
                    name: "id",
                    choices: employees.map(employee => {return {name: `${employee.first_name} ${employee.last_name}`, value: employee.id}})
                },
                {
                    type: "list",
                    message: "Which role do you want to assign to the employee?",
                    name: "role_id",
                    choices: roles.map(role => {return {name: role.title, value: role.id}})
                }
            ]).then(answer => {
                empDB.updateEmployeeRole(answer);
                console.log("Updated employee's role.");
                start();
            })
        })
    })
}

function updateEmployeeManager(){
    empDB.getAllEmployees().then(employees => {
            const employeeChoices = employees.map(employee => {return {name: `${employee.first_name} ${employee.last_name}`, value: employee.id}})
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee's manager do you want to update?",
                    name: "id",
                    choices: employeeChoices
                },
                {
                    type: "list",
                    message: "Which employee do you want to set as manager for the seleted employee?",
                    name: "manager_id",
                    choices: employeeChoices
                }
            ]).then(answer => {
                empDB.updateEmployeeManager(answer);
                console.log("Updated employee's manager.");
                start();
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

function addDepartment(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the department name?",
            name: "name"
        }
    ]).then(departmentAnswer => {
        empDB.addDepartment(departmentAnswer.name)
        .then(department => {
            console.log(`${department} department successfully added to the database.`);
            start();
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