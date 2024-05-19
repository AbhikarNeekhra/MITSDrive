import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';
import char from "./chart-data/radial-graph";

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;

  const orangeDark = theme.palette.secondary[800];

  useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light'
      }
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  return (
    <Card sx={{ bgcolor: 'ghostwhite' }}>
      <Grid container sx={{ p: 1, pb: 0, color: '#fff' }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sx={{ m: 0 }}>
            <div id="chart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',padding:0 }}>
              <Chart {...char} />
              <p>YOU USED 26/32GB</p>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Card >
  );
};

export default BajajAreaChartCard;
