import { useState } from 'react';
import { getQueues } from '@/api/queue.api';
import { useShopStore } from '@/store/shop-store';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { QUEUE_STATUS } from '@/constants';
import toast from 'react-hot-toast';
import QueueTable from './queue-table';
import { QueueReportDownload } from './reports/report-download';
import { Input } from '@/components/ui/input';
import { isWithinInterval, parseISO } from 'date-fns';

const History = () => {
  const shopId = useShopStore((state) => state.shopId);

  // State for the search query and date filters
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch the queue data
  const {
    data: queues,
    isLoading: queuesLoading,
    error: queuesError,
  } = useQuery({
    queryKey: ['queues-history'],
    queryFn: () =>
      getQueues(shopId, [
        QUEUE_STATUS.COMPLETED,
        QUEUE_STATUS.CANCELLED,
      ]),
  });

  const handleReportDownload = async () => {
    try {
      const removeCancelledQueues = filteredQueues.filter(
        (queue) => queue.status !== QUEUE_STATUS.CANCELLED,
      );
      QueueReportDownload(removeCancelledQueues);
    } catch (error) {
      console.error('Error downloading the report:', error);
    } finally {
      toast.success('Report downloaded');
    }
  };

  // Filter the queues based on the search query and date range
  const filteredQueues = queues?.filter((queue) => {
    const matchesSearchQuery =
      queue.userID.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      queue.userID.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesDateRange =
      !startDate ||
      !endDate || // If no date range, match all
      isWithinInterval(parseISO(queue.updatedAt), {
        start: new Date(startDate),
        end: new Date(endDate),
      });

    return matchesSearchQuery && matchesDateRange;
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search by customer name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 w-72"
        />
        {/* Date Inputs */}
        <div className="flex space-x-4">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded p-2"
            placeholder="Start Date"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded p-2"
            placeholder="End Date"
          />
        </div>
        {/* Report Download Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleReportDownload}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Download Report
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <QueueTable
          queues={filteredQueues}
          isLoading={queuesLoading}
          isError={queuesError}
        />
      </div>
    </div>
  );
};

export default History;
