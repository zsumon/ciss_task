import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import {getCars, getAllCars} from "../../services/HttpService";

import spinner from '../../assets/img/Spinner-1s-200px.gif';
import PieChart from "./PieChart";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(manufacturer, model, year, producingCountry) {
  return {manufacturer, model, year, producingCountry};
}

const DataTable = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataRows, setDataRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [backupRows, setBackupRows] = useState([]);

  /*const rows = [
    createData("BMW", "Isetta", 1955, "Germany"),
    createData("Kia", "Picanto", 2004, "South Korea"),
  ];*/

  useEffect(() => {
    setIsLoading(true);
    getCars(0, 5).then(res => {
      setDataRows(res.data);
      setBackupRows(res.data)

      console.log(res.data);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    });
    getAllCars().then(res => setTotalCount(res.data.length)).catch(err => console.log(err));
    //setTotalCount(10);
  }, []);

  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    //load new rows based on this.....
    setIsLoading(true);
    getCars(newPage, rowsPerPage).then(res => {
      setDataRows(res.data);
      setBackupRows(res.data)
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    });
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setIsLoading(true);
    setRowsPerPage(parseInt(event.target.value));
    getCars(0, parseInt(event.target.value)).then(res => {
      setDataRows(res.data);
      setBackupRows(res.data)
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    });

    setCurrentPage(0);
  };


  const labelsMap = countLabels(dataRows.map(it => it.manufacturer));

  return (
    <>
      <PieChart labels={labelsMap}/>
      <br/>
      <input
        type={"text"}
        placeholder={"Enter car manufacture to search"}
        style={{width: "14rem"}}
        onChange={(e) => {
          setDataRows(backupRows.filter(it => it.manufacturer.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1));
        }}/>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Manufacturer</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Producing Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && dataRows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.manufacturer}
                </TableCell>
                <TableCell align="right">{row.model}</TableCell>
                <TableCell align="right">{row.c_year}</TableCell>
                <TableCell align="right">{row.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!isLoading &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />}
        {isLoading &&
        <div style={{display: "flex", justifyContent: "center"}}>
          <img style={{maxWidth: "5rem"}} src={spinner} alt="Loading"/>
        </div>}
      </TableContainer>
    </>
  );

  function countLabels(labels) {
    let ret = {};
    for (const i of labels) {
      if (ret[i]) ret[i]++;
      else ret[i] = 1;
    }
    return ret;
  }
}

export default DataTable;