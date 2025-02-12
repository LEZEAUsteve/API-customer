import { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer } from "../controllers/customerController";
import Customer from "../models/customerModel";
import { Request, Response } from "express";
import { publishToQueue } from "../utils/rabbitmq";

jest.mock("../models/customerModel");
jest.mock("../utils/rabbitmq");

describe("Customer Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = {
            json: jsonMock,
            status: statusMock,
        };
    });

    it("Devrait retourner une erreur 500 si `getCustomers` échoue", async () => {
        (Customer.find as jest.Mock).mockRejectedValue(new Error("Erreur MongoDB"));
        await getCustomers(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(500);
    });

    it(" Devrait retourner une erreur 404 si `getCustomerById` ne trouve rien", async () => {
        req = { params: { id: "12345" } };
        (Customer.findById as jest.Mock).mockResolvedValue(null);

        await getCustomerById(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    it(" Devrait retourner une erreur 500 si `createCustomer` échoue", async () => {
        req = { body: { name: "Client Test", price: 100 } };
        (Customer.prototype.save as jest.Mock).mockRejectedValue(new Error("Erreur MongoDB"));

        await createCustomer(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
    });

    it("Devrait retourner une erreur 500 si `updateCustomer` échoue", async () => {
        req = { params: { id: "12345" }, body: { name: "Client Modifié" } };
        (Customer.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error("Erreur MongoDB"));

        await updateCustomer(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
    });

    it("Devrait retourner une erreur 404 si `deleteCustomer` ne trouve rien", async () => {
        req = { params: { id: "12345" } };
        (Customer.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

        await deleteCustomer(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});