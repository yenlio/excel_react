const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        let url=path.join(__dirname,'..','..','public')
        cb(null,url)
    },
    filename:(req,file,cb)=>{
        let fileName=file.originalname.split(' ').join('-')
        cb(null,fileName)
    }
})

module.exports=multer({storage:storage})
