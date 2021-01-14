var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});


exports.sendemail = async (datas, req, res) => {

    const resp = 0

    transporter.use('compile', hbs({
        viewEngine: 'express-handlebars',
        viewPath: './email/templates/'
    }));

    var mailOptions = {
        from: 'noreply@blud.com',
        to: datas.email,
        subject: 'Password Akun e-BLUD',
        text: '',
        template: 'main',
        context: {
            instansi: datas.nama_blud,
            username: datas.username,
            password: datas.password
        }
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            return err
        }else{
            console.log('Email sent: ' + info.response);
            return info.response
        }
    })

    return res
}



