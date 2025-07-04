import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import toast from 'react-hot-toast';

interface DashboardHomeProps {
  setActiveTab: (tab: string) => void;
}

export default function DashboardHome({ setActiveTab }: DashboardHomeProps) {
  const stats = [
    {
      title: 'Total Revenue',
      value: 'KES 245,000',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Links',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: CreditCard,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Paid Links',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending',
      value: '6',
      change: '-1',
      trend: 'down',
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'payment',
      message: 'Payment received from John Doe',
      amount: 'KES 50,000',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'link',
      message: 'New payment link created for Jane Smith',
      amount: 'KES 15,000',
      time: '4 hours ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment received from Mike Johnson',
      amount: 'KES 75,000',
      time: '1 day ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'expired',
      message: 'Payment link expired for Sarah Wilson',
      amount: 'KES 25,000',
      time: '2 days ago',
      status: 'warning'
    }
  ];

  const quickActions = [
    {
      title: 'Create Payment Link',
      description: 'Generate a new payment link for your client',
      icon: CreditCard,
      color: 'bg-blue-500',
      action: () => {
        setActiveTab('links');
        // Give a small delay to allow the tab to change, then show a hint
        setTimeout(() => {
          toast.success('Click the "Create New Link" button to get started!');
        }, 500);
      }
    },
    {
      title: 'View All Links',
      description: 'Manage and track all your payment links',
      icon: Users,
      color: 'bg-green-500',
      action: () => {
        setActiveTab('links');
        toast.success('Viewing all your payment links');
      }
    },
    {
      title: 'Monthly Report',
      description: 'Download your monthly payment report',
      icon: Calendar,
      color: 'bg-purple-500',
      action: () => {
        // Simulate report download
        const reportData = `LIPA Monthly Report - ${new Date().toLocaleDateString()}
        
Total Revenue: KES 245,000
Active Links: 18
Paid Links: 12
Pending Links: 6
Success Rate: 75%

Generated on: ${new Date().toLocaleString()}`;
        
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportData);
        link.download = `lipa-monthly-report-${new Date().toISOString().slice(0, 7)}.txt`;
        link.click();
        toast.success('Monthly report downloaded successfully!');
      }
    },
    {
      title: 'Account Settings',
      description: 'Update your profile and preferences',
      icon: TrendingUp,
      color: 'bg-orange-500',
      action: () => {
        setActiveTab('settings');
        toast.success('Opening account settings');
      }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-text mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your payment links.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-soft p-6 hover:shadow-soft-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-text mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-lg font-semibold text-primary-text mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.message}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className="text-sm font-medium text-primary-accent">
                  {activity.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-lg font-semibold text-primary-text mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left w-full"
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-primary-text">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h2 className="text-lg font-semibold text-primary-text mb-4">Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-text mb-1">24</h3>
            <p className="text-gray-600">Total Links Created</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-text mb-1">18</h3>
            <p className="text-gray-600">Successfully Paid</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-text mb-1">75%</h3>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
