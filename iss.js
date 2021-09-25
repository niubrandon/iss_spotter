const request = require('request');

const fetchMyIP = (callback) => {

  request('https://api.ipify.org?format=json', function(error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    if (error) {
      callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    callback(null, JSON.parse(body));
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, function(error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    if (error) {
      callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let {latitude, longitude} = JSON.parse(body);
    callback(null, {latitude, longitude});
  });

};

const fetchISSFlyOverTimes = (coords, callback) => {

  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, function(error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    if (error) {
      callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let responses = JSON.parse(body);

    callback(null, responses);

  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {

    if (error) {
     
      return callback(error, null);
    }
  
    fetchCoordsByIP(ip.ip, (error, coordinate) => {
      if (error) {
       
        return callback(error, null);
      }
    
      fetchISSFlyOverTimes(coordinate,(error, data) => {
        if (error) {
         
          return callback(error, null);
        }
      
        callback(null, data);
      
      
      });
    
    
    });
  });

};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };