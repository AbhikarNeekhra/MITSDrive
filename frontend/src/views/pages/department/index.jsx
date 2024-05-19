import React, { useState, useEffect } from 'react';
import CustomizedDialogs from './modal';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Button,
    TextField,
} from '@mui/material';

const DepartmentsListPage = () => {
    const [departments, setDepartments] = useState(() => {
        const savedDepartments = localStorage.getItem('Departments');
        return savedDepartments ? JSON.parse(savedDepartments) : [];
    });

    useEffect(() => {
        localStorage.setItem('Departments', JSON.stringify(departments));
    }, [departments]);

    const [editIndex, setEditIndex] = useState(null);
    const [editDepartment, setEditDepartment] = useState({
        email: '',
        name: '',
        limit: '',
        folder: '',
    });

    const handleAddDepartment = (newDepartment) => {
        setDepartments([...departments, newDepartment]);
    };

    const handleDeleteDepartment = (index) => {
        const updatedDepartments = [...departments];
        updatedDepartments.splice(index, 1);
        setDepartments(updatedDepartments);
    };

    const handleEditDepartment = (index) => {
        setEditIndex(index);
        setEditDepartment(departments[index]);
    };

    const handleSaveEdit = () => {
        const updatedDepartments = [...departments];
        updatedDepartments[editIndex] = editDepartment;
        setDepartments(updatedDepartments);
        setEditIndex(null);
        setEditDepartment({
            email: '',
            name: '',
            limit: '',
            folder: '',
        });
    };

    return (
        <div>
            <div style={{ marginBottom: '15px', marginLeft: '80%' }}>
                <CustomizedDialogs onAdd={handleAddDepartment} />
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
                        {departments.map((department, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {index === editIndex ? (
                                        <TextField
                                            fullWidth
                                            value={editDepartment.email}
                                            onChange={(e) =>
                                                setEditDepartment({
                                                    ...editDepartment,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        department.email
                                    )}
                                </TableCell>
                                <TableCell>
                                    {index === editIndex ? (
                                        <TextField
                                            fullWidth
                                            value={editDepartment.name}
                                            onChange={(e) =>
                                                setEditDepartment({
                                                    ...editDepartment,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        department.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {index === editIndex ? (
                                        <TextField
                                            fullWidth
                                            value={editDepartment.limit}
                                            onChange={(e) =>
                                                setEditDepartment({
                                                    ...editDepartment,
                                                    limit: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        department.limit
                                    )}
                                </TableCell>
                                <TableCell>
                                    {index === editIndex ? (
                                        <TextField
                                            fullWidth
                                            value={editDepartment.folder}
                                            onChange={(e) =>
                                                setEditDepartment({
                                                    ...editDepartment,
                                                    folder: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        department.folder
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
                                                onClick={() => handleDeleteDepartment(index)}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleEditDepartment(index)}
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

export default DepartmentsListPage;
