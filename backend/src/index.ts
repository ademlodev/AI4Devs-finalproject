import express from 'express';
import { version } from '../package.json';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/version', (_req, res) => {
  res.json({ version });
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});
