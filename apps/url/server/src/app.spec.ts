import request from 'supertest';
import { createApp } from './app';

describe('App', () => {
 let app;
 let urls: Array<string>;

 beforeEach(async () => {
  urls = [];

  const shortenUrl = async (original: string) => {
   urls = [...urls, original];
   const short = `http://localhost:3333/${urls.length}`;
   const qrCode = "mockQRCodeData";
   return { short, qrCode };
  };

  const lookupUrl = async (shortId: number) => {
   return urls[shortId];
 };

 app = await createApp({
  shortenUrl,
  lookupUrl,
});
});

it('should store shortened urls', async () => {
 const original = 'www.example.com/123';
 const response = await request(app)
 .post('/api/shorten')
 .send({ original: original })
 expect(response.status).toEqual(201);
 expect(response.body.qrCode).toEqual("mockQRCodeData");
 expect(urls).toContain(original);
});
});