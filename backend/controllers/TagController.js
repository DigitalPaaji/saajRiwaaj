const Tag = require('../models/TagModel');

exports.createTag = async (req, res) => {
    try {
        const tag = await Tag.create({ name: req.body.name });
        res.status(201).json(tag);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTags = async (req, res) => {
    const tags = await Tag.find();
    res.json({tags});
};

exports.updateTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        res.json(tag);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTag = async (req, res) => {
    await Tag.findByIdAndDelete(req.params.id);
    res.json({ message: "Tag deleted" });
};
