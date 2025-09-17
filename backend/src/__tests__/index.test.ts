import request from 'supertest';
import express from 'express';
import { version } from '../../package.json';

const app = express();

app.get('/api/version', (_req, res) => {
  res.json({ version });
});

describe('API Version Endpoint', () => {
  it('should return the correct version', async () => {
    const response = await request(app).get('/api/version');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ version });
  });
});
