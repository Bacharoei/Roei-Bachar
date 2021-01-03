const express = require("express");
const connectDB = require('./config/db');
const cors = require("cors");
const path = require('path')


const app = express();

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));


app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));


const PORT = process.env.PORT || 5000;

//Serve static assets in prod

// if( process.env.NODE_ENV === 'production') { 
//   // set static folder
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }

  
app.listen(PORT, () =>
    console.log(`server started on port http://localhost:${PORT}`)
  );
  