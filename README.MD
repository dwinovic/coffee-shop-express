<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/dwinovic/coffe-shop-next">
    <img src="https://res.cloudinary.com/dnv-images/image/upload/v1631954966/Coffe%20Shop/coffe_copy_huh6kh.png" alt="Logo" width="180" height="180">
  </a>

  <h3 align="center">Backend Application for Coffee Shop</h3>

  <p align="center">
    Coffee Shop is a Foods & Beverages ordering application. <br /> This apps give you (customers) some features to order your favorite foods or beverages. 
    <br />
    <a href="https://github.com/dwinovic/coffe-shop-next"><strong>Explore the docs »</strong></a>
    <br />
    <br />
        <a href="https://coffee-shop-next.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/dwinovic/coffee-shop-express">Report Bug</a>
    ·
    <a href="https://github.com/dwinovic/coffee-shop-express">Request Feature</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
        <ol>
            <li>
                <a href="#build-with">Build With</a>
            </li>
        </ol>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ol>
        <li>
          <a href="#installation">Installation</a>
        </li>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#related-project">Related Project</a>
        </li>
      </ol>
    </li>
    <li><a href="#zwallet-api-documentation">Coffe Shop API Documentation</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

## About The Project

<p align="justify">
<b>Coffee Shop</b> is a Foods & Beverages ordering application. This apps give you (customers) some features to order your favorite foods or beverages. The customers also have some opportunity to use some promo code before directly checkout to the payment page. In payment page you can pick your payments method so it's flexible what kind of money do you have. Also the customers will be able to edit their profile such as photo, username, address, and phone number if they have to change their identity. 
</p>

### Build With
* [Express Js](https://expressjs.com/)
* [Node Js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [JWT](https://jwt.io/)
* [Nodemailer](https://nodemailer.com/about/)
* [Express Validator](https://express-validator.github.io/docs/)
* [redis](https://redis.io/)
* [Express File Upload](https://www.npmjs.com/package/express-fileupload)

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* [Node Js](https://nodejs.org/en/download/)
* [MySQL](https://www.mysql.com/downloads/)
* [Postman](https://www.postman.com/downloads/)


## Installation

1. Clone These 2 Repos (Backend and Frontend)
```sh
https://github.com/dwinovic/coffe-shop-express
```
2. Go To Folder Repo
```sh
cd coffe-shop-express
```
3. Install Module
```sh
npm install
```
4. Make a new database and import [coffe-shop-sample.sql](https://drive.google.com/file/d/1g4R7YvY8Sjo1MQ_Zr1Xl9112Hh47kssc/view?usp=sharing)
5. Add .env file at root folder project, and add following
```sh
DB_NAME = [DB_NAME]
DB_HOST = [DB_HOST]
DB_USER = [DB_USER]
DB_PASS = [DB_PASS]
PORT = 4000
LOCAL_APPLICATION = "id-ID"
ACCESS_TOKEN_SECRET = [ACCESS_JWT_TOKEN_SECRET]
REFRESH_TOKEN_SECRET = [REFRESH_JWT_TOKEN_SECRET]
VERIF_EMAIL_TOKEN_SECRET = [VERIF_EMAIL_TOKEN_SECRET]
FORGOT_PASSWORD_TOKEN_SECRET = [FORGOT_PASSWORD_TOKEN_SECRET]
REDIS_URL = [REDIS_URL_SERVICE_HEROKU]
HOST_REDIS = [HOST_REDIS]
PORT_REDIS = [PORT_REDIS]
AUTH_REDIS = [AUTH_REDIS]
PATH_REDIS = [PATH_REDIS]
PREFIX_REDIS = [PREFIX_REDIS]
NODEMAILER_HOST = [EMAIL_SMTP_SERVER_HOST]
NODEMAILER_PORT = [EMAIL_SERVER_PORT]
NODEMAILER_SECURE = true
NODEMAILER_AUTH_USER = [YOUR_SMTP_EMAIL_AUTH_USER]
NODEMAILER_AUTH_PASS = [YOUR_PASSWORD_EMAIL_SMTP_PASS]
URL_FRONTEND = [URL_FRONTEND]
CORS_ORIGIN = [URL_FRONTEND, URL_BACKEND/socket.io]
CREDENTIALS = true
CLOUD_NAME = [YOUR_CLOUDINARY_ACCOUNT_NAME]
API_KEY = [CLOUDINARY_API_KEY]
API_SECRET = [CLOUDINARY_API_SECRET]
```
6. Starting application
```sh
npm run serve
```
7. Testing with Postman
    * [Coffe Shop API Documentation](https://www.postman.com/crimson-meadow-842892/workspace/cofee-shop-project/)


### Related Project
* [`Frontend Coffe Shop`](https://github.com/dwinovic/coffe-shop-next)
* [`Backend Coffe Shop`](https://github.com/dwinovic/coffee-shop-express)

## Zwallet API Documentation

* [Coffe Shop API Documentation](https://www.postman.com/crimson-meadow-842892/workspace/cofee-shop-project/)

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


## Contributors

<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/aryairama">
          <img width="100" src="https://avatars.githubusercontent.com/u/73978824?v=4" alt="Arya Irama Wahono"><br/>
          <sub><b>Arya Irama Wahono</b></sub> <br/>
          <sub>Full Stack Web Developer</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/Chandra-Kurnia">
          <img width="100" src="https://media-exp1.licdn.com/dms/image/C4D03AQHU2BSd6ZVvrg/profile-displayphoto-shrink_800_800/0/1631861838918?e=1637193600&v=beta&t=bodYo3TW177wycvbnItqp7OtoElOOBMWd_D0JgPzoGg" alt="Chandra Kurniawan"><br/>
          <sub><b>Chandra Kurniawan</b></sub> <br/>
          <sub>Full Stack Web Developer</sub>
        </a>
      </td>
    </tr>
  </table>
</center>

## Contact
My Email : novidwicahya19@gmail.com

Project Link: [https://github.com/dwinovic/coffe-shop-next](https://github.com/dwinovic/coffe-shop-next)
