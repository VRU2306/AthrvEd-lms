import React, { useState, useEffect } from "react";
// import "./Productivityuser.css";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Carousel } from 'react-responsive-carousel';
import { action, useStoreActions, useStoreState } from "easy-peasy";
import Button from '@material-ui/core/Button';
import './Add_News.css'
// import LoadingContainer from "../../UI/LoadingContainer";
import EditNews from "../AddNews/EditNews/EditNews"
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { array } from "prop-types";
import _ from "lodash";
import ReactFileReader from 'react-file-reader';


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
    paperStyling: {
        padding: 20,
    },


}));



const Add_News = () => {
    const [title, setTitle] = useState("");
    const [description, setDes] = useState("");
    const [image, setImage] = useState({})
    console.log(image)
    const [openEdit, setOpenEdit] = useState(false)
    const [CloseEdit, setCloseEdit] = useState(false)
    const [HandelClose, sethandelClose] = useState(false)
    const [key, setkey] = useState(0)
    let imageUrl


    const classes = useStyles();

    let desc


    let news = useStoreActions((action) => action.NewsMod.POST_NEWS_START)
    let postfail = useStoreState((state) => state.NewsMod.isInserting)
    let allnews1 = useStoreState(state => state.NewsMod.news);
    let allnews= allnews1.reverse()

    let isusersfetching = useStoreState((state) => state.NewsMod.isFetching)
    let getBlockedusers = useStoreActions((action) => action.NewsMod.FETCH_NEWS_START)
    let clearunBlockedUsers = useStoreActions((action) => action.NewsMod.CLEAR_NEWS)

    useEffect(() => {
        if (isusersfetching) getBlockedusers();
        return () => clearunBlockedUsers();
    }, [getBlockedusers, clearunBlockedUsers]);

    let unblocked = useStoreState(state => state.NewsMod.news);

    const deleteNews = useStoreActions(
        action => action.NewsMod.DELETE_NEWS_START
    );
    console.log(unblocked)
    console.log(allnews)
    console.log(postfail)


    const DeleteHandler = (index) => {
        // console.log(index)
        console.log(index + 1)
        console.log(allnews[index]._id)
        let id = allnews[index]._id
        deleteNews({
            id
        })
        //   window.location.reload();

    }

    const EditHandler = (index) => {
        console.log(index + 1)
        const titl = allnews[index].title
        desc = allnews[index].description
        console.log(allnews[index].description)
        let id = index;
        setOpenEdit(true)
        setkey(index)


    }


    useEffect(() => {
        if (isusersfetching) getBlockedusers();
        return () => clearunBlockedUsers();
    }, [getBlockedusers, clearunBlockedUsers]);



    console.log(unblocked)
    console.log(allnews)


    const handleEditClose = () => {
        setOpenEdit(false)
    }

    function ImageAsUrl(e) {
        var file = e.target.files[0];
        if (typeof file !== 'undefined') {
            var reader = new FileReader();
            reader.onloadend = function () {
                setImage(reader.result);
            }
            reader.readAsDataURL(file)
        }


    }

    function dataURLtoFile(dataurl, filename) {
        console.log(dataurl)
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    async function submitData(e) {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("title", title)
        formdata.append("description", description)
        formdata.append("image", dataURLtoFile(image, 'image.jpg'))
        console.log(formdata)

        const request = {
            Credentials: 'include',
            method: 'POST',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            },
            body: formdata
        }

        const result = await fetch('/news', request)
        if (result) {
            // window.location.reload();

        }
        console.log(result)
    }


    return (


        // new part added
        <main className={classes.content}>
            <div className="bacs">
                <div className={classes.appBarSpacer} />

                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={classes.paperStyling}>
                        {/* <LoadingContainer isLoading={isusersfetching}> */}
                            <Carousel className='gallery' id='gallery'


                                stopOnHover={true}

                                infiniteLoop={true}
                                centerMode={true}

                                showThumbs={false}



                            >

                                {allnews.map((value, index) => (
                                    <div className="card-t" id="card-t">
                                        {/* <div className='image'> */}
                                        <img className='img-mm' src={value.image || 'http://athrved.com/img/Logo/athrvedlogo.png.png'}></img>
                                        <div className='des-dd'>
                                            <hr />
                                            <h1 className='title' id='title'>{value.title}</h1>
                                            <hr />
                                            <h3 className='description'>{value.description}</h3>

                                            <EditTwoToneIcon type="submit" className="btn-Edit" id="Edit"
                                                color="primary" key={index} data-key={index} onClick={() => EditHandler(index)} fontSize="large" />


                                            <DeleteForeverIcon type="submit" className="btn-Delete" id="Delete"
                                                onClick={() => DeleteHandler(index)} fontSize="large" style={{ color: 'red' }} />

                                            <EditNews open={openEdit} handleClose={handleEditClose} index={key} />


                                        </div>






                                    </div>
                                ))}


                            </Carousel>
                        {/* </LoadingContainer> */}
                    </Paper>

                    <Paper className={classes.paperStyling}>
                        <div className="main" id="main">
                            <h2 className='addNews' id="addNews">Add News</h2>

                            <ValidatorForm enctype="multipart/form-data"
                                onSubmit={submitData}
                            >

                                <TextValidator className="name"
                                    label="Title"
                                    validators={['required']}

                                    errorMessages={['this field is required']}

                                    name="Name"
                                    value={title}
                                    margin="dense"
                                    variant="standard"

                                    onChange={e => setTitle(e.target.value)

                                    }


                                />


                                <TextValidator className="name"
                                    label="Description"
                                    name="NewsDes"
                                    value={description}
                                    variant="standard"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={e =>
                                        setDes(e.target.value)


                                    }


                                />

                                <div className="FileUploadForm">
                                    <input type='file' id="upload-photo" name="Choose-File"

                                        onChange={ImageAsUrl}
                                    >

                                    </input>

                                </div>

                                <Button type="submit" className="btn"
                                    color="primary"
                                    variant="contained">Submit</Button>

                            </ValidatorForm>

                        </div>

                    </Paper>

                </Container>
            </div>


        </main >

    );
};

export default Add_News;