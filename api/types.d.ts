import { WebSocket } from 'ws';

export interface ActiveConnections {
	[id: string]: WebSocket;
}

export interface IMouseMove {
	x: number;
	y: number;
}

export interface IPath {
	path: IMouseMove[];
	color: string;
}
