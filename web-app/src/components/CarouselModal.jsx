import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Chart } from "react-google-charts";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

// https://stackoverflow.com/questions/13566552/easiest-way-to-convert-month-name-to-month-number-in-js-jan-01
function getMonthFromString(month){
  return new Date(Date.parse(month +" 1, 2020")).getMonth()+1
}


function CarouselModal(props) {
  const [graphData, setGraphData] = useState([]);
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
      var funcGraphData = [];
     
      
      const selectedMonth = data[getMonthFromString(props.title)];
      // console.log(january);
      // for (let i = 1; i <= 31; i++) {
      //   let sortedData = sortObj(january[i]);
      //   if (i === 1) {
      //     funcGraphData[0] = Object.keys(sortedData);
      //     funcGraphData[0].unshift("Date");
      //   }
      //   funcGraphData[i] = Object.values(sortedData);
      //   funcGraphData[i].unshift(i);
      // }
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
      //  console.log(funcGraphData);
    });
  }, []);
      const options = {
        curveType: "function",
        // legend: { position: "bottom" },
      };
    return(
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>   
        <Chart
                  chartType="LineChart"
                  data={graphData}
                  width = "100%"
                  height="620px"
                  options={options}
                  className="chart"
                  legendToggle
                />
        <p>
        <Table striped bordered hover>
      <thead>
      
      
      {
        graphData
        .filter((_,i) => i==0)
        .map(
          (values) => (<tr>{values.map(
              (value) => (<th>{value}</th>)
            )}
          </tr>)
        )
      
      }
      
        </thead>
        <tbody>
        {graphData.filter((_,i) => i!=0).map(
          values => (<tr>{values.map(
            value => (<td>{value}</td>)
          )}</tr>)
        )
        }
        

      </tbody>
    </Table>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default CarouselModal;