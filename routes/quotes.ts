import express from "express";
import { Request, Response } from "express";
import Fuse from "fuse.js";
import { Quote } from "../models";

const router = express.Router();

// fuse module search options
var fuse = (arr: Object[]) =>
  new Fuse(arr, {
    threshold: 0.5,
    distance: 500,
    keys: ["quote"]
  });

// Get all quotes
router.get("/all", (req: Request, res: Response) => {
  Quote.find({})
    .then(quotes => res.send(quotes))
    .catch(err => res.status(400).send(err));
});

// Get random quote(s)
router.get("/random", (req: Request, res: Response) => {
  const count = parseInt(req.query.count);

  const sendNRandomQuotes = (n: Number, isList: Boolean = true) => {
    Quote.aggregate([{ $sample: { size: n } }])
      .then(quotes => res.send(isList ? quotes : quotes[0]))
      .catch(err => res.status(400).send(err));
  };

  // count is empty or not a number - defaults to 1
  if (!req.query.count) {
    sendNRandomQuotes(1, false);
    return;
    // count is out of range
  } else if (count <= 0 || count > 10 || isNaN(count)) {
    res.status(400).send("Count must be number 1 - 10");
    return;
    // count is in range
  } else {
    sendNRandomQuotes(count);
    return;
  }
});

// Get list quotes w/ search term
router.get("/search", (req: Request, res: Response) => {
  var q = req.query.q;

  if (q === undefined) {
    res.status(400).send("Missing query parameter");
    return;
  }
  Quote.find({}).then(quotes => {
    res.send(
      fuse(quotes)
        .search(q)
        .map(i => i.item)
    );
  });
});

export default router;
