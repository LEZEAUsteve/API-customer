import request from "supertest";
import app from "../index";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {closeRabbitMQ} from "../utils/rabbitmq";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    jest.setTimeout(5000);

    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri);
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    await closeRabbitMQ();
});

describe("Client API", () => {
    it(" Devrait retourner la liste des clients", async () => {
        const res = await request(app).get("/api/customers");
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it("Devrait créer un nouveau client", async () => {
        const customer = {
            firstname: "Client firstname",
            lastname: "Client lastname",
            email: "client@email.fr",
            password: "clientpassword"
        };

        const res = await request(app)
            .post("/api/customers")
            .set("Authorization", `Bearer ${process.env.DEFAULT_ACCESS_TOKEN}`)
            .send(customer);

        expect(res.status).toBe(201);
        expect(res.body.firstname).toBe(customer.firstname);
    });

    it("Devrait récupérer un client par ID", async () => {
        const customer = {
            firstname: "Client firstname",
            lastname: "Client lastname",
            email: "client@email.fr",
            password: "clientpassword"
        };

        const createdCustomer = await request(app)
            .post("/api/customers")
            .set("Authorization", `Bearer ${process.env.DEFAULT_ACCESS_TOKEN}`)
            .send(customer);

        const customerId = createdCustomer.body._id;

        const res = await request(app).get(`/api/customers/${customerId}`);
        expect(res.status).toBe(200);
        expect(res.body.firstname).toBe(customer.firstname);
    });

    it("Devrait mettre à jour un client", async () => {
        const customer = {
            firstname: "Client firstname",
            lastname: "Client lastname",
            email: "client@email.fr",
            password: "clientpassword"
        };

        const createdCustomer = await request(app)
            .post("/api/customers")
            .set("Authorization", `Bearer ${process.env.DEFAULT_ACCESS_TOKEN}`)
            .send(customer);

        const updatedData = { firstname: "Client Modifié", price: 120 };

        const res = await request(app)
            .put(`/api/customers/${createdCustomer.body._id}`)
            .set("Authorization", `Bearer ${process.env.DEFAULT_ACCESS_TOKEN}`)
            .send(updatedData);

        expect(res.status).toBe(200);
        expect(res.body.firstname).toBe(updatedData.firstname);
    });

    it("Devrait supprimer un client", async () => {
        const customer = {
            firstname: "Client firstname",
            lastname: "Client lastname",
            email: "client@email.fr",
            password: "clientpassword"
        };

        const createdCustomer = await request(app)
            .post("/api/customers")
            .set("Authorization", `Bearer ${process.env.DEFAULT_ACCESS_TOKEN}`)
            .send(customer);

        const res = await request(app)
            .delete(`/api/customers/${createdCustomer.body._id}`)
            .set("Authorization", `Bearer ${process.env.DEFAULT_ACCESS_TOKEN}`);

        expect(res.status).toBe(200);
    });
});