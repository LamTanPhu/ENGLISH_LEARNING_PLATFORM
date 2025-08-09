// import { MongooseModuleOptions } from '@nestjs/mongoose';

// export const mongooseConfig: MongooseModuleOptions = {
//     uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/english-learning',
// };

import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Logger } from '../config/logger.config';

export const mongooseConfig: MongooseModuleOptions = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/english-learning',
};

const mongoose = require('mongoose');
mongoose.connection.on('connected', () => {
    new Logger().log('Mongoose connected to ' + (process.env.MONGODB_URI || 'mongodb://localhost:27017/english-learning'));
});
mongoose.connection.on('error', (err) => {
    new Logger().error('Mongoose connection error: ' + err.message, err.stack);
});