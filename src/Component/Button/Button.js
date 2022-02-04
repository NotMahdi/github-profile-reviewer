import React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import classes from './Button.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
//this is the search button component to impelement css on it
const button = (props) =>{
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF'
      },
      secondary:{
        main: '#212121'
      }
    },
  });
 return(
  <ThemeProvider theme={theme}>
    {props.progress? <CircularProgress color={props.theme?'primary':'secondary'}/>  :  <Button  variant="contained" size="large" color={props.theme?'primary':'secondary'}
    sx={{
    maxWidth:'40px', 
    maxHeight:'40px', 
    minWidth: '40px', 
    minHeight: '40px',
    borderRadius:'5px'}} onClick={props.clicked}>
      <SearchIcon sx={props.theme?{color:'#212121'}:{color:'#FFFFFF'}} fontSize='small' className={classes.icon}/>
      </Button>}
    
      </ThemeProvider>
    )
}

export default button;
