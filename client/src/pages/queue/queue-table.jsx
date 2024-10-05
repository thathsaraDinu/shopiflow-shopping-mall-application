import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import { format, differenceInMinutes } from 'date-fns';

const QueueTable = ({ queues, isLoading, isError }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading queues!</p>;
  }

  if (!queues || queues.length === 0) {
    return <p>No queues available.</p>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Order Value
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Waiting Time
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {queues.map((queue) => (
            <tr
              key={queue._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {queue.userID.firstName}{' '}
                {queue.userID.lastName}
              </th>
              <td className="px-6 py-4">
                LKR. {queue.orderID.totalAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4">{queue.status}</td>
              {/* Show wait time createdAt - updatedAt */}
              <td className="px-6 py-4">
                {differenceInMinutes(
                  new Date(queue.updatedAt),
                  new Date(queue.createdAt),
                )}{' '}
                mins
              </td>
              <td className="px-6 py-4">
                {/* Date and time */}
                {format(
                  new Date(queue.updatedAt),
                  'dd/MM/yyyy HH:mm',
                )}
              </td>
              <td className="px-6 py-4">
                <Button
                  variant="primary"
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white"
                  size="sm"
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
