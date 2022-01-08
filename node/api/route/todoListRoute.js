var express = require('express')
var routes = express.Router()

const listRoutes = require('../controller/todoListController')
const middlewareFile = require('../middleware/middleware')


routes.route('/excel')
    .post(listRoutes.addExcel)
    .get(listRoutes.getExcel)
 

routes.route('/excel/:id')

    .put(listRoutes.updateExcel)
    .delete(listRoutes.deleteExcel)

routes.route('/excel/upload')
    .post(middlewareFile.single('upload'), listRoutes.uploadExcel)


routes.route('/excel/exportExcel')
    .get(listRoutes.exportExcel)

module.exports = routes


 