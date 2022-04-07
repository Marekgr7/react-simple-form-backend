const Sequelize = require("sequelize");
const sequelize = require("../dbConfig");
const BookedEvent = require("./BookedEvent");

const Model = Sequelize.Model;

class BookedEventParticipant extends Model {}

BookedEventParticipant.init(
  {
    firstName: {
      type: Sequelize.STRING,
      required: true,
    },
    lastName: {
      type: Sequelize.STRING,
      required: true,
    },
    emailAddress: {
      type: Sequelize.STRING,
      required: true,
    },
  },
  {
    sequelize,
    modulName: "bookedEventParticipant",
  }
);

BookedEvent.belongsTo(BookedEventParticipant);

module.exports = BookedEventParticipant;

// module.exports = (sequelize, DataTypes) => {
//   const BookedEventParticipant = sequelize.define("BookedEventParticipant", {
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull,
//     },
//     emailAddress: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

// BookedEventParticipant.associate = (models) => {
//   BookedEvent.hasOne(models.BookedEvent);
// };

//   return BookedEventParticipant;
// };
