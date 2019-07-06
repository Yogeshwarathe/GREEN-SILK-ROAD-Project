var sqlite3 = require('sqlite3');
let db = new sqlite3.Database('Data',(err)=>{
    if (!err) {
        console.log("database is created");
        db.run('create table if not exists Traveler_Table(id integer primary key autoincrement,First_name text, Last_name text, Email_address text, Phone_number integer,Country text, Description text, Skills text,Date integer,Time integer)',(err,data)=>{
            if(!err){
                console.log("Table is created");
            } else {
            	console.log("Table is not created");
            }
        })

        db.run('create table if not exists Organisation_Table(id integer primary key autoincrement,Date integer,time integer,Organisation_name text, Website_link text,img text, Email_address text, Phone_number integer, Address text, Special_categary_work text, Language text, Description text, Needs text)', (err,data)=>{
            if(!err){
                console.log("Organisation table is created");
            } else {
                console.log("Organisation table is not created");
            }
        })

    } else {
    	console.log("somthing is rong");
    }
})
