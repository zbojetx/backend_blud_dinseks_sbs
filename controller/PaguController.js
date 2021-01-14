'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')

//getallsppd

//createpelayanan
exports.createpagu = async (req, res) => {
    try {
        let create = await query('table_pagu').insert(
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
exports.getpaguid = async (req,res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let pagu = await query('table_pagu').where('kode_blud', id)
        console.log(pagu)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": pagu,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.deletepagu = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        let create = await query('table_pagu').where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//================================================================================

exports.gettotalpagu = async (req,res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let pagu = await query('table_total_pagu')
        console.log(pagu)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": pagu,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.createtotalpagu = async (req, res) => {
    try {
        let create = await query('table_total_pagu').insert(
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

exports.updatetotalpagu = async (req, res) => {
    try {
        let create = await query('table_total_pagu').where('tahun_anggaran', req.body.datas.tahun_anggaran ).update(
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
exports.gettotalpaguid = async (req,res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let pagu = await query('table_total_pagu').where('tahun_anggaran', id)
        console.log(pagu)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": pagu,
        }, 200)

    } catch (error) {
        const { Option } = Select;console.log(error)
    }
}

exports.deletetotalpagu = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        let create = await query('table_total_pagu').where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//deletepelayanan


