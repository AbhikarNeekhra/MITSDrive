import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, DialogContentText, Grid, Typography, FormControl, TextField, ButtonGroup, Autocomplete, Chip, InputLabel, Select, MenuItem, DialogTitle } from '@mui/material';
import { useTheme } from '@emotion/react';
import config from '../../../config';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CreateFolder({ callback, path }) {
  const toastId = React.useRef(null);
  const axiosInstance = axios.create({
    withCredentials: true, // Include cookies in the request
  });
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    access: [],
    tags: [],
    privacy: '',
    category: '',
    name: '',
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setFormData({ ...formData, category: event.target.value });
  };

  const handleTagInputChange = (event, value) => {
    setFormData({ ...formData, tags: value });
  };

  const handleAccessChange = (event, value) => {
    setFormData({ ...formData, access: value });
  };

  const handlePrivacyChange = (value) => {
    setFormData({ ...formData, privacy: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({
      access: [],
      tags: [],
      privacy: '',
      category: '',
      name: '',
    })
    setOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      let data = new FormData();
      data.append('name', formData.name);
      data.append('path', path);
      data.append('access', formData.access.join('%#$'));
      data.append('tags', formData.tags.join('%#$'));
      data.append('privacy', formData.privacy);
      data.append('category', formData.category);
      toast.dismiss()
      toastId.current = toast("Folder is Creating...", { autoClose: false });
      await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/createfolder', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then((res) => {
        console.log(res)
        toast.update(toastId.current, { render: res.data.message, type: toast.TYPE.SUCCESS, autoClose: 5000 });
        callback()
        handleClose();
      }).catch((err) => {
        console.log(err)
        toast.update(toastId.current, { render: err.response.data.error, type: toast.TYPE.ERROR, autoClose: 5000 });
        callback()
        handleClose();
      })
    } catch (error) {
      console.log(error)
      toast.update(toastId.current, { render: error.response.data.error, type: toast.TYPE.ERROR, autoClose: 5000 });
      callback()
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: theme.palette.primary.dark,
          borderRadius: '25px',
          fontSize: '1rem',
          margin: 0,
          padding: '8px 8px'
        }}
        className='responsive-icon-button'
        onClick={handleClickOpen}
        startIcon={<AddIcon sx={{ m: 0 }} />}
      >
        Create Folder
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, fontSize: 14, backgroundColor: 'rgb(251, 250, 251)' }} id="customized-dialog-title">
          Create Folder
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          style={{ backgroundColor: 'rgb(251, 250, 251)' }}
        >
          <Grid alignItems='center' justifyContent='center' sx={{
            display: 'flex',
            flexDirection: 'column',
            my: 2
          }}>
            <FormControl fullWidth margin="normal" sx={{ minWidth: '40vw' }}>
              <TextField
                id="name"
                label='name'
                required
                value={formData.name}
                onChange={handleInputChange('name')}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                id="tags"
                multiple
                options={[]}
                freeSolo
                value={formData.tags}
                onChange={handleTagInputChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      onDelete={() => {
                        const newTags = [...formData.tags];
                        newTags.splice(index, 1);
                        setFormData({ ...formData, tags: newTags });
                      }}
                    />
                  ))
                }
                renderInput={(params) => <TextField {...params} label='tags' />}
              />
            </FormControl>

            <ButtonGroup
              fullWidth
              color="secondary"
              variant="outlined"
              margin="normal"
              sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}
            >
              <Button
                style={{
                  borderRadius: '25px',
                  fontSize: '0.8em',
                  padding: '10px 16px',
                  maxWidth: '200px',
                  marginRight: '10px',
                  borderColor: 'rgb(94, 53, 177)',
                }}
                onClick={() => handlePrivacyChange('public')}
                variant={formData.privacy === 'public' ? 'contained' : 'outlined'}
              >
                Public
              </Button>
              <Button
                style={{
                  borderRadius: '25px',
                  fontSize: '0.8em',
                  padding: '10px 16px',
                  maxWidth: '200px',
                  marginRight: '10px',
                  borderColor: 'rgb(94, 53, 177)',
                }}
                onClick={() => handlePrivacyChange('private')}
                variant={formData.privacy === 'private' ? 'contained' : 'outlined'}
              >
                Private
              </Button>
              <Button
                style={{
                  borderRadius: '25px',
                  fontSize: '0.8em',
                  padding: '10px 16px',
                  maxWidth: '200px',
                  borderColor: 'rgb(94, 53, 177)',
                }}
                onClick={() => handlePrivacyChange('restricted')}
                variant={formData.privacy === 'restricted' ? 'contained' : 'outlined'}
              >
                Restricted
              </Button>
            </ButtonGroup>

            {formData.privacy === 'restricted' &&
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  id="access"
                  multiple
                  options={['ss', 'sss', 'dfs']}
                  freeSolo
                  value={formData.access}
                  onChange={handleAccessChange}
                  renderTags={(value, getAccessProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getAccessProps({ index })}
                        onDelete={() => {
                          const newAccess = [...formData.access];
                          newAccess.splice(index, 1);
                          setFormData({ ...formData, access: newAccess });
                        }}
                      />
                    ))
                  }
                  renderInput={(params) => <TextField {...params} label='access' required />}
                />
              </FormControl>
            }
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                id="category"
                required
                value={formData.category}
                onChange={handleCategoryChange}
                label='Category'
              >
                <MenuItem value="notices">Notices</MenuItem>
                <MenuItem value="studymaterial">Study Material</MenuItem>
                <MenuItem value="curriculum">Currriculum</MenuItem>
                <MenuItem value="activity">Activity</MenuItem>
                <MenuItem value="other">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Button
            variant="contained"
            size="large"
            component="span"
            style={{ justifyContent: 'center', backgroundColor: "rgb(94, 53, 177)" }}
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
