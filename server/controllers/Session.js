const connection = require("../database/connection");
const decrypt = require("../util/decrypt");
const { QueryTypes } = require("sequelize");

exports.findSession = async (req, res, next) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({
      message: "Invalid entry: Session ID is required.",
    });
  }

  try {
    const decryptedSessionId = decrypt(sessionId);

    if (!decryptedSessionId) {
      return res.status(400).json({ error: "Invalid session ID." });
    }

    const session = await connection.query(
      `SELECT * FROM sessions WHERE session_id = :sessionId AND expires > NOW()`,
      {
        replacements: { sessionId: decryptedSessionId },
        type: QueryTypes.SELECT,
      }
    );

    if (session.length > 0) {
      return res.status(200).json({ message: "Session is valid." });
    } else {
      return res.status(401).json({ error: "Session expired or invalid." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
