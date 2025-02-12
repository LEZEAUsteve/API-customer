import { Request, Response } from "express";
import Customer from "../models/customerModel";
import { publishToQueue } from "../utils/rabbitmq";

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            res.status(404).json({ message: "Client non trouvé" });
            return;
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
    const bcrypt = require('bcrypt');
    try {
        const newCustomer = new Customer(req.body);
        newCustomer.password = await bcrypt.hash(newCustomer.password, 10);
        await newCustomer.save();

        await publishToQueue("customer_created", JSON.stringify(newCustomer));

        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) {
            res.status(404).json({ message: "Client non trouvé" });
            return;
        }

        await publishToQueue("customer_updated", JSON.stringify(updatedCustomer));

        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            res.status(404).json({ message: "Client non trouvé" });
            return;
        }

        await publishToQueue("customer_deleted", JSON.stringify(deletedCustomer));

        res.json({ message: "Client supprimé" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};