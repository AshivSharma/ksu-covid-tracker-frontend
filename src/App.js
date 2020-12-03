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
import {Bar} from 'react-chartjs-2';
import {Pie, Doughnut} from 'react-chartjs-2';

function App() {

  const [campuses, setCampuses] = useState([
    "Kennesaw", "Marietta"
  ]);
  var monthVals = {'January': 0, 'February':0 , 'March': 0,
  'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'Spetember': 0, 'October': 0, 'November': 0, 'December': 0};
  var allMonths = ['January', 'February', 'March',
  'April', 'May', 'June', 'July', 'August','September','October','November', 'December']
  
  const [currentCampus, setCurrentCampus] = useState("Both_Campuses");

  const [studentInfectedCnt, setStudentInfected] = useState(0);
  const [facultyInfectedCnt, setFacultyInfected] = useState(0);
  const [studentRecoveredCnt, setStudentRecovered] = useState(0);
  const [facultyRecoveredCnt, setFacultyRecovered] = useState(0);
  const [kennesawInfectedCnt, setKennesawInfected] = useState(0);
  const [marietaInfectedCnt, setMariettaInfected] = useState(0);
  const [month, setMonth] = useState([]);
 

  const selectCampus = (e) => {
    const currentCampus = e.target.value;
    setCurrentCampus(currentCampus);
  }
  const getData = (url, setData) => {
    axios.get(url).then(res => {
      var amount = Object.keys(res.data).length;
      setData(amount +20);
    });
  }
  const getMonth = () => {
    var amount;
    axios.get("https://us-central1-ksucovidtracker.cloudfunctions.net/user")
    .then(res => {
      setMonth(res.data);
      
    });
    
  }

  useEffect(() => {
      getData("https://us-central1-ksucovidtracker.cloudfunctions.net/getStudentInfectedCases",setStudentInfected);
      getData("https://us-central1-ksucovidtracker.cloudfunctions.net/getFacultyInfectedCases",setFacultyInfected);
      getData("https://us-central1-ksucovidtracker.cloudfunctions.net/getStudentRecoveredCases",setStudentRecovered);
      getData("https://us-central1-ksucovidtracker.cloudfunctions.net/getFacultyRecoveredCases",setFacultyRecovered);
      getData("https://us-central1-ksucovidtracker.cloudfunctions.net/getKennesawInfectedCases",setKennesawInfected);
      getData("https://us-central1-ksucovidtracker.cloudfunctions.net/getMariettaInfectedCases",setMariettaInfected);
  }, []);

  const data = {
    labels: allMonths,
    datasets: [
      {
        label: 'Covid-19 Cases',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 2000, 56]
      }
    ]
  }
  const state = {
    labels: ['Students Infected', 'Faculty Infected','Students Recovered',
             'Faculty Recovered'],
    datasets: [
      {
        backgroundColor: [
          '#DC143C',
          '#800000',
          '#3CB371',
          '#6B8E23',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#CD5C5C',
        '#CD5C5C',
        '#00FF7F',
        '#00FF7F',
        '#35014F'
        ],
        data: [studentInfectedCnt, facultyInfectedCnt, studentRecoveredCnt, facultyRecoveredCnt]
      }
    ]
  }


  return (
    <div className="app">

      {/*Header*/}
      <div className="app_header">
      <h1>KSU Covid-19 Tracker</h1>
      </div>
        
      {/*Add Case*/}
      <div className="app_stats">
        {/*Infected Panel*/}
        <InfoPanel title="Infected" group1_title={'Student'} group2_title={'Faculty'} group1_cases={studentInfectedCnt}
         group2_cases={facultyInfectedCnt} total={studentInfectedCnt + facultyInfectedCnt}></InfoPanel>
        {/*Recovered Panel*/}
        <InfoPanel title="Recovered" group1_title={'Student'} group2_title={'Faculty'} group1_cases={studentRecoveredCnt} 
        group2_cases={facultyRecoveredCnt} total={studentRecoveredCnt+facultyRecoveredCnt}></InfoPanel>
        {/*Campus Specific Cases*/}
        <InfoPanel title="Infected Campus Cases" group1_title={'Kennesaw'} group2_title={'Marietta'} 
        group1_cases={kennesawInfectedCnt} group2_cases={marietaInfectedCnt} total={kennesawInfectedCnt+marietaInfectedCnt}></InfoPanel>
      </div>

      {/*Selection Dropdown*/}
      <div className="app_addCase">
        {/* <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={selectCampus} value={currentCampus}>
          <MenuItem value="Both_Campuses">Both Campuses</MenuItem>
            {campuses.map(campus => (
              <MenuItem value={campus}> {campus} </MenuItem>
              ))}
          </Select>
        </FormControl> */}
        <AddCase></AddCase>
        <UpdateCase></UpdateCase>
      </div>

      {/*Chart*/}
      <div style={{marginTop:"20px",width:"50%",display:"flex", alignItems:"center",marginLeft:"500px"}}>
      <Pie
          data={state}
          options={{
            style:{
              borderColor: '#000000'
            },
            title:{
              display:false,
              text:'Covid-19 Cases',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>

    </div>
  );
}

export default App;
