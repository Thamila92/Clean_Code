export class DataProvider {
    readData() {
        throw new Error('readData() must be implemented');
    }

    saveData(data) {
        throw new Error('saveData() must be implemented');
    }
}
