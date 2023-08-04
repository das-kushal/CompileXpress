import exec from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeFile = async (language, filePath) => {
    const fileName = path.basename(filePath);
    const outputFileName = `${fileName}.out`;
    const outputFilePath = path.join(outputPath, outputFileName);
    if (language === 'cpp') {
        return new Promise((resolve, reject) => {
            exec.exec(`g++ -std=c++17 ${filePath} -o ${outputFilePath} &&  ${outputFilePath}`, (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            });
        })
    }
    if (language === 'js') {
        return new Promise((resolve, reject) => {
            exec.exec(`node ${filePath}`, (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            });
        })
    }
    if (language === 'py') {
        return new Promise((resolve, reject) => {
            exec.exec(`python ${filePath}`, (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            });
        })
    }
    return 'Language not supported';
}

export default executeFile;