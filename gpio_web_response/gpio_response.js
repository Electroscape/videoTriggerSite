const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 5500;

function readGPIO(pin) {
    return new Promise((resolve, reject) => {
        exec(`raspi-gpio get ${pin}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            // Example output:
            // GPIO 17: level=1 fsel=0 func=INPUT pull=UP

            const match = stdout.match(/level=(\d)/);

            if (!match) {
                reject(new Error("Couldn't parse GPIO state"));
                return;
            }

            resolve(parseInt(match[1]));
        });
    });
}

app.get('/gpio/:pin', async (req, res) => {
    try {
        const value = await readGPIO(req.params.pin);

        res.json({
            pin: req.params.pin,
            value: value
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`GPIO server listening on port ${PORT}`);
});