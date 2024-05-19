import React, { useState } from 'react'
import folder from '../../assets/images/file/ic_folder.svg'
import pdf from '../../assets/images/file/ic_pdf.svg'
import doc from '../../assets/images/file/ic_document.svg'
import audio from '../../assets/images/file/ic_audio.svg'
import video from '../../assets/images/file/ic_video.svg'
import image from '../../assets/images/file/ic_img.svg'
import fileIcon from '../../assets/images/file/ic_file.svg'
import user from '../../assets/images/users/user-round.svg'
import { IconEdit, IconHeart, IconShare, IconTrash, IconDownload, IconLink, IconClipboard, IconFolder, IconSettings, IconStar, IconTrashOff, IconLinkOff, IconUnlink } from '@tabler/icons';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Grid, Stack, Chip, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@emotion/react'
import InfoDialogBox from './modals/filemodal'
import ShareDialogBox from "./modals/share";
import OpenFile from '../OpenFile'
import config from '../../config'
import axios from "axios";
import { toast } from "react-toastify";


const File = ({ key, file, callback, openFolder }) => {
    const toastId = React.useRef(null);
    const theme = useTheme();
    const axiosInstance = axios.create({
        withCredentials: true,
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [showInfoDialog, setShowInfoDialog] = useState(false);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        if (!open) {
            let data = new FormData()
            data.append('path', file.path)
            axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/storeviewed', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
        }
        setOpen(!open)
    }
    const handleDownload = async () => {
        let data = new FormData()
        data.append('path', file.path)
        axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/storedownload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })

        const fileUrl = `${(config.env == 'dev' ? config.API_URL_DEV : config.API_URL)}/drive/storage${file.path}`;
        if (fileUrl) {
            try {
                const response = await fetch(fileUrl);
                const disposition = response.headers.get('Content-Disposition');
                const fileName = disposition ? disposition.split('filename=')[1] : `${file.name}.${file.type}`;

                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        }
    };
    const handleShare = () => {
        setShowShareDialog(!showShareDialog);
        handleClose()
    };
    const handleInfo = () => {
        setShowInfoDialog(!showInfoDialog);
        handleClose()
    };

    const handleEdit = () => {
        setEdit(true)
        setShowInfoDialog(!showInfoDialog);
        handleClose()
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const truncateFileName = (fileName, maxLength) => {
        if (fileName.length > maxLength) {
            return fileName.substring(0, maxLength - 3) + '...';
        }
        return fileName;
    };

    const handleFavorite = async (path) => {
        handleClose()
        try {
            toast.dismiss()
            toastId.current = toast("Adding to Favorite...", { autoClose: false });
            let data = new FormData();
            data.append('path', path);
            await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/favorite', data, {
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
    const handleDelete = async (path) => {
        handleClose()
        try {
            toast.dismiss()
            toastId.current = toast("Deleting File...", { autoClose: false });
            let data = new FormData();
            data.append('path', path);
            await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/deletefile', data, {
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
    const handleRestore = async (path) => {
        handleClose()
        try {
            toast.dismiss()
            toastId.current = toast("Restoring File...", { autoClose: false });
            let data = new FormData();
            data.append('path', path);
            await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/restorefile', data, {
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
        <>
            <div className="ele">
                <div className="name">
                    <img
                        src={images[file.type] != undefined ? images[file.type] : fileIcon}
                        alt="icon"
                        style={{ cursor: 'pointer' }}
                        onClick={file.type !== 'folder' ? handleOpen : () => openFolder(file.path, file.name)}
                    />
                    <label onClick={handleInfo} style={{ cursor: 'pointer' }}>{truncateFileName(file.name, 10)}</label>
                </div>
                <div className="size" style={{ cursor: 'pointer' }} onClick={handleInfo}>{formatFileSize(file.size)}</div>
                <div className="modify" dangerouslySetInnerHTML={{
                    __html: new Date(file.date).toLocaleString('en-UK', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }).replace(',', '<br/>')
                }} style={{ cursor: 'pointer' }} onClick={handleInfo}></div>
                <div className="share">
                    <div className="circleholder">
                        {file.shared != null && file.shared.access.slice(0, 3).map((user) =>
                            <Avatar
                                src={(config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/drive/photos/' + user.email}
                                className="circles"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleShare}
                                sx={{ cursor: 'pointer' }}
                            />
                        )}
                    </div>
                </div>
                <div className="favorite">
                    <input className="star" checked={file.isfavorite} type="checkbox" title="bookmark page" style={{ marginRight: 20 }} onChange={() => handleFavorite(file.path)} />
                </div>
                <MoreVertIcon
                    fontSize="small"
                    sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                    }}
                    aria-controls="menu-popular-card"
                    aria-haspopup="true"
                    onClick={handleClick}
                />
                {(localStorage.getItem('userId')) === (file.owner) ?
                    <Menu
                        id="menu-popular-card"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        variant="selectedMenu"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >

                        <MenuItem sx={{ pl: 0 }} onClick={file.type !== 'folder' ? handleOpen : () => openFolder(file.path, file.name)}>
                            <IconFolder style={{ marginRight: 5 }} /> Open
                        </MenuItem>
                        {file.type !== 'folder' && <MenuItem sx={{ pl: 0 }} onClick={handleDownload}>
                            <IconDownload style={{ marginRight: 5 }} /> Download
                        </MenuItem>}
                        <MenuItem sx={{ pl: 0 }} onClick={handleEdit}>
                            <IconEdit style={{ marginRight: 5 }} /> Edit
                        </MenuItem>
                        <MenuItem sx={{ pl: 0 }} onClick={() => handleFavorite(file.path)}>
                            <IconStar style={{ marginRight: 5 }} /> Favorite
                        </MenuItem>
                        <MenuItem sx={{ pl: 0 }} onClick={handleShare}>
                            <IconShare style={{ marginRight: 5 }} /> Share
                        </MenuItem>
                        {file.bin === true ? (
                            <MenuItem sx={{ pl: 0 }} onClick={() => handleRestore(file.path)}>
                                <IconTrashOff style={{ marginRight: 5 }} /> Restore
                            </MenuItem>
                        ) : (
                            <MenuItem sx={{ pl: 0 }} onClick={() => handleDelete(file.path)} >
                                <IconTrash style={{ marginRight: 5 }} /> Delete
                            </MenuItem>
                        )}
                        <MenuItem sx={{ pl: 0 }} onClick={handleClose}>
                            <IconClipboard style={{ marginRight: 5 }} /> Copy Link
                        </MenuItem>
                        <MenuItem sx={{ pl: 0 }} onClick={handleClose}>
                            <IconUnlink style={{ marginRight: 5 }} /> Change Link
                        </MenuItem>
                        <MenuItem sx={{ pl: 0 }} onClick={handleInfo}>
                            <IconSettings style={{ marginRight: 5 }} /> Properties
                        </MenuItem>
                    </Menu> :
                    <Menu
                        id="menu-popular-card"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        variant="selectedMenu"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >

                        <MenuItem sx={{ pl: 0 }} onClick={file.type !== 'folder' ? handleOpen : () => openFolder(file.path, file.name)}>
                            <IconFolder style={{ marginRight: 5 }} /> Open
                        </MenuItem>
                        {file.type !== 'folder' && <MenuItem sx={{ pl: 0 }} onClick={handleDownload}>
                            <IconDownload style={{ marginRight: 5 }} /> Download
                        </MenuItem>}
                        <MenuItem sx={{ pl: 0 }} onClick={() => handleFavorite(file.path)}>
                            <IconStar style={{ marginRight: 5 }} /> Favorite
                        </MenuItem>
                        <MenuItem sx={{ pl: 0 }} onClick={handleClose}>
                            <IconSettings style={{ marginRight: 5 }} /> Properties
                        </MenuItem>
                    </Menu>}
                <InfoDialogBox onClose={handleInfo} file={file} open={showInfoDialog} callback={callback} edit={edit} />
                <ShareDialogBox onClose={handleShare} file={file} open={showShareDialog} callback={callback} />
                <OpenFile open={open} handleClose={handleOpen} type={file.type} url={file.path} name={file.name} />
            </div>
        </>
    );
};

export default File;