const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");
const quotesRouter = require("./routes/quotes/quotesRouter");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.use('/api/quotes', quotesRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
