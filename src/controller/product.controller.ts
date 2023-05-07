import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Product} from "../entity/product.entity";
// import {client} from "../index";

export const Products = async (req: Request, res: Response) => {
    res.send(await getRepository(Product).find());
}

export const CreateProduct = async (req: Request, res: Response) => {
    res.status(201).send(await getRepository(Product).save(req.body));
}

export const GetProduct = async (req: Request, res: Response) => {
    res.send(await getRepository(Product).findOne(({where: {id: parseInt(req.params.id, 10)}})));
}

export const UpdateProduct = async (req: Request, res: Response) => {
    const repository = getRepository(Product);

    await repository.update(req.params.id, req.body);

    res.status(202).send(await repository.findOne({where: {id: parseInt(req.params.id, 10)}}));
    
}

export const DeleteProduct = async (req: Request, res: Response) => {
    await getRepository(Product).delete(req.params.id);

    res.status(204).send(null);
}