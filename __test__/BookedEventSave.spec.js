const request = require("supertest");
const app = require("../src/app.js");
const BookedEvent = require("../src/models/BookedEvent");
const BookedEventParticipant = require("../src/models/BookedEventParticipant");
const sequelize = require("../src/dbConfig.js");

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(async () => {
  await BookedEvent.destroy({ truncate: true });
  await BookedEventParticipant.destroy({ truncate: true });
});

const validBookedEvent = {
  participantFirstName: "Testname",
  participantLastName: "Suername",
  participantEmailAddress: "test@test.com",
  eventDate: "2100-04-01T07:47:04.909Z",
};

const postBookedEvent = async (bookedEvent = validBookedEvent) => {
  return request(app).post("/api/booked-events").send(bookedEvent);
};

describe("Event saving", () => {
  it("returns 200 OK when booked event save request is valid", async () => {
    const response = await postBookedEvent();
    expect(response.status).toBe(201);
  });

  it("returns success when event booked save request is valid", async () => {
    const response = await postBookedEvent();
    expect(response.body.message).toBe("Event successfully created");
  });

  it("saves new participant and event in database", async () => {
    await postBookedEvent();
    const eventsList = await BookedEvent.findAll();
    const savedEvent = eventsList[0];
    const participantsList = await BookedEventParticipant.findAll();
    const savedParticipant = participantsList[0];

    expect(savedParticipant.firstName).toBe(
      validBookedEvent.participantFirstName
    );
    expect(savedParticipant.lastName).toBe(
      validBookedEvent.participantLastName
    );
    expect(savedParticipant.emailAddress).toBe(
      validBookedEvent.participantEmailAddress
    );

    expect(savedEvent.BookedEventParticipantId.toString()).toBe(
      savedParticipant.id.toString()
    );
    expect(new Date(savedEvent.eventDate).getTime()).toBe(
      new Date(validBookedEvent.eventDate).getTime()
    );
  });

  it.each`
    field                        | value                         | expectedMessage
    ${"participantFirstName"}    | ${undefined}                  | ${"Participant first name must be provided"}
    ${"participantFirstName"}    | ${null}                       | ${"Participant first name must be provided"}
    ${"participantFirstName"}    | ${""}                         | ${"Participant first name must be provided"}
    ${"participantLastName"}     | ${undefined}                  | ${"Participant last name must be provided"}
    ${"participantLastName"}     | ${null}                       | ${"Participant last name must be provided"}
    ${"participantLastName"}     | ${""}                         | ${"Participant last name must be provided"}
    ${"participantEmailAddress"} | ${undefined}                  | ${"Participant e-mail address must be provided"}
    ${"participantEmailAddress"} | ${""}                         | ${"Participant e-mail address must be provided"}
    ${"participantEmailAddress"} | ${null}                       | ${"Participant e-mail address must be provided"}
    ${"participantEmailAddress"} | ${"user.mail.com"}            | ${"Provided e-mail address is invalid"}
    ${"participantEmailAddress"} | ${"user@mail"}                | ${"Provided e-mail address is invalid"}
    ${"eventDate"}               | ${undefined}                  | ${"Event date must be provided"}
    ${"eventDate"}               | ${""}                         | ${"Event date must be provided"}
    ${"eventDate"}               | ${null}                       | ${"Event date must be provided"}
    ${"eventDate"}               | ${"20-19-1994"}               | ${"Provided event date is invalid"}
    ${"eventDate"}               | ${"2022-03-01T07:47:04.909Z"} | ${"Event date should be ahead from date now"}
  `(
    "returns $expectedMessage when $field is $value",
    async ({ field, value, expectedMessage }) => {
      const validEvent = {
        ...validBookedEvent,
      };

      validEvent[field] = value;
      const response = await postBookedEvent(validEvent);
      const body = response.body;
      expect(body.validationErrors[field]).toBe(expectedMessage);
    }
  );
});
