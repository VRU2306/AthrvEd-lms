// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
//   root: {
//     //
//     display: "flex"
//   },
//   spaceDown1: {
//     marginBottom: 16
//   },
//   appBarSpacer: theme.mixins.toolbar, //
//   content: {
//     //
//     flexGrow: 1,
//     height: "100vh",
//     overflow: "auto"
//   },
//   container: {
//     //
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4)
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: "flex",
//     overflow: "auto",
//     flexDirection: "column"
//   },
//   fixedHeight: {
//     height: 240
//   },
//   fixedWidth: {
//     maxWidth: "70vw",
//     overflow: "auto"
//   }
// }));

// export default useStyles;
import { LeftCircleFilled } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    //
    display: "flex"
  },

  spaceDown1: {
    marginBottom: 16,
    backgroundColor: 'white'
  },
  appBarSpacer: theme.mixins.toolbar, //
  content: {
    //
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#0f1012",
  },
  // container: {
  //   //
  //   marginTop: "4%",
  //   marginLeft: "18%",
  //   marginRight: "4%",
  //   marginBottom: "8%",
  // },
  gridcoloring: {
    backgroundColor: "#202328",
    color: "white",
    borderRadius: "8px",
    padding: "2.6%"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  fixedWidth: {
    maxWidth: "70vw",
    overflow: "auto"
  },
  // title: {
  //   color: "#D4DCE1",
  //   float: "left",
  //   fontWeight: "800",
  //   fontSize: "32px",
  //   marginBottom: "2%"
  // },
  // para: {
  //   color: "#A3AAAE",
  //   float: "left",
  //   fontSize: "20px",
  //   fontWeight: "600"
  // },
  // para1: {
  //   color: "#D4DCE1",
  //   float: "left",
  //   fontSize: "20px",
  //   fontWeight: "bold",
  //   marginBottom: "3.5%"
  // },
  // para2: {
  //   color: "#67737A",
  //   float: "left",
  //   fontSize: "18px",
  //   fontWeight: "600"
  // },
  // para3: {
  //   color: "#A3AAAE",
  //   float: "left",
  //   fontSize: "20px",
  //   fontWeight: "600",
  //   marginTop: "0.7%"
  // },
  // para4:{
  //   fontWeight:"600",
  //   fontSize:"16px",
  //   color:"#A3AAAE",
  //   float:"left"
  // },
  // para5:{
  //   fontWeight:"700",
  //   fontSize:"28px",
  //   color:"#D4DCE1",
  //   float:"left"
  // },
  // para6:{
  //   color: "#D4DCE1",
  //   float: "left",
  //   fontSize: "20px",
  //   fontWeight: "bold",
  // },
  button: {
    backgroundImage: "linear-gradient(to right, #259E3F,  #249566) ",
    color: "white",
    // textTransform: "none",
    // width: "60%",
    // height: "100%",
    // fontWeight: "bold",
    // fontSize: "90%",
    // textTransform: "none",
    // marginLeft: "32%",
    // marginBottom: "4%",
    // marginTop: "1%"
    // marginLeft:"70%",
    // marginTop:"-13%"
  },
  button2: {
    textTransform: "none",
    // color: 'white',
    // width: "60%",
    // height: "100%",
    // fontWeight: "bold",
    // fontSize: "90%",

    // marginLeft: "32%"
    // marginLeft:"80.5%",
    // marginTop:"-5%"
  },
  // activityStatus: {
  //   fontWeight: "bold",
  //   fontSize: "28px",
  //   color: "white",
  //   float: "left",
  //   marginTop: "6%",
  //   marginBottom:"2%"
  // }
  msx: {
    background: "#202328"
  }
}));

export default useStyles;
