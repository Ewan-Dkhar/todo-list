import e from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import fs from "fs";

const app = e();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(e.json());

app.get("/getlist", (req, res) => {
    let items = fs.readFileSync("./data.json");
    items = JSON.parse(items);
    res.json(items);
})

app.post("/delete", (req, res) => {
    const id = req.body.id;
    let items = fs.readFileSync("./data.json");
    items = JSON.parse(items);
    items = items.filter(item => {
        return id !== item.id;
    })
    fs.writeFileSync('./data.json', JSON.stringify(items), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('JSON data written to data.json');
    });
    res.sendStatus(200)
})

app.post("/editisdone", (req, res) => {
    const {id, isDone}  = req.body;
    let items = fs.readFileSync("./data.json");
    items = JSON.parse(items);
    items.forEach(item => {
        if(item.id === id) item.isDone = isDone;
    })
    fs.writeFileSync('./data.json', JSON.stringify(items), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('JSON data written to data.json');
    });
    res.sendStatus(200)
})

app.post("/add", (req, res) => {
    let items = fs.readFileSync("./data.json");
    items = JSON.parse(items);
    const todo = req.body;
    items.push(todo);
    fs.writeFileSync('./data.json', JSON.stringify(items), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('JSON data written to data.json');
    });
    res.sendStatus(201)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})