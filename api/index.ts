import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import drawingsRouter, { mountRouter } from './router/drawings';



const port = 8000;
const app = express();
expressWs(app);
mountRouter();


app.use(cors());
app.use('/drawing', drawingsRouter);


app.listen(port, () => {
	console.log(`Server started on ${port} port!`);
});
