const app = require("./src/app.js");
const sequelize = require("./src/dbConfig.js");
const config = require("config");

const appConfig = config.get("app");
const PORT = process.env.PORT || appConfig.port;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
});
