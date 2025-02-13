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

export function getQuizzCards(date) {
    const data = dataProvider.readData();
    const requestedDate = date ? new Date(date) : new Date();
    return data.cards.filter(card => {
        const lastAnsweredDate = new Date(parseInt(card.date));
        const daysSinceLastAnswer = Math.floor((requestedDate - lastAnsweredDate) / (1000 * 3600 * 24));
        const reviewPeriods = { FIRST: 1, SECOND: 2, THIRD: 4, FOURTH: 8, FIFTH: 16, SIXTH: 32, SEVENTH: 64 };

        return card.category !== 'DONE' && daysSinceLastAnswer >= (reviewPeriods[card.category] || 0);
    });
}
