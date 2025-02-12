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
function pushCardinData(newCard){
    const data = readData();
    data.cards.push(newCard);
    saveData(data);
}

function createFiche(question, answer) {
    const newCard = NewCardJson(question, answer);
    pushCardinData(newCard);
    return newCard;
}

function NewCardJson(question,answer){ 
 return {
    id: uuidv4(),  
    question,
    answer,
    category: 'FIRST' ,
    date:Date.now().toString()
}


  
 

}
function getFiches() {
    const data = readData();
    return data.cards;
}

function getCardByid(cardId,data){
  

    return data.cards.find(card => card.id === cardId);
}

function isAnsweredCorrectly(card,isValid){
 
     if (card) {
        card.answeredCorrectly = isValid;
 
        saveData(data);
 
        return true;
    } else {
        return false;
    }

}
function updateFicheAnswer(cardId, isValid) {
    
   return  isAnsweredCorrectly(getCardByid(cardId,readData()), isValid,readData());
}

 

 module.exports = {
    createFiche,
    getFiches,
    updateFicheAnswer,
 };
