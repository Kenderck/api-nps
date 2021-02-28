import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUserRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path"
import { AppError } from "../errors/AppError";

class SendMailController{

    async execute(request: Request, response: Response){
        const {email, survey_id} = request.body;

        //repositorios para guardar no BD
        const usersRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUserRepository);

        //verificar se já existe o usuario no BD. PS: tem que existir, para mandar o email
        const userAlreadyExists = await usersRepository.findOne({email});

        //condição para não existencia do usuario, retorna erro
        if(!userAlreadyExists){
            throw new AppError( "User doesn't exist");
        }
        
        //SELECT * FROM SURVEY WHERE ID = SURVEY_ID
        //verificar se já existe uma pesquisa pelo id que foi passado no body da request
        const survey = await surveyRepository.findOne({id: survey_id})

        //condição para não existencia da pesquisa, retorna erro.
        if(!survey){
            throw new AppError( "Survey doesn't exist");
        }

        //verifica se já existe uma pesquisa relaciona com o usuario.
        //ps where: [{user_id: useralreadyexist}, {value: null}] = OR
        // where: {user_id: userAlreadyExists.id, value: null} = AND
        const surveyUserAlreadyExits = await surveysUsersRepository.findOne({
            where: {user_id: userAlreadyExists.id, value: null},
            relations: [ "user", "survey"],
        });

        //cria um caminho para o arquivo de html e css
        const nspPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        //cria as variaveis que serão passadas para o MailService
        //id como string vazia para ser sobrescrita conforme as condições seguintes 
        const variables = {
            name: userAlreadyExists.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        //verifica se já existe um usuario relacionado com uma pesquisa.
        //se sim irá ser reenviada a mesma pesquisa, não criando outra.
        //se a reção já existe, o id será o id dessa relação
        if(surveyUserAlreadyExits){
            variables.id = surveyUserAlreadyExits.id;
            await SendMailService.execute(email, survey.title, variables, nspPath);
            return response.json(surveyUserAlreadyExits);
        }

        //Salvar as informações na tabela surveyUser
        //survey_id já está sendo passada pelo body, não precisa de referencia
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })
       
        //salva de fato, o usuario e pesquisa na SurveyUSers
        await surveysUsersRepository.save(surveyUser);

        //se a relação não existir, ou seja, se for uma pesquisa nova, ai o id terá um novo valor.
        variables.id = surveyUser.id;
        //Envia dados para o MailService.
        await SendMailService.execute(email, survey.title, variables, nspPath);
        return response.json(surveyUser);
    }   
}

export{ SendMailController}