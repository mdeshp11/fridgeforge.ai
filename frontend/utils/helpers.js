/**
 * Format duration from minutes to readable string
 */
export function formatCookTime(minutes) {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (d.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Calculate nutrition percentage
 */
export function calculateNutritionPercentage(value, dailyValue) {
  return Math.min(Math.round((value / dailyValue) * 100), 100);
}

/**
 * Validate email
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Debounce function
 */
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Group array by key
 */
export function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
}

/**
 * Calculate recipe match percentage
 */
export function calculateMatchPercentage(availableIngredients, recipeIngredients) {
  if (recipeIngredients.length === 0) return 0;
  const matches = availableIngredients.filter((available) =>
    recipeIngredients.some(
      (recipe) => recipe.name.toLowerCase() === available.name.toLowerCase()
    )
  ).length;
  return Math.round((matches / recipeIngredients.length) * 100);
}

/**
 * Parse quantity string
 */
export function parseQuantity(quantityString) {
  const match = quantityString.match(/^([\d.]+)\s*(.*)$/);
  if (!match) {
    return { quantity: 1, unit: '' };
  }
  return {
    quantity: parseFloat(match[1]) || 1,
    unit: match[2] || '',
  };
}

/**
 * Format nutrition label
 */
export function getNutritionLabel(nutrient, value) {
  const labels = {
    calories: 'kcal',
    protein: 'g',
    carbs: 'g',
    fat: 'g',
    fiber: 'g',
    sugar: 'g',
    sodium: 'mg',
  };
  return `${value}${labels[nutrient] || ''}`;
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(difficulty) {
  const colors = {
    Easy: '#4CAF50',
    Medium: '#FFA500',
    Hard: '#ef4444',
  };
  return colors[difficulty] || '#9e9e9e';
}

/**
 * Generate unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Check if array is empty
 */
export function isEmpty(arr) {
  return !arr || arr.length === 0;
}

/**
 * Capitalize first letter
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate text
 */
export function truncate(text, length = 50) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export default {
  formatCookTime,
  formatDate,
  calculateNutritionPercentage,
  validateEmail,
  debounce,
  groupBy,
  calculateMatchPercentage,
  parseQuantity,
  getNutritionLabel,
  getDifficultyColor,
  generateId,
  isEmpty,
  capitalize,
  truncate,
};
