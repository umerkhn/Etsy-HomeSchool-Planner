// Child color system — maps child index to color tokens
export const childColors = {
  1: { name: 'Coral', hex: '#E8A89D', light: '#f5d4ce', bg: '#fdf5f3', tw: 'coral' },
  2: { name: 'Sage', hex: '#A8D4B8', light: '#d0eadb', bg: '#f3faf6', tw: 'sage' },
  3: { name: 'Gold', hex: '#E8C8A0', light: '#f2dfc5', bg: '#fdf8f2', tw: 'gold' },
  4: { name: 'Lavender', hex: '#D4B8E8', light: '#e8d8f2', bg: '#f9f3fd', tw: 'lavender' },
};

export const getChildColor = (childIndex) => {
  return childColors[childIndex] || childColors[1];
};

export const getChildName = (data, childIndex) => {
  const key = `child${childIndex}Name`;
  return data?.[key] || `Child ${childIndex}`;
};

export const getChildAge = (data, childIndex) => {
  const key = `child${childIndex}Age`;
  return data?.[key] || '';
};
