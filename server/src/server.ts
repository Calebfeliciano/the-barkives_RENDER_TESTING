import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authMiddleware } from './services/auth-service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT; // ✅ Use only Render-provided port

// Middleware
const json = bodyParser.json;
app.use(cors());
app.use(json());

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();

app.use('/graphql', expressMiddleware(server, {
  context: authMiddleware,
}));

// ✅ Optional test route
app.get('/ping', (_req, res) => {
  res.send('pong');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, '../../client/dist');

app.use(express.static(clientPath));

// Start server
app.listen(PORT, () => {
  console.log(`🌍 Server running on http://localhost:${PORT}`);
  console.log(`🚀 GraphQL at http://localhost:${PORT}/graphql`);
});
