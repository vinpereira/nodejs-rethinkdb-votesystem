$(document).ready(() => {
    let socket = io()

    socket.on('updates', (movie) => {
        $('#' + movie.id + ' .likes').text(movie.likes)
        $('#' + movie.id + ' .unlikes').text(movie.unlikes)
    })

    socket.on('movies', (movie) => {
        $(".movies").append("<li class='movie' id='" + movie.id + "'>" + 
            "<span class='position'>" + ($( "li.movie" ).length + 1) + "</span>" + 
            "<div class='vote'>" + 
                "<div class='btnVote'>" + 
                    "<span class='btnLike'><i class='fa fa-thumbs-up fa-2x'></i></span>" + 
                    "<span class='numVotes likes'>" + movie.likes + "</span>" + 
                "</div>" + 
                "<div class='btnVote'>" + 
                    "<span class='btnUnlike'><i class='fa fa-thumbs-down fa-2x'></i></span>" + 
                    "<span class='numVotes unlikes'>" + movie.unlikes + "</span>" + 
                "</div>" + 
            "</div>" + 
            "<span class='title'>" + movie.title + "</span></li>")
    })

    $('.movies').on('click', 'span.btnLike', function(e) {
        let movieId = $(this).parent('div').parent('div').parent('li')[0].id;
        $.ajax({
            type: 'PUT',
            url: '/movie/like/' + movieId
        });
    });
    
    $('.movies').on('click', 'span.btnUnlike', function(e) {
        let movieId = $(this).parent('div').parent('div').parent('li')[0].id;
        $.ajax({
            type: 'PUT',
            url: '/movie/unlike/' + movieId
        });
    });

    $('#form').on('submit', (event) => {
        event.preventDefault()

        let input = $('#title')
        let title = input.val()

        if (!title || title.trim().length === 0) {
            alert('The title is required')
            return false
        } else {
            $.ajax({
                type: 'POST',
                url: '/movie',
                data: {
                    title: title
                },
                sucess: (data) => {
                    input.val('')
                }
            })
        }
    })
})