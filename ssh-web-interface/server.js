const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

const gmPassword = 'pass';
const gmUser = 'user';
const defaultUser = 'user';
const defaultPassword = 'pass';
const legacyUser = 'user';

// Stelle die HTML-Datei bereit
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint zum Ausfuehren von SSH-Befehlen
app.use(express.json());
app.post('/run-gm-command', (req, res) => {
    const { ipAddress, shellScript } = req.body;
    if (!ipAddress || !shellScript) {
        return res.status(400).send('Missing IP address or script');
    }

 const child = spawn('sshpass', [
        `-p${gmPassword}`,
        'ssh',
        '-o', 'StrictHostKeyChecking=no',
        `${gmUser}@${ipAddress}`,
        'bash',
        shellScript
    ]);

    // Stream the stdout and stderr directly to the response
    child.stdout.on('data', (data) => res.write(data));
    child.stderr.on('data', (data) => res.status(500).write(data));

    // Close the response once the child process exits
    child.on('close', (code) => {
        if (code === 0) {
            res.end('Command executed successfully');
        } else {
            res.end(`Command exited with code ${code}`);
        }
    });

    // Handle process errors
    child.on('error', (error) => {
        res.status(500).send(`Failed to start process: ${error.message}`);
    });
});

// Endpoint for running default commands
app.post('/run-command', (req, res) => {
    const { ipAddress, shellScript } = req.body;
    if (!ipAddress || !shellScript) {
        return res.status(400).send('Missing IP address or script');
    }

    const command = `sshpass -p${defaultPassword} ssh -o StrictHostKeyChecking=no ${defaultUser}@${ipAddress} bash ${shellScript}`;
    console.log(`Executing Default Command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            console.error(`STDOut: ${stdout}`);
            console.error(`STDOut: ${error}`);
            return res.status(500).send(`Response:\n${stderr || error.message}`);
        }
        res.send(stdout || 'Command executed successfully');
    });
});

// Endpoint for running default commands
app.post('/run-legacy-command', (req, res) => {
    const { ipAddress, shellScript } = req.body;
    if (!ipAddress || !shellScript) {
        return res.status(400).send('Missing IP address or script');
    }

    const command = `sshpass -p${defaultPassword} ssh -o StrictHostKeyChecking=no ${legacyUser}@${ipAddress} bash ${shellScript}`;
    console.log(`Executing Legacy Command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            console.error(`STDOut: ${stdout}`);
            console.error(`STDOut: ${error}`);
            return res.status(500).send(`Response:\n${stderr || error.message}`);
        }
        res.send(stdout || 'Command executed successfully');
    });
});

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});


