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

    //Dashboard ====================================================================

    app.route('/dashboard').get(DashboardController.index)
    app.route('/reportperyear').get(DashboardController.groupbymonth)

    //===========================================================

    // Instansi ===========================================================================================
    app.route('/login').post(AuthController.login)
    app.route('/instansi').get(InstansiController.instansi)
    app.route('/updateinstansi').post(InstansiController.updateinstansi)

     //=====================================================================================================

    //Auth - Sign Up - Daftar  ============================================================================

    app.route('/createinstansi').post(AuthController.createinstansi)
    app.route('/updateinstansi').post(AuthController.updateinstansi)

    // ====================================================================================================

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