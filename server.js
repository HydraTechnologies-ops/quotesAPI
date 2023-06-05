const express = require("express");
const morgan = require("morgan");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  const quoter = {
    quote: randomQuote,
  };
  res.send(quoter);
});

app.get("/api/quotes", (req, res, next) => {
  const request = req.query.person;
  const quote = quotes;
  let quotesArray;
  const getQuotes = {
    quotes: [],
  };

  if (request === "") {
    console.log("Empty");
    quotes.forEach((quote) => {
      getQuotes.quotes.push(quote);
    });
    res.send(getQuotes);
  } else {
    console.log("Hmm");
    quote.filter((item) => {
      if (item.person == request) {
        getQuotes.quotes.push(item);
      }
    });
    res.send(getQuotes);
  }
});

app.post("/api/quotes", (req, res, next) => {
  const request = req.query;
  const postQuote = {
    quote: {}
  }
  if(request.quote === '' || request.person === '') { 
    console.log('Bad');
    res.status(400).send('Need Both');
  } else {
    postQuote.quote.quote = request.quote;
    postQuote.quote.person = request.person;
    res.status(200).send(postQuote);
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
