import { v4 as uuidv4 } from 'uuid';
import { getNextCategory, categories } from '../utils/categoryUtils.js';

class Card {
    constructor(question, answer, tag, category = 'FIRST') {
        if (!categories.includes(category)) {
            throw new Error(`Invalid category: ${category}. Must be one of ${categories.join(', ')}`);
        }
        this.id = uuidv4();
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.date = new Date().toISOString();
        this.tag = tag
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
        if (!categories.includes(json.category)) {
            throw new Error(`Invalid category: ${category}. Must be one of ${categories.join(', ')}`);
        }

        const card = new Card(json.question, json.answer, json.tag, json.category);
        card.id = json.id; 
        card.date = json.date; 
        card.category = json.category
        card.answeredCorrectly = json.answeredCorrectly;
        card.tag = json.tag;

        return card;
    }

    setTag(tag) {
        this.tag = tag;
    }

}

export default Card;
