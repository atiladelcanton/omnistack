const multer = require('multer');
const path = require('path');
const path_resolve = path.resolve(__dirname,'..','..','tmp');
const crypto = require('crypto'); // Modulo utilizado para criptografias geração de hash
module.exports = {
    dest: path_resolve,
    storage:multer.diskStorage({
        destination: (req,file,cb) =>{
            cb(null,path_resolve)
        },
        filename: (req,file,cb) =>{
            //Função resposável por gerar o hash do nome da imagem que será utilizado no upload
            crypto.randomBytes(20,(err,hash)=>{
                if (err) cb(err); // Caso de algum erro ao gerar o hash

                //Crio uma nova propriedade dentro do meu file chamado key que contem o hash
                // ex: 3829fjdf-nome-file.ext
                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null,file.key);
            })
        }
    })
}