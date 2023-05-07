import { Request, Response } from "express";
import {getRepository,getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import {AppDataSource} from "../../app-data-source"

export const Register = async (req: Request, res: Response) => {
    const { password, password_confirm, ...body } = req.body
    if (password !== password_confirm) {
        return res.status(400).send({
            message: "Password dn't match!"
        })
    }
    const user = await getRepository(User).save({
        ...body,
        password: await bcryptjs.hash(password, 10),
        is_ambassador: false
        // password_confirm": "aa"
    })
    res.send(user)
}

export const Login = async (req: Request, res: Response) => {
    const options = { where: { email: req.body.email }, select: ["id", "password"] } as any;
    const user = await getRepository(User).findOne(options);

    // const user = await getRepository(User).findOne({email: req.body.email});
    //     {
    //     select: ["id", "password", "is_ambassador"]
    // }
    // );
    if (!user) {
        return res.status(400).send({
            message: 'invalid credentials!'
        });
    }

    if (!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials!'
        });
    }

    // const adminLogin = req.path === '/api/admin/login';

    // if (user.is_ambassador && adminLogin) {
    //     return res.status(401).send({
    //         message: 'unauthorized'
    //     });
    // }

    const token = sign({
        id: user.id,
        // scope: adminLogin ? "admin" : "ambassador"
    }, process.env.SECRET_KEY);

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000//1 day
    })

    res.send({
        message: 'success'
    });
}



export const AuthenticatedUser = async (req: Request, res: Response) => {
   res.send(req["user"])
}


export const Logout = async (req: Request, res: Response) => {
    res.cookie("jwt", "", { maxAge: 0 });

    res.send({
        message: 'success'
    });
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req["user"];


    // const repository = AppDataSource.getRepository(User);

    // await repository.update(user.id, req.body);

    // res.send(await repository.findOne(user.id));

    const userRepository = getRepository(User);
    const userId = user.id;
    
    const repo = await userRepository.findOne({ where: { id: userId } });
    
    if (repo) {
        repo.first_name = req.body.first_name;
        repo.last_name = req.body.last_name;
        repo.email = req.body.email
        await userRepository.save(repo);
    }

    console.log(repo);
    res.send(await userRepository.findOne({ where: { id: userId } }))
}

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req["user"];

    if (req.body.password !== req.body.password_confirm) {
        return res.status(400).send({
            message: "Password's do not match!"
        })
    }

    await getRepository(User).update(user.id, {
        password: await bcryptjs.hash(req.body.password, 10)
    });

    res.send(user);
}