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
    if (isValid) {
        card.category = getNextCategory(card.category);
        card.date = new Date().toISOString();
    } else {
        card.category = 'FIRST';
        card.date =new Date().toISOString();
    }
   
}

export function updateFicheAnswer(cardId, isValid) {
    const { card, data } = findCardById(cardId);
    
    markCardAsAnswered(card, isValid);
    dataProvider.saveData(data); 
}

function getNextCategory(currentCategory) {
    const categories = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH'];
    const index = categories.indexOf(currentCategory);
    return index < categories.length - 1 ? categories[index + 1] : 'DONE';
}

const reviewPeriods = { FIRST: 1, SECOND: 2, THIRD: 4, FOURTH: 8, FIFTH: 16, SIXTH: 32, SEVENTH: 64 };

export function getQuizzCards(date) {
    const data = dataProvider.readData();
    console.log("Total cards loaded:", data.cards.length);
    
     data.cards.forEach(card => {
      console.log("Card date:", card.date, "Type:", typeof card.date);
    });
  
    const requestedDate = date ? new Date(date) : new Date();
    console.log("Requested date for quiz:", requestedDate.toISOString());
    
    const filteredCards = data.cards.filter(card => {
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
        const isDueForReview = card.category !== 'DONE' && daysSinceLastAnswer >= reviewPeriod;
        
        return isDueForReview;
      } catch (error) {
        console.error(`Error processing card ${card.id}:`, error);
        return false;
      }
    });
  
    return filteredCards;
  }
