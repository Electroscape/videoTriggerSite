const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

// Stelle die HTML-Datei bereit
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint zum Ausfuehren von SSH-Befehlen
app.use(express.json());
app.post('/run-command', (req, res) => {
    const { command } = req.body;

    // Execute the SSH command and capture the output
    exec(command, (error, stdout, stderr) => {
	console.log('Command executed:', command);
	console.log('stdout:', stdout);
	console.log('stderr:', stderr);

        if (error) {
	    console.error('Error executing command:', error.message);
            res.status(500).send(`Error: ${stderr || error.message}`);  // Send error message
            return;
        }
        // Send the output of the command back to the client
        res.send(stdout || stderr);
    });
});

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
