/**
 * FACIAL EXPRESSION BLUEPRINT TEMPLATE
 */

// Custom eyebrows component blueprint
const customBrows = (y, spacing, style = 'flat') => {
  if (style === 'angry') {
    return `<path d="M${-spacing-8} ${y-4}l12 6M${spacing-4} ${y+2}l12 -6" stroke="#3b1c1c" stroke-width="3"/>`;
  }
  return `<path d="M${-spacing-8} ${y}h12M${spacing-4} ${y}h12" stroke="#3b1c1c" stroke-width="3"/>`;
};

