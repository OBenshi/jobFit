module.exports = {
    mongoURI: process.env.MONGO_URI,
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
};
