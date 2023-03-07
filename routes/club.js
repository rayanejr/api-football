import express from "express";
import clubModel from "../models/club.js"; 

const Router = express.Router();

Router.get('/', async(req, res) => {
    try { 
        let clubs = await clubModel.find();  
        return res.status(200).json(clubs);
    } catch(err) {
        console.error(err);
        return res.status(500).json({msg: err});
    }
});

Router.post('/', async (req, res) => {
    const { name, coach_name, country, trophies, redCards } = req.body;
    if (name == null || name == "" || coach_name == null || coach_name == "" || country == null || country == "" || trophies == null || trophies == "" || redCards == null || redCards == "") {
        return res.status(502).json({msg: "Toutes les données doivent être saisis"});      
    }
    try {
        const club = await clubModel.findOne({name: name});
        if (club) {
            return res.status(409).json({msg: "Ce club est déjà dans la base de données"});
        }
        const newClub = new clubModel({
            name: name,
            coach_name: coach_name,
            country: country,
            trophies: trophies,
            redCards: redCards,
            createdAt: new Date()
        });
        await newClub.save();
        return res.status(200).json(newClub);
    } catch(err) {
        return res.status(500).json({msg: "Une erreur est survenue lors de la création du club"});
    }
});

Router.get('/name/:name', async (req, res) => {
    const { name } = req.params;
    try {
      const club = await clubModel.findOne({ name: name });
      if (!club) {
        return res.status(404).json({ msg: "Le nom du club est introuvable" });
      }
      return res.status(200).json(club);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Erreur lors de la récupération du club" });
    }
});
  
Router.get('/id/:id', async (req, res) => {
    const {id} = req.params;
    try {
        let club = await clubModel.findById(id);
        if (club.length === 0) {
            return res.status(404).json({ msg: "l'id du club est introuvable" });
        }
        return res.status(200).json(club);
    } catch (err) {
        // return res.status(500).json({ msg: err });
        console.error(err.message);
        return res.status(500).json({ msg: "Erreur lors de la récupération par l'id du club" });
    }
});

Router.get('/nation/france', async (req, res) => {
    try {
        let club = await clubModel.find({country: /france/i});

      if (club.length === 0) {
        return res.status(404).json({ msg: "Aucun club n'appartient à la France" });
      }
      return res.status(200).json(club);
    } catch (err) {
        console.error(err.message);
      return res.status(500).json({msg: "Une erreur est survenue lors de la récupération des clubs appartenant à la France"});
    }
});

Router.get('/trophee-max/:country', async (req, res) => {
    const { country } = req.params;
    try {
      const club = await clubModel.findOne({ country }).sort({ trophies: -1 }).limit(1);
      if (!club) {
        return res.status(404).json({ msg: "Aucun club n'appartient à ce pays" });
        }
        return res.status(200).json(club);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Erreur lors de la récupération du club appartenant au pays saisi" });
    }
});
   
Router.delete('/name/:name', async (req, res) => {
    if (req.session.user) {
      let { name } = req.params;
      try {
        const club = await clubModel.findOne({ name: name });
        if (!club) {
          return res.status(404).json({ msg: "Nom du club introuvable" });
        }
        await clubModel.findOneAndDelete({ name: name });
        return res.status(200).json({ msg: "Club supprimé grace au nom" });
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Erreur lors de la suppression du club par le nom" });
      }
    } else {
      return res.status(500).json({ msg: "Vous n'êtes pas connecté" });
    }
});
  
Router.delete('/id/:id', async (req, res) => {
    if (req.session.user) {
        let { id } = req.params;
        try {
        let club = await clubModel.findById(id);
        if (!club) {
            return res.status(404).json({ msg: "Id du club introuvable" });
        }
        await clubModel.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Club supprimé grace a l'id" });
        } catch (err) {
        return res.status(500).json({ msg: err })
        }
    } else {
        return res.status(500).json({ msg: "Vous n'êtes pas connecté" });
    }
});
 
Router.put('/id/:id', async (req, res) => {
    if (req.session.user) {
        let { id } = req.params;
        const { name, coach_name, country, trophies, redCards } = req.body;
        if (name == null || name == "" || coach_name == null || coach_name == "" || country == null || country == "" || trophies == null || trophies == "" || redCards == null || redCards == "") {
            return res.status(502).json({ msg: "Données manquantes" });
        }
        try {
            const club = await clubModel.findByIdAndUpdate(id, {
                name: name,
                coach_name: coach_name,
                country: country,
                trophies: trophies,
                redCards: redCards,
                updatedAt: new Date()
            }, {
                new: true
            });
            return res.status(200).json(club);
        } catch (err) {
            return res.status(500).json({ msg: err })
        }
    } else {
        return res.status(500).json({ msg: "Vous n'êtes pas connecté" })
    }
});

Router.put('/name/:name', async (req, res) => {
    if (req.session.user) {
        const { name } = req.params;
        const { coach_name, country, trophies, redCards } = req.body;
        if (name == null || name == "" || coach_name == null || coach_name == "" || country == null || country == "" || trophies == null || trophies == "" || redCards == null || redCards == "") {
            return res.status(502).json({ msg: "Données manquantes" });
        }
        try {
            const club = await clubModel.findOneAndUpdate({ name }, {
                coach_name,
                country,
                trophies,
                redCards,
                updatedAt: new Date()
            }, {
                new: true
            });
            if (!club) {
                return res.status(404).json({ msg: "Nom du club introuvable" });
            }
            return res.status(200).json(club);
        } catch (err) {
            return res.status(500).json({ msg: err })
        }
    } else {
        return res.status(500).json({ msg: "Vous n'êtes pas connecté" })
    }
});

export default Router;