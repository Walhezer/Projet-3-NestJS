# ChâTop - Backend API

Ce projet constitue l'API backend de l'application de location immobilière **ChâTop**, développée avec NestJS.

## Technologies utilisées

* **Framework :** [NestJS](https://nestjs.com/)
* **ORM :** [Prisma](https://www.prisma.io/)
* **Base de données :** MySQL
* **Authentification :** JWT (JSON Web Token)
* **Upload de fichiers :** Multer
* **Documentation :** Swagger

## Prérequis

* [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
* Un serveur de base de données MySQL local ou distant

## Installation

1. Clonez le dépôt et placez-vous dans le dossier du backend :

```bash
git clone <lien-de-votre-repo-github>
cd backend
```

2. Installez les dépendances du projet :

```bash
npm install
```

## Configuration de la base de données

1. **Préparation du serveur MySQL :**
   Assurez-vous d'avoir un serveur MySQL local actif. Avant de connecter l'API, créez la base de données et un utilisateur restreint dédié en exécutant ce script SQL (par exemple via DBeaver ou phpMyAdmin) :
   ```sql
   CREATE DATABASE chatop_db;
   CREATE USER 'chatop_master'@'localhost' IDENTIFIED WITH mysql_native_password BY 'votre_mot_de_passe';
   GRANT ALL PRIVILEGES ON chatop_db.* TO 'chatop_master'@'localhost';
   FLUSH PRIVILEGES;

2. Créez un fichier `.env` à la racine du dossier `backend` et configurez vos variables d'environnement. Exemple :

```env
# URL de connexion à votre base de données MySQL
DATABASE_URL="mysql://chatop_master:votre_mot_de_passe@localhost:3306/chatop_db"

# Clé secrète pour le chiffrement des tokens JWT (à modifier en production)
JWT_SECRET="votre_cle_secrete_ultra_securisee"

# Port d'écoute du serveur
PORT=3001
```

3. Générez le client Prisma et appliquez le schéma à votre base de données :

```bash
npx prisma generate
npx prisma db push
```

## Lancement du projet

Pour démarrer le serveur d'API en mode développement :

```bash
npm run start:dev
```

L'API est alors active et écoute les requêtes sur `http://localhost:3001/api`.

## Documentation Swagger

L'ensemble des routes de l'API est documenté via Swagger. Cette interface permet de consulter les formats de requêtes attendus et de tester les points de terminaison.

Une fois le serveur lancé, la documentation est accessible à l'adresse suivante :

👉 [http://localhost:3001/api/docs](http://localhost:3001/api/docs)