const express = require("express");
const quotesRouter = express.Router();
const { quotes } = require("../../data");
const { getRandomElement } = require("../../utils");

quotesRouter.get("/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);

  res.send({
    quote: randomQuote,
  });
});

quotesRouter.get("/", (req, res, next) => {
  const queryParams = req.query;
  console.log(req.query);

  if (queryParams.person) {
    const quotesByPerson = quotes.filter(
      (quote) => quote.person.toLowerCase() === queryParams.person.toLowerCase()
    );
    res.send({
      quotes: quotesByPerson,
    });
  } else {
    res.send({
      quotes: quotes,
    });
  }
});

quotesRouter.post("/", (req, res, next) => {
  console.log(req.query);
  const newQuote = req.query.quote;
  const newPerson = req.query.person;
  if (newQuote && newPerson) {
    const newQuoteObj = {
      quote: newQuote,
      person: newPerson,
    };
    quotes.push(newQuoteObj);
    res.send({
      quote: quotes.find(
        (quote) => quote.person === newPerson && quote.quote === newQuote
      ),
    });
  } else {
    res.status(400).send();
  }
});

module.exports = quotesRouter;