'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')


exports.getadmin = async(req, res) => {
    try {
        let datas = await query('table_admin')
        return res.json({"status" : 1, "datas" : datas }, 200)
    } catch (error) {
        console.log(error)
    }
}

// add administrator
exports.createadmin = async (req, res) => {
    try {
        let {nama, username, email} = req.body
        let password = bcrypt.hashSync(req.body.password,10)
        let insert = await query('table_admin').insert({
            "nama" : nama,
            "username" : username,
            "akses" : "admin",
            "email" : email,
            "password" : password
        })
        res.json({'status' : 1}, 200)
    } catch (error) {
        console.log(error)
    }
}

// delete administrator
exports.deleteadmin = async (req,res) => {
    try {
        const id = req.params.id;
        let deleteid = await query('table_admin').where('id', id).del()
        return res.json({"status" : 1}, 200)
    } catch (error) {
        console.log(error)
    }
}
