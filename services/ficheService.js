import FileDataProvider from '../services/fileManager.js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const dataProvider = new FileDataProvider(process.env.DATA_PATH);

function pushCardinData(newCard){
    const data = dataProvider.readData();
    data.cards.push(newCard);
    dataProvider.saveData(data);
}

function NewCardJson(question,answer){ 

    return {
        id: uuidv4(),  
        question,
        answer,
        category: 'FIRST',
        date:Date.now().toString()
    }

}

export function createFiche(question, answer) {
    const newCard = NewCardJson(question, answer);
    pushCardinData(newCard);
    return newCard;
}


export function getFiches() {
    return dataProvider.readData().cards;
}

export function findCardById(cardId) {
    const data = dataProvider.readData();
    return { card: data.cards.find(card => card.id === cardId), data };
}


export function markCardAsAnswered(card, isValid) {
    if (!card) throw new Error('Card not found');
    
    card.answeredCorrectly = isValid;
}

export function updateFicheAnswer(cardId, isValid) {
    const { card, data } = findCardById(cardId);
    
    markCardAsAnswered(card, isValid);
    dataProvider.saveData(data); 
}

