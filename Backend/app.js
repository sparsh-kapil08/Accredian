const express = require("express");
const cors = require("cors");
const pool = require("./db.js");
const app = express();
const mode="developmen";

app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/info", async (req, res) => {
  try {
    const { name, phone, email, ticket, domain } = req.body;

    const resp = await pool.query(
      `INSERT INTO users(name, phone, email, ticket, domain) VALUES($1, $2, $3, $4, $5) RETURNING id;`,
      [name, phone, email, ticket, domain]
    );

    res.status(200).json({ message: "Done", id: resp.rows[0]?.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error", error: error.message });
  }
});
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});
if(mode==="development"){
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    });
}else{
    module.exports = app;
}
