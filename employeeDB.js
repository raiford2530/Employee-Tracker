const mysql = require('mysql');

class EmployeeDB{
    #connection;
    constructor(){
        connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Tignall1",
            database: "employee_db"
        });
    }
}