import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-rwbw6us-shard-00-00.f6bndii.mongodb.net:27017,ac-rwbw6us-shard-00-01.f6bndii.mongodb.net:27017,ac-rwbw6us-shard-00-02.f6bndii.mongodb.net:27017/?ssl=true&replicaSet=atlas-13vjmr-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;


