'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');

exports.instansi = async(req, res) => {
    try {
        let instansi = await query('table_instansi');
        res.json({
            "kode" : 1,
            "status" : "success",
            "datas" : instansi,
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateinstansi = async (req, res) => {
    try {
        const {id} = req.body.datas
        let create = await query('table_instansi').where('id', 2).update(
            req.body.datas
        )
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

