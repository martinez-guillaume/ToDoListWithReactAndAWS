module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
                 '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
                 '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
               },
    transformIgnorePatterns: [
        '/node_modules/(?!axios)', // Transforme les modules ES dans axios
      ],
  };
  
  
  
  