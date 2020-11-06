'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')


exports.index = async (req,res) => {
    try {

        const jumlahpegawai = await query('table_pegawai').count('id', {as: 'total'})
        const jumlahsppd = await query('table_sppd').count('id', {as: 'total'})
        const jumlahsurattugas = await query('table_surat_tugas').count('id', {as: 'total'})
        const totalanggaran = await query('table_rincian_anggaran').sum('jumlah', {as: 'total'})

        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                jumlahpegawai,
                jumlahsppd,
                jumlahsurattugas,
                totalanggaran
            },
        }, 200)

    } catch (error) {
        console.log(error)
    }
}

exports.groupbymonth = async (req, res) => {
    try {
        console.log("MONTH")
        const surattugaspermonth = await query('table_surat_tugas').groupByRaw("MONTH(tanggaldikeluarkan)")
        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                surattugaspermonth
            },
        }, 200)
    } catch (error) {
      console
    }
}