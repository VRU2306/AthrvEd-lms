import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./members.css"
const AntSwitch = withStyles((theme) => ({
    root: {
        width: 40,
        height: 16,
        padding: 0,
        display: "flex"
    },
    switchBase: {
        padding: 2,
        color: "#373B3D",
        "&$checked": {
            transform: "translateX(23px)",
            color: "#CB3244",
            "& + $track": {
                opacity: 1,
                backgroundColor: "#d4dce1",
                borderColor: "#F8FBFC"
            }
        }
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: "none"
    },
    track: {
        border: `#A3AAAE`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: "grey"
    },
    checked: {}
}))(Switch);

export default function CustomizedSwitches({ item }) {

    const [state, setState] = React.useState({

        checkedC: false
    });
    // console.log(state)

    const Blockuser = useStoreActions(
        action => action.authMod.BLOCK_USER_START
    );

    let users = useStoreState(state => state.authMod.users);
    // console.log(users)
    let isblockedusersfetching = useStoreState((state) => state.authMod.isblockedusersfetching)
    let getBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_BLOCKEDUSERS)
    let clearBlockedUsers = useStoreActions((action) => action.authMod.CLEAR_BLOCKEDUSERS)

    useEffect(() => {
        // eslint-disable-next-line
        if (isblockedusersfetching) getBlockedusers(users);
        return () => clearBlockedUsers();
        // eslint-disable-next-line
    }, [getBlockedusers, clearBlockedUsers, users]);


    let blockedusers = useStoreState(state => state.authMod.blockedusers);
    // console.log(blockedusers)
    // 
    let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
    let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)
    let clearunBlockedUsers = useStoreActions((action) => action.authMod.CLEAR_UNBLOCKED)

    useEffect(() => {
        // eslint-disable-next-line
        if (isunblockedusersfetching) getunBlockedusers(users);
        return () => clearunBlockedUsers();
        // eslint-disable-next-line
    }, [getunBlockedusers, clearunBlockedUsers, users]);

    // eslint-disable-next-line
    let unblocked = useStoreState(state => state.authMod.unblocked);
    // console.log(unblocked)
    // 
    const UnBlockuser = useStoreActions(
        action => action.authMod.UNBLOCK_USER_START
    );
    // console.log(Blockuser)

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });

    };

    if (state.checkedC === false) {
        // upon reloadin or switching page or loggin in aftert sometime and making changes before logout
        const checkedmap = blockedusers.map(item => item.user_id)
        const checked = checkedmap.includes(item.user_id);

        // console.log(checked, item.user_id)
        if (checked === true) {
            setState({ checkedC: true })
            // console.log(state)
        }

    }

    return (
        <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
                <div className={state.checkedC === false ? "blocks1" : "unblocks1"}>
                    {state.checkedC === false ? (<div 
                    className="blockusers1"
                    >Block</div>
                    ) : <div 
                    className="unblockedusers1"
                    >Unblock</div>}
                    <AntSwitch
                        className="ants"
                        checked={state.checkedC}
                        onChange={handleChange}
                        name="checkedC"
                        onClick={() => {
                            state.checkedC === false ?
                                Blockuser({
                                    user_id: item.user_id,

                                }) :
                                UnBlockuser({
                                    user_id: item.user_id,
                                });
                        }

                        }
                    />

                </div>
            </Grid>
        </Typography >
    );
}