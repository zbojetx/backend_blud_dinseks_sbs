'use strict';


module.exports = function(app){

    const DashboardController = require('./../controller/DashboardController')
    const AuthController = require('./../controller/AuthController')
    const KoderekeningController = require('./../controller/KoderekeningController')
    const AttributeController = require('./../controller/AttributeController')
    const InstansiController = require('../controller/InstansiController')
    const SppdController = require('./../controller/SppdController')
    const AdminController = require('./../controller/AdminController')
    const SurattugasController = require('./../controller/SurattugasController')
    const PegawaiController = require('./../controller/PegawaiController')

    const BludController = require('./../controller//BludController')
    const PaguController = require('./../controller/PaguController')
    const AnggaranController = require('./../controller/AnggaranController')
    const ProgramkegiatanController = require('./../controller/ProgramkegiatanController')

    //Dashboard ====================================================================

    app.route('/dashboard').get(DashboardController.index)
    app.route('/reportperyear').get(DashboardController.groupbymonth)

    //===========================================================

    // Instansi / ===========================================================================================

    app.route('/instansi').get(InstansiController.instansi)
    app.route('/updateinstansi').post(InstansiController.updateinstansi)

     //=====================================================================================================

    //Auth - Sign Up - Daftar  ============================================================================

    app.route('/loginadmin').post(AuthController.loginadmin)
    app.route('/createblud').post(AuthController.createblud)
    app.route('/loginblud').post(AuthController.loginblud)


    // ====================================================================================================

    // BLUD =============================================================================================
    app.route('/getblud').get(BludController.getblud)
    app.route('/bludbyid/:id').get(BludController.getbludid)
    app.route('/updateblud').post(BludController.updateblud)
    app.route('/updatekodeblud').post(BludController.updatekodeblud)
    app.route('/aktiforblockblud').post(BludController.aktiforblockall)
    app.route('/openorcloseblud').post(BludController.openorcloseall)
    app.route('/deleteblud/:id').get(BludController.deleteblud)

    //===================================================================================================

     // Pegawai =============================================================================================

     app.route('/getpegawai').get(PegawaiController.getpegawai)
     app.route('/createpegawai').post(PegawaiController.createpegawai)
     app.route('/updatepegawai').post(PegawaiController.updatepegawai)
     app.route('/getpegawaibyid/:id').get(PegawaiController.getpegawaiid)
     app.route('/deletepegawai/:id').get(PegawaiController.deletepegawai)

     //======================================================================================================

    // PAGU =============================================================================================

    app.route('/createpagu').post(PaguController.createpagu)
    app.route('/pagubyid/:id').get(PaguController.getpaguid)
    app.route('/deletepagu/:id').get(PaguController.deletepagu)

    app.route('/gettotalpagu').get(PaguController.gettotalpagu)
    app.route('/createtotalpagu').post(PaguController.createtotalpagu)
    app.route('/updatetotalpagu').post(PaguController.updatetotalpagu)
    app.route('/totalpagubyid/:id').get(PaguController.gettotalpaguid)
    app.route('/deletetotalpagu/:id').get(PaguController.deletetotalpagu)

    //===================================================================================================

    // Program dan Kegiatan ============================================================================
    app.route('/getprogram').get(ProgramkegiatanController.getprogram)
    app.route('/createprogram').post(ProgramkegiatanController.createprogram)
    app.route('/updateprogram').post(ProgramkegiatanController.updateprogram)
    app.route('/programbyid/:id').get(ProgramkegiatanController.getprogramid)
    app.route('/deleteprogram/:id').get(ProgramkegiatanController.deleteprogram)

    app.route('/createkegiatan').post(ProgramkegiatanController.createkegiatan)
    app.route('/kegiatanbyprogram/:id').get(ProgramkegiatanController.getkegiatanprogram)
    app.route('/deletekegiatan/:id').get(ProgramkegiatanController.deletekegiatan)

    //==================================================================================================

    // Anggaran =========================================================================================

    app.route('/createanggaran').post(AnggaranController.createanggaran)
    app.route('/createrinciananggaran').post(AnggaranController.createrinciananggaran)
    app.route('/udpaterinciananggaran').post(AnggaranController.updaterinciananggaran)
    app.route('/getanggaranbyblud').post(AnggaranController.getanggaranbyblud)
    app.route('/getrinciananggaranbyblud').post(AnggaranController.getrinciananggaranbyblud)
    app.route('/getrinciananggaranbyid').post(AnggaranController.getrinciananggaranbyid)
    app.route('/deleteanggaran/:id').get(AnggaranController.deleteanggaran)
    app.route('/deleteanggaran2').post(AnggaranController.deleteanggaran2)

    app.route('/createprogramanggaran').post(AnggaranController.createprogramanggaran)
    app.route('/getprogramanggaranbyblud').post(AnggaranController.getprogramanggaranbyblud)
    app.route('/datastoprint').post(AnggaranController.datatoprint)
    app.route('/getrinciananggaranbypar').post(AnggaranController.getrinciananggaranbypar)
    app.route('/deleteanggaranbyprogram').post(AnggaranController.deleteanggaranbyprogram)

    //===================================================================================================

    // Administrator=============================================================================
    app.route('/createadmin').post(AdminController.createadmin)
    app.route('/getadmin').get(AdminController.getadmin)
    app.route('/deleteadmin/:id').get(AdminController.deleteadmin)
    //===========================================================================================

    // koderekening =================================================================================

    app.route('/getkoderekening').get(KoderekeningController.getkoderekening)
    app.route('/createkoderekening').post(KoderekeningController.createkoderekening)
    app.route('/updatekoderekening').post(KoderekeningController.updatekoderekening)
    app.route('/getkoderekeningbyid/:id').get(KoderekeningController.getkoderekeningid)
    app.route('/deletekoderekening/:id').get(KoderekeningController.deletekoderekening)

    app.route('/getkoderekeningakun').post(KoderekeningController.getkoderekeningwhere)

    app.route('/getreferensi').get(KoderekeningController.getreferesni)
    app.route('/createreferensi').post(KoderekeningController.createreferensi)
    app.route('/updatereferensi').post(KoderekeningController.updatereferensi)
    app.route('/getreferensibyid/:id').get(KoderekeningController.getreferensiid)
    app.route('/deletereferensi/:id').get(KoderekeningController.deletereferensi)

    app.route('/getkodebyjenis/:jenis').get(KoderekeningController.getkodebyjenis)


    //=====================================================================================================

    // Atrribute ==========================================================================================

    app.route('/getprovinsi').get(AttributeController.getprovinsi)
    app.route('/getkabkota/:id').get(AttributeController.getkabkota)
    app.route('/createattr').post(AttributeController.createattr)
    app.route('/getattrbyjenis/:jenis').get(AttributeController.getattrbyjenis)
    app.route('/deleteattr/:id').get(AttributeController.deleteattr)

    //=====================================================================================================

    // SPPD ===============================================================================================

    app.route('/getsppd').get(SppdController.getsppd)
    app.route('/createsppd').post(SppdController.createsppd)
    app.route('/updatesppd').post(SppdController.updatesppd)
    app.route('/getsppdbyid/:id').get(SppdController.getsppdid)
    app.route('/deletesppd/:id').get(SppdController.deletesppd)

    app.route('/createpengikut').post(SppdController.createpengikut)
    app.route('/getpengikutid/:id').get(SppdController.getpengikutid)
    app.route('/deletepengikut/:id').get(SppdController.deletepengikut)

    app.route('/getsppdbyidforprint/:id').get(SppdController.getsppdidforprint)

    app.route('/createanggaran').post(SppdController.createanggaran)
    app.route('/getanggaranbyid/:id').get(SppdController.getanggaranbyid)
    app.route('/deleteanggaran/:id').get(SppdController.deleteanggaran)


    // ====================================================================================================

    // Surat Tugas ===============================================================================================

    app.route('/getsurattugas').get(SurattugasController.getsurattugas)
    app.route('/createsurattugas').post(SurattugasController.createsurattugas)
    app.route('/updatesurattugas').post(SurattugasController.updatesurattugas)
    app.route('/getsurattugasbyid/:id').get(SurattugasController.getsurattugasid)
    app.route('/deletesurattugas/:id').get(SurattugasController.deletesurattugas)

    app.route('/surattugasbydate').post(SurattugasController.carisurattugasbydate)
    app.route('/surattugasbynomor').post(SurattugasController.carisurattugasbynomorsurat)

    app.route('/createpelaksana').post(SurattugasController.createpelaksana)
    app.route('/getpelaksanaid/:id').get(SurattugasController.getpelaksanaid)
    app.route('/deletepelaksana/:id').get(SurattugasController.deletepelaksana)

    app.route('/getsurattugasbyidforprint/:id').get(SurattugasController.getsurattugasidforprint)

    app.route('/generatesppd/:id').get(SurattugasController.generatesppd)


// ====================================================================================================

}