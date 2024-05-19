import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, Card, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './StorageCard';
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonPopularCard from '../../../ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from '../../../store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import pdf from '../../../assets/images/file/ic_pdf.svg';
import doc from '../../../assets/images/file/ic_document.svg';
import audio from '../../../assets/images/file/ic_audio.svg';
import video from '../../../assets/images/file/ic_video.svg';
import img from '../../../assets/images/file/ic_img.svg';
import file from '../../../assets/images/file/ic_file.svg';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Storage Usages</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ bgcolor: 'ghostwhite', color: 'grey.900', p: 1, px: 3, mb: 2 }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Grid container alignItems="center">
                            <Grid item>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  bgcolor: theme.palette.secondary.light,
                                  color: theme.palette.secondary.dark,
                                  width: '35px',
                                  height: '40px',
                                  mr: 2
                                }}
                              >
                                <img src={video} alt="media" />
                              </Avatar>
                            </Grid>
                            <Grid item alignItems="center" justifyContent="space-between">
                              <Typography variant="subtitle1" color="inherit">
                                Media
                              </Typography>
                              <Typography variant="subtitle2">
                                223 Files
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="center">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                20GB
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ bgcolor: 'ghostwhite', color: 'grey.900', p: 1, px: 3, mb: 2 }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Grid container alignItems="center">
                            <Grid item>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  bgcolor: theme.palette.secondary.light,
                                  color: theme.palette.secondary.dark,
                                  width: '35px',
                                  height: '40px',
                                  mr: 2
                                }}
                              >
                                <img src={pdf} alt="pdf" />
                              </Avatar>
                            </Grid>
                            <Grid item alignItems="center" justifyContent="space-between">
                              <Typography variant="subtitle1" color="inherit">
                                Pdf
                              </Typography>
                              <Typography variant="subtitle2">
                                121 Files
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="center">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                2.0GB
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ bgcolor: 'ghostwhite', color: 'grey.900', p: 1, px: 3, mb: 2 }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Grid container alignItems="center">
                            <Grid item>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  bgcolor: theme.palette.secondary.light,
                                  color: theme.palette.secondary.dark,
                                  width: '35px',
                                  height: '40px',
                                  mr: 2
                                }}
                              >
                                <img src={doc} alt="documents" />
                              </Avatar>
                            </Grid>
                            <Grid item alignItems="center" justifyContent="space-between">
                              <Typography variant="subtitle1" color="inherit">
                                Documents
                              </Typography>
                              <Typography variant="subtitle2">
                                23 Files
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="center">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                100MB
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ bgcolor: 'ghostwhite', color: 'grey.900', p: 1, px: 3, mb: 2 }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Grid container alignItems="center">
                            <Grid item>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  bgcolor: theme.palette.secondary.light,
                                  color: theme.palette.secondary.dark,
                                  width: '35px',
                                  height: '40px',
                                  mr: 2
                                }}
                              >
                                <img src={file} alt="others" />
                              </Avatar>
                            </Grid>
                            <Grid item alignItems="center" justifyContent="space-between">
                              <Typography variant="subtitle1" color="inherit">
                                Others
                              </Typography>
                              <Typography variant="subtitle2">
                                400 Files
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="center">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                3.0GB
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
