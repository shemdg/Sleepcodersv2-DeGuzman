const connection = require("../database/connection");
const decrypt = require("../util/decrypt");
const { QueryTypes } = require("sequelize");

<<<<<<< HEAD

exports.findSession = async (req, res, next) => {
  const { sessionId } = req.body; 
 


   
   if (!sessionId) {
=======
exports.findSession = async (req, res, next) => {
  const { sessionId } = req.body;

  if (!sessionId) {
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    return res.status(400).json({
      message: "Invalid entry: Session ID is required.",
    });
  }

<<<<<<< HEAD
  
  try {
   
    const decryptedSessionId = decrypt(sessionId);
   

    
    if (!decryptedSessionId) {
      
      return res.status(400).json({ error: "Invalid session ID." });
    }

    
    
=======
  try {
    const decryptedSessionId = decrypt(sessionId);

    if (!decryptedSessionId) {
      return res.status(400).json({ error: "Invalid session ID." });
    }

>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    const session = await connection.query(
      `SELECT * FROM sessions WHERE session_id = :sessionId AND expires > NOW()`,
      {
        replacements: { sessionId: decryptedSessionId },
        type: QueryTypes.SELECT,
      }
    );

<<<<<<< HEAD
   

    if (session.length > 0) {
      
      
      return res.status(200).json({ message: "Session is valid." });
    } else {
      
      
      return res.status(401).json({ error: "Session expired or invalid." });
    }
  } catch (error) {
   
    
=======
    if (session.length > 0) {
      return res.status(200).json({ message: "Session is valid." });
    } else {
      return res.status(401).json({ error: "Session expired or invalid." });
    }
  } catch (error) {
>>>>>>> 21d82abf2e86b7c5c1e7606b21fedf89d43ff238
    return res.status(500).json({ error: "Internal server error." });
  }
};
