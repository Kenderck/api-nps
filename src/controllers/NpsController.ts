import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUserRepository } from "../repositories/SurveysUsersRepository";

/**
 * DETRATORES => 0 - 6
 * PASSIVOS => 7 - 8
 * PROMOTORES => 9 - 10
 * 
 * ((NUMERO DE PROMOTORES - NUMEROS DE DETRATORES) / NUMERO DE RESPONDENTES) * 100
 */

class NpsController{

    async execute(request: Request, response: Response){

        const {survey_id} = request.params; //passando a pesquisa que será manuseada

        const surveyUserRepository = getCustomRepository(SurveysUserRepository);

        const surveyUsers = await surveyUserRepository.find({
            survey_id,
            value: Not(IsNull()),
        });

        const detractor = surveyUsers.filter(survey => 
            survey.value >= 0 && survey.value <= 6).length;

        const promoters = surveyUsers.filter(survey => 
            survey.value >=9 && survey.value <= 10).length;

        const passivos = surveyUsers.filter(survey => 
            survey.value >=7 && survey.value <= 8).length;

        const totalAnswers = surveyUsers.length;

        const calculate = Number( 
            (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
        );

        return response.json({
            detractor,
            promoters,
            passivos,
            totalAnswers,
            nps: calculate
        })


    }
}

export { NpsController };
