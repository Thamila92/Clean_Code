export class MockFileDataProvider {
  constructor() {
    this.data = { cards: [] }; // Simule une base de données en mémoire
  }

  readData() {
    return this.data; // Retourne les données en mémoire
  }

  saveData(data) {
    this.data = data; // Sauvegarde les données en mémoire
  }
}
