import express from 'express';
import cors from 'cors';


/**
 * * Stateful dependencies to inject at root.
 */
type MainDependencies = {
 shortenUrl: (original: string) => Promise<{short: string, qrCode: string}>;
 lookupUrl: (shortId: number) => Promise<string>;
};


// App
export async function createApp({ shortenUrl, lookupUrl }: MainDependencies) {
 const app = express();
 app.use(express.json());
 app.use(cors());

 app.post('/api/shorten', async (req, res) => {
   const original = req.body.original;
   const { short, qrCode } = await shortenUrl(original);

   res.status(201).send({
     short: short,
     original: original,
     qrCode: qrCode
   });
 });

 app.get('/s/:id', async (req, res) => {
   const id = Number(req.params.id);
   const original = await lookupUrl(id);
   res.redirect(original);
 });

 return app;
}

