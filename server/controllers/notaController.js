/**
 * Rubén Gabás Celimendiz 590738
 *
 * notaController.js
 *
 * Aquí se definen las funciones de las que harán uso los endpoints
 * encargados del recurso notas
 *
 * @type {*|exports|module.exports}
 */
var fs = require("fs"),
    formidable = require("formidable");
var notas = require("../model/notas")
var crypto = require('crypto');

module.exports = {
     showAllMemo: function(req, res, next) {
         notas.show(function (err, rows) {
             if (err) {
                 res.status(400).json({error: true, mensaje: "Algo malo sucedió"})
             } else {
                 res.status(200).json({error: false, notas: rows});
             }
         });
    },
    setMemo: function (req, res, next) {
        var form = new formidable.IncomingForm();

        form.parse(req, function(error, fields, files) {
            console.log("parsing done");
            console.log(fields.texto + " " + fields.fecha);
            //Simulamos una sesión
            /* Possible error on Windows systems:
             tried to rename to an already existing file */
            if (fields.texto != null && fields.fecha != null) {
                if (files.upload != '' && files.upload != null) {
                    //var buffer = new Buffer(getFilesizeInBytes(files));

                    //guarda en el path único el archivo, en un sistema de ficheros
                    // y esta ruta la guardamos en la BBDD
                    var path = "./files/" + crypto.createHash('md5').update("" + new Date().getTime()).digest("hex") + files.upload.name;
                    console.log(path);
                    fs.rename(files.upload.path, path, function (error) {
                        if (error) {
                            console.log("Error");
                            fs.unlink(path);
                            fs.rename(files.upload.path, path);

                        } else {
                            var nota = {};
                            nota.fecha = fields.fecha;
                            nota.texto = fields.texto;
                            nota.path = path;
                            // inserción en la BBDD con ruta del archivo en la BBDD
                            notas.insertMemo(nota, function (err, document) {
                                if (err) {
                                    res.status(400).json({error: false, message: "Algo malo sucedió"});
                                } else {
                                    res.status(200).json({error: false, nota: document});
                                }
                            })
                        }
                    });
                } else {
                    var nota = {};
                    nota.fecha = fields.fecha;
                    nota.texto = fields.texto;
                    // inserción en la BBDD sin ruta del archivo en la BBDD
                    notas.insertMemo(nota, function (err, document) {
                        if (err) {
                            res.status(400).json({error: false, message: "Algo malo sucedió"});
                        } else {
                            res.status(200).json({error: false, nota: document});
                        }
                    })
                }
            } else {
                res.status(200).json({error: true, message: "No se ha podido crear la nota"})
            }
        })
    },
    showMemo: function (req, res, next) {
        notas.showMemo(req.params.id, function (err, document) {
            if (err) {
                res.status(400).json({error: true, message: "Algo malo sucedió"})
            } else {
                if (document) {
                    res.status(200).json({error: false, nota: document})
                } else {
                    res.status(200).json({error: false, message: "La nota con el id '" + req.params.id + "' no existe."})
                }
            }
        })
    },
    deleteMemo: function (req, res, next) {
        notas.deleteMemo(req.params.id, function (err, nota) {
            if (err) {
                res.status(400).json({error: false, message: "Algo malo sucedió"});
            } else {
                if (nota.result.n == 1) {
                    res.status(200).json({error: false, message: "La nota se ha borrado correctamente"});
                } else {
                    res.status(200).json({error: false, message: "La nota con el id '" + req.params.id + "' no existe."});
                }
            }
        })
    }
}