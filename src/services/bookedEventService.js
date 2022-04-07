const BookedEvent = require("../models/BookedEvent");

const saveNewEventInDb = async ({ participantId, eventDate }) => {
  const newBookedEvent = {
    BookedEventParticipantId: participantId,
    eventDate,
  };
  await BookedEvent.create(newBookedEvent);
};

module.exports = {
  saveNewEventInDb,
};
