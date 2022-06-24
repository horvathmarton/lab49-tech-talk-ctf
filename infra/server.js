const { join } = require('path');
const express = require('express');

const app = express();

app.get('**/flag|flag.txt', (req, res) => res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ'));

app.use(express.static(join(__dirname, '..', 'static')));

const port = Number.parseInt(process.env.PORT ?? '8080')
app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});