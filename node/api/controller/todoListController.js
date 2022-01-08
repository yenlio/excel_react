const Task = require('../model/taskExcel')
const xlsx = require('xlsx')
const path = require('path')


exports.getExcel = async function (req, res) {
    try {
        let activePage=parseInt(req.query.activePage)
        let limit=parseInt(req.query.limit)
        let skip=(activePage-1)*limit
        let pagination=await Task.find().skip(skip).limit(limit)
        let allData=await Task.countDocuments()
        let totalPage=Math.ceil(allData/limit)
        res.send({
            pagination,
            totalPage,
            allData
        })

      
    } catch (error) {
        res.send({ message: error.message })

    }

}

exports.addExcel = async function (req, res) {
    try {
        let data=req.body
        let newData=new Task(data)
        const result=await newData.save()
        res.send({result})
      
    } catch (error) {
        res.send({ message: error.message })

    }

}

exports.deleteExcel = async function (req, res) {
    try {
        let id=req.params.id
        let result=await Task.findByIdAndDelete(id)
        res.send({message:"thanh cong"})
      
    } catch (error) {
        res.send({ message: error.message })

    }

}

exports.updateExcel = async function (req, res) {
    try { let id=req.params.id
        let data=req.body
        let result=await Task.findByIdAndUpdate(id,data)
        res.send({result})
        
    } catch (error) {
        res.send({ message: error.message })

    }

}

exports.uploadExcel = async function (req, res) {
    try {
              let file = req.file
                let workBook = xlsx.readFile(file.path, { types: "buffer" })
                console.log(workBook,"ưbbbbbb");
                let sheet_name_list = workBook.SheetNames //goi toi trang tinh dau tien
        
                var xlData = xlsx.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]])
        
                const result = await Task.insertMany(xlData)
                res.send({ result })


    } catch (error) {
        res.send({
            message: error.message
        })

    }
}


exports.exportExcel = async function (req, res) {
    try {
        const result = await Task.find({}, { _id: 0, __v: 0 })
        res.send({
            result
        })


    } catch (error) {
        res.send({
            message: error.message
        })

    }
}

