const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Campaign = require('../models/Campaign');
const router = express.Router();

// Get all campaigns (public) with optional niche filter
router.get('/', async (req, res) => {
  const { niche } = req.query;
  const filter = niche ? { niche } : {};
  try {
    const campaigns = await Campaign.find(filter).populate('brand', 'name location').sort('-createdAt');
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create campaign (brand only)
router.post('/', protect, async (req, res) => {
  if (req.user.role !== 'brand') {
    return res.status(403).json({ message: 'Only brands can create campaigns' });
  }
  try {
    const campaign = new Campaign({
      ...req.body,
      brand: req.user._id
    });
    const createdCampaign = await campaign.save();
    res.status(201).json(createdCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get brand's own campaigns
router.get('/my-campaigns', protect, async (req, res) => {
  if (req.user.role !== 'brand') return res.status(403).json({ message: 'Forbidden' });
  try {
    const campaigns = await Campaign.find({ brand: req.user._id }).sort('-createdAt');
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
