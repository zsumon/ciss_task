const express = require('express');
const app = express();
const cors = require('cors');
const {addCarToDb} = require("./db");
const {getAllCars} = require("./db");
const {getCars} = require("./db");

app.use(cors());
app.use(express.json());

app.get("/cars", async (req, res) => {
  /*
  * "/cars?page=1&limit=10"
  * */
  // console.log('here');

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const ret = await getCars(page * limit, limit);
  //console.log(ret);
  res.json(ret);
});


app.get("/all-cars", async (req, res) => {
  try {
    const cars = await getAllCars();
    res.json(cars);
  } catch (err) {
    res.json("error 500");
  }
});

app.post("/add-car", async (req, res) => {
  const car = req.body.car;
  const ret = await addCarToDb(car.manufacturer, car.model, car.year, car.producing_country);
  res.send(ret);
});

app.listen(8080, () => {
  console.log("listening at: 8080");
});
