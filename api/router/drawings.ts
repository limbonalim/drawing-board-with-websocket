import express from 'express';
import { ActiveConnections } from '../types';

const drawingsRouter = express.Router();
const activeConnections: ActiveConnections = {};

export const mountRouter = () => {
	drawingsRouter.ws('/', (ws, req) => {
		const id = crypto.randomUUID();
		console.log(`client ${id} is connected`);
		activeConnections[id] = ws;

		ws.on('close', () => {
			console.log(`client ${id} is disconnected!`);
			delete activeConnections[id];
		});
	});
};

export default drawingsRouter;