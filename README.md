# SyMa

Replica Vinted <br>
Full-Stack Project <br>
[SyMa côté Front](https://github.com/Projet-hotelApi/Syma-Native) <br>
Projet réalisé en collaboration avec [Sylvie](https://github.com/SophiaLys) lors du projet de fin de formation au [Reacteur](https://www.lereacteur.io/)

### _Languages_ & _Packages_

[Mongoose](https://www.npmjs.com/package/mongoose)
[Cloudinary](https://cloudinary.com/documentation/node_integration#node_js_getting_started_guide)
[Crypto-js](https://www.npmjs.com/package/crypto-js)
[Stripe](https://www.npmjs.com/package/stripe)
[uid2](https://github.com/coreh/uid2)

### - Créer un compte

#### Route en post : **/user/sign-up**

La route "/user/sign_up" permet de créer un nouvel utilisateur dans la BDD. On vérifie que l'email n'est pas déjà présent en BDD ainsi que le username et que tous les paramètres (email, username, firstName, lastName, postalCode, city, address & password via un hash et un salt) sont envoyés afin de créer un compte. <br>

Exemple de requête :

```
{
    "email" : "charlene.dupont@gmail.com",
    "username" : "Chacha",
    "firstName" : "Charlène",
    "lastName" : "Dupont",
    "postalCode" : 64000,
    "city" : "Pau",
    "address" : "7 rue Carnot",
    "password" : "Chacha"
}
```

Réponse attendue de la requête :

```
{
    "id": "5f65f9e247efd906c100c60b",
    "token": "pLyw5lBfDBGDDx1",
    "email": "charlene.dupont@gmail.com",
    "username": "Chacha"
}
```

### - Se connecter

#### Route en post : **/user/log-in**

La route "/user/log-in" permet à l'utilisateur de se connecter. On vérifie d'abord que le username et le password sont envoyés et que le username est présent en BDD. Puis que le password renseigné correspond au password encrypté dans la BDD. <br>

Exemple de requête :

```
{
    "username" : "Chacha",
    "password" : "Chacha"
}
```

Réponse attendue de la requête :

```
{
    "id": "5f65f9e247efd906c100c60b",
    "username": "Chacha",
    "token": "pLyw5lBfDBGDDx1"
}
```

### - Rechercher un utilisateur

#### Route en post : **/user/search**

La route "/user/search" permet de rechercher un utilisteur via son username. <br>

Exemple de requête :

```
{
    "username" : "Chacha"
}
```

Réponse attendue de la requête :

```
{
    "personnal": {
        "firstName": "Charlène",
        "lastName": "Dupont",
        "postalCode": 64000,
        "address": "7 rue Carnot",
        "city": "Pau"
    },
    "picture": [],
    "reviews": [],
    "articles": [],
    "commandes": [],
    "ventes": [],
    "_id": "5f65f9e247efd906c100c60b",
    "token": "pLyw5lBfDBGDDx1",
    "hash": "eGLHb39wrSH294uqdTuSTOf0Aw9/ETiUQNfY6iiZJWM=",
    "salt": "UNzYq3UPAQvXA6i",
    "email": "charlene.dupont@gmail.com",
    "username": "Chacha",
    "__v": 0
}
```

### - Accèder aux informations d'un utilistaur

#### Route en get : **/user/informations/:id**

La route "/user/informations/:id" permet d'accèder aux informations en passant en params l'id. <br>

Exemple de requête sur Postman :
"http://localhost:3000/user/informations/5f65f9e247efd906c100d80f"
Réponse attendue de la requête :

```
{
    "personnal": {
        "firstName": "Margaux",
        "lastName": "Veille",
        "postalCode": 75000,
        "address": "12 Avenue Champ Elysée",
        "city": "Paris"
    },
    "picture": [],
    "reviews": [],
    "articles": [],
    "commandes": [],
    "ventes": [],
    "_id": "5f65f9e247efd906c100d80f",
    "token": "pLyw5lBfDHFGYx7",
    "hash": "eGLHb39wrGT294uqdTuSTOf0Hd6/ETiUQNfY6ioZJWM=",
    "salt": "UNzYq3UPAQvFP4f",
    "email": "margaux.veille@gmail.com",
    "username": "Margot"
}
```

### - Accèder à mes commandes

#### Route en get : **/user/mes-commandes**

La route "/user/mes-commandes" permet de visualiser les commandes d'un utilisateur. <br>

Réponse attendue :

```
{
    "personnal": {
        "firstName": "Cecile",
        "lastName": "Dupont",
        "postalCode": 64000,
        "address": "Rue de la joie",
        "city": "Anglet"
    },
    "picture": [],
    "reviews": [
        "5f44df620876600a6849cabc",
        "5f44e28e517f320a92af9eea",
        "5f44e2c05a2e360a9f901ab8",
        "5f44e32cbecb4f0aacd98b8a"
    ],
    "articles": [
        "5f4531e5e68dc9001711c0a5",
        "5f45621b27ffff2114974807"
    ],
    "commandes": [
        {
            "picture": [
                "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1598381915/qtfmqtlzed4zictukycg.jpg"
            ],
            "purchased": true,
            "_id": "5f455f5c335d4b20bb739624",
            "title": "Blazer de The Kooples, motif fleuris noirs",
            "description": "Veste Blazer",
            "price": 70,
            "creator": {
                "personnal": {
                    "firstName": "Elena",
                    "lastName": "Dehedin",
                    "postalCode": 83000,
                    "address": "Avenue de la poste, 4",
                    "city": "Toulon"
                },
                "picture": [],
                "reviews": [],
                "articles": [
                    "5f455f5c335d4b20bb739624"
                ],
                "commandes": [],
                "ventes": [],
                "_id": "5f3d2af827a12f0017a26aae",
                "email": "mathilde.dehedin@orange.fr",
                "username": "Math-deh",
                "__v": 0,
                "description": "Bonjour bienvenue sur mon dressing"
            },
            "created": "2020-08-25T18:58:36.419Z",
            "condition": "Satisfaisant",
            "brand": "The Kooples",
            "size": 42,
            "__v": 0
        }
    ],
    "ventes": [],
    "_id": "5f43b0374079260017e2ede3",
    "email": "cecile@orange.fr",
    "username": "Cecile",
    "__v": 7,
    "description": "Bonjour, je m'apelle Cécile, bienvenue sur mon dressing!"
}
```

### - Accèder à mes ventes

#### Route en get **/user/mes-ventes**

La route "/user/mes-ventes" permet d'accèder aux articles vendus de l'utilisateur. <br>

Réponse attendue :

```
{
    "personnal": {
        "firstName": "Leonardo",
        "lastName": "DICaprio",
        "postalCode": 90028,
        "address": "Sunset Blvd",
        "city": "Los Angeles"
    },
    "picture": [],
    "reviews": [],
    "articles": [
        "5f3fcc16f0566200179ee629",
    ],
    "commandes": [],
    "ventes": [
        {
            "picture": [
                "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1598543908/z7hl7jwmpn0yyu3nf2pn.jpg"
            ],
            "purchased": true,
            "_id": "5f47d8257c9acf0017e4ac43",
            "title": "Tee shirt",
            "description": "Logo Abercombie dans le dos",
            "price": 444,
            "creator": "5f3fcbe3f0566200179ee627",
            "created": "2020-08-27T15:58:29.227Z",
            "condition": "Neuf avec étiquette",
            "brand": "Abercombie & Fitch",
            "size": 42,
            "__v": 0
        }
    ],
    "_id": "5f3fcbe3f0566200179ee627",
    "token": "BxUcBB4OTLvAwxT",
    "hash": "n+OOvfBkvhWhqF+f/yC/PUmt+9aO8M12VD+Z7amp6TM=",
    "salt": "EpHHARwPlfKiqLp",
    "email": "leonardo@gmail.com",
    "username": "Leo74",
    "__v": 0
}
```

### - Updater le compte d'un utilisateur

#### Route en post : **/user/update-account/:id**

La route "/user/update-account/:id" permet de modifier et / ou ajouter des informations sur l'utilisateur (email, username, postalCode, city, address, description ainsi que sa photo) <br>

Exemple de requête :

```
{
    "postalCode" : "13000",
    "city" : "Marseille",
    "address" : "6 avenue de la gare",
    "description" : "Bonjour, bienvenue sur mon dressing ! A bientôt !"
}
```

Réponse attendue de la requête :

```
{
    "personnal": {
        "firstName": "Charlène",
        "lastName": "Dupont",
        "postalCode": 13000,
        "address": "6 avenue de la gare",
        "city": "Marseille"
    },
    "picture": [],
    "reviews": [],
    "articles": [],
    "commandes": [],
    "ventes": [],
    "_id": "5f65f9e247efd906c100c60b",
    "token": "pLyw5lBfDBGDDx1",
    "hash": "eGLHb39wrSH294uqdTuSTOf0Aw9/ETiUQNfY6iiZJWM=",
    "salt": "UNzYq3UPAQvXA6i",
    "email": "charlene.dupont@gmail.com",
    "username": "Chacha",
    "__v": 0,
    "description": "Bonjour, bienvenue sur mon dressing ! A bientôt !"
}
```

### - Supprimer un utilisateur

#### Route en post : **/user/delete**

La route "/user/delete" permet à l'utilisateur de supprimer son compte tout en supprimant les articles postés. <br>

Exemple de requête :

```
{
    "username" : "Chacha",
    "password" : "Chacha"
}
```

Réponse attendue de la requête :

```
{
   message : "Account deleted"
}
```

### - Publier une annonce

#### Route en post : **/ad/publish**

La route "/ad/publish" permet de créer une nouvelle annonce en BDD qui sera reliée à un utilisateur grâce à une référence. On vérifie que le titre, le prix, la description, une photo, la condition de l'article, la marque et la taille sont envoyés lors de la requête. <br>

Exemple de requête :

```
{
    "price" : 15,
    "description" : "Tee Shirt Lacoste",
    "title" : "Tee shirt",
    "condition" : "Très bon état",
    "brand" : "Lacoste",
    "size" : 38,
    "tabKeysPicture" : []
}
```

Réponse attendue de la requête :

```
{
    "id": "5f66010c41f933072724d54e",
    "title": "Tee shirt",
    "description": "Tee Shirt Lacoste",
    "price": 15,
    "picture": [
        "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1600520460/lfh4g97us9fmajc5wecb.jpg"
    ],
    "condition": "Très bon état",
    "brand": "Lacoste",
    "size": 38,
    "creator": "Oceane64"
}
```

### - Lire les annonces

#### Route en get : **/ad**

La route "/ad" permet d'obtenir la liste de tous les articles publiés. <br>

Réponse attendue de la requête :

```
[
    {
        "picture": [
            "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1600520460/lfh4g97us9fmajc5wecb.jpg"
        ],
        "purchased": false,
        "_id": "5f66010c41f933072724d54e",
        "title": "Tee shirt",
        "description": "Tee Shirt Lacoste",
        "price": 15,
        "creator": {
            "personnal": {
                "firstName": "Oceane",
                "lastName": "Dumont",
                "postalCode": 64000,
                "address": "Rue Jules Verne",
                "city": "Biarritz"
            },
            "picture": [
                "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1598375624/j909cbb6tcqiormvtqlf.jpg"
            ],
            "reviews": [
                "5f463404d9d1fc09ce395508",
                "5f463421d9d1fc09ce39550a",
                "5f463430d9d1fc09ce39550c",
                "5f463431d9d1fc09ce39550e",
                "5f46346bd9d1fc09ce395510"
            ],
            "articles": [
                "5f66010c41f933072724d54e"
            ],
            "commandes": [
                "5f455e3c335d4b20bb739622",
            ],
            "ventes": [],
            "_id": "5f4543b147ff0d1d2f429b53",
            "email": "oceane.dumont@gmail.com",
            "username": "Oceane64",
            "__v": 6,
            "description": "Bonjour, je m'apelle Océane et j'habite à Biarrtiz. Bienvenue sur mon dressing, n'hésitez pas à me contacter si un article vous intéresse, je suis prête à débattre le prix ! A bientot ;)"
        },
        "created": "2020-09-19T13:01:00.586Z",
        "condition": "Très bon état",
        "brand": "Lacoste",
        "size": 38,
        "__v": 0
    },
    {
        "picture": [
            "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1598609377/p6svalmi52jird5v8snz.jpg"
        ],
        "purchased": false,
        "_id": "5f48d7e1aca45000173ba077",
        "title": "Jupe",
        "description": "Jupe couleur noir longue tutu",
        "price": 45,
        "creator": {
            "personnal": {
                "firstName": "Catherine",
                "lastName": "Dumont",
                "postalCode": 75000,
                "address": "Rue de l'église",
                "city": "Paris"
            },
            "picture": [],
            "reviews": [],
            "articles": [
                "5f48cd41aca45000173ba076",
                "5f48d7e1aca45000173ba077"
            ],
            "commandes": [],
            "ventes": [
                "5f47d8257c9acf0017e4ac43"
            ],
            "_id": "5f3fcbe3f0566200179ee627",
            "email": "catherine@gmail.com",
            "username": "Cathy",
            "__v": 0
        },
        "created": "2020-08-28T10:09:37.880Z",
        "condition": "Bon état",
        "brand": "Aigle",
        "size": 40,
        "__v": 0
    }
]
```

### - Lire les informations d'une annonce

#### Route en get : **/ad/informations/:id**

La route "/ad/informations/:id" permet d'avoir les informations d'une annonce (son créateur et les reviews). <br>

Exemple de requête avec Postman : "http://localhost:3000/ad/informations/5f66010c41f933072724d54e"
Réponse attendue de la requête :

```
{
    "picture": [
        "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1600520460/lfh4g97us9fmajc5wecb.jpg"
    ],
    "purchased": false,
    "_id": "5f66010c41f933072724d54e",
    "title": "Tee shirt",
    "description": "Tee Shirt Lacoste",
    "price": 15,
    "creator": {
        "personnal": {
            "firstName": "Oceane",
            "lastName": "Dumont",
            "postalCode": 64000,
            "address": "Rue Jules Verne",
            "city": "Biarritz"
        },
        "picture": [
            "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1598375624/j909cbb6tcqiormvtqlf.jpg"
        ],
        "reviews": [
            {
                "_id": "5f463430d9d1fc09ce39550c",
                "description": "Rien à ajouter",
                "ratingNumber": 3,
                "creator": "5f3fc9a4f0566200179ee620",
                "created": "2020-08-26T10:06:40.699Z",
                "__v": 0
            },
            {
                "_id": "5f463431d9d1fc09ce39550e",
                "description": "Rien à ajouter",
                "ratingNumber": 3,
                "creator": "5f3fc9a4f0566200179ee620",
                "created": "2020-08-26T10:06:41.478Z",
                "__v": 0
            },
            {
                "_id": "5f46346bd9d1fc09ce395510",
                "description": "Transaction parfaite, Océane a été disponible du début à la fin. Merci à vous! J'ai maintenant une jolie robe pour l'été",
                "ratingNumber": 5,
                "creator": "5f3d1cf2f2642a0017deff1b",
                "created": "2020-08-26T10:07:39.600Z",
                "__v": 0
            }
        ],
        "articles": [
            "5f4562bd27ffff2114974809",
            "5f4668c42964c80017e5864e",
            "5f46930dd8b8b00017409962",
            "5f66010c41f933072724d54e"
        ],
        "commandes": [
            "5f455e3c335d4b20bb739622",
        ],
        "ventes": [],
        "_id": "5f4543b147ff0d1d2f429b53",
        "token": "UcI8euuL06d9aDL",
        "hash": "XEW2HB3Fygby2CT+1HIQhrv1UvG2cWtgO+pKJ0Jdj+4=",
        "salt": "f3uFNkn7yjQKtZP",
        "email": "oceane.dumont@gmail.com",
        "username": "Oceane64",
        "__v": 6,
        "description": "Bonjour, je m'apelle Océane et j'habite à Biarrtiz. Bienvenue sur mon dressing, n'hésitez pas à me contacter si un article vous intéresse, je suis prête à débattre le prix ! A bientot ;)"
    },
    "created": "2020-09-19T13:01:00.586Z",
    "condition": "Très bon état",
    "brand": "Lacoste",
    "size": 38,
    "__v": 0
}
```

### - Rechercher une annonce

#### Route en get : **/ad/sort**

La route "/ad/sort" permet d'obtenir toutes les annonces liées à notre recherche. Il est possible de les filtrer en recherchant par titre, par prix minimum et/ou maximum. <br>

Exemple de requête sur Postman :
"http://localhost:3000/ad/sort?title=pull"
Réponse attendue de la requête :

```
[
    {
        "picture": [
            "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1598382238/ibulg1jdbz51logkwaew.jpg"
        ],
        "purchased": false,
        "_id": "5f45609e27ffff2114974802",
        "title": "Pull",
        "description": "Pull manches longues",
        "price": 50,
        "creator": {
            "personnal": {
                "firstName": "Gisèle",
                "lastName": "Youka",
                "postalCode": 31000,
                "address": "Place Capitole",
                "city": "Toulouse"
            },
            "picture": [],
            "reviews": [
                "5f44dd9df4d8bf0a2d0c962f",
            ],
            "articles": [
                "5f3fcac8f0566200179ee624",
                "5f3fcb19f0566200179ee625",
                "5f45609e27ffff2114974802"
            ],
            "commandes": [],
            "ventes": [],
            "_id": "5f3fca2ff0566200179ee622",
            "email": "gigi@gmail.com",
            "username": "Gigi",
            "__v": 2
        },
        "created": "2020-08-25T19:03:58.775Z",
        "condition": "Neuf avec étiquette",
        "brand": "Autre",
        "size": 40,
        "__v": 0
    },
    {
        "picture": [
            "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1598382267/pbjv0ykrjfq4aglq4wo8.jpg"
        ],
        "purchased": false,
        "_id": "5f4560bb27ffff2114974803",
        "title": "Pull",
        "description": "Pull manches longues",
        "price": 25,
        "creator": {
            "personnal": {
                "firstName": "Marie",
                "lastName": "Dehedin",
                "postalCode": 45000,
                "address": "Rue Emile Zola",
                "city": "Orleans"
            },
            "picture": [],
            "reviews": [],
            "articles": [
                "5f3fcbfcf0566200179ee628",
                "5f3fcc53f0566200179ee62b",
                "5f43a070a8d2ea001785c8c4",
                "5f43a1eaa8d2ea001785c8c5",
                "5f43a221a8d2ea001785c8c6",
                "5f43a2f7a8d2ea001785c8c7",
                "5f4560bb27ffff2114974803",
                "5f45612927ffff2114974804"
            ],
            "commandes": [],
            "ventes": [],
            "_id": "5f3fcbaff0566200179ee626",
            "email": "marie@gmail.com",
            "username": "MarieDeh",
            "__v": 0
        },
        "created": "2020-08-25T19:04:27.449Z",
        "condition": "Neuf avec étiquette",
        "brand": "Autre",
        "size": 36,
        "__v": 0
    }
]
```

### - Updater une annonce

#### Route en post **/ad/publish/update/:id**

La route "/ad/publish/update/:id" permet de modifier une annonce, seul le créateur de l'annonce pourra la modifier. <br>

Exemple de requête :

```
{
    "title" : "Jupe"
}
```

Réponse attendue de la requête :

```
{
    "message": "Your offer has been updated"
}
```

### - Supprimer une annonce

#### Route en get : **/ad/delete/:id**

La route "/ad/delete/:id" permet de supprimer une annonce via son id, l'utilisateur doit également être enregistré pour supprimer l'annonce. <br>

Exemple de requête sur Postman :
"http://localhost:3000/ad/delete/5f45612927ffff2114974804"
Réponse attendue de la requête :

```
{
    "message": "Ad deleted"
}
```

### - Poster un review

#### Route en post : **/post-review/:id**

La route "/post-review/:id" permet de poster un commentaire à un utilisateur et de les relier ensemble en BDD. <br>

Exemple de requête :

```
{
    "ratingNumber" : 5
}
```

Réponse attendue de la requête :

```
{
    "personnal": {
        "firstName": "Simone",
        "lastName": "Dumont",
        "postalCode": 74000,
        "address": "Rue de l'île",
        "city": "Cluses"
    },
    "picture": [
        "https://res.cloudinary.com/dbxmpuzvk/image/upload/v1598375624/j909cbb6tcqiormvtqlf.jpg"
    ],
    "reviews": [
        {
            "_id": "5f46346bd9d1fc09ce395590",
            "description": "Transaction parfaite",
            "ratingNumber": 5,
            "creator": "5f3d1cf2f2642a0017deff1b",
            "created": "2020-08-26T10:07:39.600Z",
            "__v": 0
        },
        {
            "_id": "5f6608bb41f933072724d54g",
            "description": "Rien à ajouter",
            "ratingNumber": 5,
            "creator": "5f3fcbe3f0566200179ee627",
            "created": "2020-09-19T13:33:47.490Z",
            "__v": 0
        }
    ],
    "articles": [
        "5f4562bd27ffff2114974635"
    ],
    "commandes": [],
    "ventes": [],
    "_id": "5f4543b147ff0d1d2f429b67",
    "email": "Simone.dumont@gmail.com",
    "username": "Simone64",
    "__v": 7,
    "description": "Bonjour, je m'apelle Simone. Bienvenue sur mon dressing! A bientot"
}
```
