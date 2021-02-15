const express = require('express'),
    { createCoach, 
        getCoach,
        getCoaches,
        updateCoach,
        checkLogin } = require('../middleware/coachware');
const router = express.Router();

// CREATE
router.post('/', (req, res) => {
    createCoach(req.body)
        .then(result => (result) ? res.status(200).json(result._id) : res.status(400).send())
        .catch(err => res.status(404).send(err))
});
// --------------------------------------------------------------------

// READ
router.get('/latitude/:lat/longitude/:long', (req, res) => {
    getCoaches(req.params.lat, req.params.long)
        .then(result => (result.length > 0) ? res.status(200).json(result) : res.status(400).send())
        .catch(err => res.status(404).send(err))
});

// READ ONE
router.get('/id/:id', (req, res) => {
    getCoach(req.params.id)
        .then(result => (result) ? res.status(200).json(result) : res.status(400).send())
        .catch(err => res.status(404).send(err))
});

// LOGIN
router.get('/login', (req, res) => {
    checkLogin(req.headers.authorization)
        .then(result => { 
            (result) 
            ? res.status(200).send(result._id) 
            : res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Restricted Area"').send() })
        .catch(err => res.status(404).send(err))
});
// --------------------------------------------------------------------

// UPDATE
router.put('/', (req, res) => {
    checkLogin(req.headers.authorization)    
        .then(result => { 
            if (result) {
                updateCoach(req.body)
                    .then(result => (result) ? res.status(200).send() : res.status(400).send())
                    .catch(err => res.status(404).send(err))
            } else 
                res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Restricted Area"').send()        
        })
        .catch(err => res.status(404).send(err))            
});
// --------------------------------------------------------------------

module.exports = router;