const express = require("express");
const { createOffer, getOffers, getOfferBySlug } = require("../controllers/OfferController");

const router = express.Router();

router.post("/", createOffer);          // Create
router.get("/", getOffers);             // All
router.get("/:slug", getOfferBySlug);   // Single by slug

module.exports = router;
