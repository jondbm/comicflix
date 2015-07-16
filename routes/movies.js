var movies = [
    {"id": 0, "name": "Jurassic World","filename":"jurassicworld", "starring":"Chris Pratt","studio":"Universal","director": "Colin Trevorrow", "release": "June 2015", "summary": "Many years after the accident at Jurassic Park, Jurassic World is a huge success but a new genetically modified dinosaur threatens to ruin the party!", "description": "With a new director and new effects, Jurassic Park returns to the big screen after over ten years of extinction.", "youTube":"https://www.youtube.com/embed/RFinNxS5KN4"},
   {"id": 1, "name": "Ant-Man","filename":"antman", "starring":"Paul Rudd","studio":"Marvel","director": "Peyton Reed", "release": "July 2015", "summary": "The smalled superhero arrives to save the day.", "description": "Despite a troubled production, Ant-Man looks set to loom large at the box-office.", "youTube":"https://www.youtube.com/embed/IEVE3KSKQ0o"},
   {"id": 2, "name": "Avengers: Age of Ultron","filename":"avengers2", "starring":"Robert Downey Jr, Chris Hemsworth, Chris Evans, Samuel L Jackson", "studio":"Marvel","director": "Joss Whedon", "release": "April 2015", "summary": "The Avengers return to take on their own creation, Ultron.", "description": "Bigger, louder and longer than before, Joss Whedon brings the next chapter in his Marvel team-up movie saga.", "youTube":"https://www.youtube.com/embed/tmeOjFno6Do"},
   {"id": 3, "name": "Captain America: The Winter Soldier","filename":"cap2", "starring":"Chris Evans", "studio":"Marvel","director": "Anthony Russo", "release": "May 2014", "summary": "There's something sinister at the heart of SHIELD, and it's up to Captain America to work out what's going on.", "description": "Modelled after a 70s espionage thriller, this is one of Marvel's best movies and a gripping tale of betrayal and secrets.", "youTube":"https://www.youtube.com/embed/7SlILk2WMTI"},
   {"id": 4, "name": "Batman vs Superman: Dawn of Justice","filename":"batman", "starring":"Ben Afflect, Henry Cavill", "studio":"Warner Bros","director": "Zack Snyder", "release": "March 2016", "summary": "As the public grows suspicious of Superman, it's up to Batman to take him down.", "description": "Ben Affeck steps into the ring as the caped crusader while Henry Cavill returns as Superman.", "youTube":"https://www.youtube.com/embed/IwfUnkBfdZ4"},

   ];

exports.findAll = function (req, res, next) {
    var name = req.query.name;
    if (name) {
        res.send(movies.filter(function(movie) {
            return (movie.name).toLowerCase().indexOf(name.toLowerCase()) > -1;
        }));
    } else {
        res.send(movies);
    }
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(movies[id]);
};