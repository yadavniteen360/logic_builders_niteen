import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, UserCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const InfluencerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/applications/my-applications');
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
           <h1 className="text-3xl font-bold text-slate-900">Influencer Dashboard</h1>
           <p className="text-slate-600 mt-1">Hello, {user?.name}. Track your collaborations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           
           {/* Profile Summary Card */}
           <div className="lg:col-span-1">
              <div className="card p-6 bg-white shadow-sm border border-slate-200">
                 <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                       <UserCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
                    <p className="text-slate-500 text-sm mb-4">{user?.email}</p>
                    
                    <div className="w-full border-t border-slate-100 pt-4 mt-2">
                       <Link to="/marketplace" className="btn btn-outline w-full justify-between group">
                          Find Campaigns <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors"/>
                       </Link>
                    </div>
                 </div>
              </div>
           </div>

           {/* Applications List */}
           <div className="lg:col-span-3">
              <h3 className="text-xl font-bold mb-4 flex items-center">Your Applications</h3>
              
              {applications.length === 0 ? (
                 <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Clock className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No applications yet</h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-6">You haven't applied to any campaigns. Browse the marketplace to find collaborations matching your niche.</p>
                    <Link to="/marketplace" className="btn btn-primary px-6">Explore Marketplace</Link>
                 </div>
              ) : (
                 <div className="space-y-4">
                    {applications.map((app, i) => (
                       <motion.div 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ delay: i * 0.1 }}
                          key={app._id} 
                          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary-300 transition-colors"
                       >
                          <div>
                             <h4 className="text-lg font-bold text-slate-900">{app.campaign?.title}</h4>
                             <p className="text-sm text-slate-500 mt-1 flex items-center">
                                By Brand: <span className="font-medium text-slate-700 ml-1">{app.campaign?.brand?.name || 'Local Brand'}</span>
                             </p>
                             <div className="mt-3 flex items-center gap-3 text-xs font-medium">
                                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                                   ${app.campaign?.budget}
                                </span>
                             </div>
                          </div>
                          
                          <div className={`px-4 py-2 rounded-lg flex items-center font-semibold text-sm border shadow-sm ${
                             app.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                             app.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                             'bg-red-50 text-red-700 border-red-200'
                          }`}>
                             {app.status === 'pending' && <Clock className="w-4 h-4 mr-2" />}
                             {app.status === 'accepted' && <CheckCircle className="w-4 h-4 mr-2" />}
                             {app.status === 'rejected' && <XCircle className="w-4 h-4 mr-2" />}
                             <span className="capitalize">{app.status}</span>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default InfluencerDashboard;
