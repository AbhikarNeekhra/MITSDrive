import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloseIcon from '@mui/icons-material/Close';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import config from '../config';
import { IconDownload, IconX } from '@tabler/icons';
import AnimateButton from './extended/AnimateButton';
import { Avatar, ButtonBase, DialogActions, styled, useTheme } from '@mui/material';
import ReactPlayer from 'react-player'
import ScrollBar from "react-perfect-scrollbar";
import { shouldForwardProp } from '@mui/system';
import axios from 'axios';

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

const OpenFile = ({ open, url, type, handleClose, name }) => {
    const theme = useTheme()
    const axiosInstance = axios.create({
        withCredentials: true,
    });
    const docs = [{
        uri: `
https://tnow-prod-apac.367791ca7abea81096902b345fee7b1f.r2.cloudflarestorage.com/2023-11-23/8845517ac326631d3d7092702de0a61d/20231123C2qN4qvb/nYgpzF/be846741-519?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ee862debb448801ab1904792186e2774%2F20231123%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20231123T200359Z&X-Amz-Expires=86400&X-Amz-Signature=c76abf56cefb34d666222cb70a5800265d22cd2250fbde9a957834bc6e4b04b8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22be846741-519%22&x-id=GetObject`, fileType: type
    }];
    const CustomHeader = () => {
        const handleDownload = async () => {
            let data = new FormData()
            data.append('path', url)
            axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/storedownload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            const fileUrl = `${(config.env == 'dev' ? config.API_URL_DEV : config.API_URL)}/drive/storage${url}`;

            if (fileUrl) {
                try {
                    const response = await fetch(fileUrl);
                    const disposition = response.headers.get('Content-Disposition');
                    const fileName = disposition ? disposition.split('filename=')[1] : `${name}.${type}`;

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


        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 5, padding: '5px 20px', background: 'lightgrey', borderRadius: 5 }}>
                <div>
                    <div style={{ fontWeight: 'bold' }}>{name + '.' + type}</div>
                </div>
                <HeaderAvatarStyle variant="rounded">
                    <IconDownload stroke={1.5} size="1.3rem" onClick={handleDownload} />
                </HeaderAvatarStyle>
            </div>
        );
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            fullScreen
        >
            <DialogActions>
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
                            onClick={handleClose}
                        >
                            <IconX stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ButtonBase>
                </AnimateButton>
            </DialogActions>
            <DialogContent>
                <ScrollBar>
                    <DocViewer
                        documents={docs}
                        initialActiveDocument={docs[0]}
                        pluginRenderers={DocViewerRenderers}
                        config={{
                            header: {
                                overrideComponent: CustomHeader
                            },
                        }}
                        language="en"
                    />
                </ScrollBar>
            </DialogContent>
        </Dialog>
    );
};

export default OpenFile;
