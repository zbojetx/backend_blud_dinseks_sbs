'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')

let table = 'table_surat_tugas'

//getallsurattugas
exports.getsurattugas = async (req, res) => {
    try {
        //console.log(id_instansi)
        let surattugas = await query(table)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": surattugas,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//createpelayanan
exports.createsurattugas = async (req, res) => {
    try {
        const { nomor_surat, format_nomor } = req.body.datas.payload
        console.log(format_nomor)

        const cek = await query(table).where('nomor_surat',nomor_surat).andWhere('format_nomor', format_nomor)
        console.log(cek)
        if (cek.length > 0) {
            res.json({
                'kode': 2,
                'message': "success",
            }, 200)
        } else {

            let create = await query(table).insert(
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

//updatepelayanan
exports.updatesurattugas = async (req, res) => {
    try {
        const { id, generatespps } = req.body.datas
        let create = await query(table).where('id', id).update(
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

//get pelayanan by id i
exports.getsurattugasid = async (req, res) => {
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

exports.carisurattugasbydate = async (req, res) => {
    try {
        let date1 = req.body.datas.date1
        let date2 = req.body.datas.date2

        let datas = await query('table_surat_tugas').whereBetween('created_at', [date1, date2])
        console.log(datas)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": datas,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.carisurattugasbynomorsurat = async (req, res) => {
    try {

        let data = await query('table_surat_tugas').where(req.body.datas)

        res.json({
            'kode': 1,
            'message': "success",
            "datas": data,
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

//deletepelayanan
exports.deletesurattugas = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        let create = await query('table_surat_tugas').where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.createpelaksana = async (req, res) => {
    try {
        let create = await query('table_pelaksana').insert(
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

exports.getpelaksanaid = async (req, res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let pengikut = await query('table_pelaksana').join('table_pegawai', 'table_pelaksana.id_pegawai', '=', 'table_pegawai.id')
            .select('table_pelaksana.*', 'table_pegawai.nama_pegawai').where('id_surat_tugas', id)
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

exports.deletepelaksana = async (req, res) => {
    try {
        const id = req.params.id
        let create = await query('table_pelaksana').where('id', id).del()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.getsurattugasidforprint = async (req, res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let instansi = await query('table_instansi')
        let surattugas = await query(table).where('id', id)
        let penandatangan = await query('table_pegawai').where('id', surattugas[0].penanda_tangan)
        let kab_kota = await query('table_kabupaten').where('id', surattugas[0].kab_kota)
        let provinsi = await query('table_provinsi').where('id', surattugas[0].provinsi)
        let pelaksana = await query('table_pelaksana').join('table_pegawai', 'table_pelaksana.id_pegawai', '=', 'table_pegawai.id')
            .select('table_pelaksana.*', 'table_pegawai.*').where('id_surat_tugas', id)
        console.log(surattugas)

        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                instansi,
                surattugas,
                penandatangan,
                kab_kota,
                provinsi,
                pelaksana,
            },
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.generatesppd = async (req, res) => {
    try {
        let id = req.params.id;
        //console.log(id_instansi)
        let instansi = await query('table_instansi')
        let surattugas = await query(table).where('id', id)
        let penandatangan = await query('table_pegawai').where('id', surattugas[0].penanda_tangan)
        let kab_kota = await query('table_kabupaten').where('id', surattugas[0].kab_kota)
        let provinsi = await query('table_provinsi').where('id', surattugas[0].provinsi)
        let pelaksana = await query('table_pelaksana').join('table_pegawai', 'table_pelaksana.id_pegawai', '=', 'table_pegawai.id')
            .select('table_pelaksana.*', 'table_pegawai.*').where('id_surat_tugas', id)
        console.log(surattugas)

        let i = 0;

        for (i; i < pelaksana.length; i++) {
            let insert = await query('table_sppd').insert({
                nama_pegawai: pelaksana[i].id_pegawai,
                nomor_surat_tugas: surattugas[0].nomor_surat,
                format_surat_tugas: surattugas[0].format_nomor,
                provinsi: provinsi[0].id,
                kab_kota: kab_kota[0].id,
                tanggal_berangkat: surattugas[0].tanggal_berangkat,
                tanggal_pulang: surattugas[0].tanggal_pulang,
                penanda_tangan: surattugas[0].penanda_tangan,
                penanda_tangan_keuangan: surattugas[0].penanda_tangan
            })
        }

        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}



//getAnggaran
exports.getanggaranbyid = async (req, res) => {
    try {
        let id_surattugas = req.params.id;
        let table = 'table_rincian_anggaran'
        console.log(id_surattugas)
        let datas = await query(table).where('id_surattugas', id_surattugas)
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
        const id = req.params.id
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
