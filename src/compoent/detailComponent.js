import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

const DetailComponent = (props) => {
  return (
    <Card>
    <Card.Content>
      <Card.Header>{props.repo.name}</Card.Header>
      <Card.Meta>
        {props.repo.full_name}
      </Card.Meta>
    </Card.Content>
    <Card.Content>
      <Icon name='folder' /> <label>{props.count} Repositories</label> <br />
      <Icon name='star' /> <label>{props.repo.stargazers_count} Stars</label> <br />
      <Icon name='fork' /> <label>{props.repo.forks_count} Repositories</label> <br />
    </Card.Content>
  </Card>
  );
}

export default DetailComponent;