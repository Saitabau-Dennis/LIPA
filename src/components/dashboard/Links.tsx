import { useState } from 'react';
import { Plus, Search, MoreHorizontal, Copy, ExternalLink, Trash2 } from 'lucide-react';
import Button from '../shared/Button';
import Input from '../shared/Input';
import CreateLinkModal from './CreateLinkModal';
import toast from 'react-hot-toast';

interface PaymentLink {
  id: string;
  recipient: string;
  description: string;
  amount: number;
  dateCreated: string;
  status: 'Paid' | 'Sent' | 'Expired';
  link: string;
}

const mockData: PaymentLink[] = [
  {
    id: '1',
    recipient: 'John Doe',
    description: 'Website Development',
    amount: 50000,
    dateCreated: '2025-01-15',
    status: 'Paid',
    link: 'https://lipa.app/pay/abc123'
  },
  {
    id: '2',
    recipient: 'Jane Smith',
    description: 'Logo Design',
    amount: 15000,
    dateCreated: '2025-01-14',
    status: 'Sent',
    link: 'https://lipa.app/pay/def456'
  },
  {
    id: '3',
    recipient: 'Mike Johnson',
    description: 'Mobile App UI',
    amount: 75000,
    dateCreated: '2025-01-12',
    status: 'Expired',
    link: 'https://lipa.app/pay/ghi789'
  },
  {
    id: '4',
    recipient: 'Sarah Wilson',
    description: 'Consultation Fee',
    amount: 25000,
    dateCreated: '2025-01-10',
    status: 'Paid',
    link: 'https://lipa.app/pay/jkl012'
  }
];

export default function Links() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [links, setLinks] = useState<PaymentLink[]>(mockData);

  const filteredLinks = links.filter(link =>
    link.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Sent':
        return 'bg-blue-100 text-blue-800';
      case 'Expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    toast.success('Payment link deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-text mb-2">Payment Links</h1>
          <p className="text-gray-600">Manage and track all your payment links</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          icon={Plus}
        >
          Create New Link
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <Input
              label=""
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {filteredLinks.length} of {links.length} links
            </span>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.map((link) => (
          <div key={link.id} className="bg-white rounded-lg shadow-soft p-6 hover:shadow-soft-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(link.status)}`}>
                {link.status}
              </span>
              <div className="relative">
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-primary-text truncate">{link.recipient}</h3>
                <p className="text-sm text-gray-600 truncate">{link.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-accent">
                  {formatAmount(link.amount)}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(link.dateCreated).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyLink(link.link)}
                  icon={Copy}
                >
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(link.link, '_blank')}
                  icon={ExternalLink}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(link.id)}
                  icon={Trash2}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLinks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No links found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first payment link to get started'}
          </p>
        </div>
      )}

      {isCreateModalOpen && (
        <CreateLinkModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}
