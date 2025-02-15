export const categories = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'];
export const reviewPeriods = { 
    FIRST: 1, 
    SECOND: 2, 
    THIRD: 4, 
    FOURTH: 8, 
    FIFTH: 16, 
    SIXTH: 32, 
    SEVENTH: 64 
};


export function getNextCategory(currentCategory) {
  const index = categories.indexOf(currentCategory);
  return index < 0 || currentCategory === 'DONE' ? 'DONE' : categories[index + 1];
}