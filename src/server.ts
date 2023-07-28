import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logger from './library/Logger';
import eventRoutes from './routes/Events';

const router = express();
const {
    mongo: { url },
    server: { port },
} = config;

mongoose
    .connect(url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logger.info('Connected to MongoDB');
        StartServer();
    })
    .catch(error => {
        Logger.error(error);
    });

/* Server is starting only if MongoDB connected */

const StartServer = () => {
    router.use((req, res, next) => {
        Logger.info(
            `Incoming -> METHOD: ${req.method} URL: ${req.url} IP: ${req.socket.remoteAddress}`,
        );

        res.on('finish', () => {
            Logger.info(
                `Result -> METHOD: ${req.method} URL: ${req.url} IP: ${req.socket.remoteAddress} STATUS: ${res.statusCode}`,
            );
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /* API rules */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        );

        if (req.method == 'OPTIONS') {
            res.header(
                'Access-Control-Allow-Methods',
                'PUT, POST, PATCH, DELETE, GET',
            );
            return res.status(200).json({});
        }

        next();
    });

    /* Routes */

    router.use('/events', eventRoutes);

    /* Healtcheck */
    router.get('/ping', (req, res, next) =>
        res.status(200).json({ message: 'pong' }),
    );

    /* Error handling */

    router.use((req, res, next) => {
        const error = new Error('not found');
        Logger.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(port, () =>
        Logger.info(`Server is running on port: ${port}`),
    );
};
