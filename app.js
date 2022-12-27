const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// bước 1
app.get('/api/v1/todos', 'utf-8', (req, res) => {
    fs.readFile('dev-data/todos.json', (err, data) => {
        if (err) throw err;
        let parser = JSON.parse(data);
        res.send(parser);
    })

})
app.get('/api/v1/todos/:id', 'utf-8', (req, res) => {
    fs.readFile('dev-data/todos.json', (err, data) => {
        if (err) throw err;
        let search = req.params.id
        console.log(search.id);
        let parser = JSON.parse(data);
        let result;
        for (let i = 0; i < parser.length; i++) {
            if (req.params.id == parser[i].id) {
                result = parser[i]
            }
        }
        res.send(result);
    })
})

app.post('/api/v1/todos', (req, res) => {
    let putOk = req.body
    fs.readFile('dev-data/todos.json', (err, data) => {
        if (err) throw err;
        let parser = JSON.parse(data);
        let result = parser.find((item) => item.title == putOk.title);
        console.log(result);
        if (result) {
            res.status(500).json({ message: "Da ton tai" })
        } else {
            parser.push(putOk);
            fs.writeFile("./dev-data/todos.json", JSON.stringify(parser), (err) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json("thanh cong")
                }
            });
        }
    })
})

app.put("/api/v1/todos/:id",'utf-8',(req,res)=>{
    let putOk = req.body
    fs.readFile('dev-data/todos.json', (err, data) => {
        if (err) throw err;
        let parser = JSON.parse(data);
        let result = parser.find((item) => item.id == putOk.id);
        console.log(result);
        if (result) {
            res.status(500).json({ message: "khong tim thay" })
        } else {
            parser.push(putOk);
            fs.writeFile("./dev-data/todos.json", JSON.stringify(parser), (err) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json("update thanhcong")
                }
            });
        }
    })
})
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})