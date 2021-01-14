'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('./../config/config');
const jwt = require('jsonwebtoken')
const sendemail = require('./../email/sendemail')


// SignUp
exports.createblud = async (req, res) => {
    try {
        let { nama_blud, username, email } = req.body.datas;
        let cekemail = await query('table_blud').where('email', email);
        let cekusername = await query('table_blud').where('username', username);

        console.log(nama_blud)

        if (cekemail.length > 0 || cekusername.length > 0) {
            res.json({
                'status': 0,
                'message': "alamat email ini sudah digunakan silahkan menggunakan alamat email yang lain"
            }, 200)
        } else {
            let passwordRandom = Math.floor(Math.random() * 1000000);
            let password = bcrypt.hashSync(passwordRandom.toString(), 10)
            let datasToSend = {
                'nama_blud': nama_blud,
                'email': email,
                'username': username,
                'password': passwordRandom
            }

            let insert = await query('table_blud').insert({
                "kode_blud": "",
                "nama_blud": nama_blud,
                "alamat_blud" : "",
                "logo": 'https://www.kla.id/wp-content/uploads/2018/03/LOGO-KABUPATEN-SAMBAS.png',
                "username": username,
                "email": email,
                "password": password,
                "akses": "blud",
                "status": 0,
                "status_input": 0,
                "nama_kepala_blud" : "",
                "nip_kepala_blud" : ""
            })

            let sendEmail = await sendemail.sendemail(datasToSend)

            res.json({
                'kode': 1,
                'message': "success"
            }, 200)

        }

    } catch (error) {
        console.log(error)
    }
}

// Login
exports.loginblud = async (req, res) => {
    try {

        let username = req.body.username
        let password = req.body.password
        console.log(username)
        let userAccess = {
            name: username
        }
        const accessToken = jwt.sign(userAccess, process.env.APP_SECRET_TOKEN)
        let user = await query('table_blud').where('username', username)

        console.log(accessToken)

        if (user.length > 0) {
            console.log(user[0].status)
            if(user[0].status === '1'){
                if (bcrypt.compareSync(password, user[0].password)) {
                    res.json({
                        "kode": 1,
                        "status": "success",
                        "accessToken": accessToken,
                        "data": user,
                    })
                } else {
                    res.json({ "kode": 2, "status": 'Password Anda Salah' });
                }
           }else{
                res.json({ "kode": 3, "status": 'Password Anda Salah' });
           }
        } else {
            res.json({ "kode": 3, "status": 'Username Tidak ditemukan' });
        }
    } catch (error) {
    }
}

exports.loginadmin = async (req, res) => {
    try {

        let username = req.body.username
        let password = req.body.password
        console.log(username)
        let userAccess = {
            name: username
        }
        const accessToken = jwt.sign(userAccess, process.env.APP_SECRET_TOKEN)
        let user = await query('table_admin').where('username', username)

        console.log(accessToken)

        if (user.length > 0) {
            console.log(user[0].status)
            //if(user[0].status === 1){
                if (bcrypt.compareSync(password, user[0].password)) {
                    res.json({
                        "kode": 1,
                        "status": "success",
                        "accessToken": accessToken,
                        "data": user,
                    })
                } else {
                    res.json({ "kode": 2, "status": 'Password Anda Salah' });
                }
           // }else{
                res.json({ "kode": 3, "status": 'Password Anda Salah' });
           // }
        } else {
            res.json({ "kode": 3, "status": 'Username Tidak ditemukan' });
        }
    } catch (error) {
    }
}
// Update

exports.updateinstansi = async (req, res) => {
    try {
        let { id, username } = req.body.datas;
        let update = await query('table_instansi').where('id', id).update(
            req.body.datas
        )
        let user = await query('table_instansi').where('id', id)
        let userAccess = {
            name: username
        }
        const accessToken = jwt.sign(userAccess, process.env.APP_SECRET_TOKEN)

        res.json({
            'kode': 1,
            'message': "success",
            "accessToken": accessToken,
            "data": user,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}