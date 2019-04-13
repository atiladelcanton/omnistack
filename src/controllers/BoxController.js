const Box = require('../models/Box');

class BoxController{
    async store(req,res) {

        const box = await Box.create({
            title:req.body.title
        });
        req.io.sockets.in('atilarampazo_097470428').emit('box',box);
        return res.status(201).json(box);
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

    async listAll(req,res){
        const boxes = await Box.find(null,{title:1,createdAt:1}).sort({title:-1,createdAt:-1});

        return res.status(200).json(boxes);
    }
}

module.exports = new BoxController();