import './static/css/home.css';
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebaseConfig";

function Goals() {

    // Having the variables trackable by react and changed through user inputs
    const [energyUsageGoal, setEnergyUsageGoal] = useState(5000);
    const [carbonEmissionsGoal, setCarbonEmissionsGoal] = useState(3);
    const [energyCostsGoal, setEnergyCostsGoal] = useState(6000);
    
    const [currentEnergyUsageGoal, setCurrentEnergyUsageGoal] = useState();
    const [currentCarbonEmissionsGoal, setCurrentCarbonEmissionsUsageGoal] = useState();
    const [currentEnergyCostsGoal, setCurrentEnergyCostsUsageGoal] = useState();
    
    // Handles the evenets for when the energy usage goal is changing
    const handleEnergyUsageGoal = (event) => {
        setEnergyUsageGoal(event.target.value);
    };
    // Handles the evenets for when the carbon emissions goal is changing
    const handleCarbonEmissionsGoal = (event) => {
    setCarbonEmissionsGoal(event.target.value);
    };
    // Handles the evenets for when the energy costs goal is changing
    const handleEnergyCostsGoal = (event) => {
    setEnergyCostsGoal(event.target.value);
    };

    // retreving the data from the database
    const getData = async () => {
        const getDiagramData = httpsCallable(functions, "getData");
        const diagramData = await getDiagramData({
            year: "2020",
        });
        return diagramData.data;
    };

    // sorting function, sorts data alphabetically 
    function sortObj(obj) {
        return Object.keys(obj)
            .sort()
            .reduce(function (result, key) {
                result[key] = obj[key];
                return result;
            }, {});
    }
    useEffect(() => {
        getData().then((data) => {
            // retrivening the most recent data entry
            var lastMonth = data["12"]["31"]
            console.log(lastMonth)
            // sorting the data 
            var sortedYearData = []
            sortedYearData.push(sortObj(lastMonth))
            // data needed from the database
            var properties = {
                "Site Electricity Demand (kW)": 0,
                "Day ahead UK electricity price": 0,
                "Import Electricity (kW)": 0
            }
            // for loop to get the key names from the object so that we can retrieve the correct data
            for ( var property in properties ) {
                // making sure all numbers are positive and are rounded up
                var tempTotal = parseFloat((Math.abs(sortedYearData[Object.keys(sortedYearData)][property])).toFixed())
                properties[property] =tempTotal
            }

            setCurrentEnergyUsageGoal(properties["Site Electricity Demand (kW)"])
            //https://businessenergyscotland.org/guides/how-calculate-your-businesss-carbon-footprint/#:~:text=For%20electricity%2C%20the%20calculation%20will,1%2C000%20%3D%200.1tCO2e
            setCurrentCarbonEmissionsUsageGoal(properties["Site Electricity Demand (kW)"]* 0.21233 / 1000)
            setCurrentEnergyCostsUsageGoal(properties["Import Electricity (kW)"]*properties["Day ahead UK electricity price"])
          });
  }, []);

    // Function to get the percentage of usage against the goal
    function getPercentage(usageGoal, currentUsage){
        return parseInt((currentUsage/usageGoal)*100)
    }
     
    // energy usage progress bar
    const energyUsage_props = {
        percent: getPercentage(energyUsageGoal,currentEnergyUsageGoal),
        colorSlice: "#018ed0",
        colorCircle: "#70a044",
        fontColor: "#FFFFF",
        fontSize: "1.6rem",
        fontWeight: 400,
        size: 250,
        stroke: 10,
        strokeBottom: 5,
        speed: 60,
        cut: 0,
        rotation: -90,
        opacity: 10,
        unit: "%",
        textPosition: "0.35em",
        animationOff: false,
        strokeDasharray: "10,1",
        inverse: false,
        round: false,
        number: true,
    };
  // carbon emissions progress bar
  const carbonEmissions_props = {
    percent: getPercentage(carbonEmissionsGoal,currentCarbonEmissionsGoal),
    colorSlice: "#018ed0",
    colorCircle: "#70a044",
    fontColor: "#FFFFF",
    fontSize: "1.6rem",
    fontWeight: 400,
    size: 250,
    stroke: 10,
    strokeBottom: 5,
    speed: 60,
    cut: 0,
    rotation: -90,
    opacity: 10,
    unit: "%",
    textPosition: "0.35em",
    animationOff: false,
    strokeDasharray: "10,1",
    inverse: false,
    round: false,
    number: true,
  };
  // energy cost progress bar
  const energyCosts_props = {
    percent: getPercentage(energyCostsGoal,currentEnergyCostsGoal),
    colorSlice: "#018ed0",
    colorCircle: "#70a044",
    fontColor: "#FFFFF",
    fontSize: "1.6rem",
    fontWeight: 400,
    size: 250,
    stroke: 10,
    strokeBottom: 5,
    speed: 60,
    cut: 0,
    rotation: -90,
    opacity: 10,
    unit: "%",
    textPosition: "0.35em",
    animationOff: false,
    strokeDasharray: "10,1",
    inverse: false,
    round: false,
    number: true,
  };

  return (  
    <div className="hero-body is-align-items-flex-start pt-1 home-body">
        <div className="container m-1">
            {/* make the columns wrap around and appear on multiple lines */}
            <div className="columns">
                {/* start of energy usage goal */}
                <div className="column">
                    <div className="box home">
                        <h2 className="title has-text-grey">Energy Usage</h2>
                        {/* retrieving the goal from variable */}
                        <h5>{energyUsageGoal} kW</h5>
                        <div className='progress-bar'>
                            <CircularProgressBar {...energyUsage_props} />
                        </div>
                        {/* retrieving current usage from the variable */}
                        <h6>{currentEnergyUsageGoal} kW</h6>
                        <form>
                            <label>
                                {/* on change to handle the input of changing the goal */}
                                <input type="number" placeholder='Change the daily goal' onChange={handleEnergyUsageGoal} />
                            </label>
                        </form>
                    </div>
                </div>
                {/* energy usage goal */}
                {/* start carbon emission goal */}
                <div className="column">
                    <div className="box home">
                        <h2 className="title has-text-grey">CO2 Emissions</h2>
                        {/* retrieving the goal from variable */}
                        <h5>{carbonEmissionsGoal} tCO2e</h5>
                        <div className='progress-bar'>
                            <CircularProgressBar {...carbonEmissions_props} />
                        </div>
                        {/* retrieving current usage from the variable */}
                        <h6>{currentCarbonEmissionsGoal} tCO2e</h6>
                        <form>
                            <label>
                                {/* on change to handle the input of changing the goal */}
                                <input  type="number" placeholder='Change the daily goal' onChange={handleCarbonEmissionsGoal} />
                            </label>
                        </form>
                    </div>
                </div>
                {/* end carbon emission goal */}
                {/* start energy costs goal */}
                <div className="column">
                    <div className="box home">
                        <h2 className="title has-text-grey">Energy Costs</h2>
                        {/* retrieving the goal from variable */}
                        <h5>£{energyCostsGoal}</h5>
                        <div className='progress-bar'>
                            <CircularProgressBar {...energyCosts_props} />
                        </div>
                        {/* retrieving current usage from the variable */}
                        <h6>£{currentEnergyCostsGoal}</h6>
                        <form>
                            <label>
                                {/* on change to handle the input of changing the goal */}
                                <input type="number" placeholder='Change the daily goal' onChange={handleEnergyCostsGoal}/>
                            </label>
                        </form>
                    </div>
                </div>
                {/* end energy costs goal */}
            </div>
        </div>
    </div>
  );
}

export default Goals;
