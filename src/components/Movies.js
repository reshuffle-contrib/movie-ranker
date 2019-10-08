import React, { Component } from 'react'
import './styles.css'
class Movies extends Component {
    constructor(props){
        super(props)
        this.state={
            movies:[],
            loading:true
        }

        if(!localStorage.getItem('user')){
            this.props.history.push('/login')
        }
  
    }
    componentDidMount() {
        fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fd84d5ed82e69396561e13646240f61b')
        .then(res=> res.json())
        .then(data=>{
            this.setState({movies:data.results,loading:false})
        })
  }
    logout = () =>{
        localStorage.clear()
        this.props.history.push('/login')
    }
    render() {

        return (
            <div className='container-fluid p-0' >
<nav class="navbar navbar-expand-lg navbar-light bg-blue">
  <a class="navbar-brand text-white font-weight-bold" href="#">Movie Ranker</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">

    </ul>
    <span class="navbar-text text-white">
    {
    JSON.parse(localStorage.getItem('user')).email
    }
    </span>
    <span class="navbar-text text-white" >
        <button class='btn btn-light ml-2' onClick={this.logout} >Logout</button>
    </span>
  </div>
</nav>
<br/>
<div class='container' >
    <div class='row' >
        {this.state.loading ? 'Loading......' 
        :
        this.state.movies.map((movie) =>{
            return(
                <div class='col-sm col-md-4' >

                <div class="card  movie-card"  >
  <img src={'http://image.tmdb.org/t/p/w200'+movie.poster_path} style={{width:'100%' , height:'250px'}} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h6 class="card-title font-weight-bold">{movie.original_title}</h6>
    <p style={{height:'150px' , overflow:'hidden'}} class="card-text">{movie.overview}</p>
    <a href="#" class="btn btn-primary">Add To Liked</a>
  </div>
</div>
</div>
            )
        })
        }
    </div>
</div>
</div>
        )
    }
}

export default Movies