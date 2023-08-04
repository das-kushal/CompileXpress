import express from 'express';
import generateFile from './generateFile.js';
import executeFile from './executeFile.js';
import cors from 'cors';
const app = express();


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 5001;



app.get('/', (req, res) => {
    res.send('Server is ready..home page');
})

app.post('/run', async (req, res) => {
    console.log(req.body)
    const { language = 'cpp', code } = req.body;
    console.log(language, code)
    if (code === undefined) {
        return res.status(400).json({ error: 'Code cannot be empty!!' });
    }
    try {
        // generate the file with the code 
        const filePath = await generateFile(language, code)
        console.log(filePath)
        // we need to run the file and return the output back to frontend
        const output = await executeFile(language, filePath);
        return res.status(200).json({ filePath, output: output });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }
})




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})