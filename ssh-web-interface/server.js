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

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Enable JSON parsing for incoming requests
app.use(express.json());

// Endpoint for running GM-specific commands
app.post('/run-gm-command', (req, res) => {
    const { ipAddress, shellScript } = req.body;
    if (!ipAddress || !shellScript) {
        return res.status(400).send('Missing IP address or shell script path.');
    }

    // Command for GM user
    const command = `sshpass -p '${gmPassword}' ssh ${gmUser}@${ipAddress} bash ${shellScript}`;
    console.log(`Executing GM Command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing GM command: ${stderr}`);
            return res.status(500).send(stderr || 'Failed to execute GM command.');
        }
        res.send(stdout || 'GM Command executed successfully.');
    });
});

// Endpoint for running default commands
app.post('/run-command', (req, res) => {
    const { ipAddress, shellScript } = req.body;
    if (!ipAddress || !shellScript) {
        return res.status(400).send('Missing IP address or shell script path.');
    }

    // Command for default user
    const command = `sshpass -p '${defaultPassword}' ssh ${defaultUser}@${ipAddress} bash ${shellScript}`;
    console.log(`Executing Default Command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing default command: ${stderr}`);
            return res.status(500).send(stderr || 'Failed to execute default command.');
        }
        res.send(stdout || 'Command executed successfully.');
    });
});

// Endpoint for running legacy commands
app.post('/run-legacy-command', (req, res) => {
    const { ipAddress, legacyCommand } = req.body;
    if (!ipAddress || !legacyCommand) {
        return res.status(400).send('Missing IP address or legacy command.');
    }

    // Command for legacy execution
    const command = `sshpass -p '${defaultPassword}' ssh ${defaultUser}@${ipAddress} ${legacyCommand}`;
    console.log(`Executing Legacy Command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing legacy command: ${stderr}`);
            return res.status(500).send(stderr || 'Failed to execute legacy command.');
        }
        res.send(stdout || 'Legacy command executed successfully.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
