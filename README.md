# social-coder :  MEAN stack blog writing application

There are two folders:

1) application
2) server

## Role of each

1) application: is the angular app that runs on localhost 4200
2) server: is an express server which makes call to routes/api and runs on localhost 3000

## If you want to run a built version on same port. Replace server.js code with the code below

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./routes/api');
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'dist/application')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/application/index.html'));
});
app.listen(port, function() {
    console.log('server running on localhost:' + port);
});

## And if you want to deploy this app on Heroku. ypu've to make few changes in your code.

### 1. auth.service.ts
Replace the following variables. Notice that I've removed **http://localhost:3000** part
```
    private _registerUrl = "api/register";
    private _loginUrl = "api/login";
    private _contributeUrl = "api/contribute";
    private _askUrl = "api/ask";
    private _deleteArtURL = "api/delete-article";
    private _onlyMyArticlesUrl = "api/myarticles";
```
