const { join } = require("path");
const express = require("express");

const { SCOREBOARD_URL } = process.env;
if (!SCOREBOARD_URL) throw new Error("SCOREBOARD_URL is not defined.");

const app = express();

app.get("**/flag|flag.txt", (req, res) =>
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
);

app.get("/submit", (req, res) => res.redirect(`${SCOREBOARD_URL}/flag`));
app.get("/scoreboard", (req, res) =>
  res.redirect(`${SCOREBOARD_URL}/scoreboard`)
);

app.use(express.static(join(__dirname, "..", "static")));

const port = Number.parseInt(process.env.PORT ?? "8080");
app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});
