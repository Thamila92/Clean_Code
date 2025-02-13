import FileDataProvider from '../services/fileManager.js';
import dotenv from 'dotenv';
import Card from '../models/Card.js';


dotenv.config();

const dataProvider = new FileDataProvider(process.env.DATA_PATH);

function pushCardinData(newCard){
    const data = dataProvider.readData();
    data.cards.push(newCard);
    dataProvider.saveData(data);
}


export function createFiche(question, answer) {
    const newCard = new Card(question, answer);
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

