const express = require('express');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();

const gothFamily = [
    {
        name: "Mortimer",
        age: "Adult",
        lifeState: "Sim",
    },
    {
        name: "Bella",
        age: "Adult",
        lifeState: "Sim",
    },
    {
        name: "Cassandra",
        age: "Teen",
        lifeState: "Sim",
    },
    {
        name: "Alexander",
        age: "Child",
        lifeState: "Sim",
    },
];

app.get('/pdf', async (req, res)=>{
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
    });

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px" 
        },
    });

    await browser.close();

    res.contentType("application/pdf");

    return res.send(pdf);
});

app.get('/', (req, res) => {

    const filePath = path.join(__dirname, "print.ejs");
    ejs.renderFile(filePath, {gothFamily}, (err, html) => {
       
        if(err) {
            return res.send("Erro na leitura do arquivo!");
        };

            return res.send(html);
    });
});

app.listen(3000);
