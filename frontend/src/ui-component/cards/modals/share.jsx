// ShareDialogBox.js
import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Typography, useTheme } from "@mui/material";
import { IconAdjustmentsHorizontal, IconSearch, IconSend, IconX, IconMinus } from "@tabler/icons";
import AnimateButton from "../../extended/AnimateButton";
import ScrollBar from "react-perfect-scrollbar";
import { shouldForwardProp } from '@mui/system';
import config from "../../../config";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

const ShareDialogBox = ({ onClose, open, file, callback }) => {
    const toastId = React.useRef(null);
    const theme = useTheme();
    const axiosInstance = axios.create({
        withCredentials: true,
    });
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + "/api/searchusers", { keyWord: searchTerm });
            setSearchResults(response.data.users);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    React.useEffect(() => {
        if (searchTerm) {
            handleSearch();
        }
    }, [searchTerm]);

    const shareFileByEmail = async (path, email, name) => {
        try {
            toast.dismiss()
            toastId.current = toast("Sharing File...", { autoClose: false });
            let data = new FormData();
            data.append('email', email);
            data.append('path', path);
            data.append('name', name);
            await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/share', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((res) => {
                console.log(res)
                toast.update(toastId.current, { render: res.data.message, type: toast.TYPE.SUCCESS, autoClose: 5000 });
                callback()
            })
        } catch (error) {
            console.log(error)
            if (!error.response.data?.error) {
                toast.update(toastId.current, { render: 'User Not Logged in', type: toast.TYPE.ERROR, autoClose: 5000 });
                callback()
            } else {
                toast.update(toastId.current, { render: error.response.data.error, type: toast.TYPE.ERROR, autoClose: 5000 });
                callback()
            }
        }
    }

    const removeShareByEmail = async (path, email) => {
        try {
            toast.dismiss()
            toastId.current = toast("Remove Sharing ...", { autoClose: false });
            let data = new FormData();
            data.append('email', email);
            data.append('path', path);
            await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/removeshare', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((res) => {
                console.log(res)
                toast.update(toastId.current, { render: res.data.message, type: toast.TYPE.SUCCESS, autoClose: 5000 });
                callback()
            })
        } catch (error) {
            console.log(error)
            if (!error.response.data?.error) {
                toast.update(toastId.current, { render: 'User Not Logged in', type: toast.TYPE.ERROR, autoClose: 5000 });
                callback()
            } else {
                toast.update(toastId.current, { render: error.response.data.error, type: toast.TYPE.ERROR, autoClose: 5000 });
                callback()
            }
        }
    }


    return (
        <BootstrapDialog
            className="FactModal"
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 1 }}>
                <Grid item>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Shared With
                    </DialogTitle>
                </Grid>
                <Grid item>
                    <AnimateButton>
                        <ButtonBase sx={{ borderRadius: '12px' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    background: theme.palette.orange.light,
                                    color: theme.palette.orange.dark,
                                    '&:hover': {
                                        background: theme.palette.orange.dark,
                                        color: theme.palette.orange.light
                                    }
                                }}
                                onClick={onClose}
                            >
                                <IconX stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>
                    </AnimateButton>
                </Grid>
            </Grid>
            <DialogContent dividers>
                {(localStorage.getItem('userId')) === (file.owner) && <OutlineInputStyle
                    id="input-search-header"
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <ButtonBase sx={{ borderRadius: '12px' }}>
                                <HeaderAvatarStyle variant="rounded">
                                    <IconX stroke={1.5} size="1.3rem"
                                        onClick={() => {
                                            setSearchResults([])
                                            setSearchTerm('')
                                        }} />
                                </HeaderAvatarStyle>
                            </ButtonBase>
                        </InputAdornment>
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-describedby="search-helper-text"
                    inputfile={{ 'aria-label': 'weight' }}
                />}
                {searchResults.length > 0 && (
                    <ScrollBar style={{ maxHeight: '300px', height: 'fit-content', position: 'absolute', background: 'white', top: '125px', zIndex: 1000, width: '93%', padding: '0px 6px 0px 6px' }}>
                        {searchResults.map((result, index) => (
                            <Card key={index} sx={{ bgcolor: 'ghostwhite', color: 'grey.900', p: 1, px: 3, mb: 2 }}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Grid container alignItems="center">
                                                    <Grid item>
                                                        <Avatar
                                                            src={config.API_URL_DEV + '/drive/photos/' + result.username}
                                                            sx={{
                                                                bgcolor: theme.palette.secondary.light,
                                                                color: theme.palette.secondary.dark,
                                                                width: '30px',
                                                                height: '30px',
                                                                mr: 2,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item alignItems="center" justifyContent="space-between">
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {result.name}
                                                        </Typography>
                                                        <Typography variant="subtitle2">
                                                            {result.username}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {(localStorage.getItem('userId')) === (file.owner) && <Grid item>
                                                <Grid container alignItems="center" justifyContent="center">
                                                    <Grid item>
                                                        <HeaderAvatarStyle variant="rounded">
                                                            <IconSend stroke={1.5} size="1.3rem" onClick={() => shareFileByEmail(file.path, result.username, result.name)} />
                                                        </HeaderAvatarStyle>
                                                    </Grid>
                                                </Grid>
                                            </Grid>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </ScrollBar>
                )}
                <ScrollBar style={{ height: '300px' }}>
                    {file.shared != null && file.shared.access.map((user, index) => (
                        <Card key={index} sx={{ bgcolor: 'ghostwhite', color: 'grey.900', p: 1, px: 3, mb: 2 }}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Grid container alignItems="center">
                                                <Grid item>
                                                    <Avatar
                                                        src={config.API_URL_DEV + '/drive/photos/' + user.email}
                                                        sx={{
                                                            bgcolor: theme.palette.secondary.light,
                                                            color: theme.palette.secondary.dark,
                                                            width: '30px',
                                                            height: '30px',
                                                            mr: 2,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item alignItems="center" justifyContent="space-between">
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {user.name}
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        {user.email}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {(localStorage.getItem('userId')) === (file.owner) && <Grid item>
                                            <Grid container alignItems="center" justifyContent="center">
                                                <Grid item>
                                                    <HeaderAvatarStyle variant="rounded">
                                                        <IconMinus stroke={1.5} size="1.3rem" onClick={() => removeShareByEmail(file.path, user.email)} />
                                                    </HeaderAvatarStyle>
                                                </Grid>
                                            </Grid>
                                        </Grid>}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                </ScrollBar>
            </DialogContent>
        </BootstrapDialog >
    );
};

export default ShareDialogBox;