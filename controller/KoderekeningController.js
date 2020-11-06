'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')

let table = 'table_kode_rekening'

//getallkoderekening
exports.getkoderekening = async (req,res) => {
    try {
        //console.log(id_instansi)
        let koderekening = await query(table)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": koderekening,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//createpelayanan
exports.createkoderekening = async (req, res) => {
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
exports.updatekoderekening = async (req, res) => {
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
exports.getkoderekeningid = async (req,res) => {
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
exports.deletekoderekening = async (req, res) => {
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

//get Akun

exports.getkoderekeningwhere = async (req,res) => {
    try {
        //console.log(id_instansi)
        const {forselect} = req.body.datas
        console.log(forselect)
        let koderekening = await query(table).select(forselect, 'judul').where(req.body.datas.payload)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": koderekening,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}


