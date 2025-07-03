import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PaymentLinksTable from './PaymentLinksTable';
import CreateLinkModal from './CreateLinkModal';
import { Plus } from 'lucide-react';
import Button from '../shared/Button';

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-bg flex">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-primary-text">Your Payment Links</h1>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              icon={Plus}
            >
              Create New Link
            </Button>
          </div>

          <PaymentLinksTable />
        </div>
      </main>

      {isCreateModalOpen && (
        <CreateLinkModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}