import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ onAdd }) {
    const [open, setOpen] = React.useState(false);
    const [department, setDepartment] = React.useState({
        email: "",
        name: "",
        limit: "",
        folder: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDepartment({
            ...department,
            [name]: value,
        });
    };

    const handleAddDepartment = () => {
        onAdd(department);
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                size="large"
                onClick={handleClickOpen}
                style={{ backgroundColor: "#5E35B1", borderRadius: "31px" }}
            >
                Add Department
            </Button>
            <BootstrapDialog
                className="deptModal"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add Department
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="limit"
                        name="limit"
                        label="Limit"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="folder"
                        name="folder"
                        label="Folder"
                        fullWidth
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleAddDepartment}>
                        Add
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
