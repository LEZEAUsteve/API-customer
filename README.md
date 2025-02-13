# API Customers - Documentation

## 📌 Description
API Customers est une application Node.js avec Express.js, MongoDB et RabbitMQ, conçue pour gérer des clients, avec une implémentation des tests Jest et un monitoring via Prometheus et Grafana.

## 🚀 Installation & Démarrage

### **1️⃣ Prérequis**
- **Node.js** (v18+ recommandé)
- **Docker & Docker Compose** (pour RabbitMQ, MongoDB, Prometheus, Grafana)
- **npm ou yarn**

### **2️⃣ Cloner le dépôt**
```bash
git clone https://github.com/LEZEAUsteve/API-customer
```

### **3️⃣ Configuration**
Créer un fichier `.env` à la racine et ajouter :
```ini
PORT=
MONGO_URI=
RABBITMQ_URL=
JWT_SECRET=
DEFAULT_ACCESS_TOKEN=
```

### **4️⃣ Installer les dépendances**
```bash
npm install  # ou yarn install
```

### **5️⃣ Lancer les services Docker (MongoDB, RabbitMQ, Prometheus, Grafana)**
```bash
docker-compose up -d
```

### **6️⃣ Démarrer l’API en développement**
```bash
npm run dev  # ou yarn dev
```

## 🧪 Tests
Exécuter les tests avec Jest :
```bash
npm test  # ou yarn test
```

## 📊 Monitoring avec Prometheus & Grafana
- 📡 **Prometheus** : [http://localhost:9090](http://localhost:9090)
- 📊 **Grafana** : [http://localhost:3000](http://localhost:3000)
    - Identifiants par défaut : `admin / admin`

## 📖 Endpoints de l’API
| Méthode | Endpoint | Description |
|---------|---------|-------------|
| **GET** | `/api/customers` | Récupère tous les clients |
| **POST** | `/api/customers` | Crée un client |
| **GET** | `/api/customers/:id` | Récupère un client par ID |
| **PUT** | `/api/customers/:id` | Met à jour un client |
| **DELETE** | `/api/customers/:id` | Supprime un client |

## 🛠️ Technologies utilisées
- **Node.js / Express.js** (API Backend)
- **MongoDB** (Base de données)
- **RabbitMQ** (Message Broker)
- **Prometheus / Grafana** (Monitoring)
- **Jest** (Tests unitaires et d’intégration)
- **Docker** (Conteneurisation)
