import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import {
    Dialog,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import "./techskills.css"
import { useStoreActions } from "easy-peasy";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
const useStyles = makeStyles((theme) => ({

    msx: {
        backgroundColor: "#202328",
        width: 400,

        overflow: "auto"
    },
    appBarSpacer: theme.mixins.toolbar

}));
const Techskills = ({ open, handleClose }) => {
    const [skills, setSkills] = React.useState("");
    const classes = useStyles();
    const postTechSkills = useStoreActions(
        action => action.profileMod.POST_SKILLS_START
    );
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <div className={classes.msx}>
                <ValidatorForm
                    id="this-form"
                    onSubmit={() => {
                        postTechSkills({
                            skills,


                        });
                        // console.log(skills)
                        handleClose();

                    }}
                >
                    <p className="techskillhead">Add a new Technical Skill</p>
                    <DialogContent>

                        <br></br>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <TextValidator
                                validators={['required']}
                                value={skills}
                                onChange={e => setSkills(e.target.value)}
                                id="skills"
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="text"
                                placeholder="Technical Skills"
                                errorMessages={['This field is required']}
                            />

                        </ThemeProvider>
                        <br></br>
                        {/* <div className="high">Note:Letters in Bold is title</div> */}
                    </DialogContent>
                    <DialogActions>
                        <div className="submittechskillino">
                            <Button onClick={handleClose} className="addusercancels" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #67737A" }}>
                                Cancel
                         </Button>
                        </div>
                        <div className="submittechskillyes">
                            <Button type="submit" className="adduseryes" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}>
                                Submit
                            </Button>
                        </div>
                    </DialogActions>

                </ValidatorForm >
            </div>
        </Dialog >

    );
};

export default Techskills;
