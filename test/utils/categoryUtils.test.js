import { getNextCategory, reviewPeriods, categories } from '../../utils/categoryUtils.js';

describe('Category Utils - getNextCategory', () => {
    it('returns the correct next category', () => {
        expect(getNextCategory('FIRST')).toBe('SECOND');
        expect(getNextCategory('SECOND')).toBe('THIRD');
        expect(getNextCategory('THIRD')).toBe('FOURTH');
    });

    it('returns "DONE" for the last category', () => {
        expect(getNextCategory('SEVENTH')).toBe('DONE');
    });

    it('returns "DONE" if the category is already "DONE"', () => {
        expect(getNextCategory('DONE')).toBe('DONE');
    });

    it('handles invalid categories gracefully', () => {
        expect(getNextCategory('INVALID_CATEGORY')).toBe('DONE');
    });
});

describe('Category Utils - reviewPeriods', () => {
    it('defines a review period for each category except "DONE"', () => {
        categories.forEach(category => {
            if (category !== 'DONE') {
                expect(reviewPeriods[category]).toBeDefined();
                expect(typeof reviewPeriods[category]).toBe('number');
            }
        });
    });

    it('does not define a review period for "DONE"', () => {
        expect(reviewPeriods['DONE']).toBeUndefined();
    });

    it('has correct review periods for each category', () => {
        const expectedPeriods = {
            FIRST: 1,
            SECOND: 2,
            THIRD: 4,
            FOURTH: 8,
            FIFTH: 16,
            SIXTH: 32,
            SEVENTH: 64
        };
        Object.keys(expectedPeriods).forEach(category => {
            expect(reviewPeriods[category]).toBe(expectedPeriods[category]);
        });
    });
});
