
const { createFiche } = require("./ficheService");

describe('Fiche Management', () => {
  it('creates a fiche and initializes it in category 1', () => {
    const fiche = createFiche('What is Node.js?', 'JavaScript runtime environment');
    expect(fiche.question).toBe('What is Node.js?');
    expect(fiche.answer).toBe('JavaScript runtime environment');
    expect(fiche.category).toBe(1);
  });
});
