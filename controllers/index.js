let model = require('../models/movies')

let vote = (req, res, action) => {
    let movie = {
        id: req.params.id
    }

    model.updateMovie(movie, action, (success, result) => {
        if (success) {
            res.json({
                status: 'OK'
            })
        } else {
            res.json({
                status: 'Error'
            })
        }
    })
}

module.exports = (app) => {
    app.get('/', (req, res) => {
        model.getMovies((result) => {
            res.render('index', {
                movies: result
            })
        })
    })

    app.post('/movie', (req, res) => {
        let movie = {
            title: req.body.title,
            likes: 0,
            unlikes: 0
        }

        model.saveMovie(movie, (success, result) => {
            if (success) {
                res.json({
                    status: 'OK'
                })
            } else {
                res.json({
                    status: 'Error'
                })
            }
        })
    })

    app.put('/movie/like/:id', (req, res) => {
        vote(req, res, 'likes')
    })

    app.put('/movie/unlike/:id', (req, res) => {
        vote(req, res, 'unlikes')
    })
}