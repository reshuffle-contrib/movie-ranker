import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Movies from '../components/Movies';
import LikedMovies from '../components/LikedMovies';
class Routes extends Component {
    render() {
        return (
        <Router>
            <div>
                <Route path="/" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/movies" exact component={Movies} />
                <Route path="/liked-movies" exact component={LikedMovies} />
            </div>
        </Router>
        );
    }
}

export default Routes;