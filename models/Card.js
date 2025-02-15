import { v4 as uuidv4 } from 'uuid';
import { getNextCategory } from '../utils/categoryUtils.js';

class Card {
    constructor(question, answer, category = 'FIRST') {
        this.id = uuidv4();
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.date = new Date().toISOString();
        this.answeredCorrectly = null; 
    }

    updateStatus(isValid) {
        if (this.category === "DONE") {
            console.warn(`Card with ID ${this.id} is already in "DONE" category and cannot be updated.`);
            return false;
        }
    
        this.answeredCorrectly = isValid;
        this.date = new Date().toISOString();
        this.category = isValid ? getNextCategory(this.category) : 'FIRST';
    
        return true;
    }

    static fromJSON(json) {
        if (!json || !json.question || !json.answer || !json.category) {
            throw new Error('Invalid JSON object for creating a Card');
        }

        const card = new Card(json.question, json.answer, json.category);
        card.id = json.id; 
        card.date = json.date; 
        card.answeredCorrectly = json.answeredCorrectly;
        return card;
    }
}

export default Card;
