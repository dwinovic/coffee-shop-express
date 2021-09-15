<p align="center">
     <img src="https://i.postimg.cc/QdVDVtTB/logo.png"   alt= border="0" />

</p>


---


## Contents

- [About](#about)
- [Packages](#Packages)
- [Installation](#installation)
- [Coffee Shop - Frontend](#coffee-shop---frontend)
- [Endpoint](#endpoint)
- [Authors](#authors)

##  Abouto

<p align="justify">Coffee Shop is a Foods & Beverages ordering application. This apps give you (customers) some features to order your favorite foods or beverages. The customers also have some opportunity to use some promo code before directly checkout to the payment page. In payment page you can pick your payments method so it's flexible what kind of money do you have. Also the customers will be able to edit their profile such as photo, username, address, and phone number if they have to change their identity.
</p>

##  Packages


#### Built Wth
- ExpressJs
- NodeJs
- MySQL
- JWT

#### Packages (Backend)
    "bcrypt": "^5.0.1",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "express-fileupload": "^1.2.1",
    "express-validator": "^6.12.1",
    "ioredis": "^4.27.9",
    "jsonwebtoken": "^8.5.1",
    "mysql2": "^2.3.0",
    "nodemailer": "^6.6.3",
    "socket.io": "^4.2.0",
    "socket.io-cookie-parser": "^1.0.0",
    "uuid": "^8.3.2"


## Installation

- Clone This Repo to your local

```
git clone https://github.com/aryairama/coffee-shop-express.git
```

- Go To Folder Repo

```
cd coffee-shop-express
```

- Install Module

```
npm install
```

- Type ` npm start` To Start Website

<br/>

## Coffee Shop - Frontend

:rocket: [`Front End Coffee Shop`](https://github.com/dwinovic/coffe-shop-next.git)

<br/>

## Endpoint

#### Categories Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `POST`  |       /categories/addcategory       |      add category       |
|  `GET`  | /categories/getcategory |  get all categories  |
|  `GET`  |        /categories/showcategory         |        show category     |
|  `POST`  |   /categories/updatecategory/:id    | update category |
|  `DELETE`  |   /categories/deletecategory/:id    | delete category |



#### Users Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `POST`   |       /users/auth/register/:id       |              register user            |
|  `POST`   |           /users/login     |               login user             |
|  `GET`   |       /users/profile       |              get user profile              |
|  `GET`   |       /users/profile/:id       |              get user profile by id            |
|  `DELETE`   |       /users/logout       |              log out user              |
| `POST` |       /users/verify-email        |            verify-email           |
| `PATCH` |       /users/check-token       |             check token verify email          |
| `PATCH` |       /users/check-token     |             check token forgot password            |
| `POST` |       /users/profile/:id        |             update profile           |
| `PATCH` |       /users/forgot-password        |             forgot password          |
| `PATCH` |       /users/reset-password        |             reset password          |
| `PATCH` |       /users/update-password        |             update password          |
| `GET` |       /users        |             get all users           |


#### Deliveries Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `POST`  |       /deliveries/adddeliveries       |      add delivery       |
|  `GET`  | /deliveries/getdeliveries |  get all deliveries  |
|  `GET`  |        /deliveries/showdelivery         |        show delivery     |
|  `POST`  |   /deliveries/updatedelivery/:id    | update delivery |
|  `DELETE`  |   /deliveries/deletedelivery/:id    | delete delivery |


#### Products Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `POST`  |       /products/       |      add products       |
|  `POST`  | /products/:id |  update products  |
|  `DELETE`  |        /products/:id         |      delete products     |
|  `GET`  |   /products/  | get all products |
|  `GET`  |   /products/:id    | get detail products by id |
|  `GET`  |   /products/category/:id    | get products by category |


#### Sizes Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `POST`  |       /sizes/addsizes       |      add size       |
|  `GET`  | /sizes/getsizes |  get all sizes  |
|  `GET`  |        /sizes/showsize         |        show size     |
|  `POST`  |   /sizes/updatesize/:id    | update size |
|  `DELETE`  |   /sizes/deletesize/:id    | delete size |



## Authors

1. [Novi Dwi Cahya](https://github.com/dwinovic) - Frontend - Leader
2. [Arya Irama Wahono](https://github.com/aryairama) - Full Stack - Member
3. [Chandra Kurniawan](https://github.com/Chandra-Kurnia) - Backend - Member
4. [Canda Muammal](https://github.com/CandaMuammal) - Frontend - Member
