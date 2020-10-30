const options = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  elements: {
    point: {
      radius: 0
    }
  },
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: 0,
          max: 25
        },
        gridLines: {
          display: false
        }
      }
    ],
    xAxes: [
      {
        display: false,
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }
    ]
  }
};
