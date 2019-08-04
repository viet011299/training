const express = require('express');// Giao thuc
const path = require('path'); // Chuyen duong dan   
const server = express(); //sever
const bodyParser = require('body-parser');// dich du lieu
const fs = require('fs');

server.use(express.static('public')); // su dung ca thu muc
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + '/public/idex.html'));
});

server.get("/lists-infor", (req, res) => {
    fs.readFile("./data.json", (error, data) => {
        if (error) {
            res.status(500).send("Internal sever error");
        }
        res.status(200).json(JSON.parse(data));
    });
});
server.get("/add", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + "/public/add.html"));
});
server.post('/add', (req, res) => {
    fs.readFile('./data.json', (error, data) => {
        if (error) {
            res.status(500).send('Internal sever error');
        }
        const lists = JSON.parse(data);
        lists.push({
            id: lists.length,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber
        });
        fs.writeFile('./data.json', JSON.stringify(lists), (error) => {
            const data = JSON.stringify(lists);
            if (error) {
                res.status(500).send('Internal sever error');
            }
            res.status(200).sendFile(path.resolve(__dirname + '/public/index.html'));
        });
    });
});
server.get("/edit/:idInter", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + "/public/edit.html"));
});
server.post("/edit/:idInter", (req, res) => {
    fs.readFile('./data.json', (error, data) => {
        const lists = JSON.parse(data);
        console.log(req.param);
        const idInter = req.params.idInter;
        console.log(idInter);
        for (let item of lists) {
            // console.log(item.id);

            if (item.id == Number(idInter)) {
                // console.log(item.id);
                item.name = req.body.name;
                item.phoneNumber = req.body.phoneNumber;
                break;
            }
        }
        fs.writeFile('./data.json', JSON.stringify(lists), (error, data) => {
            res.status(200).sendFile(path.resolve(__dirname + "/public/index.html"));
        });
    });
});
server.get("/delete/:idInter", (req, res) => {
    fs.readFile("./data.json", (error, data) => {
        const lists = JSON.parse(data);
        console.log(req.params);
        const { idInter } = req.params;
        console.log(idInter);
        for (let item of lists) {
            if (item.id == Number(idInter)) {
                console.log(item.id);
                lists.splice(item.id, 1);
                for (let item of lists) {
                    if (item.id != 0) {
                        item.id -= 1;
                    }
                }
                break;
            }
        }
        fs.writeFile("./data.json",JSON.stringify(lists),(error,data)=>{
            res.status(200).sendFile(path.resolve(__dirname +"/public/index.html"));
        }) ;
    });

});
server.listen(3000, (error) => {
    if (error) {
        throw error;
    }
    console.log('sever listen on 3000 port');
});