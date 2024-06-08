import express from 'express';
import 'dotenv/config';
import dotenv from 'dotenv';
import cors from 'cors';
import { usersRoute } from './routes/users';
import { postsRoute } from './routes/posts';


const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`UnreadPiles is running on http://localhost:${port}`);
});

