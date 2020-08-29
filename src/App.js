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
import { Grid, Table, TableHeaderRow,TableRowDetail } from '@devexpress/dx-react-grid-material-ui';
import { EditingState, RowDetailState } from '@devexpress/dx-react-grid';
import MuiGrid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
import SmartMeters from './components/electricity/SmartMeters';


import { API, graphqlOperation } from 'aws-amplify'
import { listSmartMeters as ListSmartMeters } from './graphql/queries'

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
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

  commitChanges = ({ changed }) => {
  };  

  render() {

    const {smartMeterColumns,smartMeterRows} = this.state;

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
                    getRowId={getRowId}
                  >
                    <RowDetailState
                      defaultExpandedRowIds={[1]}
                    />
                    <EditingState
                      defaultEditingRowIds={[1]}
                      onCommitChanges={this.commitChanges}
                    />
                    <Table />
                    <TableHeaderRow />
                    <TableRowDetail
                      contentComponent={DetailContent}
                      cellComponent={DetailCell}
                      toggleCellComponent={ToggleCell}
                    />
                    <DetailEditCell />
                  </Grid>
                </Paper>
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