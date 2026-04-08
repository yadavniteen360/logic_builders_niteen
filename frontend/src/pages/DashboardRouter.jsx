import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BrandDashboard from './BrandDashboard';
import InfluencerDashboard from './InfluencerDashboard';

const DashboardRouter = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="flex justify-center p-20"><div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === 'brand' ? <BrandDashboard /> : <InfluencerDashboard />;
};

export default DashboardRouter;
