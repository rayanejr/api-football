
# Project de gestion de clubs de football

Ce projet est une API permettant de gérer une collection de clubs de football. L'API permet de créer, lire, mettre à jour et supprimer des clubs, ainsi que de les filtrer par pays, id ou par leurs nom.


## Prérequis

 - Node.js
 - Express.js
 - MongoDB
 - JavaScript
 


## Installation

1. Clonez le projet à l'aide de la commande suivante :

```bash
 git clone https://github.com/ldandoy/b2-2023.git
```
    
2. Installez les dépendances en exécutant la commande suivante dans le terminal :

```bash
npm install
```

3. Exécutez le projet à l'aide de la commande suivante :

```bash
npm run dev
```

4. Ouvrez l'application dans votre navigateur à l'adresse :

```bash 
http://localhost:5663
```

## Utilisation

 - Renvoie tous les clubs de football :
 ```bash
 GET /api/club/
 ```
 
 -  Renvoie le club correspondant à l'ID donné :
 ```bash
 GET /api/club/id/:id 
  ```

- Renvoie tous les clubs de football en France :
 ```bash
 GET /api/club/nation/france
 ```

-  Renvoie le club qui a gagné le plus de trophes dans le pays saisie par l'utilisateur :
 ```bash
 GET /api/club/trophee-max/:country
  ```

- Renvoie tous les clubs correspondant au pays donné :
```bash
GET /api/club/country/:country 
 ```

- Renvoie tous les clubs français :
```bash
GET /api/club/nation/france
 ```
-  Renvoie le club correspondant au nom donné :
```bash
GET /api/club/name/:name 
```

- Met à jour le club correspondant à l'ID donné :
```bash
PUT /api/club/id/:id 
```

- Met à jour le club correspondant au nom d'équipe donné :
```bash
PUT /api/club/name/:name 
```

- Supprime le club correspondant au nom d'équipe donné :
```bash
DELETE /api/club/name/:name
```

- Supprime le club correspondant à l'ID donné :
```bash
DELETE /api/club/id/:id 
```

- Crée un nouveau club :
```bash
POST /api/club
```

- Les routes DELETE et PUT nécessitent une authentification. Pour se connecter, envoyez une requête POST à /api/auth/login avec les identifiants suivants : { email: 'admin', password: 'admin' }. 


## 🔗 Auteur

- [Rayane JERBI](https://www.linkedin.com/in/rayane-jerbi/)
