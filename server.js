const axios = require('axios').default;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const querystring = require('querystring');

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const TMDB_API_KEY = process.env.TMDB_API_KEY;
app.get('/api/movie/search/:title', async (req, res) => {
    let { title } = req.params;
    const params = {
        api_key: TMDB_API_KEY,
        query: title
    }
    paramsString = querystring.stringify(params);
    tmdbRes = await axios.get(`https://api.themoviedb.org/3/search/movie?${paramsString}`);
    let { results } = tmdbRes.data
    res.send(results);
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));