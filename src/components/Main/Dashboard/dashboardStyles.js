import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  // root: {
  //   //
  //   display: "flex"
  // },
  appBarSpacer: theme.mixins.toolbar, //
  imgaess: {
    marginTop: 25,
    marginLeft: 10
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#0f1012",
    height: "100vh",
    overflow: "auto",
    paddingRight: "2%",
  }
}));

export default useStyles;
