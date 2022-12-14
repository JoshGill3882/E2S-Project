import "./static/css/home.css";
import { useEffect, useState } from "react";
import backDrop from "./static/images/homeBackDrop.png";
import { useAuthState } from "react-firebase-hooks/auth"; // Using the useAuthStateHook
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { Chart } from "react-google-charts";
import Geocode from "react-geocode";

import Goals from "./Goals.js";
import Map from "./Map";
import { data } from "./EFD";
import { documentId } from "firebase/firestore";
import Recommendations from "./Recommendations";
import { map } from '@firebase/util';

function Home() {
  const [user] = useAuthState(auth); // Implenetation of useAuthStateHook
  const [mapData, setMapData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const options = {
    curveType: "function",
    legend: { position: "bottom" },
  };

  const [addAddress, setAddAddress] = useState(null);

  const handleAddress = (event) => {
    setAddAddress(event.target.value);
  };

  const addNewAddress = async () => {
    const newAddress = httpsCallable(functions, "users-addAddress"); // Calling the users-addAddress cloud function we made
    // Passing the needed variables to the cloud function
    await newAddress({
      address: addAddress,
    });
  };

  Geocode.setApiKey("AIzaSyBtYIImGTFHEmtqutvW6zWP0okemopwExU");

  // Call the get Addresses function
  const getAddresses = httpsCallable(functions, "users-getAddress");

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

  // Use useEffect to only call this code once
  useEffect(() => {
    getGraphs().then((data) => {
      var funcGraphData = [];
      const january = data["1"];
      // console.log(january);
      for (let i = 1; i <= 31; i++) {
        let sortedData = sortObj(january[i]);
        if (i === 1) {
          funcGraphData[0] = Object.keys(sortedData);
          funcGraphData[0].unshift("Date");
        }
        funcGraphData[i] = Object.values(sortedData);
        funcGraphData[i].unshift(i);
      }
      // console.log(funcGraphData[0]);
      // console.log(funcGraphData);
      setGraphData(funcGraphData);
    });
    getAddresses().then((data) => {
      const addresses = data.data.address; // getAddress return set addresses to the returned array
      var funcMapData = []; // empty array to be used latter
      // this function uses geocode to take string addresses and convert them into coordinates
      async function mapAddress(address) {
        var obj = {};
        await Geocode.fromAddress(address).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            obj["lat"] = parseFloat(lat);
            obj["lng"] = parseFloat(lng);
          },
          (error) => {
            console.error(error);
          }
        );
        funcMapData.push(obj); // Push the lat, long values to the empty array created above
      }
      // for loop to go through every address to pass through the function
      for (var i = 0; i < addresses.length; i++) {
        mapAddress(addresses[i]);
      }
      setMapData(funcMapData); // Set the global map variable to the final state of the funcMapData array
    });
  }, []);

  return (
    <div className="hero is-fullheight has-background-grey-lighter">
      {/* code for the title of the dashboard */}
      <img src={backDrop} alt="backDrop" className="backDrop" />
      <div className="welcomeTitle">
        <h1>| Welcome back {user.email}</h1>
      </div>
      {/* end code for title of dashboard */}
      {/* Start the main body of the dashboard */}
      <div className="hero-body is-align-items-flex-start pt-1 home-body">
        <div className="container m-1">
          {/* make the columns wrap around and appear on multiple lines */}
          <div className="columns is-multiline is-mobile">
            {/* start container 1 */}
            <div className="column is-one-quarter">
              <div className="box home">
                <span className="icon is-left">
                  <i className="fas fa-2x fa-fa-solid fa-cloud-sun"></i>
                </span>
                <p>Current Temperature is 5ºC</p>
              </div>
            </div>
            {/* end container 1 */}
            {/* start container 2 */}
            <div className="column is-one-quarter">
              <div className="box home">
                <span className="icon is-left">
                  <i className="fa-solid fa-bolt fa-2x"></i>
                </span>
                <p>Currently using 210kWh of energy</p>
              </div>
            </div>
            {/* end container 2 */}
            {/* start container 3 */}
            <div className="column is-one-quarter">
              <div className="box home">
                <span className="icon is-left">
                  <i className="fa-solid fa-2x fa-fire"></i>
                </span>
                <p>Currently using 210kWh of heat</p>
              </div>
            </div>
            {/* end container 3 */}
            {/* start container 4 */}
            <div className="column is-one-quarter">
              <div className="box home">
                <code className="m-0">Currently:</code>
                <p>Exporting 632kWh of electricity</p>
              </div>
            </div>
            {/* end container 4 */}
            {/* start the first of the larger 2 container */}
            <div className="column is-full">
              <div className="box home" id="chartArea">
                <h1 className="title has-text-grey">
                  Current: Import and Export of electricity
                </h1>
                <Chart
                  chartType="LineChart"
                  data={graphData}
                  width="100%"
                  height="500px"
                  options={options}
                  className="chart"
                  legendToggle
                />
              </div>
            </div>
            {/* end the first of the larger 2 container */}
            {/* start the second of the larger 2 container */}
            <div className="column is-full">
              <div className="box home">
                <h1 className="title has-text-grey">Heat map</h1>
                <Map
                  data={mapData}
                  center={{ lat: 37.422327, lng: -122.08616 }}
                />
                <input
                  type="text"
                  className="input is-small mt-3"
                  placeholder="Enter an address"
                  onChange={handleAddress} // onChange uses the React handleBusiness function above
                />
                <button
                  className="button is-small is-link is-outlined mt-3"
                  onClick={addNewAddress}
                >
                  Add Address
                </button>
              </div>
              {addAddress}
            </div>
            {/* end the second of the larger 2 container */}
          </div>
        </div>
      </div>
      {/* page seperator */}
      <div className="seperator">Daily Goals</div>
      {/* start of goals */}
      <Goals></Goals>
      <Recommendations></Recommendations>
    </div>
  );
}

export default Home;
