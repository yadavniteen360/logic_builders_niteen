import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { PlusCircle, Users, BarChart3, Clock, CheckCircle, XCircle } from 'lucide-react';

const BrandDashboard = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // New campaign state
  const [showCreate, setShowCreate] = useState(false);
  const [newCamp, setNewCamp] = useState({ title: '', description: '', budget: '', requirements: '', niche: 'fashion' });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const campRes = await api.get('/campaigns/my-campaigns');
      setCampaigns(campRes.data);
      if (campRes.data.length > 0) {
         // Gather IDs to fetch applications for these campaigns
         const appRes = await api.get('/applications/for-brand');
         setApplications(appRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/campaigns', newCamp);
      setCampaigns([res.data, ...campaigns]);
      setShowCreate(false);
      setNewCamp({ title: '', description: '', budget: '', requirements: '', niche: 'fashion' });
    } catch (err) {
      console.error(err);
    }
  };

  const updateAppStatus = async (appId, status) => {
    try {
       await api.put(`/applications/${appId}/status`, { status });
       setApplications(applications.map(a => a._id === appId ? { ...a, status } : a));
    } catch (err) {
       console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
           <div>
             <h1 className="text-3xl font-bold text-slate-900">Brand Dashboard</h1>
             <p className="text-slate-600 mt-1">Welcome back, {user?.name}. Here's your overview.</p>
           </div>
           <button onClick={() => setShowCreate(!showCreate)} className="btn btn-primary shadow-lg shadow-primary-500/30">
              <PlusCircle className="w-5 h-5 mr-2" />
              {showCreate ? 'Cancel' : 'Create Campaign'}
           </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <StatCard icon={<BarChart3 />} title="Active Campaigns" value={campaigns.length} color="blue" />
           <StatCard icon={<Users />} title="Total Applicants" value={applications.length} color="indigo" />
           <StatCard icon={<CheckCircle />} title="Accepted Collabs" value={applications.filter(a => a.status==='accepted').length} color="emerald" />
        </div>

        {/* Create Campaign Form */}
        {showCreate && (
           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-10 overflow-hidden">
             <div className="card p-6 bg-white border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Post a New Campaign</h3>
                <form onSubmit={handleCreateCampaign} className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Title</label>
                        <input required type="text" className="input" placeholder="e.g. Summer Launch Video" value={newCamp.title} onChange={e => setNewCamp({...newCamp, title: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Budget ($)</label>
                        <input required type="number" className="input" placeholder="e.g. 500" value={newCamp.budget} onChange={e => setNewCamp({...newCamp, budget: e.target.value})} />
                      </div>
                   </div>
                   
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                      <textarea required rows="3" className="input" placeholder="Explain the campaign goals..." value={newCamp.description} onChange={e => setNewCamp({...newCamp, description: e.target.value})}></textarea>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Requirements</label>
                        <input required type="text" className="input" placeholder="e.g. 1 Reel, 2 Stories" value={newCamp.requirements} onChange={e => setNewCamp({...newCamp, requirements: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Niche</label>
                        <select className="input" value={newCamp.niche} onChange={e => setNewCamp({...newCamp, niche: e.target.value})}>
                          <option value="fashion">Fashion & Style</option>
                          <option value="food">Food & Dining</option>
                          <option value="fitness">Fitness & Health</option>
                          <option value="tech">Tech & Gadgets</option>
                          <option value="beauty">Beauty & Makeup</option>
                        </select>
                      </div>
                   </div>
                   
                   <div className="flex justify-end mt-4">
                      <button type="submit" className="btn btn-primary">Post Campaign</button>
                   </div>
                </form>
             </div>
           </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Your Campaigns */}
           <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xl font-bold flex items-center">Your Campaigns</h3>
              {campaigns.length === 0 ? (
                 <p className="text-slate-500 bg-white p-4 rounded-xl border border-slate-200">No campaigns created yet.</p>
              ) : (
                 campaigns.map(camp => (
                    <div key={camp._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-primary-300 transition-colors">
                       <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">{camp.title}</h4>
                       <p className="text-sm text-slate-500 mb-3 line-clamp-2">{camp.description}</p>
                       <div className="flex justify-between items-center text-xs font-medium bg-slate-50 p-2 rounded-lg">
                          <span className="text-slate-700">${camp.budget}</span>
                          <span className="text-slate-500 capitalize">{camp.niche}</span>
                       </div>
                    </div>
                 ))
              )}
           </div>

           {/* Applications Management */}
           <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-bold flex items-center">Recent Applications</h3>
              {applications.length === 0 ? (
                 <div className="bg-white p-10 text-center rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500">You don't have any applications yet.</p>
                 </div>
              ) : (
                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <ul className="divide-y divide-slate-100">
                       {applications.map(app => (
                          <li key={app._id} className="p-6 hover:bg-slate-50 transition-colors">
                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-grow">
                                   <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-bold text-slate-900 text-lg">{app.influencer?.name}</h4>
                                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                         app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                                         app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                         'bg-amber-100 text-amber-700'
                                      }`}>
                                         {app.status}
                                      </span>
                                   </div>
                                   <div className="text-sm text-slate-600 mb-2">
                                      Applied for: <span className="font-medium text-slate-800">{app.campaign?.title}</span>
                                   </div>
                                </div>
                                
                                {app.status === 'pending' && (
                                   <div className="flex gap-2 shrink-0">
                                      <button onClick={() => updateAppStatus(app._id, 'accepted')} className="btn bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 shadow-sm text-sm">
                                         <CheckCircle className="w-4 h-4 mr-1"/> Accept
                                      </button>
                                      <button onClick={() => updateAppStatus(app._id, 'rejected')} className="btn bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 shadow-sm text-sm">
                                         <XCircle className="w-4 h-4 mr-1"/> Reject
                                      </button>
                                   </div>
                                )}
                             </div>
                          </li>
                       ))}
                    </ul>
                 </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
   const colors = {
      blue: 'bg-blue-50 text-blue-600',
      indigo: 'bg-indigo-50 text-indigo-600',
      emerald: 'bg-emerald-50 text-emerald-600'
   };
   
   return (
      <div className="card p-6 flex items-center gap-4">
         <div className={`p-4 rounded-xl ${colors[color]}`}>
            {React.cloneElement(icon, { className: "w-8 h-8" })}
         </div>
         <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
         </div>
      </div>
   );
};

export default BrandDashboard;
