'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const { table } = require('../config/config');
const query = require('../config/config');



exports.createanggaran = async (req, res) => {
    try {
        let create = await query('table_anggaran').insert(
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

exports.createrinciananggaran = async (req, res) => {
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

exports.updaterinciananggaran = async (req, res) => {
    try {
        let udpate = await query('table_rincian_anggaran').where('id', req.body.datas.id).update(
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

exports.getanggaranbyblud = async (req, res) => {
    try {
        //console.log(id_instansi)
        let anggaran = await query('table_anggaran')
            .join('table_kode_rekening', 'table_kode_rekening.id_kode_rekening', '=', 'table_anggaran.id_kode_rekening')
            .select('table_anggaran.*', 'table_kode_rekening.*')
            .where(req.body.datas)
            .orderBy('table_anggaran.id', 'asc')

        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                anggaran,
            }
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.deleteanggaran2 = async (req, res) => {
    try {
        let table = 'table_anggaran'
        let hapus = await query(table).where(req.body.datas).del()
        let hapus2 = await query('table_rincian_anggaran').where({
            'kode_blud' : req.body.datas.kode_blud,
            'tahun_anggaran' : req.body.datas.tahun_anggaran
        }).del()

        console.log(req.body.datas)
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.getrinciananggaranbyblud = async (req, res) => {
    try {
        //console.log(id_instansi)
        let anggaran = await query('table_rincian_anggaran').where(req.body.datas)
        let jumlahtotal = await query('table_rincian_anggaran').sum('jumlah', { as: 'total' }).where(req.body.datas)
        let update = await query('table_anggaran').where(req.body.datas).update({
            total: jumlahtotal[0].total
        })
        
        console.log(jumlahtotal)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                anggaran,
                jumlahtotal
            },
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.getrinciananggaranbyid = async (req, res) => {
    try {
        //console.log(id_instansi)
        let anggaran = await query('table_rincian_anggaran').where(req.body.datas)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                anggaran,
            },
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

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

// ==================== PROGRAM KEGIATAN ANGGARAN

exports.createprogramanggaran = async (req, res) => {
    try {
        let create = await query('table_program_kegiatan_anggaran').insert(
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
exports.getprogramanggaranbyblud = async (req, res) => {
    try {
        //console.log(id_instansi)
        let anggaran = await query('table_program_kegiatan_anggaran')
            .join('table_program', 'table_program.kode_program', '=', 'table_program_kegiatan_anggaran.kode_program')
            .join('table_kegiatan', 'table_kegiatan.kode_kegiatan', '=', 'table_program_kegiatan_anggaran.kode_kegiatan')
            .select('table_kegiatan.*', 'table_program.*', 'table_program_kegiatan_anggaran.*')
            .where(req.body.datas)

        let pagu = await query('table_pagu').where({
            kode_blud: req.body.datas.kode_blud,
            tahun_anggaran: req.body.datas.tahun_anggaran
        })
        let realisasi = await query('table_rincian_anggaran').sum('jumlah', { as: 'total' }).where({
            kode_blud: req.body.datas.kode_blud,
            tahun_anggaran: req.body.datas.tahun_anggaran
        })

        console.log(pagu)

        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                anggaran,
                pagu,
                realisasi
            }
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.datatoprint = async (req, res) => {
    try {
        let rincian = []
        let blud = await query('table_blud').where('kode_blud', req.body.datas.kode_blud)
        let program = await query('table_program').where('kode_program', req.body.datas.kode_program)
        let kegiatan = await query('table_kegiatan').where('kode_kegiatan', req.body.datas.kode_kegiatan)
        let anggaran = await query('table_anggaran')
            .join('table_kode_rekening', 'table_anggaran.id_kode_rekening', '=', 'table_kode_rekening.id_kode_rekening')
            .select('table_anggaran.*', 'table_kode_rekening.*')
            .where(req.body.datas)
            .orderBy('table_anggaran.id', 'asc')
        let kepaladinas = await query('table_pegawai').where('pangkat_gol', 'Kepala')
        let verifikator = await query('table_pegawai').where('pangkat_gol', 'Verifikator')
        let other = await query('table_program_kegiatan_anggaran').where({
            'kode_blud': req.body.datas.kode_blud,
            'kode_program': req.body.datas.kode_program,
            'kode_kegiatan': req.body.datas.kode_kegiatan,
            'tahun_anggaran' : req.body.datas.tahun_anggaran,
        })
        let total = await query('table_rincian_anggaran').where({
            'kode_blud': req.body.datas.kode_blud,
            'kode_program': req.body.datas.kode_program,
            'kode_kegiatan': req.body.datas.kode_kegiatan,
            'tahun_anggaran' : req.body.datas.tahun_anggaran,
        }).sum('jumlah as total')

        let i = 0

        for (i; i<anggaran.length; i++){

            let rincianx = await query('table_rincian_anggaran').where({
                kode_blud: anggaran[i].kode_blud,
                id_kode_rekening: anggaran[i].id_kode_rekening,
                tahun_anggaran: anggaran[i].tahun_anggaran
            })


            rincian.push({rincian: anggaran[i], rincianx})
        }
        

        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                blud,
                program,
                kegiatan, 
                anggaran,
                rincian,
                kepaladinas,
                verifikator,
                other,
                total
            }
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.getrinciananggaranbypar = async (req, res) => {
    try {

        let rincian = await query('table_rincian_anggaran').where(req.body.datas)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                rincian,
            }
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.deleteanggaranbyprogram = async (req, res) => {
    try {

        let programdankegiatan = await query('table_program_kegiatan_anggaran').where({ 
            kode_blud: req.body.datas.kode_blud,
            tahun_anggaran: req.body.datas.tahun_anggaran 
        }).del()
        let anggaran = await query('table_anggaran').where(req.body.datas).del()
        let hapus2 = await query('table_rincian_anggaran').where({
            'kode_blud' : req.body.datas.kode_blud,
            'tahun_anggaran' : req.body.datas.tahun_anggaran
        }).del()
        //let rincian_anggaran = await('table_rincian_anggaran').where()
        res.json({
            'kode': 1,
            'message': "success",
        }, 200)
        
    } catch (error) {
        console.log(error)
    }
}