export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // Utilisation de Babel pour les fichiers JS
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
