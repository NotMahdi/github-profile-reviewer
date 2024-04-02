import React, { Component } from 'react';
import classes from './App.css';
import Button from './Component/Button/Button';
import IconButton from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Aux from './Auxiliary/Auxiliary';
import Reposes from './Component/Reposes/Reposes';
class App extends Component {
  state={
      userName: '',
      name: '',
      company:'',
      location: '',
      website: '',
      email: '',
      avatar:'',
      repos: [],
      clicked: false,
      darkMode: true,
      loadingProfile:false,
      loadingRepos: false
  }
  //to set Darktheme status in locals storage
  localDataHandler(){
    localStorage.removeItem('darkTheme')
    localStorage.setItem('darkTheme' , JSON.stringify(this.state.darkMode))
  }
  //to change DarkTheme value in state and saving it in local storage
  themeIconModeHandler =() =>{
    const themeToggle = this.state.darkMode
    this.setState({darkMode: !themeToggle}, this.localDataHandler)
    this.props.clicked;
  }
  getUserNameHandler =(event)=>{
     this.setState({
       userName: event.target.value
     })
  }
  //http request when the search button is clicked
  searchHandler = async () =>{
        this.setState({loadingProfile: true , loadingRepos: true})
       await axios.get(`https://api.github.com/users/${this.state.userName}`)
        .then(response =>{
          this.setState({name: response.data.name,
             company: response.data.company,
              location: response.data.location,
              website: response.data.blog,
              email: response.data.email,
              avatar: response.data.avatar_url,
              loadingProfile: false })
          console.log(response);
        })
       await axios.get(`https://api.github.com/users/${this.state.userName}/repos?sort=created&direction=desc`)
            .then(response=>{
              this.setState({repos: response.data})
              console.log(response);
            })
            this.setState({clicked: true, loadingRepos: false})
          } 
          //to get theme value from local storage
          componentDidMount(){
            const localDataString = localStorage.getItem('darkTheme')
             const localDataBool = (localDataString ==='true')
            this.setState({darkMode: localDataBool})
          }
  render() {
    //changing theme icon relating to darkMode(theme status) value in state
    let themeMode = null
    if(this.state.darkMode)
    themeMode=<LightModeIcon className={classes.iconColor} />
    else
    themeMode =<DarkModeIcon className={classes.iconColor}/>
    let profile=null 
    //The search button is clicked
    if(this.state.clicked){
      // implementing the avatar and what ever below it and repos and their colors relating to theme status and skeleton
      profile=<div>
        {this.state.loadingProfile? 
        <div className='avatar skeleton'></div> : 
        <img className={classes.avatar} src={this.state.avatar}/>}
        {/*loadingProfile and loadingRepos are for skeleton */}
      {this.state.loadingProfile? <div className={classes.nameSkeleton}></div>:
      <h1 style={this.darkMode?{fontSize: '15px' , padding: '6px', color:'black'}:{fontSize: '15px' , padding: '6px', color:'#FFFFFF'}}>{this.state.name}</h1>}
      
      {this.state.loadingProfile?<div>
        <div className={classes.listsSkeleton1}></div>
        <div className={classes.listsSkeleton1}></div>
        <div className={classes.listsSkeleton1}></div>
        <div className={classes.listsSkeleton1}></div>
      </div>:
      <div className={classes.lists}>
      <ul style={{color: '#A8A8A8'}}>
        <li>Company: </li>
        <li>Location:</li>
        <li>Website: </li>
        <li>Email:</li>
      </ul>
      <ul style={this.state.darkMode? {color: '#FFFFFF'}: {color: 'black'}}>
        <li>{this.state.company? this.state.company:<div style={{color:'#A8A8A8' }}>no company</div>}</li>
        <li>{this.state.location? this.state.location: <div style={{color:'#A8A8A8' }}>no location</div>}</li>
        <li style={{color: '#00A7FF', cursor:'pointer'}}>{this.state.website? this.state.website:<div style={{color:'#A8A8A8' }}>no website</div>}</li>
        <li>{this.state.email? this.state.email: <div style={{color:'#A8A8A8'}}>no Email</div>}</li>
      </ul>
      </div>}
      {/*sending props to reposes component*/}
      <Reposes reposes={this.state.repos} theme={this.state.darkMode} progress={this.state.loadingRepos}/>
      </div>
    }
    
    
    return (
      <Aux>
        {/*sorry for the css implementation I dont have enough css knowledge to be honest (yet ;))*/}
      <header style={this.state.darkMode?
        {backgroundColor:'#292929',
         boxShadow:'0 3px 8px #101010'}:
         {backgroundColor:'#2C99F1', 
          boxShadow:'0 3px 8px #A8A8A8'}} className={classes.header}>
      <p>GitHub Profile</p>
      <IconButton aria-label="Light/Dark mode" onClick={this.themeIconModeHandler}>
      {themeMode}
      </IconButton>
      </header>
      <div style={this.state.darkMode ?{backgroundColor:'#212121'}:{backgroundColor:'#FFFFFF'}} className={classes.body}>
      <p style={this.state.darkMode?
                {fontSize: '18px', 
                 width: '220px', 
                 paddingBottom:'40px', 
                 color:'#FFFFFF'}:
                 {fontSize: '18px', 
                  width: '220px', 
                  paddingBottom:'40px', 
                  color:'black'}}>Enter a GitHub username, to see the magic.
                  </p>
      <TextField autoComplete='off'
          placeholder='@username' 
          sx={this.state.darkMode?
            {backgroundColor: '#292929', 
             borderRadius:'8px'}:
             {backgroundColor: '#FAFAFA', 
              borderRadius:'8px'}} 
          size="small" 
          id="filled-basic" 
          variant="outlined" 
          onChange={this.getUserNameHandler} />
      <Button theme={this.state.darkMode} clicked={this.searchHandler} progress={this.state.loadingProfile}/>
      {profile}
      </div>
      </Aux>
    );
  }
}

export default App;
