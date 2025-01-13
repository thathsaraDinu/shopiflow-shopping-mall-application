import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import { format, differenceInMinutes } from 'date-fns';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/spinner';
import { QUEUE_STATUS } from '@/constants';
import { useNavigate } from 'react-router-dom';

const QueueTable = ({ queues, isLoading, isError }) => {
  const [sortColumn, setSortColumn] = useState('updatedAt'); // Default sort by date
  const [sortDirection, setSortDirection] = useState('asc'); // Default ascending

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner className={'m-auto w-16'} />;
  }

  if (isError) {
    return <p>Error loading queues!</p>;
  }

  if (!queues || queues.length === 0) {
    return <p>No queues available.</p>;
  }

  // Sort function
  const sortedQueues = [...queues].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (
      typeof aValue === 'string' &&
      typeof bValue === 'string'
    ) {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // For dates
    if (sortColumn === 'updatedAt') {
      return sortDirection === 'asc'
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    // For numeric values
    return sortDirection === 'asc'
      ? aValue - bValue
      : bValue - aValue;
  });

  // Toggle sort direction and column
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === 'asc' ? 'desc' : 'asc',
      );
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Order Value
            </th>

            <th scope="col" className="px-6 py-3">
              Waiting Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort('updatedAt')}
            >
              Transaction Date{' '}
              {sortColumn === 'updatedAt' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status{' '}
              {sortColumn === 'status' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedQueues.map((queue) => (
            <tr
              key={queue._id}
              className="bg-white border-b hover:bg-gray-50"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {queue.userID.firstName}{' '}
                {queue.userID.lastName}
              </th>
              <td className="px-6 py-4">
                {queue.status !== QUEUE_STATUS.CANCELLED &&
                  'LKR. ' +
                    queue.orderID.totalAmount?.toFixed(2)}

                {/* LKR. {queue.orderID.totalAmount?.toFixed(2)} */}
              </td>

              <td className="px-6 py-4">
                {differenceInMinutes(
                  new Date(queue.updatedAt),
                  new Date(queue.createdAt),
                )}{' '}
                mins
              </td>
              <td className="px-6 py-4">
                {/* Date and time */}
                {format(new Date(queue.updatedAt), 'PPpp')}
              </td>
              <td className="px-6 py-4">
                <div
                  className={`bg-${queue.status === QUEUE_STATUS.CANCELLED ? 'red' : 'green'}-400 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded w-fit`}
                >
                  {queue.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <Button
                  variant="primary"
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white"
                  size="sm"
                  onClick={() =>
                    navigate(`/order/${queue._id}`)
                  }
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

QueueTable.propTypes = {
  queues: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default QueueTable;
