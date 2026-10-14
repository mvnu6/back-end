const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.get('/some-url', (req, res)=> {
  res.send('<html><body><h1>bonjour html</h1></body></html>');
});

app.get('/some-json', (req,res)=> {
  res.json({age: 21, 
    name:'manu'})
});

app.get('/transaction', (req, res) => {
  res.json([100, 2000, 3000]);
});

app.get('/exo-query-string', (req, res) => {
  console.log(req.query);
  const age = req.query.age
  
  res.send(`<h1>${age}</h1>`)
});

app.get('/get-id/:userId', (req, res)=>{
  
  const user = req.params.userId

  res.send(`<h1>${user}</h1>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});