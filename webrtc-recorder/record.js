const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');

async function startRecording(roomUrl, roomId) {

    // Define the path to your shell script
    const scriptPath = path.join(__dirname, 'record.sh'); // Assuming start_recording.sh is in the same directory

    // Run the shell script using spawn (or exec)
    const recordingProcess = spawn('bash', [scriptPath]);

    // Log any output or errors from the shell script
    recordingProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    recordingProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    recordingProcess.on('close', (code) => {
        if (code === 0) {
            console.log('Recording started successfully.');
        } else {
            console.error(`Recording process exited with code ${code}`);
        }
    });

    return { recordingProcess };



}

async function stopRecording({ recordingProcess }) {
    if (recordingProcess) {
        recordingProcess.kill('SIGINT');
    }
}

module.exports = { startRecording, stopRecording };
