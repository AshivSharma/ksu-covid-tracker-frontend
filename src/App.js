import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Button
} from  "@material-ui/core";
import React, {useEffect ,useState} from  "react";
import InfoPanel from './InfoPanel';
import AddCase from"./AddCase";
import Chart from "./chart";
import axios from 'axios';


function App() {

  const [campuses, setCampuses] = useState([
    "Kennesaw", "Marietta"
  ]);
  const [currentCampus, setCurrentCampus] = useState("Both_Campuses");
  const [test, setTest] = useState();

  const selectCampus = (e) => {
    const currentCampus = e.target.value;
    setCurrentCampus(currentCampus);
  }
  useEffect(() => {
    const fetchData = async () => {
    const result = await axios.get(
      "http://localhost:9000/api",
      );
        setTest(result.data);
    }
    fetchData();
  }, []);

  console.log("test", test)

  return (
    <div className="app">

      {/*Header*/}
      <div className="app_header">
      <p className="App-intro">{test}</p>
      <h1>KSU Covid-19 Tracker</h1>
      </div>
        
      {/*Add Case*/}
      <div className="app_stats">
        {/*Infected Panel*/}
        <InfoPanel title="Infected" group1_cases={10} group2_cases={30} total={1000}></InfoPanel>
        {/*Recovered Panel*/}
        <InfoPanel title="Recovered" group1_cases={10} group2_cases={30} total={5000}></InfoPanel>
        {/*Campus Specific Cases*/}
        <InfoPanel title="Campus Cases" group1_cases={10} group2_cases={30} total={30}></InfoPanel>
      </div>

      {/*Selection Dropdown*/}
      <div className="app_addCase">
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={selectCampus} value={currentCampus}>
          <MenuItem value="Both_Campuses">Both Campuses</MenuItem>
            {campuses.map(campus => (
              <MenuItem value={campus}> {campus} </MenuItem>
              ))}
          </Select>
        </FormControl>
        <AddCase></AddCase>
      </div>

      {/*Chart*/}
       <Chart></Chart>

    </div>
  );
}

export default App;
