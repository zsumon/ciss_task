import React, {useEffect} from 'react';
import './App.module.css';
import DataTable from "./table/DataTable";
import styles from './App.module.css';
import {getAllCars, getCars} from "../services/HttpService";
import Uploader from "./uploader/Uploader";
import PieChart from "./table/PieChart";

function App() {

  useEffect(() => {
    //getCars(1,10).then(cars => console.log(cars)).catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.container + " " + styles.mt2}>
      <DataTable/>
      <br/>
      <Uploader/>
      <br/>
    </div>
  );
}

export default App;
