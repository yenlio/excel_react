var mongoose=require('mongoose')
var{Schema,model}=mongoose

var excelList=new Schema({
    id:String,
    name:String,
    gender:String
})
module.exports=model("tableExcel",excelList)



