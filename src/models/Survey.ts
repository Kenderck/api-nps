import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid"
//ir no tsconfig.json e ativar os 
//"strictPropertyInitialization": false -- "experimentalDecorators": true -- "emitDecoratorMetadata": true
//adicionar o yarn add uuid para nós criarmos o id no proprio código.
//yarn add @types/uuid -D

@Entity("surveys")
class Survey{

    //define como chave primaria
    @PrimaryColumn()
    readonly id:string;

    //apenas uma coluna. PS: se o nome da coluna do BD for igual ao atributo daqui não precisa colocar @Column("name")
    @Column()
    title:string;

    @Column()
    description:string;

    @CreateDateColumn()
    created_at:Date

    constructor(){
        if(!this.id){//se não existir
            this.id = uuid();
        }
    }
}

export{Survey}