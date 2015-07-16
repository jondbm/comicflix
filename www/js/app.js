var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});

var SearchBar = React.createClass({
    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    },
    render: function () {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="search" ref="searchKey" onChange={this.searchHandler} value={this.props.searchKey}/>
            </div>

        );
    }
});

var MovieListItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={"#movies/" + this.props.movie.id}>
                    <img className="media-object small pull-left" src={"pics/" + this.props.movie.filename + ".png" }/>
                    {this.props.movie.name}
                    <p>Director: {this.props.movie.director}</p>
                </a>
            </li>
        );
    }
});

var MovieList = React.createClass({
    render: function () {
        var items = this.props.movies.map(function (movie) {
            return (
                <MovieListItem key={movie.id} movie={movie} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Comic Book Movies!" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <MovieList movies={this.props.movies}/>
                </div>
            </div>
        );
    }
});

var Youtube = React.createClass({
    render: function() {
        var iframeStyles = {
            overflow : 'hidden',
            height : '200px',
            width: '300px'
        };

        return (
          <div>
            <iframe style={iframeStyles}
                    width="100%"
                    height="100%"
                    src={this.props.code}
                    frameborder="0"
                    allowfullscreen>
            </iframe>
          </div>
        );
    }
});


var MoviePage = React.createClass({
    getInitialState: function() {
        return {movie: {}};
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.movieId).done(function(result) {
            this.setState({movie: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Comic-Book Movie" back="true"/>
                <div className="card">
                    <ul className="table-view">
                        <li className="table-view-cell media">
                            <img className="media-object big pull-left" src={"pics/" + this.state.movie.filename + ".png" }/>
                            <h1>{this.state.movie.name}</h1>
                            <p>Director: {this.state.movie.director}</p>
                        </li>
                        <li className="table-view-cell media">
                                <div className="media-body">
                                Studio
                                    <p>{this.state.movie.studio}</p>
                                </div>
                            
                        </li>
                        <li className="table-view-cell media">
                                <div className="media-body">
                                Starring
                                    <p>{this.state.movie.starring}</p>
                                </div>
                            
                        </li>
                        <li className="table-view-cell media">
                                <div className="media-body">
                                Release Date
                                    <p>{this.state.movie.release}</p>
                                </div>
                            
                        </li>
                        <li className="table-view-cell media">
                                <div className="media-body">
                                Summary
                                    <p>{this.state.movie.summary}</p>
                                </div>
                            
                        </li>
                        <li className="table-view-cell media">
                                <div className="media-body">
                                Notes
                                    <p>{this.state.movie.description}</p>
                                </div>
                            
                        </li>
                        <li className="table-view-cell media">
                                <div className="media-body">
                                Trailer
                                    <p>
                                        <Youtube code={this.state.movie.youTube} />
                                    </p>
                                </div>
                            
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            searchKey: '',
            movies: []
        }
    },
    searchHandler: function(searchKey) {
        movieService.findByName(searchKey).done(function(movies) {
            this.setState({
                searchKey:searchKey,
                movies: movies,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} movies={movies}/>]});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<HomePage key="list" searchHandler={this.searchHandler} searchKey={this.state.searchKey} movies={this.state.movies}/>);
        }.bind(this));
        router.addRoute('movies/:id', function(id) {
            this.slidePage(<MoviePage key="details" movieId={id} service={movieService}/>);
        }.bind(this));
        router.start();
    }
});

React.render(<App/>, document.body);