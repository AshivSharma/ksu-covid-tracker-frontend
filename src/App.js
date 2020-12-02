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
import UpdateCase from "./updateCase";
import Chart from "./chart";
import axios from 'axios';


function App() {

  const [campuses, setCampuses] = useState([
    "Kennesaw", "Marietta"
  ]);
  const [currentCampus, setCurrentCampus] = useState("Both_Campuses");
  const [studentInfectedCnt, setStudentInfected] = useState(0);
  const [facultyInfectedCnt, setFacultyInfected] = useState(0);
 

  const selectCampus = (e) => {
    const currentCampus = e.target.value;
    setCurrentCampus(currentCampus);
  }
  const getData = (url, setData) => {
    axios.get(url).then(res => {
      var amount = Object.keys(res.data).length;
      console.log("Result", Object.keys(res.data).length);
      setData(amount);
    });
  }

  useEffect(() => {
      getData("https://us-central1-ksucovidtracker.cloudfunctions.net/getStudentInfectedCases",setStudentInfected);
      getData("https://us-central1-ksucovidtracker.cloudfunctions.net/getFacultyInfectedCases",setFacultyInfected);
  }, []);


  return (
    <div className="app">

      {/*Header*/}
      <div className="app_header">
      <h1>KSU Covid-19 Tracker</h1>
      </div>
        
      {/*Add Case*/}
      <div className="app_stats">
        {/*Infected Panel*/}
        <InfoPanel title="Infected" group1_title={'Student'} group2_title={'Faculty'} group1_cases={100+studentInfectedCnt}
         group2_cases={100+facultyInfectedCnt} total={studentInfectedCnt + facultyInfectedCnt}></InfoPanel>
        {/*Recovered Panel*/}
        <InfoPanel title="Recovered" group1_title={'Student'} group2_title={'Faculty'} group1_cases={1000} group2_cases={30} total={5000}></InfoPanel>
        {/*Campus Specific Cases*/}
        <InfoPanel title="Infected Campus Cases" group1_title={'Kennesaw'} group2_title={'Marietta'} group1_cases={10} group2_cases={30} total={30}></InfoPanel>
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
        <UpdateCase></UpdateCase>
      </div>

      {/*Chart*/}
       <Chart></Chart>

    </div>
  );
}

export default App;
