import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
  Select,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../../../hooks/useScriptRef';
import Google from '../../../../assets/images/icons/social-google.svg';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import config from '../../../../config';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [batch, setBatch] = useState('')
  const [level, setLevel] = useState();
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const changeEmail = (value) => {
    if (value.split('@')[1].split('.')[0] === 'mitsgwl') {
      setBatch(value[0] + value[1] + value[2] + value[3])
    }
  }

  return (
    <>

      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          fname: '',
          lname: '',
          mobile: '',
          gender: '',
          department: '',
          batch: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          fname: Yup.string().max(255).required('First name is required'),
          lname: Yup.string().max(255).required('Last name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
          mobile: Yup.string().max(10).required('Mobile number is required'),
          gender: Yup.string().required('Select Gender'),
          department: Yup.string().required('Select Department'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (!checked) {
              setErrors({ submit: 'Please agree with terms and conditions' });
              setStatus({ success: false });
              setSubmitting(false);
              return;
            }
            let formData = new FormData();
            formData.append('email', values.email);
            formData.append('pass', values.password);
            formData.append('fullName', values.fname + ' ' + values.lname);
            formData.append('mobile', values.mobile);
            formData.append('gender', values.gender);
            formData.append('username', values.email);
            formData.append('department', values.department);
            formData.append('batch', values.batch);
            await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/register', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then((res) => {
                setStatus({ success: true });
                setSubmitting(false);
                localStorage.setItem('email', values.email)
                navigate('/verifyotp', { replace: true });
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="fname"
                  value={values.fname}
                  onChange={handleChange}
                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
                {touched.fname && errors.fname && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.fname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lname"
                  value={values.lname}
                  onChange={handleChange}
                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
                {touched.lname && errors.lname && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.lname}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e)
                  changeEmail(e.target.value)
                }}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.mobile && errors.mobile)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-mobile-register">Mobile Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-mobile-register"
                type="mobile"
                value={values.mobile}
                name="mobile"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.mobile && errors.mobile && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.mobile}
                </FormHelperText>
              )}
            </FormControl>


            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-confirm-password-register">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password-register"
                type={showPassword2 ? 'text' : 'password'}
                value={values.confirmPassword}
                name="confirmPassword"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword2 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="standard-weight-helper-text-confirm-password-register">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.gender && errors.gender)} sx={{ ...theme.typography.customInput }}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.gender}
                name='gender'
                onChange={handleChange}
                sx={{ ...theme.typography.customInput }}
                SelectDisplayProps={{
                  style: {
                    marginTop: '2px',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                }}
              >
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>

              {touched.gender && errors.gender && (
                <FormHelperText error id="standard-weight-helper-text-confirm-password-register">
                  {errors.gender}
                </FormHelperText>
              )}

            </FormControl>
            <FormControl fullWidth error={Boolean(touched.department && errors.department)} sx={{ ...theme.typography.customInput }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.department}
                name='department'
                onChange={handleChange}
                sx={{ ...theme.typography.customInput }}
                SelectDisplayProps={{
                  style: {
                    marginTop: '2px',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                }}
              >
                <MenuItem value="female">Computer Science</MenuItem>
                <MenuItem value="male">Mathametics and Computing</MenuItem>
              </Select>

              {touched.department && errors.department && (
                <FormHelperText error id="standard-weight-helper-text-confirm-password-register">
                  {errors.department}
                </FormHelperText>
              )}

            </FormControl>

            {batch &&

              <FormControl fullWidth error={Boolean(touched.batch && errors.batch)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-email-register">Batch</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-register"
                  type="batch"
                  value={batch}
                  name="batch"
                  disabled
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.batch && errors.batch && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.batch}
                  </FormHelperText>
                )}
              </FormControl>
            }


            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
