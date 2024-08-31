import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { generateChartImage } from './generatechart';

export const PromotionReportDownload = async (
  promotions,
  promotionType,
) => {
  const doc = new jsPDF();

  // Set the title of the document
  const title =
    promotionType === '1'
      ? 'Discount Percentage Report'
      : 'Discount Fixed Amount Report';

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

  // Define chart data
  const chartData = {
    labels:
      promotionType === '1'
        ? promotions.map((promotion) =>
            promotion.applicableItems.map((item) => item),
          )
        : promotions.map((p) => p.storeName),
    datasets:
      promotionType === '1'
        ? [
            {
              label: 'Discount Percentage',
              data: promotions.map(
                (p) => p.discountPercentage || 0,
              ),
              backgroundColor: 'rgba(173, 216, 230, 0.2)', // Light blue background
              borderColor: 'rgba(54, 162, 235, 1)', // Blue border
              borderWidth: 1,
            },
          ]
        : [
            {
              label: 'Qualifying Purchase Amount',
              data: promotions.map(
                (p) => p.qualifyingPurchaseAmount || 0,
              ),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Discount Amount',
              data: promotions.map(
                (p) => p.discountAmount || 0,
              ),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
    title:
      promotionType === '1'
        ? 'Discount on Items by Percentage'
        : 'Discount by Fixed amounts',
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
      'Store Name',
      promotionType === '1'
        ? 'Applicable Items'
        : 'Qualifying Purchase Amount',

      promotionType === '1'
        ? 'Discount Percentage'
        : 'Discount Amount',
      'Description',
      'Start Date',
      'End Date',
    ],
  ];

  const body = promotions.map((promotion) => [
    promotion.storeName,
    promotionType === '1'
      ? `${promotion.applicableItems.join(', ')}`
      : `${promotion.qualifyingPurchaseAmount}`,
    promotionType === '1'
      ? `${promotion.discountPercentage}%`
      : `${promotion.discountAmount}`,
    promotion.description,
    new Date(promotion.startDate).toLocaleDateString(
      promotion.startDateformat,
      'yyyy-MM-dd',
    ),
    new Date(promotion.endDate).toLocaleDateString(
      promotion.endDateformat,
      'yyyy-MM-dd',
    ),
  ]);

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
  const fileName =
    promotionType === '1'
      ? `DiscountPercentageReport-${formattedDate}-${formattedTime}.pdf`
      : `DiscountFixedAmountReport-${formattedDate}-${formattedTime}.pdf`;

  doc.save(fileName);

};
