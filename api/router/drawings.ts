import express from 'express';
import {ActiveConnections, IPath} from '../types';

const drawingsRouter = express.Router();
const activeConnections: ActiveConnections = {};

export const mountRouter = () => {
	drawingsRouter.ws('/', (ws, req) => {
		const id = crypto.randomUUID();
		console.log(`client (${id}) is connected`);
		activeConnections[id] = ws;


		ws.on('message', (message) => {
			const parsedDraw = JSON.parse(message.toString()) as IPath;
			Object.values(activeConnections).forEach((connection) => {
				if (activeConnections[id] !== connection) {
					connection.send(JSON.stringify(parsedDraw));
				}
			});
		});



		ws.on('close', () => {
			console.log(`client ${id} is disconnected!`);
			delete activeConnections[id];
		});
	});
};

export default drawingsRouter;