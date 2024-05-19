import React from "react";
import MainCard from "../../../ui-component/cards/MainCard";
import OpenFolder from "../../../ui-component/OpenFolder";
import axios from "axios";
import config from '../../../config';

const Study = () => {
    const [files, setFiles] = React.useState([]);
    const axiosInstance = axios.create({
        withCredentials: true,
    });

    React.useEffect(() => {
        fetchData()
    }, []);

    const handleFileUpdate = () => {
        fetchData()
    };

    const fetchData = async () => {
        let data = new FormData();
        data.append('category', 'category1')
        await axiosInstance.post((config.env == 'dev' ? config.API_URL_DEV : config.API_URL) + '/api/getfilebycategory', data, {
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
        <MainCard title="Study Material">
            <OpenFolder Files={files} callback={handleFileUpdate} manager={false} />
        </MainCard>
    );
};

export default Study;
