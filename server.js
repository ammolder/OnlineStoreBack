const mongoose = require("mongoose");
const app = require("./src/app");
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT || 3000, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((er) => {
    console.log(er.message);
    process.exit(1);
  });
