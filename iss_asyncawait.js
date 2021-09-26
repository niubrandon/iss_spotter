const request = require('request-promise-native');
//const request = require('request');

const nextISSTimesForMyLocation = async () => {
  const findIP = await request('https://api.ipify.org?format=json');
  const ip = JSON.parse(findIP).ip;
  //console.log(JSON.parse(findIP).ip);

  const findCoords = await request(`https://freegeoip.app/json/${ip}`);
  const coordinates = JSON.parse(findCoords);
  //console.log(coordinates);

  const findFlyTimes = await request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);

  const passTimes = JSON.parse(findFlyTimes);
  //console.log(passTimes);


  for (const ele of passTimes.response) {
    const timeStamp = ele.risetime;
    const currTime = new Date(Number(timeStamp) * 1000);
    
    console.log(`Next pass at ${currTime.toUTCString()}-0700 (Estern Daylight Time) for ${ele.duration} seconds!`);
  }



};
nextISSTimesForMyLocation();