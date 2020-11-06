'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')
const moment = require('moment');


// getAntrian

exports.getantrian = async (req, res) => {
    try {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        let sekarang = day + month + year
        let kode = req.params.kode
        let instansi = req.params.instansi
        let cek = await query('table_store_count_antrian').where({ 'kode_antrian': kode, 'antrian_tanggal': sekarang }) // cek apakah hari ini available
        let getlimit = await query('table_instansi').where({ 'kode_antrian': kode })
        console.log(sekarang)

        if (cek.length > 0) {
            if(parseInt(cek[0].antrian_total) === parseInt(getlimit[0].limit_harian)){
                res.json({
                    'kode': 2,
                    'message': "Kuota terpenuhi",
                }, 200)
            }else{
                let update = await query('table_store_count_antrian').where({ 'kode_antrian': kode, 'antrian_tanggal': sekarang }).update({
                    'antrian_total': parseInt(cek[0].antrian_total) + 1,
                    'antrian_sisa': (parseInt(cek[0].antrian_total) + 1) - parseInt(cek[0].antrian_dipanggil),
                })

                let last = await query('table_store_count_antrian').where({ 'kode_antrian': kode, 'antrian_tanggal': sekarang })

                res.json({
                    'kode': 1,
                    'message': "success",
                    "datas": last,
                }, 200)
            }
        } else {
            let insert = await query('table_store_count_antrian').insert({
                'kode_antrian': kode,
                'instansi': instansi,
                'antrian_total': 1,
                'antrian_dipanggil': 0,
                'antrian_sisa': 1,
                'antrian_tanggal': sekarang,
            })
            let last = await query('table_store_count_antrian').where({ 'kode_antrian': kode, 'antrian_tanggal': sekarang })
            res.json({
                'kode': 1,
                'message': "success",
                "datas": last,
            }, 200)
        }
    } catch (error) {
        console.log(error)
    }
}
//pasnggil
exports.panggil = async (req, res) => {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    let sekarang = day + month + year
    let kode = req.params.kode
    let cek = await query('table_store_count_antrian').where({ 'kode_antrian': kode, 'antrian_tanggal': sekarang })
    console.log(sekarang)

    if (cek.length > 0) {
        if (parseInt(cek[0].antrian_total) === parseInt(cek[0].antrian_dipanggil)) {
            res.json({
                'kode': 2,
                'message': "antrian Habis",
            }, 200)
        } else {
            let update = await query('table_store_count_antrian').where({ 'kode_antrian': kode, 'antrian_tanggal': sekarang }).update({
                'antrian_dipanggil': parseInt(cek[0].antrian_dipanggil) + 1,
                'antrian_sisa': parseInt(cek[0].antrian_sisa) - 1,
            })
            let last = await query('table_store_count_antrian').where({ 'kode_antrian': kode, 'antrian_tanggal': sekarang })
            console.log("ini")
            res.json({
                'kode': 1,
                'message': "success",
                "datas": last,
            }, 200)
        }
    } else {
        res.json({
            'kode': 1,
            'message': "Belum Ada Antrian",
            "datas": last,
        }, 200)
    }

}

//get by kode antrian

exports.getbykode = async (req, res) => {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    let sekarang = day + month + year
    let kode = req.params.kode
    let cek = await query('table_store_count_antrian').where({ 'kode_antrian': kode, 'antrian_tanggal': sekarang })
    console.log(sekarang)
    res.json({
        'kode': 1,
        'message': "success",
        "datas": cek,
    }, 200)

}

exports.getantrianall = async (req, res) => {
    try {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        let sekarang = day + month + year
        let datas = await query('table_store_count_antrian').where({ 'antrian_tanggal': sekarang })
        res.json({
            'kode': 1,
            'message': "success",
            "datas": datas,
        }, 200)
    } catch (error) {
        console.log(error)
    }
}