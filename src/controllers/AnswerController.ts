import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUserRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {

    /**
     * Route Params => Parametros que compões a rota
     * routes.get("/answers/:value")
     * 
     * Query Params => Busca, Paginação, não obrigatórios.
     * ?chave=valor
     */
    async execute(request: Request, response: Response){

        //Route Params
        const {value} = request.params;

        //Query Params
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUserRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u) 
        });

        if(!surveyUser){
            throw new AppError("SurveyUser doesn't exists!")    
        }

        surveyUser.value = Number(value);
        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);

    }
}

export { AnswerController }