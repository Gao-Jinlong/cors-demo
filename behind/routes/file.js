var router = require("express").Router()
var multer = require("multer")
var fs = require("fs")
var path = require("path")

const storage = multer.memoryStorage()
const upload = multer({ storage })

const saveFile = (file) => {
  const fileName = file.originalname
  const uploadDirectory = path.join(__dirname, "uploads")
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory)
  }
  console.log("name", file.originalname)
  fs.writeFileSync(path.join(uploadDirectory, fileName), file.buffer)
}
router.post("/uploadExcel", upload.any(), (req, res) => {
  try {
    const file = req.files[0]
    console.log(file)

    saveFile(file)
    // 接受 excel
    res.status(200).json({ message: "Excel文件上传成功" })
  } catch (e) {
    console.error("上传文件失败", e)
    res.status(500).json({ message: "Excel文件上传失败" })
  }
})

module.exports = router
