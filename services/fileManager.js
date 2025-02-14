import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataProvider } from './dataProviderInterface.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class FileDataProvider extends DataProvider {
    constructor(dataFilePath) {
      super();
      this.dataFilePath = dataFilePath;
      this.fullDataFilePath = path.resolve(__dirname, dataFilePath);
    }
  
    readData() {
      try {
        const jsonData = fs.readFileSync(this.fullDataFilePath, 'utf-8');
        return JSON.parse(jsonData);
      } catch (err) {
        console.error("Error reading data file:", err);
        return { cards: [] };
      }
    }
  
    saveData(data) {
      try {
        const dataString = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.fullDataFilePath, dataString, 'utf-8');
      } catch (err) {
        console.error("Error saving data file:", err);
      }
    }
  }
  