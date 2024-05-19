import React, { useState, useEffect } from 'react';
import CustomizedDialogs from './modal1';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Button, 
    TextField
} from '@mui/material';


const FacultiesListPage = () => {
    const [Faculties, setFaculties] = useState(() => {
        const Faculties = localStorage.getItem('Faculties');
        return Faculties ? JSON.parse(Faculties) : [];
    });

    useEffect(() => {
        localStorage.setItem('Faculties', JSON.stringify(Faculties));
    }, [Faculties]);

    const [editIndex, setEditIndex] = useState(null);
    const [editFaculty, setEditFaculty] = useState({
        email: '',
        name: '',
        limit: '',
        folder: '',
    });

    const handleAddFaculty = (newFaculty) => {
        setFaculties([...Faculties, newFaculty]);
    };

    const handleDeleteFaculty = (index) => {
        const updatedFaculties = [...Faculties];
        updatedFaculties.splice(index, 1);
        setFaculties(updatedFaculties);
    };

    const handleEditFaculty = (index) => {
        setEditIndex(index);
        setEditFaculty(Faculties[index]);
    };

    const handleSaveEdit = () => {
        const updatedFaculties = [...Faculties];
        updatedFaculties[editIndex] = editFaculty;
        setFaculties(updatedFaculties);
        setEditIndex(null);
        setEditFaculty({
            email: '',
            name: '',
            limit: '',
            folder: '',
        });
    };

    return (
        <div>
            <div style={{ marginBottom: '15px', marginLeft: '85%' }}>
                <CustomizedDialogs onAdd={handleAddFaculty} />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Limit</TableCell>
                            <TableCell>Folder</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Faculties.map((Faculty, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {index === editIndex ? (
                                        <TextField
                                            fullWidth
                                            value={editFaculty.email}
                                            onChange={(e) =>
                                                setEditFaculty({
                                                    ...editFaculty,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        Faculty.email
                                    )}
                                </TableCell>
                                <TableCell>
                                    {index === editIndex ? (
                                        <TextField
                                            fullWidth
                                            value={editFaculty.name}
                                            onChange={(e) =>
                                                setEditFaculty({
                                                    ...editFaculty,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        Faculty.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {index === editIndex ? (
                                        <TextField
                                            fullWidth
                                            value={editFaculty.limit}
                                            onChange={(e) =>
                                                setEditFaculty({
                                                    ...editFaculty,
                                                    limit: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        Faculty.limit
                                    )}
                                </TableCell>
                                <TableCell>
                                    {index === editIndex ? (
                                        <TextField
                                            fullWidth
                                            value={editFaculty.folder}
                                            onChange={(e) =>
                                                setEditFaculty({
                                                    ...editFaculty,
                                                    folder: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        Faculty.folder
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {index === editIndex ? (
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={handleSaveEdit}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => setEditIndex(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleDeleteFaculty(index)}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleEditFaculty(index)}
                                            >
                                                Edit
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default FacultiesListPage;
