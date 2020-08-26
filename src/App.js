import React from 'react';

//react-bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import Tsmk from './components/Tsmk';
import SmartMeters from './components/electricity/SmartMeters';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleLoadProfileChange = this.handleLoadProfileChange.bind(this)
    this.state = {
      loadProfile: []
    };
  }  

  async componentDidMount() {
    try {
    } catch (err) {
      console.log('error', err)
    }
  }  

  handleLoadProfileChange(loadProfile) {
    console.log('handleLoadProfileChange',loadProfile)
    this.setState({loadProfile})
  }

  render() {

    const loadProfile = this.state.loadProfile;

    return (
      <Container className="p-3">
        <Jumbotron style={{backgroundColor:'#607d8b'}}>
          <h1 className="header">Smart City</h1>
        </Jumbotron>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Electricity GRID
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Tsmk loadProfile={loadProfile} onLoadProfileChange={this.handleLoadProfileChange} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Traffic
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <p>Cars, Trucks... mouvements</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Security
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <p>Data coming from Toronto Police API...</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    )
  }
}
export default App;
