'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');

exports.instansi = async (req, res) => {
    try {
        let blud = await query('table_blud');
        res.json({
            "kode": 1,
            "status": "success",
            "datas": blud,
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateblud = async (req, res) => {
    try {
        const { id } = req.body.datas
        let create = await query('table_blud').where('id', id).update(
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

exports.updatekodeblud = async (req, res) => {
    try {
        const { id } = req.body.datas
        const cek = await query('table_blud').where('kode_blud', req.body.datas.payload.kode_blud).count()

        if (cek > 0) {
            res.json({
                'kode': 2,
                'message': "success",
            }, 200)
        } else {
            let create = await query('table_blud').where('id', id).update(
                req.body.datas.payload
            )
            res.json({
                'kode': 1,
                'message': "success",
            }, 200)
        }


    } catch (error) {
        console.log(error)
    }
}

exports.getblud = async (req, res) => {
    try {
        //console.log(id_instansi)
        let blud = await query('table_blud').orderBy('id', 'desc')
        res.json({
            'kode': 1,
            'message': "success",
            "datas": blud,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}


exports.getbludid = async (req, res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let blud = await query('table_blud').where('id', id)
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

exports.deleteblud = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        let create = await query('table_blud').where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}


exports.aktiforblockall = async (req, res) => {
    try {
        const { aktif } = req.body.datas
        let update = await query('table_blud').update({
            status: aktif
        })
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.openorcloseall = async (req, res) => {
    try {
        const { open } = req.body.datas
        let update = await query('table_blud').update({
            status_input: open
        })
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}