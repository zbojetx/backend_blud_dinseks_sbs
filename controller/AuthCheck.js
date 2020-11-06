'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const query = require('./../conf/conf');
const jwt = require('jsonwebtoken')

exports.authcheck = (req, res, next) => {

    const authHeader = req.header['authorization']
    const token = authHeader && authHeader.split(' ')
    if(token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.APP_SECRET_TOKEN, (err, userAccess) => {
        if(err) return res.sendStatus(403)
        req.userAccess = userAccess
        next()
    })

}
