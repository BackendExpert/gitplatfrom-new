const Repo = require('../models/Repo');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const REPOS_ROOT = path.resolve('./repos');

const RepoController = {
    createRepo: async (req, res) => {
        try {
            const { name, username, privateRepo } = req.body;
            const repoPath = path.join(REPOS_ROOT, username, `${name}.git`);

            // Make sure parent folder exists
            fs.mkdirSync(path.dirname(repoPath), { recursive: true });

            // ⚡️ Wrap exec in a Promise to await it properly
            const execPromise = (cmd) =>
                new Promise((resolve, reject) => {
                    exec(cmd, (err, stdout, stderr) => {
                        if (err) {
                            console.error('Git init failed:', stderr);
                            return reject(stderr);
                        }
                        console.log('Git init output:', stdout);
                        resolve(stdout);
                    });
                });

            await execPromise(`git init --bare ${repoPath}`);

            // Only save to DB if `git init` succeeded
            const repo = new Repo({
                name,
                owner: username,
                private: privateRepo,
                path: repoPath,
            });

            await repo.save();

            res.json({ message: 'Repo created', repo });

        }
        catch (err) {
            console.log(err)
        }
    },

    getuserrpos: async (req, res) => {
        try {
            const { username } = req.params;

            const repo = await Repo.find({ owner: username });
            if (!repo) return res.json({ message: 'Repo not found' });

            res.json(repo);
        }
        catch (err) {
            console.log(err)
        }
    },

    cloneRepo: async (req, res) => {
        try {
            const { username, repoName } = req.params;

            const repo = await Repo.findOne({ name: repoName, owner: username });
            if (!repo) return res.json({ message: 'Repo not found' });

            // Example: send a clone URL
            // const cloneUrl = `http://yourdomain.com/repos/${username}/${repoName}.git`;

            const cloneUrl = `http://localhost:5000/repos/${username}/${repoName}.git`;

            res.json({ cloneUrl });
        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = RepoController;