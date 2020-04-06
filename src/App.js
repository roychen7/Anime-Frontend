import React, { useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';

import { Table, TableHead, TableCell, TableRow, TableBody, Checkbox} from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className="App" style={{display: 'flex'}}>
      <SelectProp />
      <div style={{marginLeft: '500px'}}> <InsertProp/> </div>
      <br></br>
      <br></br>
    </div>
  );
}

function submitForm() {
  console.log("submit form called");
  const table = document.getElementById("table").value;
  const field = document.getElementById("field").value;
  const filter_name = document.getElementById("filter_by_cat").value;
  const filter_val = document.getElementById("filter_by_val").value;

  if (filter_val || filter_name) {
    if (!filter_val || !filter_name) {
      return;
    }
  }

  if (table && field && (filter_val || filter_name)) {
    // call /select/cond/proj
    axios.get('http://localhost:3005/select/cond/proj?table=' + table + '&field=' + field + '&filter_field=' + filter_name + '&filter_val=' + filter_val).then((response) => {
      console.log(response);
    })
  } else if (table && field) {
    axios.get('http://localhost:3005/select/projection?table=' + table + '&field=' + field).then((response) => {
      console.log(response);
    })
    // call /select/projection
  } else if (table && (filter_val || filter_name)) {
    axios.get('http://localhost:3005/select/condition?table=' + table + '&field=' + filter_name + '&condition=' + filter_val).then((response) => {
      console.log(response);
    })
    // call /select/condition
  } else if (table) {
    // call /select 
    axios.get('http://localhost:3005/select?table=' + table).then((response) => {
      console.log(response);
    })
  }
  console.log(table, field, filter_name, filter_val);
}

function getCount() {
  const table = document.getElementById('table').value;
  if (!table) return;
  // call /select/count
}

function getCountForStudio() {
  // call /studio/count
}

function getSingerNames() {
  // call /singer/names
}

function SelectProp() {
  return (
      <div id="search">
        <label for="table">Searching for:</label>
        <input type="text" id="table" name="table"/>
        <label for="field" style={{marginLeft: '10px'}}>Field: </label>
        <input type="text" id="field" name="field"/>
        <br></br>
        <br></br>
        <label for="filter_by"> Filter by: category name and value</label>
        <input type="text" id="filter_by_cat" name="filter_by_cat"/>
        <input type="text" id="filter_by_val" name="filter_by_val"/>
        <br></br>
        <button onClick={submitForm}> Submit </button>
        <br></br>
        <br></br>
        <button onClick={getCount}> Get Count For Table </button>
        <br></br>
        <button onClick={getCountForStudio}> Get Count For Studios </button>
        <br></br>
        <button onClick={getSingerNames}> Get Singer Names</button>
        <br></br>
        <br></br>
        <br></br>
        <MyTable/>
      </div>
  )
}

var headers=["Name", "Anime", "Something", "Euphoria"];
var data = [{"Name": "pickle rick", "Anime":" Rick and morty", "Something":"Yes", "Euphoria":"Pogs"},
{"Name": "pickle rick", "Anime":" Rick and morty", "Something":"Yes", "Euphoria":"Pogs"}];

function MyTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {headers.map(a => <TableCell>{a}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((obj, index) => {
          return (
            <React.Fragment>
              <TableRow role="checkbox">
                <TableCell padding="checkbox">
                            <Checkbox
                              checked={true}
                            />
                </TableCell>
                {headers.map((header, cellIndex) => {
                  return (
                  <TableCell>{obj[header]}</TableCell>
                  )
                })}
              </TableRow>
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  )
}


function submitInsert() {
  const table = document.getElementById("table-insert").value;
  let values = document.getElementById("insert-vals").value;
  values = values.split(',');

  axios({
    method: 'post',
    url: 'http://localhost:3005/insert',
    headers: {},
    data: {
      table: table,
      data: values,
    }
  }).then((response) => {
    console.log(response);
  })
}
function InsertProp() {
  return (
    <div id="insert">
      <label for="table-insert"> Insert into: </label>
      <input type="text" id="table-insert" name="table-insert"/>
      <label for="insert-vals"> Insert values: </label>
      <input type="text" id="insert-vals" name="insert-vals"/>
      <br></br>
      <button onClick={submitInsert}> Submit </button>
    </div>
  )
}

export default App;
