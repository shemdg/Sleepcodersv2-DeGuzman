const { Op } = require("sequelize");
const EventsModel = require("../model/Events");
const moment = require("moment");


const encrypt = require("../util/encrypt");
const decrypt = require("../util/decrypt");

exports.FetchSpecificDateEvent = async (req, res, next) => {
  try {
    
    const { date } = req.body;
    

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Invalid entry: Request body is required.",
      });
    }

    if (!date) {
      return res.status(400).json({
        message: "Invalid entry: Date is required.",
      });
    }

    
    const events = await EventsModel.findAll({
      where: {
        date: {
          [Op.gte]: new Date(date).setHours(0, 0, 0, 0), 
          [Op.lt]: new Date(date).setHours(23, 59, 59, 999), 
        },
      },
    });



    
    const encryptedEvents = encrypt(JSON.stringify(events)); 

    
    return res.status(200).json({
      status: "success",
      message:
        events.length === 0
          ? "No events found for the specified date."
          : undefined, 
      data: encryptedEvents, 
    });
  } catch (error) {
    
    console.error("Error fetching events:", error); 
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching events.",
      error: error.message, 
    });
  }
};

exports.PostDateEvent = async (req, res, next) => {
  try {

    const { title, address, imghref, date, timeSlot, performer, description } =
      req.body;


 


    const requiredFields = { title, address, date, timeSlot };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === null || value === undefined || value === "") {
        console.error(`${key} is missing or null.`);
        return res.status(400).json({ error: `${key} is required.` });
      }
    }

    
    const decryptedTitle = decrypt(title);
    const decryptedAddress = decrypt(address);
    const decryptedImghref = decrypt(imghref);
    const decryptedDate = decrypt(date);
    const decryptedTimeSlot = decrypt(timeSlot);
    const decryptedPerformer = decrypt(performer);
    const decryptedDescription = decrypt(description);

    
    const decryptedValues = {
      title: decryptedTitle,
      address: decryptedAddress,
      imghref: decryptedImghref,
      date: decryptedDate,
      timeSlot: decryptedTimeSlot,
      performer: decryptedPerformer,
      description: decryptedDescription,
    };

    for (const [key, value] of Object.entries(decryptedValues)) {
      if (value === null || value === undefined) {
        console.error(`Decryption error for ${key}.`);
        return res.status(400).json({ error: `Failed to decrypt ${key}.` });
      }
    }

    

   
    const phTime = moment().utcOffset(480); 

    
    const eventData = {
      title: decryptedValues.title,
      description: decryptedValues.description,
      imghref: decryptedValues.imghref,
      date: decryptedValues.date,
      time: decryptedTimeSlot, 
      member: decryptedValues.performer, 
      address: decryptedValues.address,
    };

    
    const event = await EventsModel.create(eventData);

    
    res.status(200).json({ message: "Event created successfully!", event });
  } catch (error) {
    
   
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
