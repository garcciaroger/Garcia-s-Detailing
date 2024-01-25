var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.createServer(app);
var port = 3000;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Use express.static to serve static files from the Front-End directory
app.use(express.static(path.join(__dirname, '../Front-End')));

// Routing
app.get("/", function(req,response){
    response.sendFile(path.join(__dirname, '../Front-End', 'contact-us.html'));
});

app.post("/send_email", function(req, response){
    var from = req.body.from;
    var to = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'garcciaroger@gmail.com',
            pass: 'ybrekkbxmbhxdtpc'
        }
    });

    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            response.status(500).json({ success: false, error: 'Error sending email' });
        } else {
            console.log("Email Sent: " + info.response);
            response.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

// Initialize web server
server.listen(port, function(){
    console.log("Starting Server on port: " + port)
});




