const express = require('express');
const RepoController = require('../controllers/repoController')

const router = express.Router();

router.post('/create', RepoController.createRepo)
router.get('/getuserrpos/:username', RepoController.getuserrpos)
router.get('/cloneRepo/:username/:repoName', RepoController.cloneRepo)

module.exports = router;