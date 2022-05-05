import { Sequelize } from "sequelize";
 
const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_ROOT_PASSWORD, {
    host: "mysqldb",
    dialect: "mysql"
});
 
export default db;