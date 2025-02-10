const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'data.json');

function readData() {
    try {
        const jsonData = fs.readFileSync(dataFilePath);
        return JSON.parse(jsonData);
    } catch (err) {
         console.error("Error reading data file:", err);
        return { cards: [] };  
    }
}

function saveData(data) {
    try {
        const dataString = JSON.stringify(data, null, 2);
        fs.writeFileSync(dataFilePath, dataString);
    } catch (err) {
         console.error("Error saving data file:", err);
    }
}

function createFiche(question, answer) {
    const data = readData();
    const newCard = {
        id: Date.now().toString(),  
        question,
        answer,
        category: 'First'   
    };
    data.cards.push(newCard);
    saveData(data);
    return newCard;
}

function getFiches() {
    const data = readData();
    return data.cards;
}

function updateFicheAnswer(cardId, isValid) {
    const data = readData();
    const card = data.cards.find(card => card.id === cardId);
    if (card) {
        card.answeredCorrectly = isValid;
        saveData(data);
        return true;
    } else {
        return false;
    }
}

 

 module.exports = {
    createFiche,
    getFiches,
    updateFicheAnswer,
 };
