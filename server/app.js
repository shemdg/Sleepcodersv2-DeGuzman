const Express = require("express");
const app = Express();
const cors = require("cors"); 

const bodyParser = require("body-parser"); 


app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));


app.use(cors()); 


const DBconnections = require("./database/connection");


const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);


const sequelizeSessionStore = new SessionStore({
  db: DBconnections,
});


app.use(
  expressSession({
    secret: "your_secret_key", 
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, 
      httpOnly: true,
    },
  })
);


const UserModel = require("./model/User");
const EventModel = require("./model/Events.js");
const Attempt_Logs = require("./model/Attempt_Logs.js");
const Login_Logs = require("./model/Login_logs.js");
const OTP = require("./model/OTP.js");


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
