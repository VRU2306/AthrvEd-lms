import React, { useState, useRef } from "react";
import "./upload.css";


import Box from "@material-ui/core/Box";
import Copyright from "../../UI/Copyrights";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import uploadcsv from "../../../Icons/Uploadcsv1.svg"
import { Button } from "@material-ui/core";
import fileimage from "../../../Icons/uploadform.svg"
import Close from "@material-ui/icons/CloseRounded"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    paper: {
        paddingTop: theme.spacing(4),
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 300,
    },
    fixedWidth: {
        maxWidth: "40vw",
        overflow: "auto",
    },

    formElementWidth: {
        width: 250,
    },
    formFullWidth: {
        width: "100%",
    },
}));



const Uploadcsv = (handleClose) => {
    const [files, setFiles] = useState([]);
    let [uploadableFile, setUploadFile] = useState({});
    // console.log(uploadableFile)
    const [uploading] = useState(false);


    const [isDrag, setDrag] = useState(false);
    const fileInput = useRef();

    const handleDrop = (e) => {
        e.preventDefault();

        const draggedFiles = [];

        if (e.dataTransfer.items) {
            Array.from(e.dataTransfer.items).forEach((item) => {
                if (item.kind === "file") {
                    let file = item.getAsFile();
                    // console.log(file);
                    draggedFiles.push(file);
                }
            });
        } else {
            Array.from(e.dataTransfer.files).forEach((file) => {
                // console.log(file);
                draggedFiles.push(file);
            });
        }

        setFiles([...draggedFiles, ...files]);
        setDrag(false);
    };

    const handleChange = (e) => {
        setFiles([...Array.from(e.target.files), ...files]);
        setUploadFile(e.target.files[0])
    };
    const handleRemove = (e) => {
        setFiles([]);
    };



    async function submitData(e,) {
        e.preventDefault();
        let formdata = new FormData();

        formdata.append("myFile", uploadableFile);

        // console.log(formdata)

        const request = {
            Credentials: 'include',
            method: 'POST',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            },
            body: formdata
        }

        const result = await fetch('/uploadfile', request)
        if (result) {
            window.location.reload();

        }
        // console.log(result)
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setDrag(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDrag(false);
    };

    const openFileDialog = () => {
        fileInput.current.click();
    };



    const classes = useStyles();
    // console.log(All);
    return (
        <main className={classes.content}>
            <div >
                <div className={classes.appBarSpacer} />


                <Grid container xs={10} md={8} lg={9} xl={10} sm={10} className="uploadoutline">
                    <Grid item xs={7} md={10} lg={10}>
                        <Box pt={4}>

                            <div>
                                <div className="uploadtexts">Upload CSV</div>
                                <p className="uploadtext">Upload your calender CSV file to AthrV LMS database</p>
                                <br></br>
                                <div className="Uploadbox">
                                    <div
                                        className={`${isDrag ? "drag" : ""} ${uploading ? "uploading" : ""
                                            }`}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onRemove={handleRemove}
                                    >
                                        <input ref={fileInput} type="file" accept=".csv" multiple onChange={handleChange} />



                                        <ul className="upload-preview">
                                            {files.map((file,) => (
                                                <li key={file.name}>
                                                    <br></br>
                                                    <img src={fileimage} alt={file.name} style={{ marginLeft: 20 }} />
                                                    <div className="filepreview">
                                                        {file.name}
                                                        <Button onClick={handleRemove}><Close style={{ fontSize: "medium", color: "#d4dce1" }} /></Button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        {files.length > 0 ? (
                                            <div className="upllodbut">
                                                <Button
                                                    style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", }}
                                                    onClick={submitData}
                                                    disabled={uploading}
                                                    className="uploadyes"
                                                >
                                                    Upload
                                        </Button>
                                            </div>
                                        ) : <div >
                                            <div className="upload1icon">
                                                <img src={uploadcsv} alt="Logo" onClick={openFileDialog} disabled={uploading} style={{ cursor: "pointer" }} />
                                            </div>
                                            <div className="uploadtextss" onClick={openFileDialog} disabled={uploading} style={{ cursor: "pointer" }}>Drag and drop your files here, or <u>browse</u></div>
                                        </div>}

                                    </div>

                                </div>

                            </div>


                        </Box>
                    </Grid>

                </Grid>

                <Grid item xs={7} md={10} lg={12} style={{ marginLeft: "10%" }}>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Grid>

            </div>
        </main >
    );
};

export default Uploadcsv;
