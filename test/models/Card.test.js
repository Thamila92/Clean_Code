import Card from '../../models/Card.js';

describe('Card Model', () => {
    it('creates a card with default properties', () => {
        const card = new Card('What is Node.js?', 'JavaScript runtime environment');

        expect(card).toMatchObject({
            question: 'What is Node.js?',
            answer: 'JavaScript runtime environment',
            category: 'FIRST',
            answeredCorrectly: null
        });
        expect(card.id).toBeDefined();
        expect(card.date).toBeDefined();
    });

    it('throws an error if an invalid category is provided', () => {
        expect(() => {
            new Card('What is Node.js?', 'JavaScript runtime environment', '', 'INVALID_CATEGORY');
        }).toThrow(/Invalid category/);
    });

    it('updates the card status correctly when the answer is valid', () => {
        const card = new Card('What is Node.js?', 'JavaScript runtime environment');

        card.updateStatus(true, (currentCategory) => 'SECOND');

        expect(card.category).toBe('SECOND');
        expect(card.answeredCorrectly).toBe(true);
    });

    it('resets the card category when the answer is invalid', () => {
        const card = new Card('What is Node.js?', 'JavaScript runtime environment');

        card.updateStatus(false, (currentCategory) => 'FIRST');

        expect(card.category).toBe('FIRST');
        expect(card.answeredCorrectly).toBe(false);
    });

    
});
