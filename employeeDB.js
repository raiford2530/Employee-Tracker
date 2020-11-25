const mysql = require('mysql');

class EmployeeDB{
    #connection;
    constructor(){
        this.#connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Tignall1",
            database: "employee_db"
        });
    }

    getAllEmployees(){
        const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name department, r.salary, CONCAT(m.first_name, ' ', m.last_name) manager
                       FROM employee AS e
                       LEFT JOIN employee AS m
                       ON e.manager_id = m.id
                       JOIN role AS r
                       ON e.role_id = r.id
                       JOIN department AS d 
                       ON r.department_id = d.id`;

        return new Promise((resolve, reject) => {
            this.#connection.query(query, (err, res) => {
                if(err) throw err;            
                resolve(res);
            })
        })    
    }

    addEmployee(employee){
        return new Promise((resolve, reject) => {
            this.#connection.query("INSERT INTO employee SET ?", employee, (err, res) => {
                if(err) throw err;
                resolve(employee);              
            })
        })       
    }

    updateEmployeeRole(employee){
        return new Promise((resolve, reject) => {
            this.#connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [employee.role_id, employee.id], (err, res) => {
                if(err) throw err;
                resolve(employee);              
            })
        })       
    }

    updateEmployeeManager(data){
        return new Promise((resolve, reject) => {
            this.#connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [data.manager_id, data.id], (err, res) => {
                if(err) throw err;
                resolve(data);              
            })
        })       
    }

    getAllRoles(){
        return new Promise((resolve, reject) => {
            this.#connection.query("SELECT id, title FROM role", (err, res) => {
                if(err) throw err;            
                resolve(res);
            })
        })    
    }

    addRole(role){
        return new Promise((resolve, reject) => {
            this.#connection.query("INSERT INTO role SET ?", role, (err, res) => {
                if(err) throw err;
                resolve(role);              
            })
        })       
    }

    getAllDepartments(){
        let query = `SELECT id, name FROM department`
        return new Promise((resolve, reject) => {
            this.#connection.query(query, (err, res) => {
                if(err) throw err;            
                resolve(res);
            })
        })    
    }

    addDepartment(department){
        return new Promise((resolve, reject) => {
            this.#connection.query("INSERT INTO department(name) VALUES(?)", department, (err, res) => {
                if(err) throw err;
                resolve(department);              
            })
        })       
    }

    close(){
        this.#connection.end();
    }
}

module.exports = EmployeeDB;