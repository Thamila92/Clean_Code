import { v4 as uuidv4 } from 'uuid';

class Card {
    constructor(question, answer, category = 'FIRST') {
        this.id = uuidv4();
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.date = new Date().toISOString();
        this.answeredCorrectly = null; 
    }
}

export default Card;
