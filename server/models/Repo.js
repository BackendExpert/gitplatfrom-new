const mongoose = require('mongoose');

const RepoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: {  type: String, required: true },
    private: { type: Boolean, default: false },
    path: { type: String, required: true }
});

const Repo = mongoose.model('Repo', RepoSchema);

module.exports = Repo;