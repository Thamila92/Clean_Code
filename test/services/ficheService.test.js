import { createCard, getQuizCards, updateCardAnswer, findCardById, getCardsByTags } from '../../services/ficheService.js';

jest.mock('../../services/fileManager.js', () => {
    const { MockFileDataProvider } = require('../mocks/fileManager.js');
    return MockFileDataProvider; 
});
  

describe('Fiche Service - createCard', () => { 
    it('creates a fiche with the correct properties', () => {
        const fiche = createCard('What is Node.js?', 'JavaScript runtime environment', 'JSTag');

        expect(fiche).toMatchObject({
            question: 'What is Node.js?',
            answer: 'JavaScript runtime environment',
            category: 'FIRST',
            tag: 'JSTag'
        });
        expect(fiche.id).toBeDefined(); 
        expect(fiche.date).toBeDefined(); 
    });

    it('creates a fiche with no tag', () => {
        const fiche = createCard('What is Node.js?', 'JavaScript runtime environment');

        expect(fiche).toMatchObject({
            question: 'What is Node.js?',
            answer: 'JavaScript runtime environment',
            category: 'FIRST'
        });
        expect(fiche.id).toBeDefined(); 
        expect(fiche.date).toBeDefined(); 
    });

});

describe('Fiche Service - updateCardAnswer', () => {
    it('updates the fiche correctly when the answer is valid', () => {
        const fiche = createCard('What is Node.js?', 'JavaScript runtime environment');
        updateCardAnswer(fiche.id, true);

        const { card } = findCardById(fiche.id);
        expect(card.category).toBe('SECOND'); 
        expect(card.answeredCorrectly).toBe(true);
    });

    it('resets the fiche correctly when the answer is invalid', () => {
        const fiche = createCard('What is Node.js?', 'JavaScript runtime environment');
        updateCardAnswer(fiche.id, false);

        const { card } = findCardById(fiche.id);
        expect(card.category).toBe('FIRST'); 
        expect(card.answeredCorrectly).toBe(false);
    });
});

describe('Fiche Service - getCardsByTags', () => {
    it('returns all cards if no tags are provided', () => {
        createCard('What is Node.js?', 'JavaScript runtime environment', 'backend');
        createCard('What is JavaScript?', 'Programming language', 'frontend');
        
        const allCards = getCardsByTags();
        expect(allCards).toHaveLength(6);
    });

    it('filters cards by a single tag', () => {
        const filteredCards = getCardsByTags(['backend']);
        expect(filteredCards).toHaveLength(1); 
        expect(filteredCards[0].tag).toBe('backend');
    });

    it('filters cards by multiple tags', () => {
        const filteredCards = getCardsByTags(['backend', 'frontend']);
        expect(filteredCards).toHaveLength(2); 
    });

    it('returns an empty array if no card matches the tags', () => {
        const filteredCards = getCardsByTags(['nonexistent']);
        expect(filteredCards).toHaveLength(0); 
    });
});


describe('Fiche Service - getQuizCards', () => {
    it('filters fiches based on review period', () => {
        const fiche1 = createCard('What is JavaScript?', 'Programming language');
        const fiche2 = createCard('What is Node.js?', 'JavaScript runtime environment');

        fiche1.date = new Date(Date.now() - 2 * 86400000).toISOString(); 
        fiche2.date = new Date().toISOString();

        const result = getQuizCards();
        expect(result).toHaveLength(1); 
        expect(result[0].id).toBe(fiche1.id);
    });
});