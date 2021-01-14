'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('../config/config');
const jwt = require('jsonwebtoken')


exports.index = async (req,res) => {
    try {
        var currentTime = new Date()
        var year = currentTime.getFullYear()
        const jumlahblud = await query('table_blud').count('id', {as: 'total'})
        const anggaran_2020 = await query('table_total_pagu').where('tahun_anggaran', year)
        const anggaran_dibagikan =  await query('table_pagu').sum('pagu', {as: 'total'}).where('tahun_anggaran', year)
        const realisasianggaran = await query('table_rincian_anggaran').sum('jumlah', {as: 'total'}).where('tahun_anggaran', year)
        res.json({
            'kode': 1,
            'message': "success",
            "datas": {
                jumlahblud,
                anggaran_2020,
                anggaran_dibagikan,
                realisasianggaran
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