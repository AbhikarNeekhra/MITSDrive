const radialChartData = {
  type: 'radialBar',
  height: 320,
  margin: 0,
  padding: 0,
  options: {
    chart: {
      type: 'radialBar',
      offsetY: -40,
      sparkline: {
        enabled: true
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: '97%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2,
          }
        },
        stroke: {
          lineCap: 'round',
          width: 13,
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: '22px'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -30
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.6,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      },
    },
    stroke: {
      lineCap: 'round',
      width: 10

    }
  },
  series: [76],


};

export default radialChartData;
