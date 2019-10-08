import React, { Component } from 'react';
import uuid from 'react-uuid';
import { saveUser } from '../../backend/backend';
import '@reshuffle/code-transform/macro';
import '../App.css'
import {Link , withRouter} from 'react-router-dom';
class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstName : '',
      lastName : '',
      email: '',
      password : ''
    }

  }

  onInputChange = (e)=>{
    this.setState({[e.target.name] :e.target.value})
  }

  registerOnSubmit = async (e)=>{
    e.preventDefault()
    const newUser = {
      firstName :this.state.firstName,
      lastName : this.state.lastName,
      email : this.state.email,
      password : this.state.password,
      id:uuid()
    }
    if(!newUser.firstName.trim()){
      return alert('First Name is Required')
    }
    if(!newUser.lastName.trim()){
      return alert('Last Name is Required')
    }
    if(!newUser.email.trim()){
      return alert('Email is Required')
    }
    if(!newUser.password.trim()){
      return alert('Password is Required')
    }
    try{
      const userAfterSave = await saveUser(newUser)
      if(userAfterSave.success === false){
        alert(userAfterSave.error)
      }else{
        this.props.history.push('/login')
      }

    }catch(error){
      alert(error)
    }
  }
    render() {
        return (
            <div className='container' >
                <div className='form-container' >
                  <h2 className='text-center font-weight-bold' >Sign Up</h2>
                <form onSubmit = {this.registerOnSubmit} >
                <div class="form-group">
                         <small><label for="f-name">First Name</label></small>
                          <input 
                          type="text" 
                          class="form-control" 
                          id="f-name"  
                          placeholder="Enter First Name"
                          name='firstName'
                          value={this.state.firstName}
                          onChange={this.onInputChange}
                          />
                </div>
                     <div class="form-group">
                         <small><label for="l-name">Last Name</label></small> 
                          <input 
                          type="text" 
                          class="form-control" 
                          id="l-name" 
                          placeholder="Enter Last Name"
                          name='lastName'
                          value={this.state.lastName}
                          onChange={this.onInputChange}
                          />
                     </div>
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
              <button type="submit" class="btn btn-primary btn-block ">Submit</button>
            </form>
            <br/>
            <p>Already have an account <Link to='/login' >Login Here</Link> </p>
              </div>
            </div>
        )
    }
}


export default withRouter(Register);