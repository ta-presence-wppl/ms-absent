const { Op, Model, QueryTypes, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_CONN);
const initModels = require('../models/init-models');
var models = initModels(sequelize);

class AbsentControllers {
    checkAbsentIn(data) {
        return models.presensi.findOne({
            attributes: {
                include: ['id_peg']
            },
            where: {
                id_peg: data.id_peg,
                tanggal: '',
                jam_msk: ''
            },
        })
    }

    createAbsentIn(data) {
        return models.presensi.create({
            ...data
        })
    }
}

module.exports = AbsentControllers;