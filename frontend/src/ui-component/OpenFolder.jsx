import React from "react";
import File from "./cards/File";
import { Breadcrumbs, Link, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import NavigateNext from "@mui/icons-material/NavigateNext";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CreateFolder from './cards/modals/createFolderModal'
import UploadFile from './cards/modals/uploadFileModal'
import FileHorizontal from "./cards/FileHorizontal";
import config from "../config";

const OpenFolder = ({ Files, callback, view, manager }) => {
    const [files, setFiles] = React.useState();
    const [View, setView] = React.useState(view);
    const [path, setPath] = React.useState(null);
    const [breadcrumbs, setBreadCrumbs] = React.useState([]);
    const axiosInstance = axios.create({
        withCredentials: true, // Include cookies in the request
    });

    React.useEffect(() => {
        if (path === null) {
            setFiles(Files)
            setBreadCrumbs(
                [<Link underline="hover" key="1" color="inherit" onClick={handleHome}>
                    Home
                </Link>]
            )
        }
    }, [Files])

    const handleCallback = () => {
        if (path === null) {
            callback()
        }
        else {
            fetchData(path)
        }
    }

    const handleHome = () => {
        setPath(null)
        setFiles(Files)
        setBreadCrumbs([breadcrumbs[0]]);
    }

    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    const handleOpenFolder = (path, name) => {
        setPath(path);
        const updatedBreadcrumbs = [
            ...breadcrumbs,
            <Link underline="hover" key={name} color="inherit" onClick={() => handleNavigation(path, breadcrumbs.length + 1)}>
                {name}
            </Link>
        ];
        setBreadCrumbs(updatedBreadcrumbs);
        fetchData(path);
    };

    const handleNavigation = (path, index) => {
        setBreadCrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, index));
        fetchData(path)
    };


    const fetchData = async (path) => {
        let data = new FormData();
        data.append('path', path);
        await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/getfiles', data, {
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

    return (
        <>
            {manager && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '50px', marginBottom: '20px' }}>
                <CreateFolder callback={callback} path={path} />
                <UploadFile callback={callback} path={path} />
            </div>}
            <Stack spacing={2} sx={{ marginBottom: "20px", display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Breadcrumbs
                    maxItems={3}
                    separator={<NavigateNext fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
                <ToggleButtonGroup
                    orientation="horizontal"
                    value={View}
                    exclusive
                    onChange={handleChange}
                    sx={{ display: 'flex', flexDirection: 'row', py: 2, height: '70px' }}
                >
                    <ToggleButton value="list" aria-label="list">
                        <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value="module" aria-label="module">
                        <ViewModuleIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            {View === 'list' ?
                <div className="whole">
                    {files?.map((file, index) => (
                        <File
                            key={index}
                            file={file}
                            callback={handleCallback}
                            openFolder={handleOpenFolder}
                        />
                    ))}
                </div>
                :
                <div className="responsive-horizontal" style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    {files?.map((file, index) => (
                        <FileHorizontal
                            key={index}
                            file={file}
                            callback={handleCallback}
                            openFolder={handleOpenFolder}
                        />
                    ))}

                </div>
            }
        </>
    );
};

export default OpenFolder;
