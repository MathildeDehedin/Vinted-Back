const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const stripe = require("stripe")(process.env.STRIPE_KEY);

const user = require("../routes/user");
const Ad = require("../model/Ad");
const User = require("../model/User");

const app = express();
app.use(formidable({ multiples: true }));

const isAuthenticated = require("../middleware/isAuthenticated");

cloudinary.config({
  cloud_name: "dbxmpuzvk",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/ad/publish", isAuthenticated, async (req, res) => {
  try {
    // console.log("fields", req.fields);
    //console.log("files", req.files);
    const price = req.fields.price;
    const description = req.fields.description;
    const title = req.fields.title;
    const tabKeysPicture = Object.keys(req.files);
    const condition = req.fields.condition;
    const brand = req.fields.brand;
    const size = req.fields.size;
    let results = {};
    if (
      tabKeysPicture &&
      price &&
      description &&
      title &&
      condition &&
      brand &&
      size
    ) {
      if (title.length > 3) {
        if (description.length > 10) {
          if (tabKeysPicture.length >= 1 && tabKeysPicture.length <= 5) {
            tabKeysPicture.forEach(async (fileKey) => {
              const file = req.files[fileKey];
              const result = await cloudinary.uploader.upload(file.path);
              console.log("result", result);
              results[fileKey] = {
                success: true,
                result: result,
              };
              if (Object.keys(results).length === tabKeysPicture.length) {
                const newAd = new Ad({
                  title: title,
                  description: description,
                  price: price,
                  picture: [result.secure_url],
                  creator: req.user._id,
                  created: new Date(),
                  condition: condition,
                  brand: brand,
                  size: size,
                });
                await newAd.save();
                const user = await User.findById(req.user._id);
                let articles = user.articles;
                articles.push(newAd._id);
                await User.findByIdAndUpdate(req.user._id, {
                  articles: articles,
                });
                res.status(200).json({
                  id: newAd.id,
                  title: newAd.title,
                  description: newAd.description,
                  price: newAd.price,
                  picture: newAd.picture,
                  condition: newAd.condition,
                  brand: newAd.brand,
                  size: newAd.size,
                  creator: req.user.username,
                });
              }
            });
          } else {
            res.status(400).json({
              message:
                "To post an add, please use minimum 1 picture and maximum 5 pictures",
            });
          }
        } else {
          res.status(400).json({
            message: "Use more than 10 caracters for the description",
          });
        }
      } else {
        res
          .status(400)
          .json({ message: "Use more than 3 caracters for the title" });
      }
    } else {
      res.status(400).json({
        message:
          "To post an add, please enter a price, a description, a picture, a title and the informations regarding the product to sell (condition, brand, size)",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/ad", async (req, res) => {
  try {
    const ad = await Ad.find().populate("creator").sort({ created: "desc" });
    //console.log(ad);
    let adTab = [];
    for (let i = 0; i < ad.length; i++) {
      if (ad[i].purchased !== true) {
        console.log(ad[i].purchased);
        adTab.push(ad[i]);
      }
    }
    return res.status(200).json(adTab);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/ad/informations/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const ad = await Ad.findById(req.params.id).populate({
        path: "creator",
        populate: {
          path: "reviews",
        },
      });

      res.status(200).json(ad);
    } else {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/ad/publish/update/:id", isAuthenticated, async (req, res) => {
  try {
    if (req.params.id) {
      if (
        req.fields.title ||
        req.fields.description ||
        req.fields.price ||
        req.fields.brand ||
        req.fields.condition ||
        req.fields.size ||
        req.files.picture
      ) {
        if (req.fields.title) {
          const adFounded = await Ad.findByIdAndUpdate(req.params.id, {
            title: req.fields.title,
          });
          await adFounded.save();
        }
        if (req.fields.description) {
          const adFounded = await Ad.findByIdAndUpdate(req.params.id, {
            description: req.fields.description,
          });
          await adFounded.save();
        }
        if (req.fields.price) {
          const adFounded = await Ad.findByIdAndUpdate(req.params.id, {
            price: req.fields.price,
          });
          await adFounded.save();
        }
        if (req.files.picture) {
          const adFounded = await Ad.findById(req.params.id);
          const result = await cloudinary.uploader.upload(
            req.files.picture.path
          );

          adFounded.picture.splice(adFounded.picture.length - 1, 1);
          adFounded.picture.unshift(result.secure_url);
          await adFounded.save();
        }
        if (req.fields.brand) {
          const adFounded = await Ad.findByIdAndUpdate(req.params.id, {
            brand: req.fields.brand,
          });
          await adFounded.save();
        }
        if (req.fields.condition) {
          const adFounded = await Ad.findByIdAndUpdate(req.params.id, {
            condition: req.fields.condition,
          });
          await adFounded.save();
        }
        if (req.fields.size) {
          const adFounded = await Ad.findByIdAndUpdate(req.params.id, {
            size: req.fields.size,
          });
          await adFounded.save();
        }
        res.status(200).json({ message: "Your offer has been updated" });
      } else {
        res.status(400).json({
          message: "Changes unauthorized",
        });
      }
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/ad/delete/:id", isAuthenticated, async (req, res) => {
  try {
    if (req.params.id) {
      const ad = await Ad.findById(req.params.id);
      await ad.deleteOne();
      res.status(200).json({ message: "Ad deleted" });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/ad/sort", async (req, res) => {
  try {
    const filters = {};
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i");
    }
    if (req.query.priceMin) {
      filters.price = {
        $gte: req.query.priceMin,
      };
    }
    if (req.query.priceMax) {
      if (filters.price) {
        filters.price.$lte = req.query.priceMax;
      } else {
        filters.price = {
          $lte: req.query.priceMax,
        };
      }
    }
    let sort = {};
    if (req.query.sort === "date-asc") {
      sort = { created: "asc" };
    } else if (req.query.sort === "date-desc") {
      sort = { created: "desc" };
    }
    if (req.query.sort === "price-asc") {
      sort = { price: "asc" };
    } else if (req.query.sort === "price-desc") {
      sort = { price: "asc" };
    }

    const ad = await Ad.find(filters).sort(sort).populate("creator");
    res.status(200).json(ad);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/ad/user/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const userFounded = await User.findById(req.params.id).populate(
        "articles"
      );
      if (!userFounded) {
        res.status(200).json({ message: "User not founded" });
      } else {
        res.status(200).json(userFounded);
      }
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/payment/:id", isAuthenticated, async (req, res) => {
  try {
    if (req.params.id) {
      // on récupère l'annonce id et son créateur (vendeur)
      const adFounded = await Ad.findById(req.params.id).populate("creator");
      //console.log(adFounded.creator);
      const stripeToken = req.fields.stripeToken;
      const response = await stripe.charges.create({
        amount: adFounded.price * 100 + 3,
        currency: "eur",
        description:
          "Votre achat concerne : " +
          adFounded.title +
          " " +
          adFounded.description +
          " à " +
          adFounded.creator.username,
        source: "tok_mastercard",
      });
      // on passe à true l'annonce
      const adPurchased = await Ad.findByIdAndUpdate(req.params.id, {
        purchased: true,
      });
      // push ad dans commandes dans le isAuthenticated : Acheteur
      let commandes = req.user.commandes;
      commandes.push(adFounded);
      await User.findByIdAndUpdate(req.user._id, {
        commandes: commandes,
      });
      // PUSH DANS ventes (vendeur)
      let ventes = adFounded.creator.ventes;
      ventes.push(adFounded);
      await User.findByIdAndUpdate(adFounded.creator._id, {
        ventes: ventes,
      });
      console.log(adFounded.creator);
      //console.log();
      res.status(200).json({ message: "Achat confirmé" });
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
