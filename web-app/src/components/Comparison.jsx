import React from "react";
import Table from 'react-bootstrap/Table';
import DropdownComponent from "./DropdownComponent";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebaseConfig";
import { auth } from "../firebaseConfig";


function getMonthFromString(month){
  return new Date(Date.parse(month +" 1, 2020")).getMonth()+1
}
function Comparison(){

  const [comparisonA, setComparisonA]= useState(0);
  const [comparisonB, setComparisonB]= useState(11);


  const [columnA, setColumnA] = useState([]);
  const [columnB, setColumnB] = useState([]);

  const getGraphs = async () => {
    const getGraphData = httpsCallable(functions, "getData");
    const graphData = await getGraphData({
      year: "2020",
    });
    return graphData.data;
  };

  // Code to sort object taken from here: https://www.w3docs.com/snippets/javascript/how-to-sort-javascript-object-by-key.html
  function sortObj(obj) {
    return Object.keys(obj)
      .sort()
      .reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
  }
  useEffect(() => {
    getGraphs().then((data) => {
      // data[1][21]
      getMonthData(data, comparisonA+1, sortObj, setColumnA);
      getMonthData(data, comparisonB+1 , sortObj, setColumnB);
        console.log({columnA});
        console.log({columnB});
    });
  }, [comparisonA,comparisonB]);
    return(
        <div>
            <div className="comparisonSeperator"> 
                Comparison
            </div>
            
            <div style={{ padding:"5rem",display: "flex", gap: "3rem", justifyContent: "center" }}>
            <Table striped bordered hover  >
      <thead >
        <tr >
          {/* First Dropdown defaulted to first month in the array; Last Dropdown defaulted to last month in the array */}
          <th style={{ textAlign: "center"}} > <DropdownComponent selected={comparisonA} setSelected={setComparisonA}/> </th>
          <th style={{ textAlign: "center"}} >Usage</th>
          <th style={{ textAlign: "center"}} > <DropdownComponent selected={comparisonB} setSelected={setComparisonB}/></th>
        </tr>
      </thead>
      <tbody >
        {columnA[0]?.filter((_,i) => i!=0).map(
          (title, index)=>(
          <tr>
            <td style={{color: (getColumnAverage(columnA, index) > getColumnAverage(columnB, index)) ? "red" : "green" }}>
              {getColumnAverage(columnA, index)}
            </td>
            <td>{title}</td>
            <td style={{color: (getColumnAverage(columnA, index) < getColumnAverage(columnB, index)) ? "red" : "green" }}>
              {getColumnAverage(columnB, index)}
            </td>
          </tr>)
        )}
      </tbody>
    </Table>
        </div>
        </div>
    );
}

function getColumnAverage(column, index) {
  return column?.filter((_, i) => i != 0).reduce((prev, curr) => curr[index + 1] + prev, 0) / column?.filter((_, i) => i != 0).length;
}

function getMonthData(data, comparisonA, sortObj, setGraphData) {
  var funcGraphData = [];


  const selectedMonth = data[comparisonA];

  let i = 1;
  for (let day in selectedMonth) {

    let sortedData = sortObj(selectedMonth[day]);
    if (i === 1) {
      funcGraphData[0] = Object.keys(sortedData);
      funcGraphData[0].unshift("Date");
    }
    funcGraphData[i] = Object.values(sortedData);
    funcGraphData[i].unshift(i);
    i++;
  }
  // // console.log(funcGraphData[0]);
  setGraphData(funcGraphData);
}

export default Comparison;