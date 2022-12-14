//all the imports needed to work
import Modal from "./Modal/Modal";
import "./static/css/EFX.css";
import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import html2canvas from "html2canvas";

//main function for the forecast page
function CostForecast() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setOption] = useState(0);
  const ref = React.useRef();

//options that will be displayed in the dropdown on the forecast page
  const options = [
    { value: "Year", label: "Year" },
    { value: "Month", label: "Month" },
    { value: "Week", label: "Week" },
  ];

  //to download the graph we have the image download code
  const downloadImg = async () => {
    const element = ref.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  //what we see on the forecast page
  //the title "generate energy cost"
  //then we have the drop down in which we use the options from earlier and then whatever is chosen and then
  //when the generate button is clicked based on whats in the drop down box we carry that input through to modal.js
  //and then make sure the correct modal is on the screen using a conditional statement
  return (
    <div className="efc has-background-grey-lighter">
      <br />
      <div className="box-EFC">
      <h1 className="title has-text-grey">Generate Energy Cost Forecast</h1>
        <label>Choose a time frame:</label>
        <div className="App">
          <Dropdown
            options={options}
            onChange={(e) => setOption(e)}
            placeholder="Select an option"
            className="dropDOwn"
          />
        </div>
        
        <button onClick={() => setOpenModal(true)} className="generateButton">
          Generate
        </button>
        <Modal
          printRef={ref}
          open={openModal}
          onClose={() => setOpenModal(false)}
          choosenOption={selectedOption}
          downloadImg={downloadImg}
        />
      </div>
    </div>
  );
}//the code from line 62 to the bottom is to make sure the modal does not stay opened using "state" deciding when to open and close the modal

export default CostForecast;
