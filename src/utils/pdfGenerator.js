export const generatePDF = async (elementId, familyName) => {
  const html2pdf = (await import('html2pdf.js')).default;
  const element = document.getElementById(elementId);
  if (!element) return;

  const dateStr = new Date().toISOString().split('T')[0];
  const name = familyName || 'Family';

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `Ultimate_Homeschool_Planner_${name}_${dateStr}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: {
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  html2pdf().set(opt).from(element).save();
};
