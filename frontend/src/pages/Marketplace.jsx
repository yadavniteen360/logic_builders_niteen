import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Search, MapPin, DollarSign, Filter, Gift, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Marketplace = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [niche, setNiche] = useState('');
  const [applyState, setApplyState] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCampaigns();
  }, [niche]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const url = niche ? `/campaigns?niche=${niche}` : '/campaigns';
      const { data } = await api.get(url);
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (campaignId) => {
    if (!user) {
      alert("Please login as an influencer to apply.");
      return;
    }
    if (user.role !== 'influencer') {
      alert("Only influencers can apply to campaigns.");
      return;
    }

    setApplyState(prev => ({ ...prev, [campaignId]: 'loading' }));
    try {
      await api.post('/applications', { campaignId });
      setApplyState(prev => ({ ...prev, [campaignId]: 'success' }));
    } catch (error) {
       console.error("Application error", error);
       setApplyState(prev => ({ ...prev, [campaignId]: 'error' }));
       alert(error.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filters */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Campaign Marketplace</h1>
            <p className="text-slate-600 mt-2">Discover and apply to top local collaborations.</p>
          </div>
          
          <div className="w-full md:w-auto flex items-center gap-4 bg-white p-2 border border-slate-200 rounded-xl shadow-sm">
             <div className="flex items-center pl-3">
               <Filter className="w-5 h-5 text-slate-400" />
               <select 
                 className="ml-2 py-1.5 focus:outline-none bg-transparent text-slate-700 font-medium"
                 value={niche}
                 onChange={(e) => setNiche(e.target.value)}
               >
                 <option value="">All Niches</option>
                 <option value="fashion">Fashion & Style</option>
                 <option value="food">Food & Dining</option>
                 <option value="fitness">Fitness & Health</option>
                 <option value="tech">Tech & Gadgets</option>
                 <option value="beauty">Beauty & Makeup</option>
               </select>
             </div>
          </div>
        </div>

        {/* Campaign List */}
        {loading ? (
          <div className="flex justify-center p-20">
             <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full"></div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center p-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
             <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-medium text-slate-800">No campaigns found</h3>
             <p className="text-slate-500">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={camp._id} 
                className="card flex flex-col h-full bg-white relative overflow-hidden"
              >
                {/* Visual Flair */}
                <div className="h-2 w-full bg-gradient-to-r from-primary-400 to-emerald-400 absolute top-0 left-0"></div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                      {camp.niche}
                    </span>
                    <span className="font-semibold text-primary-600 flex items-center">
                      <DollarSign className="w-4 h-4 mr-0.5" />{camp.budget}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{camp.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">{camp.description}</p>
                  
                  <div className="space-y-2 mb-6 text-sm text-slate-500">
                     <div className="flex items-center">
                       <MapPin className="w-4 h-4 mr-2" /> {camp.brand?.location || 'Remote'}
                     </div>
                     <div className="flex items-center">
                       <Gift className="w-4 h-4 mr-2" /> {camp.requirements}
                     </div>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center text-sm font-medium text-slate-700">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-2 font-bold text-slate-500">
                             {camp.brand?.name?.charAt(0) || 'B'}
                          </div>
                          {camp.brand?.name || 'Local Brand'}
                       </div>
                    </div>
                    
                    <button 
                      onClick={() => handleApply(camp._id)}
                      disabled={applyState[camp._id] === 'loading' || applyState[camp._id] === 'success'}
                      className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors flex justify-center items-center ${
                         applyState[camp._id] === 'success' 
                         ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                         : 'btn-primary'
                      }`}
                    >
                       {applyState[camp._id] === 'loading' ? 'Applying...' : 
                        applyState[camp._id] === 'success' ? <><CheckCircle className="w-4 h-4 mr-2"/> Applied</> : 
                        'Apply Now'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
