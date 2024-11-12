const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

const gmPassword = 'password';
const gmUser = 'user';
const defaultUser = 'user';
const defaultPassword = 'password';

// Stelle die HTML-Datei bereit
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint zum Ausfuehren von SSH-Befehlen
app.use(express.json());
app.post('/run-gm-command', (req, res) => {
    const { ipAddress, shellScript } = req.body;
    if (!ipAddress || !shellScript) {
        return res.status(400).send('Missing IP address or script');
    }

    const command = `sshpass -p${gmPassword} ssh ${gmUser}@${ipAddress} bash ${shellScript}`;
    console.log(`Executing GM Command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).send('Failed to execute GM command');
        }
        res.send(stdout || 'GM Command executed successfully');
    });
});

// Endpoint for running default commands
app.post('/run-command', (req, res) => {
    const { ipAddress, shellScript } = req.body;
    if (!ipAddress || !shellScript) {
        return res.status(400).send('Missing IP address or script');
    }

    const command = `sshpass -p${defaultPassword} ssh ${defaultUser}@${ipAddress} bash ${shellScript}`;
    console.log(`Executing Default Command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).send('Failed to execute command');
        }
        res.send(stdout || 'Command executed successfully');
    });
});

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});


