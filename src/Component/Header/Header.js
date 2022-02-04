import React, { Component } from 'react';
import IconButton from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import classes from './Header.css';


class Header extends Component{
  state={
    darkMode: true
  }
  iconMode =() =>{
    const themeToggle = this.state.darkMode
    this.setState({darkMode: !themeToggle})
    this.props.clicked
  }
  render(){
    let themeMode = null
    if(this.state.darkMode)
    themeMode =<DarkModeIcon className={classes.iconColor}/>
    else
    themeMode=<LightModeIcon className={classes.iconColor} />
return(
  <div></div>
}


export default Header;