import React, { useState, useEffect } from 'react';
import './DashBoardNews.css'
import ItemsCarousel from 'react-items-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useStoreState, useStoreActions } from "easy-peasy";
// import { index } from 'd3-array';
import EditNews from '../AddNews/EditNews/EditNews'
import LoadingContainer from "../../../UI/LoadingContainer";
import Ticker from 'react-ticker'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    MenuItem,
    Button
} from "@material-ui/core";
// import EditNews from "../AddNews/EditNews/EditNews"

export default () => {

    let allnews = useStoreState((state) => state.NewsMod.news);
    let isusersfetching = useStoreState((state) => state.NewsMod.isFetching);
    let getBlockedusers = useStoreActions((action) => action.NewsMod.FETCH_NEWS_START);
    let clearunBlockedUsers = useStoreActions((action) => action.NewsMod.CLEAR_NEWS);
    let { type } = useStoreState(state => state.profileMod.profile);
    const [openEdit, setOpenEdit] = useState(false)
    const [CloseEdit, setCloseEdit] = useState(false)
    const [HandelClose, sethandelClose] = useState(false)
    const [key, setkey] = useState(0)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [index1, setIndex1] = useState("")
    let imageUrl
    let desc
    const deleteNews = useStoreActions(
        action => action.NewsMod.DELETE_NEWS_START
    );

    useEffect(() => {
        if (isusersfetching) getBlockedusers();
        return () => clearunBlockedUsers();
    }, [getBlockedusers, clearunBlockedUsers]);

    const handleEditClose = () => {
        setOpenEdit(false)
    }

    const handleConfirmOpen = () => {
        setOpenConfirm(true)
    }

    const handleConfirmClose = () => {
        setOpenConfirm(false)
    }

    // console.log(isusersfetching)
    const EditHandler = (index) => {
        // console.log(index + 1)
        const titl = allnews[index].title
        desc = allnews[index].description
        console.log(allnews[index].description)
        let id = index;
        setOpenEdit(true)
        setkey(index)
    }

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

    // console.log(type, "shshshhs");

    return (
        <div className="news">
            <h1>News</h1>
            <LoadingContainer isLoading={isusersfetching}>
                {/* <img src="https://news-app-upload3.s3.amazonaws.com/1617621775270Ankith.jpeg" className="news-gif"></img> */}
                <Carousel className='gallery-d' id="gallery-d"
                    autoPlay={true}
                    interval={2000}
                    showArrows={true}
                    swipeable={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showIndicators={false}
                >
                    {allnews.map((value, index) => (
                        <div className="card-td" id="card-td">
                            {type === 'A' ? (
                                <div className="editIcons">
                                    <EditTwoToneIcon type="submit" className="btn-Edit" id="Edit"
                                        color="primary" key={index} data-key={index} onClick={() => EditHandler(index)} fontSize="large" />
                                    {/* <DeleteForeverIcon type="submit" className="btn-Delete" id="Delete"
                                            onClick={() => DeleteHandler(index)} fontSize="large" style={{ color: 'red' }} /> */}
                                    <DeleteForeverIcon type="submit" className="btn-Delete" id="Delete"
                                        onClick={() => {
                                            setIndex1(index)
                                            handleConfirmOpen()

                                        }} fontSize="large" style={{ color: 'red' }} />
                                    <EditNews open={openEdit} handleClose={handleEditClose} index={key} />
                                </div>
                            ) : null}

                            <img src={value.image || 'http://athrved.com/img/Logo/athrvedlogo.png.png'} className="img-mm"></img>
                            <div className='des-d' id="des-d">
                                <hr />
                                <h1 className='title' id='title'>{value.title}</h1>
                                <hr />
                                <h3>{value.description}</h3>
                            </div>
                        </div>
                    ))}

                </Carousel>
            </LoadingContainer>

            <Dialog
                open={openConfirm}
                onClose={handleConfirmClose}
                aria-labelledby="form-dialog-title"
                style={{ backgroundColor: 'transparent' }}

            >
                <div style={{ backgroundColor: "#202328" }}>
                    <DialogTitle style={{ color: "white" }}>
                        Confirm Delete
                    </DialogTitle>

                    <DialogContent style={{ color: "white" }}>
                        Do you want to delete the selected news?
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => {
                            handleConfirmClose();
                            DeleteHandler(index1);
                        }} color="primary">
                            Delete
                        </Button>
                        <Button onClick={handleConfirmClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

