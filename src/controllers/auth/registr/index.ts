import { Request, Response } from "express"
import { userModel } from "@/db/users";


const registr = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;
        
        const newUser = new userModel({
            email,
            password,
        })

        await newUser.save();

        res.send({
            newUser,
            message: 'new user created'
        });
    } catch(e) {
        console.log(e);

        const error = new Error(e as string);

        res.send(error.message)
        
    }
}

export const registrationController = {
    registr,
}
