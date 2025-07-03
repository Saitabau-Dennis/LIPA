import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface PaymentLink {
  id: string;
  recipient: string;
  description: string;
  amount: number;
  dateCreated: string;
  status: 'Paid' | 'Sent' | 'Expired';
}

const mockData: PaymentLink[] = [
  {
    id: '1',
    recipient: 'John Doe',
    description: 'Website Development',
    amount: 50000,
    dateCreated: '2025-01-15',
    status: 'Paid'
  },
  {
    id: '2',
    recipient: 'Jane Smith',
    description: 'Logo Design',
    amount: 15000,
    dateCreated: '2025-01-14',
    status: 'Sent'
  },
  {
    id: '3',
    recipient: 'Mike Johnson',
    description: 'Mobile App UI',
    amount: 75000,
    dateCreated: '2025-01-12',
    status: 'Expired'
  },
  {
    id: '4',
    recipient: 'Sarah Wilson',
    description: 'Consultation Fee',
    amount: 25000,
    dateCreated: '2025-01-10',
    status: 'Paid'
  }
];

export default function PaymentLinksTable() {
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

  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recipient
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Created
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockData.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {link.recipient}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{link.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatAmount(link.amount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(link.dateCreated).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(link.status)}`}>
                    {link.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}