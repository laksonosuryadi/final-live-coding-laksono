# final-live-coding-laksono

Description:

Final Live Coding Phase 2.

Sebuah project aplikasi CMS (Content Management System) dengan server API dan client side yang terpisah

Step untuk menjalakan aplikasi ini :

Client Side
```
npm install
npm rum dev
```
<br>
Server Side
```
npm install
npm start
```

-----
## List of Endpoints

### Login

|Route | HTTP Method | Description |
|------|:----:|-------------|
|`/login/` | POST | Login and Verification |


### Food

|Route | HTTP Method | Description |
|------|:----:|-------------|
|`/users/` | POST | Add Users (sign up) to Database |
|`/users/` | GET | Get all Users from Database |


### Articles

|Route | HTTP Method | Description |
|------|:----:|-------------|
|`/current/` | GET | Get current User signing in |
|`/articles/` | POST | Add new Article to Database |
|`/articles/` | GET | Get all Articles from Database |
|`/articles/:articlesId` | GET | Get 1 Article from Database |
|`/articles/:articlesId` | PUT | Update 1 Article in Database |
|`/articles/:articlesId` | DELETE | Remove 1 Article from Database |
|`/articles/list/:authorId` | Get | Get Articles by Author ID |
