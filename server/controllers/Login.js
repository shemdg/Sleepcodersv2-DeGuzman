const CryptoJS = require("crypto-js");

<<<<<<< HEAD

=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
const connections = require("../database/connection");

const { body, validationResult } = require("express-validator");

<<<<<<< HEAD

=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
const UserModel = require("../model/User");
const Attempt_Logs_Model = require("../model/Attempt_Logs");
const Login_Logs_Model = require("../model/Login_logs");
const OTP_Model = require("../model/OTP");

<<<<<<< HEAD

const encrypt = require("../util/encrypt");
const decrypt = require("../util/decrypt");


=======
const encrypt = require("../util/encrypt");
const decrypt = require("../util/decrypt");

>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
const moment = require("moment-timezone");
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");

function mailNewLocation(email, otp, ip_info, browser_info) {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
<<<<<<< HEAD
      user: process.env.MAILER_USERNAME, 
      pass: process.env.MAILER_PASSWORD, 
=======
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    },
  });

  const mailOptions = {
    to: email,
    subject: "New Login Location Detected",
    html: `
      <h1>New Login Location Alert</h1>
      <p>We detected a new login to your account from a different location.</p>
      <p><strong>IP Address:</strong> ${ip_info}</p>
      <p><strong>Browser Information:</strong> ${browser_info}</p>
      <p>If this was not you, please use the following OTP to verify your location:</p>
      <h2>Here is your OTP approval code: ${otp}</h2>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
    } else {
      console.log("OTP Email sent successfully:", info.response);
    }
  });
}

const generateRandomOTP = () => {
<<<<<<< HEAD
  return Math.floor(100000 + Math.random() * 900000).toString(); 
=======
  return Math.floor(100000 + Math.random() * 900000).toString();
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
};

exports.postLogin = async (req, res, next) => {
  try {
<<<<<<< HEAD
    
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    let {
      ip,
      browserInfo,
      username: encryptedUsername,
      password: encryptedPassword,
    } = req.body;

    if (!ip || !browserInfo || !encryptedUsername || !encryptedPassword) {
      return res.status(400).json({
        message:
          "Invalid entry: All fields (ip, browserInfo, username, and password) are required.",
      });
    }

<<<<<<< HEAD
    
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    if (!ip || !browserInfo || !encryptedUsername || !encryptedPassword) {
      return res
        .status(400)
        .json({ error: "Invalid entry. All fields are required." });
    }

<<<<<<< HEAD
   
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    const sanitizedIp = (ip || "").trim();
    const sanitizedBrowserInfo = JSON.stringify(browserInfo || {});
    const sanitizedUsername = (encryptedUsername || "").trim();
    const sanitizedPassword = (encryptedPassword || "").trim();

    const username = decrypt(encryptedUsername);
    const password = decrypt(encryptedPassword);

    if (!username || !password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const currentDateTimePH = moment().tz("Asia/Manila");

<<<<<<< HEAD
    
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    let attemptLog = await Attempt_Logs_Model.findOne({
      where: { ip_address: ip, browser_info: browserInfo },
      order: [["createdAt", "DESC"]],
    });

    if (!attemptLog) {
      attemptLog = await Attempt_Logs_Model.create({
        ip_address: ip,
        browser_info: browserInfo,
        attempt_count: 1,
      });
    }

<<<<<<< HEAD
    
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    if (attemptLog.locked) {
      const timeRestrictionExpired =
        attemptLog.time_restriction &&
        moment(attemptLog.time_restriction).isBefore(currentDateTimePH);

      if (!timeRestrictionExpired) {
        return res.status(403).json({
          message: `Login restricted until ${moment(attemptLog.time_restriction)
            .tz("Asia/Manila")
            .format("YYYY-MM-DD HH:mm:ss")}`,
        });
      } else {
        attemptLog.locked = false;
        attemptLog.time_restriction = null;
        attemptLog.attempt_count = 0;
        await attemptLog.save();
      }
    }

<<<<<<< HEAD
    
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    if (attemptLog.attempt_count >= 4) {
      attemptLog.time_restriction = currentDateTimePH
        .add(1, "minutes")
        .toDate();
      attemptLog.locked = true;
      await attemptLog.save();
      return res.status(403).json({
        message: `Login restricted until ${moment(attemptLog.time_restriction)
          .tz("Asia/Manila")
          .format("YYYY-MM-DD HH:mm:ss")}`,
        restrictionTime: attemptLog.time_restriction,
      });
    }

<<<<<<< HEAD
     
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      
=======
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      attemptLog.attempt_count = moment(attemptLog.createdAt).isSame(
        currentDateTimePH,
        "day"
      )
        ? attemptLog.attempt_count + 1
        : 1;
      await attemptLog.save();

      return res.status(401).json({
        message: "Invalid username or password.",
        attemptCount: attemptLog.attempt_count,
      });
    }

<<<<<<< HEAD
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      
=======
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      attemptLog.attempt_count = moment(attemptLog.createdAt).isSame(
        currentDateTimePH,
        "day"
      )
        ? attemptLog.attempt_count + 1
        : 1;
      await attemptLog.save();

      return res.status(401).json({
        message: "Invalid username or password.",
        attemptCount: attemptLog.attempt_count,
      });
    }

<<<<<<< HEAD
    
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    if (attemptLog) {
      attemptLog.attempt_count = 0;
      await attemptLog.save();
    }

    const existingLog = await Login_Logs_Model.findOne({
      where: { user_id: user.id },
    });

    if (!existingLog) {
      await Login_Logs_Model.create({
        session_id: req.session.id,
        user_id: user.id,
        ip_address: ip,
        browser_info: browserInfo,
        verify: true,
      });
    } else if (
      existingLog.ip_address !== ip ||
      existingLog.browser_info !== browserInfo
    ) {
      const randomOTP = generateRandomOTP();
      const expiresAt = moment().add(3, "minutes").toDate();

      await OTP_Model.create({
        valid_code: randomOTP,
        mail: user.email,
        createdAt: moment().toDate(),
        expiresAt: expiresAt,
      });

      mailNewLocation(user.email, randomOTP, ip, browserInfo);

      return res.status(403).json({
        message:
          "Login attempt from a different location. Please verify your identity with the OTP.",
      });
    } else {
      await Login_Logs_Model.update(
        {
          session_id: req.session.id,
          ip_address: ip,
          browser_info: browserInfo,
          verify: true,
        },
        { where: { user_id: user.id } }
      );
    }

    req.session.user = { id: user.id };

    return new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) reject(err);
        else resolve();
      });
    })
      .then(() => {
        return res.status(200).json({
          message: "Login successful.",
          user,
          sessionId: encrypt(req.session.id),
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    return res.status(500).json({
      message: "The server is down. Please try again later.",
    });
  }
};

exports.postVerifyOtp = async (req, res, next) => {
  try {
<<<<<<< HEAD
   
    const { otp, ip, browserInfo } = req.body;

     
=======
    const { otp, ip, browserInfo } = req.body;

>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    if (!ip || !browserInfo || !isValidEncryptedOTP(otp)) {
      return res.status(400).json({
        message:
          "Invalid entry: IP, browser information, and a non-empty encrypted OTP are required.",
      });
    }

    const decryptedOtp = decrypt(req.body.otp);
    const decryptedIp = decrypt(req.body.ip);
    const decryptedBrowserInfo = decrypt(req.body.browserInfo);

    const otpRecord = await OTP_Model.findOne({
      where: { valid_code: decryptedOtp },
    });

    if (!otpRecord) {
<<<<<<< HEAD
     
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const currentTime = moment().tz("Asia/Manila");
    const otpCreationTime = moment(otpRecord.createdAt).tz("Asia/Manila");
    if (currentTime.isAfter(otpCreationTime.add(3, "minutes"))) {
<<<<<<< HEAD
      
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      return res.status(400).json({ message: "OTP has expired" });
    }

    await otpRecord.update({ used: true });

<<<<<<< HEAD
    
    const sessionId = req.session.id;

    
=======
    const sessionId = req.session.id;

>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    await Login_Logs_Model.create({
      session_id: sessionId,
      ip_address: decryptedIp,
      browser_info: decryptedBrowserInfo,
      verify: true,
<<<<<<< HEAD
      user_id: sessionId, 
    });

    
=======
      user_id: sessionId,
    });

>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const encryptedSessionId = encrypt(sessionId);

<<<<<<< HEAD
    

=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    return res.status(200).json({
      message: "OTP verification successful",
      sessionId: encryptedSessionId,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};

exports.postLogout = async (req, res, next) => {
  try {
    const { sessionId: encryptedSessionId } = req.body;

<<<<<<< HEAD
    
    const sessionId = decrypt(encryptedSessionId);

    
=======
    const sessionId = decrypt(encryptedSessionId);

>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    if (!encryptedSessionId) {
      return res.status(400).json({
        message: "Invalid entry: Session ID is required.",
      });
    }

<<<<<<< HEAD
     Use
    const Session = connections.models.Session; 
    const session = await Session.findOne({ where: { session_id: sessionId } });

    if (session) {
      
=======
    Use;
    const Session = connections.models.Session;
    const session = await Session.findOne({ where: { session_id: sessionId } });

    if (session) {
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      const loginLog = await Login_Logs_Model.findOne({
        where: { session_id: session.session_id },
      });

<<<<<<< HEAD
      
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      if (loginLog) {
        await loginLog.destroy();
      }

      await session.destroy();

      res.status(200).json({
        message: "Logout successful, session and login log destroyed.",
      });
    } else {
      res.status(404).json({ message: "Session not found." });
    }
  } catch (error) {
    a;
    console.error("Error in postLogout:", error);
    res.status(500).json({
      message: "An error occurred while processing the logout request.",
    });
  }
};

exports.PostRegister = [
<<<<<<< HEAD
 
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),
  body("name").trim().notEmpty().withMessage("Name is required."),

  async (req, res, next) => {
    try {
<<<<<<< HEAD
      
      

      
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      const decryptedUsername = decrypt(req.body.username);
      const decryptedPassword = decrypt(req.body.password);
      const decryptedEmail = decrypt(req.body.email);
      const decryptedName = decrypt(req.body.name);

<<<<<<< HEAD
      
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

<<<<<<< HEAD
     

      
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      const existingEmail = await UserModel.findOne({
        where: { email: decryptedEmail },
      });
      if (existingEmail) {
        return res.status(409).json({ message: "Email already exists." });
      }

<<<<<<< HEAD
      
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      const existingUsername = await UserModel.findOne({
        where: { username: decryptedUsername },
      });
      if (existingUsername) {
        return res.status(409).json({ message: "Username already exists." });
      }

<<<<<<< HEAD
      
      const hashedPassword = await bcrypt.hash(decryptedPassword, 10);

      
=======
      const hashedPassword = await bcrypt.hash(decryptedPassword, 10);

>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      const newUser = await UserModel.create({
        username: decryptedUsername,
        password: hashedPassword,
        email: decryptedEmail,
        name: decryptedName,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

<<<<<<< HEAD

       
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
      return res
        .status(201)
        .json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  },
];
<<<<<<< HEAD



exports.PostRegister = async (req, res, next) => {
  try {
    // Log the incoming request
    console.log("Incoming request body:", req.body);

    // Decrypt each field separately
    const decryptedUsername = decrypt(req.body.username);
    const decryptedPassword = decrypt(req.body.password);
    const decryptedEmail = decrypt(req.body.email);
    const decryptedName = decrypt(req.body.name);

    // Log the decrypted data
    console.log("Decrypted username:", decryptedUsername);
    console.log("Decrypted password:", decryptedPassword);
    console.log("Decrypted email:", decryptedEmail);
    console.log("Decrypted name:", decryptedName);

    // Check for null values
    if (
      !decryptedUsername ||
      !decryptedPassword ||
      !decryptedEmail ||
      !decryptedName
    ) {
      console.error("Decrypted data is missing required fields");
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email already exists
    const existingEmail = await UserModel.findOne({
      where: { email: decryptedEmail },
    });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // Check if username already exists
    const existingUsername = await UserModel.findOne({
      where: { username: decryptedUsername },
    });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(decryptedPassword, 10);

    // Create a new user in the database
    const newUser = await UserModel.create({
      username: decryptedUsername,
      password: hashedPassword,
      email: decryptedEmail,
      name: decryptedName,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("User created:", newUser);

    // Send a 201 Created response
    return res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
=======
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
