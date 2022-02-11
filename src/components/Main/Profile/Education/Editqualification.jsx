
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Edit dialog box has been given in the profile.jsx itself, this file has been kept if there is any error in the future
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import Button from "@material-ui/core/Button";
import {
    Dialog,

    DialogContent,
    DialogActions,

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useStoreActions } from "easy-peasy";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./Addqualification.css"
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
        width: 550,
        height: 400,
        overflow: "auto"
    },
    appBarSpacer: theme.mixins.toolbar

}));

const Editqualification = ({ open, handleClose, editqualifications,
    collegee,
    boardd,
    gradee, }) => {

    const [qualification, setQualification] = React.useState(editqualifications);
    const [college, setCollege] = React.useState(collegee);
    const [grade, setGrade] = React.useState(gradee);
    const [board, setBoard] = React.useState(boardd);
    const postQualification = useStoreActions(
        action => action.profileMod.POST_QUALIFICATION_START
    );
    const classes = useStyles();
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            style={{
                backdropFilter: "blur(8px)"
            }}
        >
            <div className={classes.msx}>
                <ValidatorForm
                    id="this-form"
                    onSubmit={event => {
                        // console.log("Hello");
                        postQualification({
                            board,
                            college,
                            qualification,
                            grade
                        });
                        handleClose();
                    }}
                >
                    <p className="qulaiheading"> Edit qualification</p>


                    <DialogContent>

                        <ThemeProvider theme={defaultMaterialTheme}>
                            <TextValidator
                                disabled
                                autoFocus
                                margin="dense"
                                validators={["required"]}
                                variant="outlined"
                                errorMessages={["Please enter this field"]}
                                value={qualification}
                                onChange={e => setQualification(e.target.value)}
                                id="qualification"
                                placeholder="Qualification"
                                type=""
                                fullWidth
                            />
                            <TextValidator
                                autoFocus
                                margin="dense"
                                type="number"
                                variant="outlined"
                                value={grade}
                                validators={["required", "isNumber", "matchRegexp:^[1-9]$|^10$"]}
                                errorMessages={[
                                    "Please enter this field",
                                    "This field shuld be a number",
                                    "Invalid value"
                                ]}
                                onChange={e => {
                                    setGrade(e.target.value);
                                }}
                                id="qualification_grade"
                                placeholder="Grade"

                                fullWidth
                            />
                            <TextValidator
                                autoFocus
                                margin="dense"
                                variant="outlined"
                                validators={["required"]}
                                errorMessages={["Please enter this field"]}
                                value={college}
                                onChange={e => setCollege(e.target.value)}
                                id="qualification_college"
                                placeholder="College"
                                type=""
                                fullWidth
                            />
                            <TextValidator
                                autoFocus
                                margin="dense"
                                variant="outlined"
                                validators={["required"]}
                                errorMessages={["Please enter this field"]}
                                value={board}
                                onChange={e => setBoard(e.target.value)}
                                id="qualification_board"
                                placeholder="Board"
                                type=""
                                fullWidth
                            />
                        </ThemeProvider>

                    </DialogContent>

                    <DialogActions>
                        <div className="submitqualino">
                            <Button onClick={handleClose} className="addusercancels" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #67737A" }}>
                                Cancel
                            </Button>
                        </div>
                        <div className="submitqualiyes">
                            <Button type="submit" className="adduseryes" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}>
                                Submit
                            </Button>
                        </div>
                    </DialogActions>
                </ValidatorForm>
            </div>
        </Dialog>
    );
};

export default Editqualification;
