const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')
const Blockchain = require("./models/Blockchain.js")

// Genesis of the chain
let chain = new Blockchain();

let app = express();

let apiRouter = express.Router();

app.use('/api', apiRouter);

// Use to be able to use req.body to get the request data
apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({
  extended: true
}));

// Say all views (html, css, js) are in the views directory
app.use(express.static('views'))
// Use morgan to log requests
apiRouter.use(morgan('dev'));

/*app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});*/

// Contact api
apiRouter.post('/contact', (req, res) => {
    let from = req.body.email;
    let object = req.body.objet;
    let message = req.body.message;

    if (from == "" || object == "" || message == "") {
        res.status(400);        
        res.json({"status": 400, "statusMessage":"Missing data"});
        res.send();
        
        console.log("Requete d'envoie de message - Message vide")
        return;
    }

    // Add the message to the chain
    chain.addBlock({from: from, object: object, message: message});
    
    /*chain.chain.forEach((element) => {
        console.log(`From: ${element.data.from}, Object: ${element.data.object}, Message: ${element.data.message}`);
    });*/

    res.status(200);    
    res.json({"status": 200, "statusMessage":"Message added"});
    res.send();
});

apiRouter.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;

    let authFile = fs.readFileSync('auth.json');
    let authParsed = JSON.parse(authFile);

    let found = false;

    authParsed.forEach((element) => {
        if ((element.login == login && element.password == password)) {
            res.status(200); 
            res.json({"status": 200, "statusMessage":"Valid account", "chain":chain});
            found = true;
        }
    });

    if (found != true) {
      res.status(404);
      res.json({"status": 404, "statusMessage":"Account does not exist"});
      console.log("Requete de connexion - Connexion refusée")
    }
    res.send();
});

// Listen for client
app.listen('3000')