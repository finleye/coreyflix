const axios = require('axios').default;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Redis = require("ioredis");
const querystring = require('querystring');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const redisClient = new Redis(process.env.REDISTOGO_URL);
 
redisClient.on("error", function(error) {
  console.error(error);
});

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


app.post('/api/movie/queue/:tmdb_id', async (req, res) => {
    let { tmdb_id } = req.params;
    await redisClient.rpush(['movies', tmdb_id]);

    const params = {
        api_key: TMDB_API_KEY,
        language: 'en-US'
    }
    paramsString = querystring.stringify(params);
    tmdbRes = await axios.get(`https://api.themoviedb.org/3/movie/${tmdb_id}?${paramsString}`);
    let { data } = tmdbRes

    let { id, title, imdb_id } = data

    redisClient.hmset(
        `movie:${tmdb_id}`,
        new Map([["id", id], ["title", title], ["imdb_id", imdb_id], ["progress", 0]]),
        (err, result) => { 
            console.log("err: ", err)
            console.log("result: ", result) 
        }
    )

    res.send(data)
});

app.get('/api/movie/queue', (req, res) => {
    redisClient.lrange('movies', 0, -1, (err, queue) => {
        var pipeline = redisClient.pipeline();

        queue.forEach(function(key, index){
            pipeline.hgetall(`movie:${key}`);
        });
    
        pipeline.exec(function(err, result){
            res.send({ raw: queue, enriched: result.map(resp => resp[1]) })
        });

    });
});

app.delete('/api/movie/queue', (req, res) => {
    redisClient.del('movies', (err, result) => {
        res.send({result: result})
    })
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