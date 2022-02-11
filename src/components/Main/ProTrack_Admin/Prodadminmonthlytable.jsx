import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import "./Productivityadmin.css";
import { useStoreActions, useStoreState } from "easy-peasy";
//hello this 
const columns = [
  {
    id: 'userid',
    label: 'User ID',
    minWidth: 170,
    headerStyle: { backgroundColor: 'red' }
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 100
  },
  {
    id: 'whlms',
    label: 'Working hours in LMS Portal',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'whprotrack',
    label: 'Working hours in Productivity Tracker',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'diff',
    label: 'Difference in time',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];



const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: 'auto',
    maxHeight: "10%"
  },
  container: {
    maxHeight: 450,
  },
  caption: {
    color: "#ffffff",
    padding: 8,

    fontSize: "0.875rem"
  },
});

function Prodadminmonthlytable({ row }) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];



  const d = new Date();
  // 
  let users = useStoreState(state => state.authMod.users);
  let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
  let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)

  useEffect(() => {
    if (isunblockedusersfetching) getunBlockedusers(users);
  }, []);
  let unblocked = useStoreState(state => state.authMod.unblocked);
  function getname(name) {
    const userinfo = unblocked.filter(users => users.user_id == name)
    const fname = userinfo.map(x => x.fname)
    const lname = userinfo.map(x => x.lname)
    return fname + lname;
  }
  let isproadminfetching = useStoreState((state) => state.authMod.isproadminMonthfetching)
  let pordadmin = useStoreActions((action) => action.authMod.POSTS_PRODU_MONTH_START_YEAR)
  let cleartodayleave = useStoreActions((action) => action.authMod.CLEAR_ADMINMONTH)

  useEffect(() => {
    if (isproadminfetching) pordadmin();
    return () => cleartodayleave();
  }, [pordadmin, cleartodayleave]);
  let prodadminmonth = useStoreState(state => state.authMod.prodadminmonth);
  //console.log(prodadminmonth)
  function createData(userid, name, whlms, whprotrack, diff) {
    return { userid, name, whlms, whprotrack, diff };
  }

  const rows = prodadminmonth.map(row =>
    createData(row.user_id, getname(row.user_id), row.dailyreport_total.hours + ":" + row.dailyreport_total.minutes + ":" + row.dailyreport_total.seconds, row.productivity_total.hours + ":" + row.productivity_total.minutes + ":" + row.productivity_total.seconds, row.dif.hours + ":" + row.dif.minutes + ":" + row.dif.seconds),
  )
  // 
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    // <Paper className={classes.root} id='table' style={{ boxShadow: "none" }}>
    <div className="tablemonth">
      <TableContainer className={classes.container} >
        <Table stickyHeader aria-label="stickytable" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  id="colz"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rows) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={rows.code}>
                  {columns.map((column) => {
                    const value = rows[column.id];
                    return (
                      <TableCell id="coloz" key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}

                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        classes={{ caption: classes.caption }}
      />
    </div>
    // </Paper>
  );
}

export default Prodadminmonthlytable;

