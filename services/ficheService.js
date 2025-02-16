import FileDataProvider from './fileManager.js';
import dotenv from 'dotenv';
import Card from '../models/Card.js';
import { getNextCategory, reviewPeriods } from '../utils/categoryUtils.js';

dotenv.config();

if (!process.env.DATA_PATH) {
    throw new Error('DATA_PATH is not defined in environment variables');
}

const dataProvider = new FileDataProvider(process.env.DATA_PATH);


function saveUpdatedData(data) {
    dataProvider.saveData(data);
}


function addCard(newCard){
    const data = dataProvider.readData();
    data.cards.push(newCard);
    saveUpdatedData(data);
}


export function createCard(question, answer, tag) {
    const newCard = new Card(question, answer, tag);
    addCard(newCard);
    return newCard;
}


export function getCards() {
    return dataProvider.readData().cards;
}

export function getCardsByTags(tags) {
    const allCards = getCards();

    if (!tags || tags.length === 0) {
        return allCards;
    }

    return allCards.filter(card => card.tag && tags.some(tag => card.tag.includes(tag)));
}

export function findCardById(cardId) {
    const data = dataProvider.readData();

    const cardIndex = data.cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) throw new Error(`Card with ID ${cardId} not found`);

    const card = Card.fromJSON(data.cards[cardIndex]);

    return { card, cardIndex, data };
}

export function markCardAsAnswered(card, isValid) {
    card.updateStatus(isValid, getNextCategory);
}


export function updateCardAnswer(cardId, isValid) {
    const { card, cardIndex, data } = findCardById(cardId);

    markCardAsAnswered(card, isValid);

    data.cards[cardIndex] = card;

    saveUpdatedData(data); 
}


function isCardDueForReview(card, requestedDate) {
    try {

        if (!card.date) {
            console.warn(`Card ${card.id} has no date`);
            return false;
        }

        const lastAnsweredDate = new Date(card.date);
        if (isNaN(lastAnsweredDate.getTime())) {
            console.warn(`Invalid date for card ${card.id}: ${card.date}`);
            return false;
        }

        const daysSinceLastAnswer = Math.floor((requestedDate - lastAnsweredDate) / (1000 * 3600 * 24));
        const reviewPeriod = reviewPeriods[card.category] || 0;

        return card.category !== 'DONE' && daysSinceLastAnswer >= reviewPeriod;
    } catch (error) {
        console.error(`Error processing card ${card.id}:`, error);
        return false;
    }
}

export function getQuizCards(date) {
    const data = dataProvider.readData();
    const requestedDate = date ? new Date(date) : new Date();

    const filteredCards = data.cards.filter(card => isCardDueForReview(card, requestedDate));

    return filteredCards;
}