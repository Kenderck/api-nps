import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";


//extender do RepositoryORM e a entidade que será utilizada
@EntityRepository(SurveyUser)
class SurveysUserRepository extends Repository<SurveyUser>{

} 

export{ SurveysUserRepository }