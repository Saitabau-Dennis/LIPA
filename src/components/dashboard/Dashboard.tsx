import { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import Links from './Links';
import Settings from './Settings';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} />;
      case 'links':
        return <Links />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}