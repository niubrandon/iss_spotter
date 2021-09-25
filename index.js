const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

/* fetchMyIP((error, ip) => {

  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP: ', ip);
});

fetchCoordsByIP('142.114.141.28', (error, coordinate) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned coordinate: ', coordinate);


});

fetchISSFlyOverTimes({ latitude: 45.2496, longitude: -75.9181 },(error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! flyover times: ', data.response);


});
 */
nextISSTimesForMyLocation((error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  
  for (const ele of data.response) {
    const timeStamp = ele.risetime;
    const currTime = new Date(Number(timeStamp) * 1000);
    
    console.log(`Next pass at ${currTime.toUTCString()}-0700 (Estern Daylight Time) for ${ele.duration} seconds!`);
  }

  //console.log('nextISSTimesForMyLocation: ', data.response);
});