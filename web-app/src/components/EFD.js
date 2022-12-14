import './static/css/EFD.css';
import { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebaseConfig";
import { Chart } from "react-google-charts";

// options for the sankey diagram to change looks
export const options = {
    sankey: { 
        node: { nodePadding: 100 },
        node: { width: 5 } 
    }
};

function EFD() {
    // using ref to select what to download as an image
    const ref = useRef(null);
    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return;
        }
        toPng(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                //properties of the image
                const link = document.createElement('a');
                link.download = 'Energy_flow_diagram.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
            console.log(err);
        });
    }, [ref]);

    // Variables that constantly change
    const [plotData, setPlotData] = useState([]);
    const [daysToUse, setDaysToUse] = useState(1);
    const [diagramTitle, setDiagramTitle] = useState("Daily ")

    // retreving the data from the database
    const getData = async () => {
        const getDiagramData = httpsCallable(functions, "getData");
        const diagramData = await getDiagramData({
            year: "2020",
        });
        return diagramData.data;
    };

    // changing the diagram function changes the diagram values and the title
    function changeDiagramTime(days){
    setDaysToUse(days)
    if (days == 1){
        setDiagramTitle("Daily ")
    } else if(days == 7){
        setDiagramTitle("Weekly ")
    } else if(days == 30){
        setDiagramTitle("Monthly ")
    } else{
        setDiagramTitle("Yearly ")
    }
    }

    // sorting function, sorts data alphabetically 
    function sortObj(obj) {
        return Object.keys(obj)
            .sort()
            .reduce(function (result, key) {
                result[key] = obj[key];
                return result;
            }, {});
    }
    
    // all the sankey diagram paths
    var sankeyDiagramPoints = [["Site Electricity Demand (kW)","Import Electricity (kW)"],
        ["Site Electricity Demand (kW)","CHP1 Electricity Generation (kW)"],["Site Electricity Demand (kW)","CHP2 Electricity Generation (kW)"],
        ["Site Heat Demand (kW)","CHP1 Heat Output (kW)"],["Site Heat Demand (kW)","CHP2 Heat Output (kW)"],
        ["Site Heat Demand (kW)","Boiler Heat Output (kW)"],["Site Electricity Demand (kW)", "Export Electricity (kW)"]]


    useEffect(() => {
            getData().then((data) => {
                var funcGraphData = [];
                //retrieving all the data and storing it as an array
                var yearData = []
                // looping to retrieve every month
                for (let months = 1; months <= 12; months ++){
                    var currentMonth = data[months]
                    //looping to get every day from the month
                    for(let days = 0; days < Object.keys(data[months]).length; days ++){
                        let sortedData = sortObj(currentMonth[Object.keys(data[months]).length-days]);
                        yearData.push(sortedData)
                    }
                }
                // sorting the data for each day of the year
                var sortedYearData = []
                for (let c = 0; c < daysToUse; c++){
                    let sortedData = sortObj(yearData[365-c]);
                    sortedYearData.push(sortedData)
                }
                // template for the data needed for the sankey diagram
                var total = {
                    "Import Electricity (kW)": 0,
                    "CHP1 Electricity Generation (kW)": 0,
                    "CHP2 Electricity Generation (kW)": 0,
                    "CHP1 Heat Output (kW)": 0,
                    "CHP2 Heat Output (kW)": 0,
                    "Boiler Heat Output (kW)": 0,
                    "Export Electricity (kW)": 0
                }
                // looping for the number of days needed to retrieve data from the sorted data
                for (let c = 0; c < daysToUse; c++) {
                    var tempTotal = 0
                    // for loop to get the key names from the object so that we can retrieve the correct data
                    for ( var property in total ) {
                        // making sure all numbers are positive and are rounded up
                        tempTotal += parseFloat((Math.abs(sortedYearData[Object.keys(sortedYearData)[c]][property])).toFixed())
                        total[property] = total[property] + tempTotal
                    }
                }
                // looping to create the template object for the diagram
                for (let i = 1; i <= daysToUse; i++) {
                    // first value must be this for the template to work
                    if (i === 1) {
                        funcGraphData[0] = ["From", "To", "Weight"];
                    }
                    // a second loop to retrieve all paths and giving them a value
                    for (let j = 0; j < sankeyDiagramPoints.length; j++){
                        // eg ["Site Electricity Demand (kW)","Import Electricity (kW)", number value]
                        funcGraphData.push([sankeyDiagramPoints[j][0],sankeyDiagramPoints[j][1],total[sankeyDiagramPoints[j][1]]]);
                    }
                }
                setPlotData(funcGraphData);
              });
      }, [daysToUse]);
      console.log(getData[0])

  return (
    <div className='is-fullheight has-background-grey-lighter'>
        <div class="grid-container">
            {/* buttons still not added just for looks */}
            <button class="grid-item" onClick={() => changeDiagramTime(1)}>Day</button>
            <button class="grid-item" onClick={() => changeDiagramTime(7)}>Weekly</button>
            <button class="grid-item" onClick={() => changeDiagramTime(30)}>Monthly</button>
            <button class="grid-item" onClick={() => changeDiagramTime(365)}>Yearly</button>
        </div>
        <div className="column">
            <div className="box home" ref={ref} >
                <h1 className="title has-text-grey">{diagramTitle}Energy flow diagram</h1>
                <div>
                    <Chart
                    chartType="Sankey"
                    width="90%"
                    height="450px"
                    data={plotData}
                    options={options}
                    /> 
                </div>
            </div>
        </div>
        <button id='capture' onClick={onButtonClick }>Download</button>
    </div>
  );
}

export default EFD;
