import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class FileDataProvider {
    constructor(dataFilePath) {
        this.dataFilePath = dataFilePath;
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.fullDataFilePath = path.resolve(__dirname, dataFilePath);
    }
    readData() {
        try {
            const jsonData = fs.readFileSync(this.fullDataFilePath);
            return JSON.parse(jsonData);
        } catch (err) {
            console.error("Error reading data file:", err);
            return { cards: [] };
        }
    }

    saveData(data) {
        try {
            const dataString = JSON.stringify(data, null, 2);            
            fs.writeFileSync(this.fullDataFilePath, dataString);
        } catch (err) {
            console.error("Error saving data file:", err);
        }
    }
}

export default FileDataProvider;
