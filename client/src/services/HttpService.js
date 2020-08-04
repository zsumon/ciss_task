const axios = require('axios');
const BASE_URL = "http://localhost:8080"

async function getAllCars() {
  return await axios.get(BASE_URL + "/all-cars");
}

async function getCars(page, limit) {
  return await axios.get(BASE_URL + "/cars?page=" + page + "&limit=" + limit);
}

async function uploadCar(car) {
  try {
    return await axios.post(BASE_URL + "/add-car/", {car});
  } catch (e) {
    return e;
  }
}

module.exports = {getAllCars, getCars, uploadCar}