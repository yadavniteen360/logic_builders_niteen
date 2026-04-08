const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Application = require('../models/Application');
const router = express.Router();

// Apply to campaign (influencer only)
router.post('/', protect, async (req, res) => {
  if (req.user.role !== 'influencer') return res.status(403).json({ message: 'Only influencers can apply' });
  const { campaignId } = req.body;
  try {
    const existing = await Application.findOne({ influencer: req.user._id, campaign: campaignId });
    if (existing) return res.status(400).json({ message: 'You have already applied to this campaign' });

    const application = new Application({
      influencer: req.user._id,
      campaign: campaignId
    });
    const saved = await application.save();
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Already applied' });
    res.status(500).json({ message: error.message });
  }
});

// Influencer views their applications
router.get('/my-applications', protect, async (req, res) => {
  if (req.user.role !== 'influencer') return res.status(403).json({ message: 'Forbidden' });
  try {
    const apps = await Application.find({ influencer: req.user._id })
      .populate({ path: 'campaign', populate: { path: 'brand', select: 'name' }})
      .sort('-createdAt');
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Brand views applications for their campaigns
router.get('/for-brand', protect, async (req, res) => {
  if (req.user.role !== 'brand') return res.status(403).json({ message: 'Forbidden' });
  try {
    const apps = await Application.find()
      .populate({ path: 'campaign', match: { brand: req.user._id }})
      .populate('influencer', 'name email followers niche login')
      .sort('-createdAt');
      
    // Filter out apps where campaign is null (meaning it belongs to a different brand)
    const validApps = apps.filter(app => app.campaign !== null);
    res.json(validApps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update application status (brand only)
router.put('/:id/status', protect, async (req, res) => {
  if (req.user.role !== 'brand') return res.status(403).json({ message: 'Forbidden' });
  const { status } = req.body;
  try {
    const application = await Application.findById(req.params.id).populate('campaign');
    if (!application) return res.status(404).json({ message: 'Application not found' });
    
    // Verify brand owns the campaign
    if (application.campaign.brand.toString() !== req.user._id.toString()) {
       return res.status(403).json({ message: 'Not allowed to modify this application' });
    }

    application.status = status;
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
