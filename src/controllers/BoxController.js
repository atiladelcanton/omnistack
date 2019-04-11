const Box = require('../models/Box');

class BoxController{
    async store(req,res) {

        const box = await Box.create({
            title:req.body.title
        });

        return res.json(box);
    }

    async show(req,res){
        /**
         * .populate (utiliza quando você quer retornar todas as informações do(s) itens relacionados)
         * path:'files'  nome do campo do sChema da BOX que fica com o objectID
         */
        const box = await Box.findById(req.params.id).populate({
            path:'files',
            options:{ sort:{createdAt: -1}}
        });

        return res.json(box);
    }
}

module.exports = new BoxController();