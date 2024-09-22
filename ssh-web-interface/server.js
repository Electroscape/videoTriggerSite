const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

// Stelle die HTML-Datei bereit
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint zum Ausführen von SSH-Befehlen
app.use(express.json());
app.post('/run-command', (req, res) => {
    const command = req.body.command;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Fehler: ${error.message}`);
            res.status(500).send(`Fehler: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).send(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.send(stdout);
    });
});

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
