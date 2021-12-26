import { register } from './controllers/deals';
import express from "express";

import { token } from './config'
const app = express();
app.use(express.json())

app.use((req, res, next) => {
  if (!req.headers.token || token !== req.headers.token) {
    console.log('not allowed access')
    return res.status(403).send('mot allowed')
  }
  return next()
})

app.post('/register', register)
app.listen(3000, () => console.log('App listening at http://localhost:3000'))