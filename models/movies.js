let model = module.exports
let r = require('rethinkdb')
let config = require('../config')

let MOVIES_TABLE = 'movies';

model.setup = (callback) => {
    console.log('Setting up RethinkDB...')

    r.connect(config.database).then((conn) => {
        // Does the db exist?
        r.dbCreate(config.database.db).run(conn).then((conn) => {
            console.log('Database created...')
        }).error((error) => {
            console.log('Database already created...')
        }).finally(() => {
            // Does the table exist?
            r.table(MOVIES_TABLE).limit(1).run(conn, (error, cursor) => {
                let promise
                if (error) {
                    console.log('Creating table...')
                    promise = r.tableCreate(MOVIES_TABLE).run(conn)
                } else {
                    promise = cursor.toArray()
                }

                // The table exists, setup the update listener
                promise.then((result) => {
                    console.log('Setting up update listener...')
                    
                    r.table(MOVIES_TABLE).changes().run(conn).then((cursor) => {
                        cursor.each((error, row) => {
                            callback(row)
                        })
                    })
                }).error((error) => {
                    throw error
                })
            })
        })

    }).error((error) => {
        throw error
    })
}

model.getMovies = (callback) => {
    r.connect(config.database).then((conn) => {
        r.table(MOVIES_TABLE).run(conn).then((cursor) => {
            cursor.toArray((error, results) => {
                if (error) throw error
                callback(results)
            })
        }).error((error) => {
            throw error
        })
    }).error((error) => {
        throw error
    })
}

model.saveMovie = (movie, callback) => {
    r.connect(config.database).then((conn) => {
        r.table(MOVIES_TABLE).insert(movie).run(conn).then((results) => {
            callback(true, results)
        }).error((error) => {
            callback(false, error)
        })
    }).error((error) => {
        callback(false, error)
    })
}

model.updateMovie = (movie, field, callback) => {
    r.connect(config.database).then((conn) => {
        r.table(MOVIES_TABLE).get(movie.id).update((movie) => {
            return r.object(field, movie(field).add(1))
        }).run(conn).then((results) => {
            callback(true, results)
        }).error((error) => {
            callback(false, error)
        })
    }).error((error) => {
        callback(false, error)
    })
}