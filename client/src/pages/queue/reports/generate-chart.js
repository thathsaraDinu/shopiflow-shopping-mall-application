import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';

export const generateChartImage = (data) => {
  return new Promise((resolve, reject) => {
    // Create a wrapper div and append it to the body
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute'; // Position it off-screen
    wrapper.style.left = '-9999px';
    wrapper.style.top = '-9999px';
    const canvas = document.createElement('canvas');
    canvas.width = 800; // Set canvas width
    canvas.height = 400; // Set canvas height
    wrapper.appendChild(canvas);
    document.body.appendChild(wrapper);

    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        // Update labels to remove applicable items
        labels: data.labels,
        datasets: data.datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return (
                  context.dataset.label + ': ' + context.raw
                );
              },
            },
          },
          title: {
            display: true,
            text: data.title,
            font: {
              size: 16, // Adjust size if needed
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
        },
        animation: {
          onComplete: function () {
            html2canvas(wrapper)
              .then((canvas) => {
                // Clean up: remove the wrapper from the DOM
                document.body.removeChild(wrapper);
                resolve(canvas.toDataURL('image/png'));
              })
              .catch((error) => {
                // Clean up: remove the wrapper from the DOM in case of error
                document.body.removeChild(wrapper);
                reject(error);
              });
          },
        },
      },
    });
  });
};
