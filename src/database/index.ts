import {Connection, createConnection, getConnectionOptions} from 'typeorm' 

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions(); // para pegar todas as informações do ormconfir.json
    
    return createConnection( 
        //pega o objeto e troca as informações do database
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === "test" ? "./src/database/database.test.sqlite" : defaultOptions.database, 
        })
    );
}