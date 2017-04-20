# final-live-coding-laksono

Description:

Final Live Coding Phase 2.

A project to make CMS (Content Management System) with separated server API dan client side.

<br>
Steps to run this app:
<br>

**Client Side**
```
npm install
npm run dev
```
<br>

**Server Side**
```
npm install
npm start
```
<br>

**To test the CRUD API you can use POSTMAN app**
```
using http://localhost:3000/<insert-endpoint-name-here>
```

-----
## List of Endpoints

### Login

|Route | HTTP Method | Description |
|------|:----:|-------------|
|`/login/` | POST | Login and Verification |


### Users

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
|`/articles/:articleId` | GET | Get 1 Article from Database |
|`/articles/:articleId` | PUT | Update 1 Article in Database |
|`/articles/:articleId` | DELETE | Remove 1 Article from Database |
|`/articles/list/:authorId` | Get | Get Articles by Author ID |
