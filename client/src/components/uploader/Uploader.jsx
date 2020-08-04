import React, {useState} from "react";
import {__parse} from "./CsvHelper";
import {uploadCar} from "../../services/HttpService";

const Uploader = () => {

  const [data, setData] = useState();

  return <div>
    <p>Upload csv file to add car data</p>
    <input type="file" onChange={e => {
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.onload = (e) => {
        const dat = __parse(e.target.result);
        setData(dat);
      }
    }}/>

    {data && <>
      <br/>
      <br/>
      <table>
        <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Year</th>
          <th>Producing Country</th>
        </tr>
        </thead>
        <tbody>
        {data.map((it, i) => <tr key={i}>
          <td>{it.manufacturer}</td>
          <td>{it.model}</td>
          <td>{it.year}</td>
          <td>{it.producing_country}</td>
        </tr>)}
        </tbody>
      </table>
      <br/>
      <br/>

    </>}

    <button onClick={async () => {
      if (data) {
        data.map(async it => {
          try {
            const res = await uploadCar(it);
          } catch (e) {
            console.log(e);
          }
        });
      }
    }}>Upload
    </button>
  </div>
};

export default Uploader;