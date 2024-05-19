import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input'

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from '../../../../assets/images/icons/social-google.svg';
import config from '../../../../config';

// ============================|| FIREBASE - Otp ||============================ //

const AuthOtp = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const axiosInstance = axios.create({
    withCredentials: true, // Include cookies in the request
  });

  return (
    <>
      <Formik
        initialValues={{
          otp: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          otp: Yup.number().required('OTP is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            let formData = new FormData();
            formData.append('email', localStorage.getItem('email'));
            formData.append('otp', values.otp);
            await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/verifyotp', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then((res) => {
                setStatus({ success: true });
                setSubmitting(false);
                navigate('/login', { replace: true });
              })
              .catch((err) => {
                setErrors({ submit: err.response.data.message });
                setStatus({ success: false });
                setSubmitting(false);
              })
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <MuiOtpInput value={values.otp} onChange={(newOtp) => setFieldValue('otp', newOtp)} length={6} />
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Submit
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthOtp;
