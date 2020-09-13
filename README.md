# Réplique Vinted

## Made with _Express_, _ExpressFormidable_, _Cloudinary_, _Crypto.js_, _Mongoose_, _Stripe_ & _uid2_ (Back)

## Made with _React Native_ (Front)

### Route user.js

### Créer un compte

##### **/user/sign_up** - Create

###### La route "/user/sign_up" permet de créer un nouvel utilisateur dans la BDD. On vérifie que l'email n'est pas déjà présent en BDD ainsi que le username et que tous les paramètres (email, username, firstName, lastName, postalCode, city, address & password via un hash et un salt) sont envoyés afin de créer un compte.

### Se connecter

##### **/user/log_in**

###### La route "/user/log_in" permet à l'utilisateur de se connecter. On vérifie d'abord que le username et le password sont envoyés et que le username est présent en BDD. Puis, on vérifie que le password renseigné correspond au password encrypté dans la BDD.

### Rechercher un utilisateur

##### **/user/search** - Read

###### La route "/user/search" permet de rechercher un utilisteur via son username.

### Accèder aux informations d'un utilistaur

##### **/user/informations/:id** - Read

###### La route "/user/informations/:id" permet d'accèder aux informations en passant en params son id.

### Accèder à mes commandes

##### **/user/mes-commandes** - Read

###### La route "/user/mes-commandes" permet de visualiser les commandes d'un utilisateur.

### Accèder à mes ventes

##### **/user/mes-ventes** - Read

###### La route "/user/mes-ventes" permet d'accèder aux articles vendus de l'utilisateur.

### Updater le compte d'un utilisateur

##### **/user/update-account/:id** - Update

###### La route "/user/update-account/:id" permet de modifier et / ou ajouter des informations sur l'utilisteur (email, username, postalCode, city, address, description ainsi que sa photo)

### Supprimer un utilisateur

##### **/user/delete** - Delete

###### La route "/user/delete" permet à l'utilistaeur de supprimer son compte tout en supprimant les articles qu'il aurait pu posté.

### Route ad.js

### Publier une annonce

##### **/ad/publish** - Create

###### La route "/ad/publish" permet de créer une nouvelle annonce en BDD qui sera liée à un utilisateur grâce à une référence. On vérifie que le titre, le prix, la description, une photo, la condition de l'article, la marque et la taille sont envoyés lors de la requête.

### Lire les annonces

##### **/ad** - Read

###### La route "/ad" permet d'obtenir la liste de tous les articles publiés.

### Lire les informations d'une annonce

##### **/ad/informations/:id** - Read

###### La route "/ad/informations/:id" permet d'avoir les informations d'une annonce en commancant par le créateur de cette dernière et ces reviews.

### Rechercher une annonce

##### **/ad/sort** - Read

###### La route "/ad/sort" permet d'obtenir toutes les annonces liées à notre recherche. Il est possible de les filtrer en recherchant par titre, par prix minimum et/ou maximum.

### Rechercher les articles

##### **/ad/user/:id** - Read

###### La route "/ad/user/:id" permet d'obtenir tous les articles publiés par un utilisateur avec son id en params.

### Updater une annonce

##### **/ad/publish/update/:id** - Update

###### La route "/ad/publish/update/:id" permet de modifier une annonce, seul le créateur de l'annonce pourra la modifier.

### Supprimer une annonce

##### **/ad/delete/:id** - Delete

###### La route "/ad/delete/:id" permet de supprimer une annonce via son id, l'utilistaeur doit également être enregistré pour supprimer l'annonce.

### Route review.js

### Poster un review

##### **/post-review/:id** - Create

###### La route "/post-review/:id" permet de poster un commentaire à un utilisateur et de les relier ensemble en BDD.

###### Ce projet, rebaptisé SyMa, a été réalisé en collaboration avec [Sylvie](https://github.com/SophiaLys) lors du projet de fin de formation au [Reacteur](https://www.lereacteur.io/)

###### https://github.com/Projet-hotelApi/Syma-Native
