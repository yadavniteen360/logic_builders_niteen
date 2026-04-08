const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Application = require('../models/Application');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Campaign.deleteMany();
    await Application.deleteMany();

    // Create 3 Brands
    const createdUsers = await User.insertMany([
      { name: "EcoStyle Apparel", email: "brand1@test.com", password: "password", role: "brand", location: "New York, NY" },
      { name: "Urban Bite Kitchen", email: "brand2@test.com", password: "password", role: "brand", location: "Austin, TX" },
      { name: "TechNova Gadgets", email: "brand3@test.com", password: "password", role: "brand", location: "San Francisco, CA" },
      // Create 5 Influencers
      { name: "Sarah Stylez", email: "inf1@test.com", password: "password", role: "influencer", niche: "fashion", followers: 15400 },
      { name: "Foodie Fred", email: "inf2@test.com", password: "password", role: "influencer", niche: "food", followers: 22000 },
      { name: "Gym Jane", email: "inf3@test.com", password: "password", role: "influencer", niche: "fitness", followers: 8500 },
      { name: "Gadget Guru", email: "inf4@test.com", password: "password", role: "influencer", niche: "tech", followers: 45000 },
      { name: "Makeup Mia", email: "inf5@test.com", password: "password", role: "influencer", niche: "beauty", followers: 12000 },
    ]);

    console.log('Users Seeded');

    const brands = createdUsers.filter(u => u.role === 'brand');
    const influencers = createdUsers.filter(u => u.role === 'influencer');

    // Create 5 Campaigns
    const createdCampaigns = await Campaign.insertMany([
      { brand: brands[0]._id, title: "Summer Sustainable Collection Try-on", description: "Looking for fashion creators to review our new eco-friendly summer line.", budget: 350, requirements: "1 Reel, 3 Stories", niche: "fashion" },
      { brand: brands[1]._id, title: "New Vegan Menu Tasting", description: "Local foodies needed to taste and showcase our exciting new vegan dishes.", budget: 150, requirements: "1 TikTok, 2 Stories", niche: "food" },
      { brand: brands[2]._id, title: "SmartWatch Pro Launch", description: "Tech enthusiasts wanted to unbox and review our latest smartwatch.", budget: 500, requirements: "1 YouTube Short, 1 Reel", niche: "tech" },
      { brand: brands[0]._id, title: "Autumn Scarf Giveaway", description: "Partnering for a giveaway! We provide the products, you host.", budget: 200, requirements: "1 Feed Post (Giveaway)", niche: "fashion" },
      { brand: brands[1]._id, title: "Weekend Brunch Promo", description: "Promote our special weekend bottomless brunch to your local audience.", budget: 250, requirements: "1 Reel", niche: "food" },
    ]);

    console.log('Campaigns Seeded');

    // Create a few Applications
    await Application.insertMany([
      { influencer: influencers[0]._id, campaign: createdCampaigns[0]._id, status: 'pending' },
      { influencer: influencers[1]._id, campaign: createdCampaigns[1]._id, status: 'accepted' },
      { influencer: influencers[3]._id, campaign: createdCampaigns[2]._id, status: 'pending' },
    ]);

    console.log('Applications Seeded');
    console.log('Data Imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
