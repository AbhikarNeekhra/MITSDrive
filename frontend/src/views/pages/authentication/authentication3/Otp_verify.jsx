import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthOtp from '../auth-forms/AuthOtp';
import Logo from '../../../../ui-component/Logo';
import AuthFooter from '../../../../ui-component/cards/AuthFooter';
import config from '../../../../config';

// assets

// ================================|| AUTH3 - OTP ||================================ //

const OtpVerify = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const axiosInstance = axios.create({
    withCredentials: true, // Include cookies in the request
  });

  useEffect(() => {
    if (localStorage.getItem('email') === null) {
      navigate('/login', { replace: true });
    }
  }, []);

  const resendOtp = async () => {
    let formData = new FormData();
    formData.append('email', localStorage.getItem('email'));
    await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/resendotp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            Verify Otp
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            OTP Has Been Sent To Your Email
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthOtp />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t Receive OTP?
                        <Button onClick={() => resendOtp()}>Resend</Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default OtpVerify;
