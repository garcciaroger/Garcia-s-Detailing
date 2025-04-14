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
app.get("/", function(req, response){
    response.sendFile(path.join(__dirname, '../Front-End', 'index.html'));
});

app.get("/contact", function(req, response){
    response.sendFile(path.join(__dirname, '../Front-End', 'contact-us.html'));
});

app.post("/send_email", function(req, response){
    // Log the body to see what's coming in
    console.log("Form submission received:", req.body);
    
    var from = req.body.from || 'noreply@garciasdetailing.com';
    var to = req.body.to || 'info@garciasdetailing.com';
    var subject = req.body.subject || 'New contact form submission';
    var message = req.body.message || 'No message provided';
    
    // Add name and other details to message if available
    if (req.body.name) {
        message = "Name: " + req.body.name + "\n\n" + message;
    }
    
    if (req.body.phone) {
        message = message + "\n\nPhone: " + req.body.phone;
    }
    
    if (req.body.service) {
        message = message + "\n\nService: " + req.body.service;
    }

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
        text: message,
        replyTo: from // Set reply-to as the customer's email
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("Email error:", error);
            response.status(500).json({ 
                success: false, 
                error: 'Error sending email',
                details: error.message
            });
        } else {
            console.log("Email Sent: " + info.response);
            response.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

// Add form success page
app.get("/success", function(req, response){
    response.sendFile(path.join(__dirname, '../Front-End', 'success.html'));
});

// Initialize web server
server.listen(port, function(){
    console.log("Starting Server on port: " + port)
    console.log("Open http://localhost:" + port + " in your browser")
});




