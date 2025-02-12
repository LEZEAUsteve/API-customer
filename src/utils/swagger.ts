import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
import customerRoutes from "../routes/customerRoutes";
import dotenv from "dotenv";

dotenv.config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Customers",
            version: "1.0.0",
            description: "Documentation API pour la gestion des clients",
        },
        servers: [
            {
                url: process.env.BACK_API_URL,
            },
        ],
    },
    apis: ["./src/routes/customerRoutes.ts"]
};

const swaggerDocs = swaggerJsDoc(options);
export default swaggerDocs;