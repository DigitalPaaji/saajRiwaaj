const Offer = require('../models/OfferModel');

// Create an offer
exports.createOffer = async (req, res) => {
  try {
    const { title, image } = req.body;
    const slug = title.toLowerCase().replace(/ /g, "-");

    const offer = await Offer.create({ title, slug, image });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: "Error creating offer" });
  }
};

// Get all offers
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({});
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching offers" });
  }
};

// Get offer by slug
exports.getOfferBySlug = async (req, res) => {
  try {
    const offer = await Offer.findOne({ slug: req.params.slug });
    if (!offer) return res.status(404).json({ error: "Offer not found" });

    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
