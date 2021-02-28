import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User"

//extender do RepositoryORM e a entidade que será utilizada
@EntityRepository(User)
class UsersRepository extends Repository<User>  {

    
}

export { UsersRepository}