import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';

mongoose.connect(`mongodb://root:root@localhost:27017/`, {
    useNewUrlParser: true,
}, (error)=>{
    if(error){
        console.log('Error : '+error);
    }else{
        console.log('Connexion à la base de données réussie');
    }
});



import clubRoute from'./routes/club.js';
import authRoute from './routes/auth.js';



const App = express(); 
App.use(helmet());
App.use(morgan('dev'));
App.use(express.json());

App.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        secure: false
    }
}))

App.get('/',(req,res)=>{
    return res.send('<h1>serveur en marche !!!</h1>');
});

App.use('/api/club', clubRoute);
App.use('/api', authRoute);

/*import fs from 'fs'
import club from './models/club.js';

const data = JSON.parse(fs.readFileSync('./data/clubsData.json', 'utf-8'))

//console.log(data)

const importData = async () => {
    try {
      await club.create(data)
      console.log('data successfully imported')
      // to exit the process
      process.exit()
    } catch (error) {
      console.log('error', error)
    }
  }
// decommenter pour import
importData()*/

const PORT=5663;


App.listen(PORT, ()=>{
    console.log(`serveur en marche sur http://localhost:${PORT}`);
});
