import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { generateChartImage } from './generate-chart';
import { differenceInMinutes } from 'date-fns';

export const QueueReportDownload = async (queues) => {
  const doc = new jsPDF();

  // Set the title of the document
  const title =
    'Sales Report - ' +
    queues.length +
    ' Orders' +
    ' - ' +
    queues[0].shopID.name;

  doc.setFontSize(18);
  doc.text(title, 14, 22);

  // Add additional document information (optional)
  doc.setFontSize(12);
  doc.setTextColor(100);
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Add report generation time
  doc.text(
    'Generated on: ' + formattedDate + ' ' + formattedTime,
    14,
    30,
  );

  // Chart Data - Calculate Daily Total Value and show as day-wise
  const chartData = {
    labels: queues.map((queue) => {
      return new Date(queue.updatedAt).toLocaleDateString(
        'en-GB',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        },
      );
    }),
    datasets: [
      {
        label: 'Total Value',
        data: queues.map(
          (queue) => queue.orderID.totalAmount,
        ),
        backgroundColor: 'rgba(173, 216, 230, 0.2)', // Light blue background
        borderColor: 'rgba(54, 162, 235, 1)', // Blue border
        borderWidth: 1,
      },
    ],

    title: 'Day-wise Sales Data',
  };

  // Generate the chart image
  const chartImage = await generateChartImage(chartData);

  // Add chart image to PDF
  doc.addImage(chartImage, 'PNG', 14, 40, 180, 100); // Adjust positioning and size as needed

  // Define the autoTable options
  const tableOptions = {
    startY: 150, // Adjust to position below the chart
    headStyles: {
      fillColor: [63, 81, 181], // Blue header background
      textColor: [255, 255, 255], // White text color
      halign: 'left',
    },
    bodyStyles: {
      valign: 'top',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245], // Light grey background for alternate rows
    },
    margin: { top: 20 },
    theme: 'striped',
  };

  // Set the table header and body based on the promotion type
  const headers = [
    [
      'Customer Name',
      'Total Value',
      'Waiting Time',
      'Transaction Date',
    ],
  ];

  const totalValue = queues.reduce(
    (sum, queue) => sum + queue.orderID.totalAmount,
    0,
  );

  const totalRow = [
    'Total',
    `LKR. ${totalValue.toFixed(2)}`,
    '',
    '',
  ];

  const body = queues.map((queue) => [
    `${queue.userID.firstName} ${queue.userID.lastName}`,
    `LKR. ${queue.orderID.totalAmount.toFixed(2)}`,
    `${differenceInMinutes(
      new Date(queue.updatedAt),
      new Date(queue.createdAt),
    )} mins`,
    new Date(queue.updatedAt).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  ]);

  body.push(totalRow);

  // Generate the table with the specified options
  doc.autoTable({
    head: headers,
    body: body,
    ...tableOptions,
  });

  // Add page numbers (if there are multiple pages)
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() - 20,
      doc.internal.pageSize.getHeight() - 10,
      {
        align: 'right',
      },
    );
  }

  // Save the PDF with an appropriate file name
  const fileName = `Queue_Report_${formattedDate}_${formattedTime}.pdf`;

  doc.save(fileName);
};
