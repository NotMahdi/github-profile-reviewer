import React from "react";
import Aux from "../../Auxiliary/Auxiliary";
import Repos from './Repos/Repos'

const repos = (props) =>{
  const repositories = props.reposes;
  let repository= repositories.slice(0 , 4).map(reposData =>{
    return <Repos progress={props.progress} theme={props.theme} key={reposData.id} name={reposData.name} name_url={reposData.html_url} description={reposData.description} language={reposData.language} watchers={reposData.watchers} forks={reposData.forks}/>
  })
  return (
    <Aux>
    {repository}
    </Aux>
  )
}
export default repos;



