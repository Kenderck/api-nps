import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

//CTRL D Para mudar mais de uma variavel com o mesmo nome
//extender do RepositoryORM e a entidade que será utilizada
@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {

}

export { SurveysRepository };
