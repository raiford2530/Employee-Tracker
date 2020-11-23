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

    getAllRoles(){
        return new Promise((resolve, reject) => {
            this.#connection.query("SELECT title AS roles FROM role", (err, res) => {
                if(err) throw err;            
                resolve(res);
            })
        })    
    }

    getAllDepartments(){
        return new Promise((resolve, reject) => {
            this.#connection.query("SELECT name AS departments FROM department", (err, res) => {
                if(err) throw err;            
                resolve(res);
            })
        })    
    }

    close(){
        this.#connection.end();
    }
}

module.exports = EmployeeDB;