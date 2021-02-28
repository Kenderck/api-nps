import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Survey } from "./Survey";
import { User } from "./User";
//ir no tsconfig.json e ativar os 
//"strictPropertyInitialization": false -- "experimentalDecorators": true -- "emitDecoratorMetadata": true
//adicionar o yarn add uuid para nós criarmos o id no proprio código.
//yarn add @types/uuid -D

@Entity("surveys_users")
class SurveyUser{

    //define como chave primaria
    @PrimaryColumn()
    readonly id:string;

    //apenas uma coluna. PS: se o nome da coluna do BD for igual ao atributo daqui não precisa colocar @Column("name")
    @Column()
    user_id:string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User

    @Column()
    survey_id:string;

    @ManyToOne(() => Survey)
    @JoinColumn({ name: "survey_id"})
    survey: Survey

    @Column()
    value:Number;

    @CreateDateColumn()
    created_at:Date;


    constructor(){
        if(!this.id){//se não existir
            this.id = uuid();
        }
    }
}

export{SurveyUser}