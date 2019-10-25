# social-coder :  MEAN stack blog writing application

There are two folders:

1) application
2) server

## Role of each

1) application: is the angular app that runs on localhost 4200
2) server: is an express server which makes call to routes/api and runs on localhost 3000

## If you want to run a built version on same port. Replace server.js code with the code below

```
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
```

## And if you want to deploy this app on Heroku. you've to make few changes in your code.

### 1. application/src/app/auth.service.ts
Replace the following variables. Notice that I've removed **http://localhost:3000** part from every URL
```
    private _registerUrl = "api/register";
    private _loginUrl = "api/login";
    private _contributeUrl = "api/contribute";
    private _askUrl = "api/ask";
    private _deleteArtURL = "api/delete-article";
    private _onlyMyArticlesUrl = "api/myarticles";
```
Do the same with **application/src/app/article.service.ts**
```
  private _articlesUrl = "api/articles";
  private _deleteUrl = "api/delete";
  private _fetchUrl = "api/fetchback";
  private _updateArtURL = "api/update-article";
```
And the last one **application/src/app/discussion.service.ts**
```
private _discussionsUrl = "api/discussions";
```

We did this because Heroku will have its own host and port number rather than localhost:3000

### Now build the project using `ng build --prod`

