// InfoDialogBox.js
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ShareDialogBox from "./share";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Typography, useTheme, Divider, Button, Chip, FormControl, Autocomplete, TextField, MenuItem, Select, InputLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { IconAdjustmentsHorizontal, IconSearch, IconSend, IconTrash, IconX } from "@tabler/icons";
import AnimateButton from "../../extended/AnimateButton";
import ScrollBar from "react-perfect-scrollbar";
import { maxHeight, shouldForwardProp } from '@mui/system';
import folder from '../../../assets/images/file/ic_folder.svg'
import pdf from '../../../assets/images/file/ic_pdf.svg'
import doc from '../../../assets/images/file/ic_document.svg'
import audio from '../../../assets/images/file/ic_audio.svg'
import video from '../../../assets/images/file/ic_video.svg'
import image from '../../../assets/images/file/ic_img.svg'
import fileIcon from '../../../assets/images/file/ic_file.svg'
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import config from "../../../config";
import axios from "axios";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1)
    },
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

const InfoDialogBox = ({ onClose, open, file, callback, edit }) => {
    const theme = useTheme();
    const toastId = React.useRef(null);
    const axiosInstance = axios.create({
        withCredentials: true,
    });
    const [showDetail, setShowDetail] = useState(true);
    const [showTag, setShowTag] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const [formData, setFormData] = React.useState({
        access: file.access?.split('%#$'),
        tags: file.tags?.split('%#$'),
        privacy: file.privacy,
        category: file.category
    });

    React.useEffect(() => {
        if (edit) {
            setShowPrivacy(true)
            setShowTag(true)
            setShowDetail(false)
            setEditMode(true)
        } else {
            setShowPrivacy(false)
            setShowTag(false)
            setShowDetail(true)
            setEditMode(false)
        }
    }, [edit])

    const handleClose = () => {
        setShowPrivacy(false)
        setShowTag(false)
        setShowDetail(true)
        setEditMode(false)
    }

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

    const handleProp = () => {
        setShowDetail(!showDetail);
    };

    const handleTag = () => {
        setShowTag(!showTag);
    };

    const handlePrivacy = () => {
        setShowPrivacy(!showPrivacy);
    };

    const handleShare = () => {
        setShowShareDialog(!showShareDialog);
    };

    const handleEdit = async () => {
        setShowPrivacy(true)
        setShowTag(true)
        setShowDetail(false)
        setEditMode(true)
    }

    const handleSave = async (path) => {
        try {
            let data = new FormData();
            data.append('path', path);
            data.append('access', formData.access.join('%#$'));
            data.append('tags', formData.tags.join('%#$'));
            data.append('privacy', formData.privacy);
            data.append('category', formData.category);
            toast.dismiss()
            toastId.current = toast("Saving Changes...", { autoClose: false });
            await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/editfile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((res) => {
                console.log(res)
                toast.update(toastId.current, { render: res.data.message, type: toast.TYPE.SUCCESS, autoClose: 5000 });
                callback()
                setEditMode(false)
            })
        } catch (error) {
            console.log(error)
            if (!error.response.data?.error) {
                toast.update(toastId.current, { render: 'User Not Logged in', type: toast.TYPE.ERROR, autoClose: 5000 });
                callback()
                setEditMode(false)
            } else {
                toast.update(toastId.current, { render: error.response.data.error, type: toast.TYPE.ERROR, autoClose: 5000 });
                callback()
                setEditMode(false)
            }
        }
    }
    function formatFileSize(bytes) {
        const kilobits = bytes / 1024;
        const megabits = kilobits / 1024;
        const gigabits = megabits / 1024;
        const terabits = gigabits / 1024;

        if (terabits >= 1) {
            return terabits.toFixed(1) + 'TB';
        } else if (gigabits >= 1) {
            return gigabits.toFixed(1) + 'GB';
        } else if (megabits >= 1) {
            return megabits.toFixed(1) + 'MB';
        } else {
            return kilobits.toFixed(1) + 'KB';
        }
    }

    const images = {
        'folder': folder,
        'pdf': pdf,
        'mp4': video,
        'mp3': audio,
        'svg': image,
        'docx': doc,
        'jpg': image,
        'jpeg': image,
        'png': image,
        'gif': image,
        'webp': image,
        'webm': video,
        'mkv': video,
    };

    return (
        <BootstrapDialog
            className="FactModal"
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <div style={{
                height: '100vh',
                width: '350px',
                borderRadius: "13px 0px 0px 13px",
            }} className="sidebar show">
                <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 1, pr: 4 }}>
                    <Grid item>
                        <DialogTitle sx={{ m: 0, p: 2, fontSize: 20 }} id="customized-dialog-title">
                            Send File
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
                                    <IconX stroke={1.5} size="1.3rem" onClick={handleClose} />
                                </Avatar>
                            </ButtonBase>
                        </AnimateButton>
                    </Grid>
                </Grid>
                <Divider />
                <DialogContent sx={{ p: 2 }}>
                    <ScrollBar style={{ maxHeight: '75vh' }}>
                        <div className="detail">
                            <img
                                src={images[file.type] != undefined ? images[file.type] : fileIcon}
                                alt="logo"
                            />
                            <p>{file.name}</p>
                        </div>
                        <div className="tag">
                            <p>Tags & Category</p>
                            <img
                                onClick={handleTag}
                                src="https://cdn-icons-png.flaticon.com/512/25/25623.png"
                                alt="arrow"
                                style={{ transform: `rotate(${showTag ? 180 : 0}deg)` }}
                            />
                        </div>
                        <table className={`tabla ${showTag ? "dis" : ""}`} style={{ borderSpacing: '0 15px' }}>
                            <tr style={{ verticalAlign: 'baseline' }}>
                                <td style={{ color: "rgba(0,0,0,0.5)", fontWeight: "700" }}>
                                    Tags
                                </td>
                                {editMode ?
                                    <td style={{ width: '100%', paddingLeft: 15 }}>
                                        <FormControl fullWidth margin="none">
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
                                    </td> : <td style={{ paddingLeft: 25 }}>
                                        {(file.tags !== '' && file.tags !== null) ? (`${file.tags}`).split('%#$') > 0 ? (
                                            <Chip sx={{ my: 0.25, mr: 0.25 }} label={file.tags} />
                                        ) : (
                                            (`${file.tags}`).split('%#$').map((tag) => {
                                                return <Chip sx={{ m: 0, my: 0.25, mr: 0.25 }} key={tag} label={tag} />;
                                            })
                                        ) : ''}
                                    </td>}
                            </tr>
                            <tr style={{ verticalAlign: 'baseline' }}>
                                <td style={{ color: "rgba(0,0,0,0.5)", fontWeight: "700" }}>
                                    Category
                                </td>
                                {editMode ?
                                    <td style={{ width: '100%', paddingLeft: 15 }}>
                                        <FormControl fullWidth margin="none">
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
                                    </td> : <td style={{ paddingLeft: 30 }}>{file.category}</td>}
                            </tr>
                        </table>
                        <div className="propert">
                            <p>Privacy</p>
                            <img
                                onClick={handlePrivacy}
                                src="https://cdn-icons-png.flaticon.com/512/25/25623.png"
                                alt="arrow"
                                style={{ transform: `rotate(${showPrivacy ? 180 : 0}deg)` }}
                            />
                        </div>
                        <table className={`tabla ${showPrivacy ? "dis" : ""}`} style={{ borderSpacing: '0 15px' }}>
                            <tr style={{ verticalAlign: 'baseline' }}>
                                <td style={{ color: "rgba(0,0,0,0.5)", fontWeight: "700" }}>
                                    Privacy
                                </td>
                                {editMode ?
                                    <td style={{ width: '100%', paddingLeft: 15 }}>
                                        <RadioGroup
                                            row
                                            aria-label="privacy"
                                            name="privacy"
                                            value={formData.privacy}
                                            onChange={(event) => handlePrivacyChange(event.target.value)}
                                        >
                                            <FormControlLabel
                                                value="public"
                                                control={<Radio color="primary" />}
                                                label="Public"
                                                labelPlacement="bottom"
                                                sx={{ borderRadius: '12px', fontSize: '0.8em', padding: '0px', marginRight: '0px', minWidth: '0' }}
                                            />
                                            <FormControlLabel
                                                value="private"
                                                control={<Radio color="primary" />}
                                                label="Private"
                                                labelPlacement="bottom"
                                                sx={{ borderRadius: '12px', fontSize: '0.8em', padding: '0px', marginRight: '0px', minWidth: '0' }}
                                            />
                                            <FormControlLabel
                                                value="restricted"
                                                control={<Radio color="primary" />}
                                                label="Restricted"
                                                labelPlacement="bottom"
                                                sx={{ borderRadius: '12px', fontSize: '0.8em', padding: '0px', marginRight: '0px', minWidth: '0' }}
                                            />
                                        </RadioGroup>

                                    </td> : <td>
                                        {file.privacy}
                                    </td>}
                            </tr>
                            {(formData.privacy === 'restricted' || file.privacy === 'restricted') && <tr style={{ verticalAlign: 'baseline' }}>
                                <td style={{ color: "rgba(0,0,0,0.5)", fontWeight: "700" }}>
                                    Access
                                </td>
                                {editMode ?
                                    <td style={{ width: '100%', paddingLeft: 15 }}>{formData.privacy === 'restricted' &&
                                        <FormControl fullWidth margin="none">
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
                                    }</td> : <td>{(`${file.access}`).split('%#$') > 0 ? (
                                        <Chip sx={{ my: 0.25, mr: 0.25 }} label={file.access} />
                                    ) : (
                                        (`${file.access}`).split('%#$').map((tag) => {
                                            return <Chip sx={{ m: 0, my: 0.25, mr: 0.25 }} key={tag} label={tag} />;
                                        })
                                    )}</td>}
                            </tr>}
                        </table>
                        <div className="propert">
                            <p>Properties</p>
                            <img
                                onClick={handleProp}
                                src="https://cdn-icons-png.flaticon.com/512/25/25623.png"
                                alt="arrow"
                                style={{ transform: `rotate(${showDetail ? 180 : 0}deg)` }}
                            />
                        </div>
                        <table className={`tabla ${showDetail ? "dis" : ""}`} style={{ borderSpacing: '0 15px' }}>
                            <tr style={{ verticalAlign: 'baseline' }}>
                                <td style={{ color: "rgba(0,0,0,0.5)", fontWeight: "700" }}>
                                    Size
                                </td>
                                <td>{formatFileSize(file.size)}</td>
                            </tr>
                            <tr style={{ verticalAlign: 'baseline' }}>
                                <td style={{ color: "rgba(0,0,0,0.5)", fontWeight: "700" }}>
                                    Modified
                                </td>
                                <td>{new Date(file.date).toLocaleString('en-UK', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}</td>
                            </tr>
                            <tr style={{ verticalAlign: 'baseline' }}>
                                <td style={{ color: "rgba(0,0,0,0.5)", fontWeight: "700" }}>
                                    Type
                                </td>
                                <td>{file.type}</td>
                            </tr>
                        </table>

                        <div className="shared">
                            <p>Shared with</p>
                            <img
                                onClick={handleShare}
                                src="https://static-00.iconduck.com/assets.00/plus-icon-2048x2048-z6v59bd6.png"
                                alt="arrow"
                            />
                        </div>
                        <div className="sharewith">
                            <ScrollBar style={{ maxHeight: '200px' }}>
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
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))}
                            </ScrollBar>
                        </div>
                    </ScrollBar>
                </DialogContent>
                {(localStorage.getItem('userId')) === (file.owner) && <DialogActions sx={{ p: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', position: 'absolute', bottom: 0 }}>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            size="large"
                            component="span"
                            style={{ justifyContent: 'center', backgroundColor: "rgb(94, 53, 177)" }}
                            startIcon={editMode ? <SaveIcon /> : <EditIcon />}
                            onClick={editMode ? (() => handleSave(file.path)) : handleEdit}
                        >
                            {editMode ? 'Save' : 'Edit'}
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            size="large"
                            component="span"
                            style={{ justifyContent: 'center', backgroundColor: "red" }}
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                    </AnimateButton>
                </DialogActions>}

            </div>
            <ShareDialogBox onClose={handleShare} file={file} open={showShareDialog} callback={callback} />
        </BootstrapDialog>
    );
};

export default InfoDialogBox;