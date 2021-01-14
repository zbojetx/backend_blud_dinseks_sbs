'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')

let table = 'table_pegawai'

//getallpegawai
exports.getpegawai = async (req,res) => {
    try {
        //console.log(id_instansi)
        let pegawai = await query(table)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": pegawai,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//createpelayanan
exports.createpegawai = async (req, res) => {
    try {
        let create = await query(table).insert(
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

//updatepelayanan
exports.updatepegawai = async (req, res) => {
    try {
        const {id} = req.body.datas
        let create = await query(table).where('id', id).update(
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

//get pelayanan by id i
exports.getpegawaiid = async (req,res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let pelayanan = await query(table).where('id', id)
        console.log(pelayanan)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": pelayanan,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//deletepelayanan
exports.deletepegawai = async (req, res) => {
    try {
        const id= req.params.id
        let create = await query(table).where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}