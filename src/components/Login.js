import React, { Component } from 'react';
import { login } from '../../backend/backend';
import '@reshuffle/code-transform/macro';
import '../App.css'
import {Link , withRouter} from 'react-router-dom';
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password : ''
    }

  }

  onInputChange = (e)=>{
    this.setState({[e.target.name] :e.target.value})
  }

  loginOnSubmit = async (e)=>{
    e.preventDefault()
    if(!this.state.email.trim()){
      return alert('Email is Required')
    }
    if(!this.state.password.trim()){
      return alert('Password is Required')
    }
    const newUser ={
      email:this.state.email,
      password:this.state.password
    }
    try{
      const userAfterLogin = await login(newUser)
      if(userAfterLogin){
        localStorage.setItem('user' , JSON.stringify(userAfterLogin))
        this.props.history.push('/movies')
      }else{
        alert('Invalid Login')
      }
    }catch(error){
      alert(error)
    }
  }
    render() {
        return (
            <div className='container' >
                <div className='form-container' >
                  <h2 className='text-center font-weight-bold' >Login Here</h2>
                <form onSubmit = {this.loginOnSubmit} >
                     <div class="form-group">
                        <small><label for="email">Email address</label></small>
                          <input 
                          type="email" 
                          class="form-control" 
                          id="email"  
                          placeholder="Enter Email"
                          name='email'
                          value={this.state.email}
                          onChange={this.onInputChange}
                          />
                     </div>
                <div class="form-group">
                 <small> <label for="password">Password</label></small>
                  <input 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  placeholder="Enter Password"
                  name='password'
                  value={this.state.password}
                  onChange={this.onInputChange}
                  />
                </div>
              <button type="submit" class="btn btn-primary btn-block ">Login</button>
            </form>
            <br/>
            <p>Don't have an account <Link to='/' >Register Here</Link> </p>
              </div>
            </div>
        )
    }
}


export default withRouter(Login);