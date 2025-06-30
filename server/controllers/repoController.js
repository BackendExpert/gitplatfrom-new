const Repo = require('../models/Repo');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const REPOS_ROOT = path.resolve('../repo');

const RepoController = {
    createRepo: async (req, res) => {
        try {
            const { name, username, privateRepo } = req.body;
            const repoPath = path.join(REPOS_ROOT, username, `${name}.git`);

            // Create directories if not exist
            fs.mkdirSync(path.dirname(repoPath), { recursive: true });

            // Init bare repo
            exec(`git init --bare ${repoPath}`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return res.json({ message: 'Git init failed' });
                }
            });

            const repo = new Repo({
                name,
                owner: username,
                private: privateRepo,
                path: repoPath
            });

            await repo.save();

            res.json({ message: 'Repo created', repo });

        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = RepoController;