const sequelize = require('sequelize');
const db = require('./db');

const Creator = db.define('creators', {
    name: {
        type: sequelize.STRING,
        required: true
    },
    avatar: {
        type: sequelize.STRING,
        required: true,
    },
    channelUrl: {
        type: sequelize.STRING,
        required: true
    }
})

exports.Creator = Creator;