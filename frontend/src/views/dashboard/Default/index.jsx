import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import MainCard from '../../../ui-component/cards/MainCard';
import File from '../../../ui-component/cards/File';
import FileSkeleton from '../../../ui-component/cards/Skeleton/FileSkeleton';
import FileHorizontalSkeleton from '../../../ui-component/cards/Skeleton/FileHorizontalSkeleton';
import FileHorizontal from '../../../ui-component/cards/FileHorizontal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { gridSpacing } from '../../../store/constant';
import axios from 'axios';
import OpenFolder from '../../../ui-component/OpenFolder';
import config from '../../../config';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    fetchData()
    setLoading(false);
  }, []);

  const handleFileUpdate = () => {
    fetchData()
  };

  const fetchData = async () => {
    let data = new FormData();
    await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/getrecentviews', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((res) => {
      console.log(res)
      const sortedFiles = res.data.files.sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') {
          return -1;
        }
        if (a.type !== 'folder' && b.type === 'folder') {
          return 1;
        }
        return 0;
      });

      setFiles(sortedFiles)
    }).catch((err) => {
      console.log(err)
    })
  }

  const type = localStorage.getItem('type');

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {type != '"student"' &&
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        }
        <MainCard title="Recent Files" style={{ marginTop: 30 }}>
          <OpenFolder Files={files} callback={handleFileUpdate} view={'list'} manager={false} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
