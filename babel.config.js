module.exports = {
    presets: [
      '@babel/preset-env', // Pour transformer les nouvelles fonctionnalités JavaScript (ES6+)
      '@babel/preset-react', // Pour transformer le JSX      
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-private-property-in-object',
      ]
  };
  
  