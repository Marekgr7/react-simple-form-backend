const BookedEventParticipant = require("../models/BookedEventParticipant");

const saveNewParticipantInDb = async ({
  participantFirstName,
  participantLastName,
  participantEmailAddress,
}) => {
  const newParticipant = {
    firstName: participantFirstName,
    lastName: participantLastName,
    emailAddress: participantEmailAddress,
  };
  return await BookedEventParticipant.create(newParticipant);
};

module.exports = {
  saveNewParticipantInDb,
};
