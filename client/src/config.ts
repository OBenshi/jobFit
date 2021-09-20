export const serverURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://swat-analyzer.herokuapp.com/';
