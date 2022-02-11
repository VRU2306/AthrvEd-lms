import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AddNewUser from "./AddnewUser/Addnewuser";
import useStyles from "./teamsstyle";
import Copyright from "../../UI/Copyrights";
import "./teams.css"
import Add from "@material-ui/icons/AddSharp";
import Members from "./Members/Members"
// 
// imrovement needed
const Teams = () => {
    const [openAdduser, setOpenAddUser] = useState(false);
    const handleAddModalOpen = () => {
        setOpenAddUser(true)
    };
    const handleAddModalClose = () => {
        setOpenAddUser(false)
    };
    const classes = useStyles();
    // const [openActivityModal, setActivityModalOpen] = useState(false);
    return (
        <main className={classes.content}>
            <div >
                <div className={classes.appBarSpacer} />
                <p className="adduser">Add User</p>
                <Grid container xs={8} md={2} className="addactivity">
                    <Add style={{ fontSize: "100px" }} onClick={event => {
                        handleAddModalOpen();
                    }} className="addusericon" />
                </Grid>
                <AddNewUser
                    open={openAdduser}
                    handleClose={handleAddModalClose}
                />
                <br></br>
                <p className="adduser">Members</p>
                <Members />
                <Grid item xs={7} md={10} lg={12} style={{ marginLeft: "10%" }}>
                    <Box pt={4}>
                        <br></br>
                        <br></br>
                        <Copyright />
                        <br />
                    </Box>
                </Grid>
            </div>
        </main >
    );
};

export default Teams;
