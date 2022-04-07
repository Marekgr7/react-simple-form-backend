const Sequelize = require("sequelize");
const sequelize = require("../dbConfig");

const Model = Sequelize.Model;

class BookedEvent extends Model {}

BookedEvent.init(
  {
    eventDate: {
      type: Sequelize.DATE,
      required: true,
    },
  },
  {
    sequelize,
    modulName: "bookedEvent",
  }
);

module.exports = BookedEvent;

// module.exports = (sequelize, DataTypes) => {
//   const BookedEvent = sequelize.define("BookedEvent", {
//     eventDate: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

//   BookedEvent.associate = (models) => {
//     BookedEvent.hasOne(models.BookedEventParticipant);
//   };

//   return BookedEvent;
// };
