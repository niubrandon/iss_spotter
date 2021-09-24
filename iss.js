/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API

  request('https://api.ipify.org?format=json', (error, response, body) => {
    //console.error('error:', error); // Print the error if one occurred
    //check response.statusCode be 200
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //no error and issue with statusCode then pass data
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  });



};

const fetchCoordsByIP = (ip, callback) => {
  const url = `https://freegeoip.app/json/${ip}`;
  
  request(url, (error, response, body) => {
  // console.error('error:', error); // Print the error if one occurred
    //check response.statusCode be 200
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    //no error and issue with statusCode then pass data
    const { latitude, longitude} = JSON.parse(body);
    callback(null, {latitude, longitude});
  
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  });


};



const fetchISSFlyOverTimes = (coordinate, callback) => {
  //console.log('coordinate', coordinate);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coordinate.latitude}&lon=${coordinate.longitude}`;
  request(url, (error, response, body) => {
    //console.error('error:', error); // Print the error if one occurred
    //check response.statusCode be 200
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    //no error and issue with statusCode then pass data
    const res = JSON.parse(body).response;
    callback(null, res);
  
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  });
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });


  
  
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

