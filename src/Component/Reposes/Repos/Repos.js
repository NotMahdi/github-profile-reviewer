import React from "react";
import CodeIcon from '@mui/icons-material/Code';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import classes from './Repos.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StarIcon from '@mui/icons-material/Star';


const repos = (props) =>{

  const card = (
    
      <CardContent>
        <Typography>
        <a style={{color:'#00A7FF'}} href={props.name_url}>{props.name}</a>
        </Typography>
        <Typography  variant="body2">
        <p className={classes.text}>{props.description}</p>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', position:'fixed'}}>
        <Box sx={{display: 'flex', alignItems: 'center', fontSize:'10px',pr:'30px'}}>
        <CodeIcon sx={{fontSize:'12px', p:"5px", color:'#A8A8A8'}}/>{props.language}</Box>
        <Box sx={{display: 'flex', alignItems: 'center', fontSize:'10px',pr:'30px'}}>
        <StarIcon sx={{fontSize:'12px', p:"5px", color:'#A8A8A8'}}/>{props.watchers}</Box>
        <Box sx={{display: 'flex', alignItems: 'center', fontSize:'10px',pr:'30px'}}>
        <ContentCopyIcon sx={{fontSize:'12px', p:"5px", color:'#A8A8A8'}}/>{props.forks}</Box>
        </Box>
      </CardContent>
    
  );
  return( 
      <div className={classes.box}>
      {props.progress?<div className={classes.skeleton}></div>:<Card variant="outlined" sx={props.theme? {backgroundColor:'#292929',
      color:'#FFFFFF', 
      height:'120px', 
      width:'400px', 
      borderRadius:'10px'  } : 
      {backgroundColor:'#FAFAFA',
      color:'black', 
      height:'120px', 
      width:'400px', 
      borderRadius:'10px'}
      }>{card}</Card>}
      </div>
      )
}

export default repos;

