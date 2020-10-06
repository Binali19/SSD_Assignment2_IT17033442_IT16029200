const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const gauth = require('./g-auth');
const { google } = require('googleapis')
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload')
var jwt = require('jsonwebtoken');
const app = express();

gauth(passport);
fauth(passport);
app.use(passport.initialize());

app.use(cors());
app.options('*', cors());

app.use(function(req, res, next) {
  //Allow POST,GET,PUT,DELETE methods 
  res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  //JSON Content-Type
  res.header("Content-Type", "application/json");
  next();
});

// Set jwt secret token
app.set('secretKey', 'nodeRestApi'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));
app.use(cookieParser());

//Get method
app.get('/', (req, res) => {
  if (req.session.token) {
      res.cookie('token', req.session.token);
      res.json({
          status: 'session cookie set'
      });
  
  } else {
      res.cookie('token', '')
      res.json({
          status: 'session cookie not set'
      });
  }
});

//Get method
app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

//Get method
app.get('/tshirt.png', function(req, res) {
    res.sendStatus(204);
});

//Get method
app.get('/auth/google', passport.authenticate('google', {
  scope: [

    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
}));

//Get method
app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect:'/'}),
    (req, res) => {
        req.session.token = req.user.token;

        var user = {
          id:req.user.profile._json.sub,
          name:req.user.profile._json.name,
          email:req.user.profile._json.email,
          picture:req.user.profile._json.picture
        }

        res.cookie('token',req.session.token);
        res.cookie('user',user);
        res.redirect('http://localhost:8080/');
    }
);


//Validate user with secret key
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // Add User ID to request
      req.body.userId = decoded.id;
      next();
    }
  });

}

// Clothing item upload 
app.use(fileUpload());

//Post method
app.post('/upload', function (req, res) {
  try {
      //Google drive Config with client token
      const oauth2Client = new google.auth.OAuth2()
      oauth2Client.setCredentials({
          'access_token': req.body.token
      });

      const drive = google.drive({
          version: 'v3',
          auth: oauth2Client
      });

      //Upload Clothing item to google drive
      let { name: filename, mimetype, data } = req.files.input_file

      const driveResponse = drive.files.create({
          requestBody: {
              name: filename,
              mimeType: mimetype
          },
          media: {
              mimeType: mimetype,
              body: Buffer.from(data).toString()
          }
      });

      driveResponse.then(data => {

        if (data.status == 200) res.redirect('http://localhost:8080/uploader?file=uploaded') // If success
        else res.redirect('http://localhost:8080/uploader?file=notuploaded') // If unsuccess

      }).catch(err => { throw new Error(err) })
  } catch (error) {
    console.log(error);  
  }  
})

// Handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Handle errors
app.use(function(err, req, res, next) {
 console.log(err);

  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else
    res.status(500).json({message: "Error !!! Something went wrong !"});
});

app.listen(3000, function(){
 console.log('Server listening on port 3000');
});


