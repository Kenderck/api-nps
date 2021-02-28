
import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";
//requisição de app como se fossemos enviar user@gmail.com e example como dados
describe("Users", () =>{
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () =>{
        const connection =  getConnection();
        await connection.dropDatabase();
        await connection.close();
     });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User example",
        })
        expect(response.status).toBe(201);
    });
    it("Shouldn't be able create a user with exist email", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User example",
        })
        expect(response.status).toBe(400);
    })
});