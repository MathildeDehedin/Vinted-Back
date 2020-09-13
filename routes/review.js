const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const app = express();
app.use(formidable());
const isAuthenticated = require("../middleware/isAuthenticated");
const Review = require("../model/Review");
const Ad = require("../model/Ad");
const User = require("../model/User");
const user = require("../routes/user");
const ad = require("../routes/ad");

router.post("/post-review/:id", isAuthenticated, async (req, res) => {
  try {
    const ratingNumber = req.fields.ratingNumber;
    const description = req.fields.description;
    if (req.params.id) {
      // on recherche le vendeur
      const sellerFounded = await User.findById(req.params.id).populate(
        "reviews"
      );
      //console.log(sellerFounded);
      if (!ratingNumber) {
        res.status(400).json({ message: "Entrez une note d'évaluation" });
      } else {
        let obj = {};
        if (description) {
          //console.log("description");
          obj.description = description;
        } else {
          //console.log("sans description");
          obj.description = "Rien à ajouter";
        }
        obj.ratingNumber = ratingNumber;
        obj.creator = req.user._id;
        obj.created = new Date();
        const newReview = new Review(obj);
        await newReview.save();
        // on push les reviews dans le user vendeur
        sellerFounded.reviews.push(newReview);
        await sellerFounded.save();
        res.status(200).json(sellerFounded);
      }
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
