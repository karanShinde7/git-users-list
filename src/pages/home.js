import React, { Component } from 'react';
import { Form, Card, Icon, Image, Modal, Dimmer, Loader } from 'semantic-ui-react'
import '../App.css';
import { gitHubService } from '../services/service';
import DetailComponent from '../compoent/detailComponent'
import PropTypes from "prop-types";

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      repositories: [],
      name: '',
      userName: '',
      avtar: '',
      followers: '',
      stars: '',
      repoCount: '',
      error: '',
      searchKey: '',
      validation: '',
      loader: false,
      showModal: false,
      repositoryData: '',
      repoName: '',
      repoDescription: '',
      forks_count: 0,
      open_issues: 0,
      stargazers_count: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
  }

  handleChange(event) {
    this.setState({ searchKey: event.target.value, validation: "" })
  }

  handleClose = () => this.setState({ showModal: false });

  handleSubmit() {
    if (this.state.searchKey !== '') {
      this.getSearchedData(this.state.searchKey)
    } else {
      this.setState({ validation: 'Please enter name the to search' })
    }
  }

  getSearchedData(search) {
    this.setState({ loader: true })
    gitHubService.getAllUserService(search).then((response) => {
      this.setState({ loader: false })
      if (response.message) {
        this.setState({ error: response.message })
      } else {
        this.setData(response)
        this.getAllRepositories(response.repos_url)
      }
    }).catch(() => { this.setState({ loader: false }) })
  }

  setData(response) {
    this.setState({
      userName: response,
      name: response.name,
      avtar: response.avatar_url,
      followers: response.followers,
      repos_url: response.repos_url,
    })
  }

  getAllRepositories(url) {
    this.setState({ repositories: [] })
    this.setState({ loader: true })
    gitHubService.getAllRepositoriesService(url).then((repositories) => {
      this.setState({ loader: false })
      if (repositories && repositories.length > 0) {
      this.setState({ repositories: repositories , repoCount: repositories.length})
      } else {
        this.setState({ error: 'No data found!' })
      }
    }).catch(() => { this.setState({ loader: false }) })
  }

  getRepositoryDetails(login, name) {
    this.props.history.push('/repository/'+login+'/'+name) 
    // If we want to move next page
    // this.setState({ loader: true })
    // gitHubService.getRepositoryDetails(login, name).then((repo) => {
    //   this.setState({ loader: false })
    //   this.setState({
    //     repositoryData: repo,
    //     repoName: repo.name,
    //     repoDescription: repo.description,
    //     forks_count: repo.forks_count,
    //     open_issues: repo.open_issues,
    //     stargazers_count: repo.stargazers_count
    //   })
    // }).catch((error) => {
    //   this.setState({ loader: false })
    // })
    // this.getCommits(login, name)
  }

  getCommits(login, name) {
    this.setState({ loader: true })
    gitHubService.getStatsService(login, name).then((response) => {
      this.setState({ loader: false })
      let total = 0;
      response.map((element) => {
        total = total + element.total;
      })
      this.setState({ commit: total } , () => {
        this.setState({showModal: true})
      })
    }).catch(() => {
      this.setState({ loader: false })
    })
  }

  render() {
    return (
      <div>
        <div className="header-class">
          <h3 className="text-color">Github Search</h3>
        </div>
        <div className='input-form'>
          <Form onSubmit={this.handleSubmit}>
            <h3 className="text-color">Enter User Name</h3>
            <Form.Group>
              <Form.Input
                placeholder='Search here..'
                name='searchKey'
                value={this.state.searchKey}
                onChange={this.handleChange}
              />
              <Form.Button inverted color="black" content='Search' />
            </Form.Group>
          </Form>
        </div>

        {this.state.loader
          ?
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
          : <>
            <div className='user-card'>
              <div className="card">
                {!this.state.name
                  ? <h4 style={{ color: 'red' }}>{this.state.validation}</h4>
                  :
                  <>
                  <h2 className="text-color">{this.state.name}'s Information</h2>
                  <Card>
                    <Card.Content style={{ margin: 'auto' }}>
                      <Image src={this.state.avtar} size='small' />
                    </Card.Content>
                    <Card.Content>
                      <Card.Header>{this.state.name}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name='folder' />
                      {this.state.repoCount} Repositories
                     </Card.Content>
                    <Card.Content extra>
                      <Icon name='user' />
                      {this.state.followers} Followers
                    </Card.Content>
                  </Card>
                  </>
                }
              </div>
            </div>
            <div className='user-card'>
              <div className="card">
              {this.state.repositories.length > 0 && 
                <h2 className="text-color">{this.state.name}'s Repositories ({this.state.repoCount})</h2>
              }
              </div>
              </div>
            <div className="container-view">
              {this.state.repositories.length > 0
                ?
                <>
                  {this.state.repositories.map((repo, index) => {
                    return (
                      <div className="card-view" key={index} onClick={() => { this.getRepositoryDetails(repo.owner.login, repo.name) }}>
                        <DetailComponent repo={repo} count={this.state.repoCount} />
                      </div>)
                  })}
                </>
                : <h4 style={{ color: 'red' }}>{this.state.error}</h4>
              }
            </div>
          </>
        }
        <Modal
          open={this.state.showModal}
          size="large"
          closeIcon
          onClose={this.handleClose}>
          <Modal.Header >Repository name : {this.state.repoName}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <h5>{this.state.repoDescription} </h5>
              <h4>Owner Name: {this.state.name} </h4>
              <div>
                <label style={{ margin: '5px', fontSize: '20' }}><Icon name='fork' />{this.state.forks_count} Fork(s) </label>
                <label style={{ margin: '5px', fontSize: '20' }}><Icon name='warning circle' /> {this.state.open_issues} Open Issue(s)</label>
                <label style={{ margin: '5px', fontSize: '20' }}><Icon name='star' /> {this.state.stargazers_count} Star(s) </label>
                <label style={{ margin: '5px', fontSize: '20' }}> Total Sommit(s) : {this.state.commit}</label>
              </div>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default Home;
