import express, { Router } from "express";
import {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from "../controllers/customerController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API de gestion des clients
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Récupérer tous les clients
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Liste des clients retournée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", getCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Récupérer un client par son ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du client à récupérer
 *     responses:
 *       200:
 *         description: Client trouvé
 *       404:
 *         description: Client non trouvé
 */
router.get("/:id", getCustomerById);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Ajouter un nouveau client
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé (JWT manquant ou invalide)
 */
router.post("/", authMiddleware, createCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Modifier un client existant
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du client à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client mis à jour avec succès
 *       404:
 *         description: Client non trouvé
 *       401:
 *         description: Non autorisé (JWT manquant ou invalide)
 */
router.put("/:id", authMiddleware, updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Supprimer un client
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du client à supprimer
 *     responses:
 *       200:
 *         description: Client supprimé avec succès
 *       404:
 *         description: Client non trouvé
 *       401:
 *         description: Non autorisé (JWT manquant ou invalide)
 */
router.delete("/:id", authMiddleware, deleteCustomer);

export default router;