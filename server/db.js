const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "pass",
  host: "localhost",
  port: 5432,
  database: "cars_db"
});


const cars = [
  {manufacturer: "BMW", model: "12385", c_year: "2020", country: "BD"},
  {manufacturer: "TOYOTA", model: "101073", year: "2020", producingCountry: "US"},
  {manufacturer: "HUNDAI", model: "443", year: "2020", producingCountry: "DE"},
  {manufacturer: "HONDA", model: "12396", year: "2020", producingCountry: "GE"},
  {manufacturer: "BMW", model: "75123", year: "2020", producingCountry: "UK"},
  {manufacturer: "HUNDAI", model: "721", year: "2020", producingCountry: "CA"},
  {manufacturer: "HONDA", model: "123", year: "2020", producingCountry: "NZ"},
  {manufacturer: "BMW", model: "123", year: "2020", producingCountry: "AU"},
  {manufacturer: "BMW", model: "123", year: "2020", producingCountry: "BD"},
  {manufacturer: "TOYOTA", model: "123", year: "2020", producingCountry: "CN"},
  {manufacturer: "BMW", model: "123", year: "2020", producingCountry: "BD"},
  {manufacturer: "HUNDAI", model: "123", year: "2020", producingCountry: "CN"},
  {manufacturer: "HONDA", model: "189823", year: "2020", producingCountry: "BD"},
  {manufacturer: "BMW", model: "127893", year: "2020", producingCountry: "CN"},
  {manufacturer: "TOYOTA", model: "105623", year: "2020", producingCountry: "BD"},
  {manufacturer: "TOYOTA", model: "114423", year: "2020", producingCountry: "BD"},
  {manufacturer: "BMW", model: "98123", year: "2020", producingCountry: "BD"},
  {manufacturer: "HUNDAI", model: "123", year: "2020", producingCountry: "US"},
  {manufacturer: "BMW", model: "17723", year: "2020", producingCountry: "BD"},
];

function initDatabase() {
  let id;
  cars.map(car => {
    id = parseInt(Math.random() * 1000000 + "");
    pool.query("insert into cars values($1, $2, $3, $4, $5)", [id, car.manufacturer, car.model, cars.c_year, cars.country]).then(res => {
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  })
}

async function addCarToDb(manufacturer, model, year, country) {
  try {
    const id = Math.random() * 100000 + "";
    return await pool.query("insert into cars values($1, $2, $3, $4, $5)", [parseInt(id), manufacturer, model, year, country]);
  } catch (err) {
    return err;
  }
}

async function removeCar(id) {
  const validId = parseInt(id);
  try {
    const res = await pool.query("delete from cars where id = $1", [validId]);
  } catch (err) {
    console.log(err);
  }
}


async function updateCar(id, manufacturer, model, year, country) {
  const validId = parseInt(id);
  try {
    const res = await pool.query("update cars set manufacturer = $1, model = $2, c_year = $3 country = $4 where id = $5", [manufacturer, model, country, year, validId]);
  } catch (err) {
    console.log(err);
  }
}

async function getAllCars() {
  try {
    return (await pool.query("select * from cars")).rows;
  } catch (err) {
    console.log(err);
  }
}

async function getCars(offset, limit) {
  try {
    const res = await pool.query("select * from cars offset $1 limit $2", [offset, limit]);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {getAllCars, getCars, updateCar, addCarToDb, removeCar};