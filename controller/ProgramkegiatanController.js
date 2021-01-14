'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')



exports.getprogram = async(req, res) => {
    try {
        let blud = await query('table_program');
        res.json({
            "kode" : 1,
            "status" : "success",
            "datas" : blud,
        })
    } catch (error) {
        console.log(error)
    }
}


exports.createprogram = async (req, res) => {
    try {
        let create = await query('table_program').insert(
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

exports.updateprogram = async (req, res) => {
    try {
        let {id} = req.body.datas
        let update = await query('table_program').where('id', id).update(
            req.body.datas.payload
        )
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.getprogramid = async (req,res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let blud = await query('table_program').where('id', id)
        console.log(blud)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": blud
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.deleteprogram= async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        let create = await query('table_program').where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.createkegiatan = async (req, res) => {
    try {
        let create = await query('table_kegiatan').insert(
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

exports.getkegiatanprogram = async (req,res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let kegiatan = await query('table_kegiatan').where('kode_program', id)

        res.json({
            'kode': 1,
            'message': "success",
            "datas": kegiatan
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.deletekegiatan = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        let create = await query('table_kegiatan').where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}