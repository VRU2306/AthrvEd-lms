import React, { useState, useEffect } from 'react';
import './EditNews.css'
import ItemsCarousel from 'react-items-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useStoreState, useStoreActions } from "easy-peasy";
import Button from '@material-ui/core/Button';
import DashboardNews from '../../DashBoardNews/DashboardNews';
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import Add_News from '../Add_News';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  MenuItem
} from "@material-ui/core";

import {
  TextValidator,
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";
import { color } from 'd3';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      // Purple and green play nicely together.

      backgroundColor: "#202328",
      light: "#ffffff",
      main: "#67737A"
    }
  }
});


const EditNews = ({ open, handleClose, index }) => {

  let allnews = useStoreState(state => state.NewsMod.news);

  console.log(allnews)
  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");
  const [image, setImage] = useState({})
  const [handelClose, setHandelClose] = useState(false)
  const [EditTitle, setEditTitle] = useState("")
  console.log(index)

  function ImageAsUrl(e) {
    var file = e.target.files[0];
    if (typeof file !== 'undefined') {
      var reader2 = new FileReader();
      reader2.onloadend = function () {
        setImage(reader2.result);
      }
      reader2.readAsDataURL(file)

    }


  }

  function dataURLtoFile(dataurl, filename) {
    if (dataurl.length) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
    }
    return new File([u8arr], filename, { type: mime });
  }

  async function submitData(e) {
    e.preventDefault();
    let id = allnews[index]._id
    console.log(id)
    let formdata = new FormData();
    formdata.append("title", title)
    formdata.append("description", description)
    console.log(image)
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

    const result = await fetch(`/news/update/${id}`, request)
    if (result) {
      window.location.reload();

    }
    console.log(result)
  }



  return (
    <Dialog
      open={open}
      onClose={handelClose}
      aria-labelledby="form-dialog-title"

    >
    <div className='editdialgognews'>
      <DialogTitle id="form-dialog-title" id="ida">

          <h2 className='editnewstitle'> Edit News </h2></DialogTitle>
      <DialogContent>
        <ValidatorForm encType="multipart/form-data"

          onSubmit={submitData}
        >

          <DialogContentText><p style={{color:'grey'}}>Please enter the details of {allnews[index].title} </p></DialogContentText>

           <ThemeProvider theme={defaultMaterialTheme}>
          <TextValidator 
            label="Title"
            validators={['required']}

            errorMessages={['this field is required']}

            name="Name"
            value={title}
            margin="dense"
              variant="standard"
              style={{color:'grey'}}

            onChange={e => setTitle(e.target.value)}
             fullWidth


          />


          <TextValidator 
            label="Description"
            //onChange={handleChange}
            name="NewsDes"
            // type=""
            value={description}
            variant="standard"
            //margin="dense"
            validators={['required']}
            errorMessages={['this field is required']}
            onChange={e => setDes(e.target.value)}

             fullWidth

          />
          </ThemeProvider>
          <div className="FileUploadForm">
              <input style={{ display: "flex", color: "white", padding: "0px 5px 0px -5px", marginLeft: "-13px" }}
                type='file'
                id="upload-photo"
                name="Choose-File"
                 
                
              onChange={ImageAsUrl}
            >

            </input>

          </div>




          <Button type="submit" className="btn"
            color="primary"
            variant="contained">Submit</Button>

        </ValidatorForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>


    </div>
    </Dialog>
  )
}

export default EditNews