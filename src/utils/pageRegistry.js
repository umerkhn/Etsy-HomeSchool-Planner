// Full registry of all 65 pages for sidebar navigation and routing

export const MONTHS = [
  { key: 'aug2025', label: 'August 2025', year: 2025, month: 7 },
  { key: 'sep2025', label: 'September 2025', year: 2025, month: 8 },
  { key: 'oct2025', label: 'October 2025', year: 2025, month: 9 },
  { key: 'nov2025', label: 'November 2025', year: 2025, month: 10 },
  { key: 'dec2025', label: 'December 2025', year: 2025, month: 11 },
  { key: 'jan2026', label: 'January 2026', year: 2026, month: 0 },
  { key: 'feb2026', label: 'February 2026', year: 2026, month: 1 },
  { key: 'mar2026', label: 'March 2026', year: 2026, month: 2 },
  { key: 'apr2026', label: 'April 2026', year: 2026, month: 3 },
  { key: 'may2026', label: 'May 2026', year: 2026, month: 4 },
  { key: 'jun2026', label: 'June 2026', year: 2026, month: 5 },
  { key: 'jul2026', label: 'July 2026', year: 2026, month: 6 },
];

export const QUARTERS = [
  { key: 'q1', label: 'Q1: Aug – Nov 2025', months: 'August - November', year: '2025' },
  { key: 'q2', label: 'Q2: Dec 2025 – Feb 2026', months: 'December - February', year: '2025-2026' },
  { key: 'q3', label: 'Q3: Mar – May 2026', months: 'March - May', year: '2026' },
  { key: 'q4', label: 'Q4: Jun – Jul 2026', months: 'June - July', year: '2026' },
];

export const WEEKS = Array.from({ length: 16 }, (_, i) => {
  const weekNum = i + 1;
  const startDate = new Date(2025, 7, 4 + i * 7); // Aug 4, 2025 + weeks
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 4);
  const fmt = (d) => `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()}`;
  return {
    key: `week${weekNum}`,
    num: weekNum,
    label: `Week ${weekNum}`,
    dateRange: `${fmt(startDate)} – ${fmt(endDate)}, ${startDate.getFullYear()}`,
    startDate,
    endDate,
  };
});

export const sections = [
  {
    title: 'Yearly Overview',
    pages: [
      { num: 1, label: 'Cover Page', path: '/' },
      { num: 2, label: 'How To Use', path: '/how-to-use' },
      { num: 3, label: 'Mission & Goals', path: '/mission' },
      { num: 4, label: 'Year at a Glance', path: '/year-at-glance' },
      { num: 5, label: 'Academic Planning', path: '/academic-planning' },
      { num: 6, label: 'Subject Breakdown', path: '/subject-breakdown' },
      { num: 7, label: 'Curriculum Tracking', path: '/curriculum-tracking' },
      { num: 8, label: 'Important Dates', path: '/important-dates' },
    ],
  },
  {
    title: 'Quarterly Planning',
    pages: [
      ...QUARTERS.map((q, i) => ({ num: 9 + i, label: `${q.label} Overview`, path: `/quarterly/${q.key}` })),
      ...QUARTERS.map((q, i) => ({ num: 13 + i, label: `${q.label} Goals`, path: `/quarterly-goals/${q.key}` })),
    ],
  },
  {
    title: 'Monthly Planning',
    pages: MONTHS.flatMap((m, i) => [
      { num: 17 + i * 2, label: `${m.label} Calendar`, path: `/monthly-calendar/${m.key}` },
      { num: 18 + i * 2, label: `${m.label} Overview`, path: `/monthly-overview/${m.key}` },
    ]),
  },
  {
    title: 'Weekly Planning',
    pages: WEEKS.map((w, i) => ({
      num: 41 + i,
      label: `${w.label}: ${w.dateRange}`,
      path: `/weekly/${w.key}`,
    })),
  },
  {
    title: 'Tracking & Records',
    pages: [
      { num: 57, label: 'Attendance', path: '/attendance' },
      { num: 58, label: 'Grades & Progress', path: '/grades' },
      { num: 59, label: 'Reading Log', path: '/reading-log' },
      { num: 60, label: 'Progress Notes', path: '/progress-notes' },
      { num: 61, label: 'Extracurriculars', path: '/extracurriculars' },
      { num: 62, label: 'Field Trips', path: '/field-trips' },
      { num: 63, label: 'Expenses', path: '/expenses' },
      { num: 64, label: 'Student Portfolio', path: '/portfolio' },
      { num: 65, label: 'Year-End Reflection', path: '/reflection' },
    ],
  },
];

export const allPages = sections.flatMap((s) => s.pages);

export const getPageByPath = (path) => allPages.find((p) => p.path === path);
export const getPageByNum = (num) => allPages.find((p) => p.num === num);
export const totalPages = 65;
