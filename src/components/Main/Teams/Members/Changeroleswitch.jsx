import React from "react";
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
            color: "#2D66BD",
            "& + $track": {
                opacity: 1,
                backgroundColor: "#d4dce1",
                borderColor: "#2D66BD"
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
    const [state, setState] = React.useState({ checkedC: false });
    // console.log(state)

    const postroleuser = useStoreActions(
        action => action.authMod.CHANGE_ROLE_START
    );
    const postroleSuperuser = useStoreActions(
        action => action.authMod.CHANGE_ROLE_START
    );
    ;


    let unblocked = useStoreState(state => state.authMod.unblocked);


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    if (state.checkedC === false) {
        // upon reloadin or switching page or loggin in aftert sometime and making changes before logout
        const checkedmap = unblocked?.map(item => item.category)
        if (checkedmap === 'S') {
            setState({ checkedC: true })

        }

        if (item.category === "S") {
            setState({ checkedC: true })
        }

    }

    return (
        <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
                <div className={state.checkedC === false ? "users" : "superusers"}>
                    {state.checkedC === false ? (<div className="userss">User</div>
                    ) : <div className="superuserss">Supervisior</div>}
                    <AntSwitch
                        className="antss"
                        checked={state.checkedC}
                        onChange={handleChange}
                        name="checkedC"
                        onClick={() =>
                        // eslint-disable-next-line
                        {

                            state.checkedC === false ?
                                postroleuser({
                                    user_id: item.user_id,
                                    role: 'S',
                                }) :
                                postroleSuperuser({
                                    user_id: item.user_id,
                                    role: 'U'
                                });
                        }
                        }
                    />

                </div>
            </Grid>
        </Typography>
    );
}