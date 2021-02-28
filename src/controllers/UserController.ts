//importar o request e response do express para serem definidos nos metodos
//ALT SHIFT O para organizar os imports
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from "yup";
import { AppError } from '../errors/AppError';

class UserController{

    async create(request:Request , response:Response){
        const {name, email} = request.body;

        //criação de validações.
        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email().required("Email incorreto")
        });

        //tratamento das validações.
       try {
        await schema.validate(request.body, {abortEarly: false}) 
       } catch (error) {
        throw new AppError( error);
       }

        //para cada entidade terá um repositorio diferente, que gerenciará o conteudo com o bd
        const usersRepository = getCustomRepository(UsersRepository);

        //select * from users where email = email
        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        
        if(userAlreadyExists){
            throw new AppError( "User already exist");
        }
        const user = usersRepository.create({
            name, email
        });

        //criar pra depois salvar
        await usersRepository.save(user);
        response.status(201).json(user)
    }

    async showUsers(request: Request, response: Response){
        const usersRepository = getCustomRepository(UsersRepository);

        const allUsers = await usersRepository.find();

        return response.status(200).json(allUsers);
    }
}

export { UserController };
