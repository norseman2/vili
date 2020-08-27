import React from 'react';

//react-bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
//devexpress grid
import Paper from '@material-ui/core/Paper';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

import Tsmk from './components/Tsmk';
import SmartMeters from './components/electricity/SmartMeters';

import { API, graphqlOperation } from 'aws-amplify'
import { listSmartMeters as ListSmartMeters } from './graphql/queries'

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleLoadProfileChange = this.handleLoadProfileChange.bind(this)
    this.state = {
      loadProfile: [],
      smartMeterColumns : [
        {name:'name',title:'Name'},
        {name:'type',title:'Type'},
        {name:'unit',title:'Unit'}
      ],
      smartMeterRows: []
    };
  }  

  async componentDidMount() {
    try {
      this.fetchSmartMeters()
    } catch (err) {
      console.log('error', err)
    }
  }  

  fetchSmartMeters = async() => {
    try {
      await API.graphql(graphqlOperation(ListSmartMeters)).then(
        (result) => {
          const smartMeters = result.data.listSmartMeters.items;
          console.log('smartMeters',smartMeters)
          this.setState({
            smartMeterRows: smartMeters
          })
        }
      ).catch( (err) => {
        console.log(err)
      })
    } catch(err) {
      console.log('err',err)
    }
  } 


  handleLoadProfileChange(loadProfile) {
    console.log('handleLoadProfileChange',loadProfile)
    this.setState({loadProfile})
  }

  render() {

    const {loadProfile,smartMeterColumns,smartMeterRows} = this.state;

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
                <Paper>
                  <Grid
                    rows={smartMeterRows}
                    columns={smartMeterColumns}
                  >
                    <Table />
                    <TableHeaderRow />
                  </Grid>
                </Paper>
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
