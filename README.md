# Garcia's Detailing Website

![Garcia's Detailing Logo](Front-End/Images/image12.png)

A full-stack web application for a professional car detailing business, providing customers with service information and appointment booking capabilities.

## 🚗 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Service Showcase**: Detailed presentation of all detailing services with pricing
- **Contact Form**: Easy-to-use contact form with email integration
- **Appointment Booking**: Online appointment scheduling system
- **Portfolio Gallery**: Image gallery showcasing previous detailing work
- **Modern UI**: Clean, professional design with smooth animations

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome
- Flatpickr (for date picking)

### Backend
- Node.js
- Express.js
- Nodemailer (for email functionality)
- AWS for hosting

## 📋 Project Structure

```
Garcia-s-Detailing/
├── Front-End/
│   ├── Images/
│   ├── index.html
│   ├── index.css
│   ├── main.js
│   ├── contact-us.html
│   ├── contact-us.css
│   ├── contact-us.js
│   ├── appointmemt.html
│   ├── appointment.css
│   └── appointment.js
└── Back-End/
    ├── server.js
    └── package.json
```

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Garcia-s-Detailing.git
   cd Garcia-s-Detailing
   ```

2. **Install dependencies**
   ```bash
   cd Back-End
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Access the website**
   Open your browser and navigate to `http://localhost:3000`

## 🔧 Configuration

To configure the email functionality:

1. Open `Back-End/server.js`
2. Modify the email transport configuration:
   ```javascript
   var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'your-email@gmail.com',
       pass: 'your-app-password'
     }
   });
   ```
   
## 📷 Screenshots

![Homepage](https://example.com/screenshots/homepage.jpg)
![Services](https://example.com/screenshots/services.jpg)
![Contact Form](https://example.com/screenshots/contact.jpg)

## 🚀 Deployment

This application can be deployed to:
- Heroku
- AWS
- Netlify (Frontend)
- Vercel

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/Garcia-s-Detailing/issues).

## 📝 License

This project is MIT licensed.

## 📞 Contact

---

Made with ❤️ by Roger Garcia
