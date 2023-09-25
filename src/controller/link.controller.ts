import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Link } from "../entity/link.entity";
import { User } from "../entity/user.entity"; // Import the User entity

export const Links = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id)
    
    const userRepository = getRepository(User); 
    const user = await userRepository.findOne({
        where: { id: userId }
    }); 

    if (!user) {
        return res.status(404).send("User not found");
    }

    const links = await getRepository(Link).find({
        where: {
            user: user 
        },
        relations: ['orders', 'orders.order_items']
    });

    res.send(links);
}
