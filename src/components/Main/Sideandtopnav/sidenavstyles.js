import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    // main component dont chamge it anyway
    root: {
        backgroundColor: "#0F1012",
        width: 'calc(100%-240px)',
        minHeight: "100vh",


    },
    // appbar side nav component
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#202328",

    },
    // sidenav paper width
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#0F1012 !important"
    },
    drawerContainer: {
        overflow: "auto"
    },
    // topnav image 
    top: {
        marginLeft: 54,
        marginTop: 7,
        marginBottom: 10,
        background: "#202328",

    },
    // sidebar toolbar important
    toolbar: {
        color: "#67737A",
        backgroundColor: "#232527",
        ...theme.mixins.toolbar
    },
    // sidebar contents
    sidebar: {
        color: "#67737A",
        backgroundColor: "#0F1012",

    },
    // mobile view toggle
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },

    // image for drawer sidebar
    topnav: {
        marginLeft: "34px",
        marginTop: "10px"
    },
    // release notes divider
    divider: {
        backgroundColor: "#67737A",
        marginLeft: 34,
        marginRight: 40,
    },
    // profile popup divider
    dividerprofile: {
        backgroundColor: "#67737A",
        marginLeft: 21,
        marginRight: 21,
    },
    // topnav button placement important
    title: {
        flexGrow: 0.92,

    },
    // popup button contents
    imgs: {
        marginLeft: "25%",
        marginTop: "0%",
        color: "#A3AAAE"
    },
    logoutbutton: {
        marginLeft: "25%",
        marginTop: 10,


    },
    logout: {
        size: "small",
        marginTop: 0,
        marginLeft: 15
        // important dont change this 
    },
    texting: {
        marginLeft: "25%",
        marginTop: 2,
        color: "#D4DCE1",
        fontFamily: "Mulish",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "24px",
        lineHeight: "30px"
    },
    // popup button changes
    // figma logo colors
    purple: {
        background: "#0F1012",
        color: "#67737A"
    },

}));

export default useStyles;