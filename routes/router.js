const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
//ficheiros
const multer = require("multer");
//datas
const moment = require("moment");
const { max } = require("moment");

// img storage confing
var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        //funcao callback para direcionar o caminho da pasta das imagens
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        //imagem fica com a data atual
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
});

// img filter --> verifica se é imagem 
//NAO ESTA A PASSAR ZIP E PDF PARA A BD QUANDO INTRODUZIMOS ATRAVES DE UMA PASTA NO AMBIENTE DE TRABALHO 'pdfs'
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image") && file.mimetype === 'application/pdf' && file.mimetype === 'application/zip') {
        callback(null, true)
    } else {
        callback(null, Error("only image, zip and pdf are allowd"))
    }
}

//faz o upload da imagem
var upload = multer({
    storage: imgconfig,
    fileFilter: isImage
})  //.array()

// register userdata --> upload de uma imagem unica se quisermos podemos fazer upload.array e vamos buscar um array de imagens
router.post("/register", upload.single("photo"), (req, res) => {
    //insercao de dados no registo ao clicar em "add user"
    const { fname } = req.body;
    const { filename } = req.file;

    //verificacao para preencher todos os campos
    if (!fname || !filename) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }

    try {
        //formato da data
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        //insere na BD
        conn.query("INSERT INTO usersdata SET ?", { username: fname, userimg: filename, date: date }, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data added")
                res.status(201).json({ status: 201, data: req.body })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});

router.post("/login", upload.single("photo"), (req, res) => {
    //insercao de dados no registo ao clicar em "add user"
    const { fname } = req.body;
    const { filename } = req.file;

    //verificacao para preencher todos os campos
    if (!fname || !filename) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }

    try {
        //formato da data
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        //insere na BD
        conn.query("INSERT INTO usersdata SET ?", { username: fname, userimg: filename, date: date }, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data added")
                res.status(201).json({ status: 201, data: req.body })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});

// get user data
router.get("/getdata", (req, res) => {
    try {
        conn.query("SELECT * FROM usersdata", (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data get")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});

// delete user
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    try {
        conn.query(`DELETE FROM usersdata WHERE id ='${id}'`, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data delete")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})

module.exports = router;