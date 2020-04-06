import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" style={{display: 'flex', alignItems: 'center'}}>
      <SelectProp />
      <div style={{marginLeft: '500px'}}> <InsertProp/> </div>
    </div>
  );
}

function submitForm(e) {
  const table = document.getElementById("table").value;
  const data = document.getElementById("field").value;
  console.log(table, data);
}

function SelectProp() {
  return (
      <div id="search">
        <label for="table">Searching for:</label>
        <input type="text" id="table" name="table"/>
        <label for="field" style={{marginLeft: '10px'}}>Field: </label>
        <input type="text" id="field" name="field"/>
        <input type="button" onclick={submitForm} value="Submit"/>
      </div>
  )
}


function InsertProp() {
  return (
    <h1> Insert </h1>
  )
}
export default App;
