const {nextISSTimesForMyLocation} = require('./iss_promised');


nextISSTimesForMyLocation()
  .then((passTimes) => {
  // console.log(passTimes);
    for (const ele of passTimes) {
      const timeStamp = ele.risetime;
      const currTime = new Date(Number(timeStamp) * 1000);
    
      console.log(`Next pass at ${currTime.toUTCString()}-0700 (Estern Daylight Time) for ${ele.duration} seconds!`);
    }
    
  })
  // printPassTimes(passTimes);
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
