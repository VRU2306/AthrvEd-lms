import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from "@material-ui/icons/Close";
import './terms.css'

export default function ScrollDialog() {

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  return (
    <div className="terms">
      <Button className="btnterms" onClick={handleClickOpen('body')}>Terms And Conditions</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        style={{ backdropFilter: "blur(10px)", overflow: "auto" }}
        aria-describedby="scroll-dialog-description"
      >
        <div className="termsback" style={{ overflow: "auto" }}>
          <div id="termsadcn"><DialogTitle id="scroll-dialog-title">TERMS AND CONDITIONS</DialogTitle>
          </div>
          <div id="closetc"><a onClick={handleClose} style={{ color: " #D4DCE1" }} >
            <Close />
          </a></div><br></br><br></br>

          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              style={{ overflow: "auto" }}
            >
              <h3 style={{ color: " #D4DCE1" }}>1.	GENERAL</h3>
              <p style={{ color: " #D4DCE1" }}> This portal is created and designed by members of Athrv-Ed, and is a property of Athrv-Ed, Learning and Innovation Hub, NMAMIT, Nitte, Karnataka. <br></br>
i.	This portal works as a learning management system for Athrv-Ed, hence it is accessible to only the core members of Athrv-Ed. <br></br>
ii.	Your login is authorised by the company, and you understand and accept that as an operational/administrative measure the company might revoke your access to the portal without any prior notice.<br></br></p>
              <h3 style={{ color: " #D4DCE1" }}>2.	PRIVACY</h3>
              <p style={{ color: " #D4DCE1" }}>i.	The data entered in the portal is visible only to the members of the company. In no way does the company support or encourage the breach of your privacy. Any private information entered will be processed only with the user's acknowledgement.<br></br>
ii.	By agreeing to the terms and conditions you assure that any information entered by you is true and is to the best of your knowledge. (You may be asked to provide documentation proof for the qualifications you enter on the portal)<br></br>
iii.	By agreeing to the terms and conditions, you understand and ensure that you will not misuse the portal in any means possible and that you will use it only for the tasks and work related to the company. <br></br></p>
              <p style={{ color: " #D4DCE1" }}>iv.	Any technical flaws or enquiries may be addressed to <a href="mailto: ops@athrved.com" style={{ color: " #D4DCE1" }}>ops@athrved.com</a> </p><br></br><h1></h1>
              <h5 style={{ color: " #D4DCE1" }}>By Agreeing to the terms and conditions you agree that you are a registered member of Athrv-Ed.</h5> <br></br>
              <p style={{ color: " #D4DCE1" }}>
                P.S – Please note without accepting the terms and conditions you will not be able to register as a user to the portal. </p>

            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
