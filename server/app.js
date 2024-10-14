const Express = require("express");
const app = Express();
<<<<<<< HEAD
const cors = require("cors"); 

const bodyParser = require("body-parser"); 

=======
const cors = require("cors");

const bodyParser = require("body-parser");
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

<<<<<<< HEAD

app.use(cors()); 


const DBconnections = require("./database/connection");


const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);


=======
app.use(cors());

const DBconnections = require("./database/connection");

const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);

>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
const sequelizeSessionStore = new SessionStore({
  db: DBconnections,
});

<<<<<<< HEAD

app.use(
  expressSession({
    secret: "your_secret_key", 
=======
app.use(
  expressSession({
    secret: "your_secret_key",
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
<<<<<<< HEAD
      maxAge: 3600000, 
=======
      maxAge: 3600000,
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      httpOnly: true,
    },
  })
);

<<<<<<< HEAD

=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
const UserModel = require("./model/User");
const EventModel = require("./model/Events.js");
const Attempt_Logs = require("./model/Attempt_Logs.js");
const Login_Logs = require("./model/Login_logs.js");
const OTP = require("./model/OTP.js");

<<<<<<< HEAD

=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
const LoginRoute = require("./routes/Login.js");
const SessionRoute = require("./routes/Session");
const EventRoute = require("./routes/Event.js");

const TestRoutes = require("./routes/Test");

app.use(TestRoutes);
app.use(SessionRoute);
app.use(EventRoute);

app.use(LoginRoute);

DBconnections.sync()
  .then((result) => {
    app.listen(5000, () => {
      console.log("Local: http://localhost:5000 ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
