var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mppskw@gmail.com',
        pass: 'gunungkerinci123'
    }
});


exports.sendemail = async (datas, req, res) => {

    const resp = 0

    transporter.use('compile', hbs({
        viewEngine: 'express-handlebars',
        viewPath: './email/templates/'
    }));

    var mailOptions = {
        from: 'noreply@mppskw.com',
        to: datas.email,
        subject: 'Password Akun MPP',
        text: '',
        template: 'main',
        context: {
            instansi: datas.nama_instansi,
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



