import React from 'react';

//react-bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';
//devexpress grid
import Paper from '@material-ui/core/Paper';
import { 
  Grid, 
  Table, 
  TableHeaderRow,
  TableRowDetail, 
  TableEditColumn, 
  TableEditRow,
  Toolbar,
  SearchPanel
} from '@devexpress/dx-react-grid-material-ui';
import { 
  EditingState, 
  RowDetailState,
  SortingState,
  IntegratedSorting,
  SearchState,
  IntegratedFiltering
} from '@devexpress/dx-react-grid';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Close';
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder, Action,
} from '@devexpress/dx-react-core';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
//END devexpress grid

import Tsmk from './components/Tsmk';

import { API, graphqlOperation } from 'aws-amplify'
import { listSmartMeters as ListSmartMeters } from './graphql/queries'
import { 
  createSmartMeter as CreateSmartMeter, 
  createLoadProfile as CreateLoadProfile,
  updateSmartMeter as UpdateSmartMeter,
  deleteSmartMeter as DeleteSmartMeter,
  deleteLoadProfile as DeleteLoadProfile
} from './graphql/mutations'


class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      smartMeterColumns : [
        {name:'name',title:'Name'},
        {name:'role',title:'Role'},
        {name:'type',title:'Type'},
        {name:'unit',title:'Unit'},
        {name:'description',title:'Description'}
      ],
      smartMeterRows: [],
      addedRows: []
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

  getLoadProfileName(smartMeter){
    return smartMeter.type + ' load profile ' + smartMeter.name;
  }

  getLoadProfileDescription(smartMeter){
    return smartMeter.type + ' load profile ' + smartMeter.name + ' with unit ' + smartMeter.unit;
  }

  addSmartMeter = (added) => {
    let p = new Promise(function(resolve,reject){
      if(added.length > 0) {
        const smartMeterProps = added[0]
        const smartMeter = {
          name: smartMeterProps.name,
          role: smartMeterProps.role,
          unit: smartMeterProps.unit,
          type: smartMeterProps.type,
          description: smartMeterProps.description
        }
        API.graphql(graphqlOperation(CreateSmartMeter, { input: smartMeter })).then( (response) => {
          console.log('meter added')
          const addedSmartMeter = response.data.createSmartMeter;
          const loadProfile = {
            name: addedSmartMeter.type + ' load profile ' + addedSmartMeter.name,
            //role: addedSmartMeter.role,
            description: addedSmartMeter.type + ' load profile ' + addedSmartMeter.name + ' with unit ' + addedSmartMeter.unit,
            unit: addedSmartMeter.unit,
            type: addedSmartMeter.type,
            meterId: addedSmartMeter.id
          }
          API.graphql(graphqlOperation(CreateLoadProfile, { input: loadProfile })).then( (response) => {
              console.log('profile added')
              const profileId = response.data.createLoadProfile.id
              const smartMeterId = response.data.createLoadProfile.meter.id
              const updates = {
                id:smartMeterId,
                meterId: profileId
              }
              API.graphql(graphqlOperation(UpdateSmartMeter, { input: updates})).then( (response) => {
                console.log('meter linked to profile')
                resolve(response.data.updateSmartMeter)
              }).catch((err)=>{
                console.log(err)
                reject('failed to update new smart meter (profileId)');
              })
          }).catch((err)=>{
            console.log(err)
            reject('failed to add load profile for new smart meter');
          })
        }).catch((err)=>{
          console.log(err)
          reject('failed to add smart meter')
        })
      } else {
        console.log('added',added)
        reject('nothing to add (empty added)')
      }
    })
    return p
  }

  updateSmartMeter = (changed) => {
    let p = new Promise(function(resolve,reject){
      try {
        const smartMeterId = Object.keys(changed)[0]
        const updates = {
          id: smartMeterId,
          ...changed[smartMeterId]
        }
        API.graphql(graphqlOperation(UpdateSmartMeter, { input: updates})).then( (response) => {
          console.log('smart meter updated')
          resolve(response.data.updateSmartMeter)
        }).catch((err)=>{
          console.log(err)
          reject('failed to update smart meter');
        })        
      } catch(err) {
        reject(err);
      }
    })
    return p
  }

  deleteSmartMeter = (deleted) => {
    let { smartMeterRows } = this.state;
    let p = new Promise(function(resolve,reject){
      try {
        const smartMeterId = deleted[0]
        const deleteSmartMeterInput = {
          id: smartMeterId
        }
        let deleteLoadProfileInput = {}
        smartMeterRows.map((smartMeter)=>{
            if(smartMeter.id == smartMeterId) {
              if(smartMeter.profile) {
                deleteLoadProfileInput['id'] = smartMeter.profile.id
              } else {
                deleteLoadProfileInput['id'] = 0
              }
            }
        })
        API.graphql(graphqlOperation(DeleteLoadProfile, { input: deleteLoadProfileInput})).then( (response) => {
          console.log('load profile deleted')
          API.graphql(graphqlOperation(DeleteSmartMeter, { input: deleteSmartMeterInput})).then( (response) => {
            console.log('smart meter deleted')
            resolve(response.data.deleteSmartMeter)
          }).catch((err)=>{
            console.log(err)
            reject('failed to delete smart meter');
          })
        }).catch((err)=>{
          console.log(err)
          reject('failed to delete load profile');
        })
      } catch(err) {
        reject(err);
      }
    })
    return p
  }    

  commitChanges = ({ added, changed, deleted }) => {

      let { smartMeterRows } = this.state;
      if (added) {
        this.addSmartMeter(added).then((response)=>{
          const startingAddedId = smartMeterRows.length > 0 ? smartMeterRows[smartMeterRows.length - 1].id + 1 : 0;
          this.setState({
            smartMeterRows: [...smartMeterRows, { id: startingAddedId, ...response }]
          })
        }).catch((err)=>{
          console.log(err)
        })
      }
      if (changed) {
        this.updateSmartMeter(changed).then((response)=>{
          const rows = smartMeterRows.map(smartMeter => (
            (response.id == smartMeter.id) ? { ...smartMeter, ...response } : smartMeter
          ))
          this.setState({
            smartMeterRows: rows
          })
        }).catch((err)=>{
          console.log(err)
        })
      }
      if (deleted !== undefined) {
        this.deleteSmartMeter(deleted).then((response)=>{
          this.setState({
            smartMeterRows: smartMeterRows.filter(smartMeter => smartMeter.id !== response.id)
          })          
        }).catch((err)=>{
          console.log(err)
        })
      }

  };

  changeAddedRows = (value) => {
    const initialized = value.map(row => (Object.keys(row).length ? row : { 
      name: 'Residential 001',
      role: 'CONSUMER',
      unit: 'kW',
      type: 'ELECTRICITY',
      description: 'electricity smart meter'
    }));
    console.log('initialized',initialized)
    this.setState({
      addedRows: initialized
    })
  };

  render() {

    const {smartMeterColumns,smartMeterRows,addedRows} = this.state;

    return (
      <Container className="p-3">
        <Jumbotron style={{backgroundColor:'#607d8b'}}>
          <h1 className="header">Electricity GRID</h1>
        </Jumbotron>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Smart Meters
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Paper>
                  <Grid
                    rows={smartMeterRows}
                    columns={smartMeterColumns}
                    getRowId={getRowId}
                  >
                    <SearchState defaultValue="" />
                    <RowDetailState
                      defaultExpandedRowIds={[1]}
                    />
                    <EditingState
                      defaultEditingRowIds={[1]}
                      onCommitChanges={this.commitChanges}
                      addedRows={addedRows}
                      onAddedRowsChange={this.changeAddedRows}
                    />
                    <SortingState
                      defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <IntegratedFiltering />
                    <Table />
                    <TableHeaderRow showSortingControls />
                    <Toolbar />
                    <SearchPanel />
                    <TableRowDetail
                      contentComponent={DetailContent}
                      cellComponent={DetailCell}
                      toggleCellComponent={ToggleCell}
                    />
                    <TableEditRow />
                    <TableEditColumn 
                      showAddCommand={!addedRows.length}
                      showDeleteCommand
                    />
                    <DetailEditCell />
                  </Grid>
                </Paper>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    )
  }
}
export default App;

const getRowId = row => row.id;

const DetailContent = ({ row, ...rest }) => {
  const {
    processValueChange,
    applyChanges,
    cancelChanges,
  } = rest;
  return (
    <Tsmk smartMeter={row} />
  );
};

const styles = theme => ({
  toggleCell: {
    textAlign: 'center',
    textOverflow: 'initial',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
  },
  toggleCellButton: {
    verticalAlign: 'middle',
    display: 'inline-block',
    padding: theme.spacing(1),
  },
});

const ToggleCellBase = ({
  style, expanded, classes, onToggle,
  tableColumn, tableRow, row,
  className,
  ...restProps
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };
  return (
    <TableCell
      className={classNames(classes.toggleCell, className)}
      style={style}
      {...restProps}
    >
      <IconButton
        className={classes.toggleCellButton}
        onClick={handleClick}
      >
        {
          expanded
            ? <Cancel />
            : <Edit />
        }
      </IconButton>
    </TableCell>
  );
};

const ToggleCell = withStyles(styles, { name: 'ToggleCell' })(ToggleCellBase);

const DetailEditCell = () => (
  <Plugin name="detailEdit">
    <Action
      name="toggleDetailRowExpanded"
      action={({ rowId }, { expandedDetailRowIds }, { startEditRows, stopEditRows }) => {
        const rowIds = [rowId];
        const isCollapsing = expandedDetailRowIds.indexOf(rowId) > -1;
        if (isCollapsing) {
          stopEditRows({ rowIds });
        } else {
          startEditRows({ rowIds });
        }
      }}
    />
    <Template
      name="tableCell"
      predicate={({ tableRow }) => tableRow.type === TableRowDetail.ROW_TYPE}
    >
      {params => (
        <TemplateConnector>
          {({
            tableColumns,
            createRowChange,
            rowChanges,
          }, {
            changeRow,
            commitChangedRows,
            cancelChangedRows,
            toggleDetailRowExpanded,
          }) => {
            if (tableColumns.indexOf(params.tableColumn) !== 0) {
              return null;
            }
            const { tableRow: { rowId } } = params;
            const row = { ...params.tableRow.row, ...rowChanges[rowId] };

            const processValueChange = ({ target: { name, value } }) => {
              const changeArgs = {
                rowId,
                change: createRowChange(row, value, name),
              };
              changeRow(changeArgs);
            };

            const applyChanges = () => {
              toggleDetailRowExpanded({ rowId });
              commitChangedRows({ rowIds: [rowId] });
            };
            const cancelChanges = () => {
              toggleDetailRowExpanded({ rowId });
              cancelChangedRows({ rowIds: [rowId] });
            };

            return (
              <TemplatePlaceholder params={{
                ...params,
                row,
                tableRow: {
                  ...params.tableRow,
                  row,
                },
                changeRow,
                processValueChange,
                applyChanges,
                cancelChanges,
              }}
              />
            );
          }}
        </TemplateConnector>
      )}
    </Template>
  </Plugin>
);

const DetailCell = ({
  children, changeRow, editingRowIds, addedRows, processValueChange,
  applyChanges, cancelChanges,
  ...restProps
}) => {
  const { row } = restProps;

  return (
    <TableRowDetail.Cell {...restProps}>
      {React.cloneElement(children, {
        row, changeRow, processValueChange, applyChanges, cancelChanges,
      })}
    </TableRowDetail.Cell>
  );
};