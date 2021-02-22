import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Appointment from './dbSchema.js';


const Database = 'mongodb+srv://admin:evansinho@cluster0.c3yaw.mongodb.net/appDB?retryWrites=true&w=majority';

// Instantiate the app
const app = express();
// Define our app port.
const port = process.env.PORT || 3000;

// dabase connection
mongoose.connect(Database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

// middlewares
app.use(express.json());
app.use(Cors());

//routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome'})
})

app.post('/event', async (req, res) => {
  try {
    const newEvent = await Appointment.create(req.body);
    res.status(201).json(newEvent);
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
})

app.get("/event/:id", async (req, res) => {
  try {
    let id = req.params.id
    const event = await Appointment.findById(id).exec();
    if (!event) return res.status(404).json({msg: "There is no event in DB"});

    res.status(200).json(event);

  } catch (e) {
    res.status(500).send("server error")
  }
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));