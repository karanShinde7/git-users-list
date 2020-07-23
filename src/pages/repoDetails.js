import React, { Component } from 'react';
import {  Card, Dimmer, Loader,Icon } from 'semantic-ui-react'
import '../App.css';
import { gitHubService } from '../services/service';

class RepositoryDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repositoryData : '',
      loader : false,
      commit : 0
    }
  }

  componentDidMount() {
   this.getRepositoryDetails(this.props.match.params.login,this.props.match.params.name);
   this.getCommits(this.props.match.params.login,this.props.match.params.name);
  }

  getRepositoryDetails(login, name){
    this.setState({loader : true})
      gitHubService.getRepositoryDetails(login, name).then((repo) =>{
        this.setState({loader : false})
        this.setState({
              repositoryData: repo,
              repoName: repo.name,
              repoDescription: repo.description,
              forks_count: repo.forks_count,
              open_issues: repo.open_issues,
              stargazers_count: repo.stargazers_count
            })
        this.setState({repositoryData : repo})
      }).catch(() =>{
        this.setState({loader : false})
      })
  }

  getCommits(login, name){
    this.setState({loader : true})
    gitHubService.getSHAService(login, name).then((response) =>{
      this.setState({loader : false})
      let total = 0;
      response.map((element) =>{
        total = total + element.total;
      })
      this.setState({commit : total})
    }).catch(() =>{
      this.setState({loader : false})
    })
  }

  render() {
    return (
      <div>
        <div className="header-class">
          <h3 className="text-color">Github</h3>
        </div>
        {this.state.loader 
        ?
            <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        : <>
        <div className='user-card'>
              <div className="card">
                <h2 className="text-color">Repository details</h2>
              </div>
              </div>
        <Card style={{ margin: '50px auto' , width : '80%'}}>
        {this.state.repositoryData && this.state.repositoryData.name
        ? <div style={{margin : '15px'}}>
            <Card.Header >
              <h2>Repository name : {this.state.repositoryData.name}</h2>
            </Card.Header>
            <Card.Description>
              <h5 >{this.state.repositoryData.description} </h5>
            </Card.Description>
            <br/>
                <Card.Content>
                  <h4>Owner Name: {this.props.match.params.login}</h4>
                </Card.Content>
                <br/>
                <Card.Content>
              <div>
                <label style={{ margin: '5px', fontSize: '20' }}><Icon name='fork' />{this.state.forks_count} Fork(s) </label>
                <label style={{ margin: '5px', fontSize: '20' }}><Icon name='warning circle' /> {this.state.open_issues} Open Issue(s)</label>
                <label style={{ margin: '5px', fontSize: '20' }}><Icon name='star' /> {this.state.stargazers_count} Star(s) </label>
                <label style={{ margin: '5px', fontSize: '20' }}> Total Sommit(s) : {this.state.commit}</label>
              </div>
                </Card.Content>

          </div>
        : <></>
        }
       </Card>
          </> 
        }
          
      </div>
    
    );
  }
}

export default RepositoryDetails;
