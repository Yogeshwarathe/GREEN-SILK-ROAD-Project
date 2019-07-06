var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');
var db = require('./create_table_sql');
var app = express();
var fs = require('fs');
var today = new Date();

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/form_organisation_get', (req, res) => {
	res.sendFile(__dirname + '/form_2_Organisation.html');
})

	

app.get('/form_traveler_get', (req, res) => {
	res.sendFile(__dirname + '/form_1_traveler.html');
})




app.get('/traveler', (req, res) => {
    let db = new sqlite3.Database('Data', (err) => {
        if (err){
            console.log(err);
        } else {
            db.all('select * from Traveler_Table;', (err, data) => {
                if (data){
                    res.send(data);
                }else {
                    console.log(res.statusCode);
                }
            });
        }
    });
});


var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

app.post('/form_traveler_post', (req, res) => {
 //    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
	// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var First_Name = req.body.firstname;
	var	Last_Name = req.body.lastname;
	var	Age = req.body.age;
	var	Email_address = req.body.email;
	var	Phone_number = req.body.phone;
	var	Country = req.body.country;
	var	Description = req.body.description;
	var	Skills = req.body.skills;


	var form_data = [date,time,First_Name,Last_Name,Age,Email_address,Phone_number,Country,Description,Skills];
	
		// console.log(a);
		// this us dump data in txt file
		fs.writeFile("traveler.txt", form_data, (err) => {
			if (err){
			  	console.log(err);
			} else {
			  	console.log("Successfully Written to File.");
			  	// console.log(form_data);
			}
		});

		// // this use open txt file data
		// fs.readFile("traveler.txt", function(err, buf) {
		// 	if(err){
		// 		console.log(err);
		// 	} else {
		// 		console.log(buf.toString());
		// 	}
		// });

    let db = new sqlite3.Database('Data', (err) => {
        if (!err){	
        	// var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
			// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            db.run('insert into Traveler_Table (First_name,Last_name,Email_address,Phone_number,Country,Description,Skills,Date,Time) values ("'+req.body.firstname+'", "'+req.body.lastname+'","'+req.body.email+'","'+req.body.phone+'","'+req.body.country+'","'+req.body.description+'","'+req.body.skills+'","'+date+'","'+time+'")');
            console.log('data inserted successfully');
            res.send('success');

             
        }
    });
});




app.post('/form_organsation_post',(req,res)=>{
    console.log('post is working');
    let db = new sqlite3.Database('Data',(err)=>{
        if (!err) {
        	var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            db.run('insert into Organisation_Table(Date,Time,Organisation_name, Website_link, img, Email_address, Phone_number, Address, Special_categary_work, Language, Description, Needs ) values("'+date+'","'+time+'","'+req.body.organisation+'","'+req.body.website+'","'+req.body.img+'","'+req.body.email+'","'+req.body.number+'","'+req.body.address+'","'+req.body.works+'","'+req.body.language+'","'+req.body.description+'","'+req.body.needs+'")');
            console.log('organsation data was inserted');
            res.send('successful');
        } else {
            console.log('organsation data is not inserted');
        }
    })
})




app.listen(9655);
console.log("Api successfully working");



