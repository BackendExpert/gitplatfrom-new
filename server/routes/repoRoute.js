const express = require('express');
const RepoController = require('../controllers/repoController')

const router = express.Router();

router.post('/create', RepoController.createRepo)


module.exports = router;