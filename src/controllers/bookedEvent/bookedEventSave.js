const bookedEventService = require("../../services/bookedEventService");
const bookedEventParticipantService = require("../../services/bookedEventParticipantService");

const bookedEventSave = async (req, res) => {
  const {
    participantFirstName,
    participantLastName,
    participantEmailAddress,
    eventDate,
  } = req.body;

  try {
    const newBookedEventParticipant =
      await bookedEventParticipantService.saveNewParticipantInDb({
        participantFirstName,
        participantLastName,
        participantEmailAddress,
      });

    await bookedEventService.saveNewEventInDb({
      participantId: newBookedEventParticipant.dataValues.id,
      eventDate: eventDate,
    });
  } catch (err) {
    // After logger will be created, log error
    return res.status(500).send("Something went wrong. Please try again");
  }

  return res.status(201).send({
    message: "Event successfully created",
  });
};

module.exports = bookedEventSave;
