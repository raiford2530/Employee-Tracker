# Employee-Tracker        ![License](https://img.shields.io/static/v1?label=license&message=MIT&color=brightgreen)

## Description  
The Employee Tracker is a Node CLI application that allows a user to track data about their company's employees. The app was created to help management quickly view information about their employees, departments, management, and roles. It uses Inquirer.js to gather input from the user and then depending on the user's selection, it either displays information, adds information, updates information, or deletes information about an employee, role, or department. The Employee-Tracker project was created using Node.js, Inquirer.js, and MySQL.  

[Demo Video](https://drive.google.com/file/d/1Km0506tbZrWmqECjjrLmvoTfXT-DCzyD/view)

## Table of Contents  
[Installation](#Installation)  
[Usage](#Usage)   
[Contributing](#Contributing)  
[Questions](#Questions)  
[License](#License)  

## Installation
To run Employee-Tracker, you must install Node.js on your computer.

## Usage  
Once Node.js is installed on your computer, open up your terminal and go to the directory that Employee-Tracker is located. Run the command "node index.js". Once the app is started you will be prompted to choose an option from this list of choices:

"View All Employees" - shows all employees in the database  
"Add Employee" - Adds an employee. Will prompt user for first name, last name, role, and manager  
"Update Employee Role" - Updates the role that the employee is in. Prompts the user to choose an employee and choose the role to assign to the employee.  
"Update Employee Manager" - Updates the manager of the selected employee. Will prompt the user to choose an employee to update and choose an employee to set as the manager of the selected employee.  
"View Employees By Manager" - Displays all employees of the selected manager. Prompts the user to select a mangager and then displays employees.  
"Delete Employee" - Delete selected employee. Prompts the user to select an employee to delete.
"View All Roles" - Displays all roles in the database
"Add Role" - Adds a new role to the database. Prompts the user for the role title, salary, and a list to select a department
"Delete Role" - Deletes selected role from the database. Prompts user with a list to select role to be deleted.
"View All Departments" - Displays all departments.
"Add Department" - Adds a department to the database. Prompts user for the department name.
"Delete Department" - Deletes selected department from the database. Prompts the user with a list to select department to be deleted.
"Exit" - Closes out the program.
 


## Contributing  
To contribute, fork the repository and clone the repo to your computer. Make changes locally and push to your branch and then submit a pull request.

## Questions 
Visit my [GitHub Profile](https://www.github.com/raiford2530)  
For additional questions, contact me by email at raiford87@gmail.com.  

## License  
MIT License

Copyright (c) 2020 Rashawn Raiford

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

