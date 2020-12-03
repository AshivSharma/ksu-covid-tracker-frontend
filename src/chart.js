import React from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May', 'June', 'July'],
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

export default class Chart extends React.Component {
  render() {
    return (
      <div>
        <Bar
          width={500}
          height={300}
          data={state}
          options={{
            maintainAspectRatio:false,
            title:{
              display:true,
              text:'<Currently Selected Campus Placeholder>',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}