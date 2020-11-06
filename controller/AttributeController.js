'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')

let table = 'table_pegawai'

//getallprovinsi
exports.getprovinsi = async (req,res) => {
    try {
        let table = 'table_provinsi'
        //console.log(id_instansi)
        let datas = await query(table)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": datas,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//getallkabupatenbyid
exports.getkabkota = async (req,res) => {
    try {
        let provinsi_id = req.params.id;
        let table = 'table_kabupaten'
        console.log(provinsi_id)
        let datas = await query(table).where('provinsi_id', provinsi_id)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": datas,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//createatrr
//createpelayanan
exports.createattr = async (req, res) => {
    try {
        let table = 'table_attr'
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

//getallkabupatenbyid
exports.getattrbyjenis = async (req,res) => {
    try {
        let jenis = req.params.jenis;
        let table = 'table_attr'
        let datas = await query(table).where('jenis_attr', jenis)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": datas,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}


exports.deleteattr = async (req, res) => {
    try {
        const id= req.params.id
        let table = 'table_attr'
        let create = await query(table).where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

