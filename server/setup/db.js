const fse = require('fs-extra')
const mongoose = require('mongoose'); mongoose.Promise = global.Promise

const Mentor = require('../models/mentorModel')
const Student = require('../models/studentModel')

const preSetupDB = async (logger, dbPath) => {
    logger.log('Ensuring db folder')
    
    await fse.ensureDir(dbPath)
    
    logger.log('db folder confirmed \n')
}


const setupDB = async (logger, dbUrl) => {
    logger.log('Checking db')
    
    mongoose.connect(dbUrl, { useMongoClient: true })
    
    logger.log('db ok \n')
}

module.exports = {
    prepare: preSetupDB,
    execute: setupDB,
}