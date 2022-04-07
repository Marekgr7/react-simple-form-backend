const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const checkValidationErrors = require("../middleware/checkValidationErrors");
const bookedEventControllers = require("../controllers/bookedEvent/bookedEventControllers");
// const customValidators = require("../utils/customValidators");
// CODE REPETITION INFORMATION
// bug related with custom validators (express-validator)
// https://github.com/express-validator/express-validator/issues/619
// cannot use custom validation functions from outside of validation rules
// it returns ,,Invalid value" for every single value which is being checked

const postEventValidation = [
  check("participantFirstName")
    .notEmpty()
    .withMessage("Participant first name must be provided")
    .bail()
    .custom((_, { req }) => {
      if (req.body.participantFirstName.includes(" ")) {
        throw new Error(`First name should not include spaces`);
      } else {
        return true;
      }
    }),
  check("participantLastName")
    .notEmpty()
    .withMessage("Participant last name must be provided")
    .bail()
    .custom((_, { req }) => {
      if (req.body.participantLastName.includes(" ")) {
        throw new Error(`Last name should not include spaces`);
      } else {
        return true;
      }
    }),
  check("participantEmailAddress")
    .notEmpty()
    .withMessage("Participant e-mail address must be provided")
    .bail()
    .isEmail()
    .withMessage("Provided e-mail address is invalid"),
  check("eventDate")
    .notEmpty()
    .withMessage("Event date must be provided")
    .bail()
    .isISO8601()
    .withMessage("Provided event date is invalid")
    .bail()
    .custom((_, { req }) => {
      const eventDate = req.body.eventDate;
      if (new Date(eventDate).getTime() < new Date().getTime()) {
        throw new Error("Event date should be ahead from date now");
      } else {
        return true;
      }
    }),
];

router.post(
  "/",
  ...postEventValidation,
  checkValidationErrors,
  bookedEventControllers.bookedEventSave
);

module.exports = router;
