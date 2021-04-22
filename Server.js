const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, function(){
  console.log("server has started on port ", PORT);
});
