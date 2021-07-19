module.exports = {
    mongoURI: `mongodb+srv://OBenshi:${process.env.MONGO_KEY}@swat.bve4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
};
