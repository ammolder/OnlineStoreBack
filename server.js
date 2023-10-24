const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

// const mongoose = require("mongoose");
// const app = require("./app");
// const { DB_HOST, PORT = 3000 } = process.env;

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//     console.log("Database connection successful");
//   })
//   .catch((er) => {
//     console.log(er.message);
//     process.exit(1);
//   });
