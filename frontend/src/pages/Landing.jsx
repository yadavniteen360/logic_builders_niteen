import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const Landing = () => {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary-50/80 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6 border border-primary-200 shadow-sm">
              🌟 The #1 Micro-Influencer Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
              Connect local brands with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-400">authentic creators.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Skip the agency fees. We connect thriving local businesses directly with highly-engaged micro-influencers to create campaigns that actually convert.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="btn btn-primary text-lg px-8 py-4 shadow-xl shadow-primary-500/20 group">
                Start Collaborating <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/marketplace" className="btn btn-outline text-lg px-8 py-4">
                Browse Campaigns
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Why choose CollabHub?</h2>
             <p className="text-slate-500 max-w-2xl mx-auto">Built for simplicity and impact, ensuring a win-win for creators and businesses alike.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
               icon={<Target />}
               title="Niche Targeting"
               desc="Find influencers whose audience perfectly aligns with your brand's unique local demographic."
            />
            <FeatureCard 
               icon={<TrendingUp />}
               title="High Engagement"
               desc="Micro-influencers boast up to 60% higher engagement rates compared to massive celebrity accounts."
            />
            <FeatureCard 
               icon={<ShieldCheck />}
               title="Secure & Transparent"
               desc="Clear deliverables, upfront budgets, and guaranteed payments built directly into the platform."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Target = () => <Users />;

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all"
  >
    <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </motion.div>
);

export default Landing;
