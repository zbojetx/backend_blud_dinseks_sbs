'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')

let table = 'table_sppd'

//getallsppd
exports.getsppd = async (req,res) => {
    try {
        //console.log(id_instansi)
        let blud = await query(table).join('table_blud').orderBy('id', 'desc')
        res.json({
            'kode': 1,
            'message': "success",
            "datas": blud,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//createpelayanan
exports.createsppd = async (req, res) => {
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
exports.updatesppd = async (req, res) => {
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
exports.getsppdid = async (req,res) => {
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
exports.deletesppd = async (req, res) => {
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

exports.createpengikut = async (req, res) => {
    try {
        let create = await query('table_pengikut').insert(
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

exports.getpengikutid = async (req,res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let pengikut = await query('table_pengikut').where('id_sppd', id)
        console.log(pengikut)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": pengikut,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.deletepengikut = async (req, res) => {
    try {
        const id= req.params.id
        let create = await query('table_pengikut').where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.getsppdidforprint = async (req,res) => {
    try {
        let id = req.params.id;
        console.log(id)
        let instansi = await query('table_instansi')
        let sppd = await query(table).where('id', id)
        let pegawai = await query('table_pegawai').where('id', sppd[0].nama_pegawai)
        let penandatangan = await query('table_pegawai').where('id', sppd[0].penanda_tangan)
        let penandatangankeuangan = await query('table_pegawai').where('id', sppd[0].penanda_tangan_keuangan)
        let kab_kota = await query('table_kabupaten').where('id', sppd[0].kab_kota)
        let provinsi = await query('table_provinsi').where('id', sppd[0].provinsi)
        let pengikut = await query('table_pengikut').where('id_sppd', id)
        let anggaran =  await query('table_rincian_anggaran').where('id_sppd', id)
        console.log(sppd)
        console.log(pegawai)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                instansi,
                sppd,
                pegawai,
                penandatangan,
                penandatangankeuangan,
                kab_kota,
                provinsi,
                pengikut,
                anggaran
            },
        }, 200)

    } catch (error) {
        console.log(error)
    }
}



//getAnggaran
exports.getanggaranbyid = async (req,res) => {
    try {
        let id_sppd = req.params.id;
        let table = 'table_rincian_anggaran'
        console.log(id_sppd)
        let datas = await query(table).where('id_sppd', id_sppd)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": datas,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//create anggran
exports.createanggaran = async (req, res) => {
    try {

        let create = await query('table_rincian_anggaran').insert(
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

//deleteanggaran
exports.deleteanggaran = async (req, res) => {
    try {
        const id= req.params.id
        let table = 'table_rincian_anggaran'
        let create = await query(table).where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}
