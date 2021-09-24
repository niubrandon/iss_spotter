// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  // console.log("ip data type", typeof ip);
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP("142.114.141.28", (error, coordinate) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinate:' , coordinate);

});

fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned observation time:' , data);

});

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  let month = ["Jan", "Feb", "Mar", "Apr", 'May', 'Jun', 'Jul', "Aug", "Sept", "Oct", "Nov", "Dec"];
  for (let item of passTimes) {
    let dateString = new Date(item.risetime).toLocaleDateString("en-US");
    let dateDayMonthYear = dateString.split("/");
    let isoDate = dateDayMonthYear[2] + "-" + dateDayMonthYear[0] + "-" + dateDayMonthYear[1];
    console.log(isoDate);
   // let week = isoDate.getDay();
    let timeStamp = new Date(item.risetime).toLocaleTimeString("en-US");

    console.log(`Next pass at ${month[Number(dateDayMonthYear[0]) - 1]} ${dateDayMonthYear[1]} ${dateDayMonthYear[2]} ${timeStamp} GMT-0700 (Pacific Daylight Time) for ${passTimes.duration} seconds`);
  }
  console.log(passTimes.risetime, passTimes.duration);
});

 

