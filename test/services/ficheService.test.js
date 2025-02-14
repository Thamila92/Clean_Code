import { createFiche, getQuizzCards, updateFicheAnswer, findCardById } from '../../services/ficheService.js';

jest.mock('../../services/fileManager.js', () => {
    const { MockFileDataProvider } = require('../mocks/fileManager.js');
    return MockFileDataProvider; // Retourne directement la classe au lieu d'un objet
});
  

describe('Fiche Service - createFiche', () => { 
    it('creates a fiche with the correct properties', () => {
        const fiche = createFiche('What is Node.js?', 'JavaScript runtime environment');

        expect(fiche).toMatchObject({
            question: 'What is Node.js?',
            answer: 'JavaScript runtime environment',
            category: 'FIRST'
        });
        expect(fiche.id).toBeDefined(); // Vérifie que l'ID unique est généré
        expect(fiche.date).toBeDefined(); // Vérifie que la date est définie
    });
});

describe('Fiche Service - updateFicheAnswer', () => {
    it('updates the fiche correctly when the answer is valid', () => {
        const fiche = createFiche('What is Node.js?', 'JavaScript runtime environment');
        updateFicheAnswer(fiche.id, true);

        const { card } = findCardById(fiche.id);
        expect(card.category).toBe('SECOND'); // Vérifie que la catégorie avance
        expect(card.answeredCorrectly).toBe(true);
    });

    it('resets the fiche correctly when the answer is invalid', () => {
        const fiche = createFiche('What is Node.js?', 'JavaScript runtime environment');
        updateFicheAnswer(fiche.id, false);

        const { card } = findCardById(fiche.id);
        expect(card.category).toBe('FIRST'); // Vérifie que la catégorie est réinitialisée
        expect(card.answeredCorrectly).toBe(false);
    });
});

describe('Fiche Service - getQuizzCards', () => {
    it('filters fiches based on review period', () => {
        const fiche1 = createFiche('What is JavaScript?', 'Programming language');
        const fiche2 = createFiche('What is Node.js?', 'JavaScript runtime environment');

        // Modifier manuellement la date des cartes pour qu'elles soient éligibles ou non
        fiche1.date = new Date(Date.now() - 2 * 86400000).toISOString(); // Révisable (2 jours depuis la création)
        fiche2.date = new Date().toISOString(); // Non révisable (créée aujourd'hui)

        const result = getQuizzCards();
        expect(result).toHaveLength(1); // Une seule carte doit être révisable
        expect(result[0].id).toBe(fiche1.id);
    });
});