import React, { useState } from 'react';
import axios from 'axios';

import { Table, TableHead, TableCell, TableRow, TableBody, Checkbox} from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div> 
    <div className="App" style={{display: 'flex'}}>
      <SelectProp />
      <div style={{marginLeft: '150px'}}> <InsertProp/> </div>
      <div style={{marginLeft: '150px'}}> <DeleteProp/> </div>
      <br></br>
      <br></br>
    </div>
    <div style={{marginLeft: '700px'}}> <UpdateProp/> </div>
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

    axios.get('http://localhost:3005/select/cond/proj?table=' + table + '&field=' + field + '&filter_field=' + filter_name + '&filter_val=' + filter_val).then((response) => {

    })
  } else if (table && field) {
    axios.get('http://localhost:3005/select/projection?table=' + table + '&field=' + field).then((response) => {
      console.log(response);
    })

  } else if (table && (filter_val || filter_name)) {
    axios.get('http://localhost:3005/select/condition?table=' + table + '&field=' + filter_name + '&condition=' + filter_val).then((response) => {
      console.log(response);
    })

  } else if (table) {
      axios.get('http://localhost:3005/select?table=' + table).then((response) => {
      console.log(response);
    })
  }
  console.log(table, field, filter_name, filter_val);
}

function getCount() {
  const table = document.getElementById('table').value;
  if (!table) return;
  axios.get('http://localhost:3005/select/count?table=' + table).then((response) => {
    console.log(response);
  })
}

function getCountForStudio() {

  axios.get('http://localhost:3005/studio/count').then((response) => {
    console.log(response);
  })
}

function getSingerNames() {

  axios.get('http://localhost:3005/singer/names').then((response) => {
    console.log(response);
  })
}

function getDivision() {
  console.log("division clicked");
  axios.get('http://localhost:3005/select/divide').then((response) => {
    console.log(response);
  })
}

function SelectProp() {
  return (
    <div>
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
        <button onClick={getDivision}> Find the character in all universes </button>
        <br></br>
        <br></br>
        <br></br>
        {/* <MyTable/> */}
      </div>
      <div> 
      </div>
      </div>
  )
}

// var headers=["Name", "Anime", "Something", "Euphoria"];
// var data = [{"Name": "pickle rick", "Anime":" Rick and morty", "Something":"Yes", "Euphoria":"Pogs"},
// {"Name": "pickle rick", "Anime":" Rick and morty", "Something":"Yes", "Euphoria":"Pogs"}];

// function MyTable(headers, data) {
//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell></TableCell>
//           {headers.map(a => <TableCell>{a}</TableCell>)}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {data.map((obj, index) => {
//           return (
//             <React.Fragment>
//               <TableRow role="checkbox">
//                 <TableCell padding="checkbox">
//                             <Checkbox
//                               checked={true}
//                             />
//                 </TableCell>
//                 {headers.map((header, cellIndex) => {
//                   return (
//                   <TableCell>{obj[header]}</TableCell>
//                   )
//                 })}
//               </TableRow>
//             </React.Fragment>
//           );
//         })}
//       </TableBody>
//     </Table>
//   )
// }


function submitInsert() {
  const table = document.getElementById("table-insert").value;
  let values = document.getElementById("insert-vals").value;
  values = values.split(',');

  axios({
    method: 'post',
    url: 'http://localhost:3005/insert',
    headers: {},
    dataType: 'x-www-form-urlencoded',
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

function submitDelete() {
  const universe_name = document.getElementById("universe-del").value;

  axios({
    method: 'delete',
    url: 'http://localhost:3005/delete/universe',
    headers: {},
    dataType: 'x-www-form-urlencoded',
    data: {
      universe_name: universe_name
    }
  }).then((response) => {
    console.log(response);
  })
}
function DeleteProp() {
  return (
    <div id="insert">
      <label for="universe-del"> Enter universe to delete: </label>
      <input type="text" id="universe-del" name="universe-del"/>
      <br></br>
      <button onClick={submitDelete}> Submit </button>
    </div>
  )
}


function submitUpdate() {
  const table = document.getElementById("update-table").value;
  const update_field = document.getElementById("update-field").value;
  const update_val = document.getElementById("update-val").value;
  const update_cond_field = document.getElementById("update-cond-field").value;
  const update_cond_val = document.getElementById("update-cond-val").value;

  axios({
    method: 'post',
    url: 'http://localhost:3005/update',
    headers: {},
    dataType: 'x-www-form-urlencoded',
    data: {
      table: table,
      field: update_field,
      val: update_val,
      cond_field: update_cond_field,
      cond_val: update_cond_val
    }
  }).then((response) => {
    console.log(response);
  })
}

function UpdateProp() {
  return (
    <div id="insert">
      <label for="update-table"> Enter table to update: </label>
      <input type="text" id="update-table" name="update-table"/>
      <br></br>
      <label for="update-new"> Enter field to update and updated value: </label>
      <input type="text" id="update-field" name="update-field"/>
      <input type="text" id="update-val" name="update-val"/>
      <br></br>
      <label for="update-cond"> Enter conditions to update: </label>
      <input type="text" id="update-cond-field"/>
      <input type="text" id="update-cond-val"/>
      <br></br>
      <button onClick={submitUpdate}> Submit </button>
    </div>
  )
}

export default App;
