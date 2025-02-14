import { v4 as uuidv4 } from 'uuid';

class Card {
    constructor(question, answer, category = 'FIRST') {
        this.id = uuidv4();
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.date = new Date().toString();
        this.answeredCorrectly = null; 
    }
    updateStatus(isValid, getNextCategoryFn) {
        this.answeredCorrectly = isValid;
        this.date = new Date().toISOString();
        //verifier le cas ou il est done
        if (isValid) {
            this.category = getNextCategoryFn(this.category);
        } else {
            this.category = 'FIRST';
        }
    }

    static fromJSON(json) {
        const card = new Card(json.question, json.answer, json.category);
        card.id = json.id; 
        card.date = json.date; 
        card.answeredCorrectly = json.answeredCorrectly;
        return card;
    }
}

export default Card;
