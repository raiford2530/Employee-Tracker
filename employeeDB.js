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

    getAllEmployees(callback){
        this.#connection.query("SELECT * FROM employee", (err, res) => {
            if(err) throw err;
            callback(res);
        })
    }

    close(){
        this.#connection.end();
    }
}

module.exports = EmployeeDB;