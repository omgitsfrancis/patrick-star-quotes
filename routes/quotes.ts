import express from "express";
import { Request, Response } from "express";
import Fuse from "fuse.js";
import quotes from "../quotes.json";

const router = express.Router();

var fuse = new Fuse(quotes, {
  threshold: 0.5,
  distance: 500,
  includeScore: true,
  keys: ["quote"]
});

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

// get all quotes
router.get("/all", (req: Request, res: Response) => {
  res.send(quotes.map(i => i.quote));
});

// Get random quote(s)
router.get("/random", (req: Request, res: Response) => {
  var count = parseInt(req.query.count);
  var randomIndex = getRandomInt(quotes.length);

  // count is empty or not a number
  if (!req.query.count) {
    res.send(quotes[randomIndex].quote);
    return;
  // count is out of range
  } else if (count <= 0 || count > 10 || isNaN(count)) {
    res.status(400).send("Count must be number 1 - 10");
    return;
  // count is in range
  } else {
    var randomIndexes: number[] = [];
    for (var i = 0; i < count; i++) {
      while (randomIndexes.indexOf(randomIndex) != -1) {
        randomIndex = getRandomInt(quotes.length);
      }
      randomIndexes.push(randomIndex);
    }

    res.send(randomIndexes.map(i => quotes[i].quote));
  }
});

// Search quotes and return list of results
router.get("/search", (req: Request, res: Response) => {
  var q = req.query.q;

  if(q === undefined) {
    res.status(400).send('Missing query parameter')
    return;
  } 

  res.send(fuse.search(req.query.q).map(i => i.item.quote));
});

export default router;
