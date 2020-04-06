import React from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

function App() {
  return (
    <div className="App" style={{display: 'flex'}}>
      <SelectProp />
      <div style={{marginLeft: '500px'}}> <InsertProp/> </div>
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
    if (!filter_val || filter_name) {
      return;
    }
  }

  if (table && field && (filter_val || filter_name)) {
    // call /select/cond/proj
  } else if (table && field) {
    // call /select/projection
  } else if (table && (filter_val || filter_name)) {
    // call /select/condition
  } else if (table) {
    // call /select 
    axios.get('http://localhost:3005/select?table=' + table).then((response) => {
      console.log(response);
    })
  }
  console.log(table, field);
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
      </div>
  )
}


function InsertProp() {
  return (
    <div id="insert">
      <label for="table-insert"> Insert into: </label>
      <input type="text" id="table-insert" name="table-insert"/>
      <label for="insert-vals"> Input insert values here: </label>
      <input type="text" id="insert-vals" name="insert-vals"/>
    </div>
  )
}
export default App;
