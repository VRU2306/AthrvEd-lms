import React from "react";
import {
    Button,
    Grid,

} from "@material-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";
import Approved from "../../../../Icons/Approved Leave.svg"

// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { makeStyles, Avatar } from "@material-ui/core";
import moment from "moment";
const useStyles = makeStyles(theme => ({

    dsx: {
        width: "500px",

        backgroundColor: "#202328 !important"
    },
    purpledark: {
        background: "#0f1012",
        color: "#67737A",
        marginTop: "10",
    }

}));
function RevokeItem({ item }) {

    let { type } = useStoreState(state => state.profileMod.profile);
    let updateLeaveNotess = useStoreActions(
        action => action.attendence.UPDATE_REVOKE_NOTES_START
    );

    const classes = useStyles();

    return (
        <div>
            <Grid container xs={12} md={9} className="RLeavelist" >

                {/* {item.status === "accepted" ? (<Grid item md={"1.5"}><img src={Approved} className="leaveicon" /></Grid>) : null} */}
                <Grid item xs={12} md={1}><img src={Approved} className="leaveicon" /></Grid>

                <Grid item md={8}><h1 className="RevokeLeaveheadinglist">{

                    moment(item.StartDate).format("MMM Do YY") +
                    " to " +
                    moment(item.EndDate).format("MMM Do YY")
                }<br></br><br /><p className="revokeleavereason"> {item.revokedreason} </p></h1>
                    <br />

                    {type !== "A" ? (
                        <span className="requestbystatus">Status:
                            {/* {item.status === "accepted" ? (<p className="requestbystatusaccepted">Approved</p>) : null}

                    {item.status === "Pending" ? (<p className="requestbystatuspending">Pending</p>) : null} */}
                            <p className="requestbystatusaccepted">Approved</p>
                        </span>) : null}

                    {type === "A" ? (
                        <p className="revokerequestby"> {item.image ? (
                            <img height="32" width="32" style={{ borderRadius: 50, marginBottom: -5 }} src={item.image} alt="aa" />) :
                            <Avatar style={{ width: 32, height: 32, marginBottom: -25, marginLeft: -40, borderRadius: 50 }} className={classes.purpledark} />} Revoke Request by {item.name}</p>) : null}
                    {/* accept leave */}
                </Grid>
                <Grid item md={3}>
                    {type === "A" ?
                        (<div className="revokeaccepted"><Button style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }} className="leaveaccept"
                            onClick={event => {
                                let {
                                    uuid,
                                    StartDate,
                                    EndDate,
                                    revoke,
                                    revokedreason,
                                    status,
                                    admindescription,
                                } = item;
                                updateLeaveNotess({
                                    uuid,
                                    StartDate,
                                    EndDate,
                                    revoke,
                                    revokedreason,
                                    admindescription,
                                    status: "Accepted"
                                });

                            }}>Accept</Button></div>



                        ) : null}
                </Grid>
            </Grid>
        </div>
    );
}

export default RevokeItem;