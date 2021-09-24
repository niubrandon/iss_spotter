const {nextISSTimesForMyLocation} = require('./iss_promised');



nextISSTimesForMyLocation()
  .then((passTimes) => {
  // console.log(passTimes);
    let month = ["Jan", "Feb", "Mar", "Apr", 'May', 'Jun', 'Jul', "Aug", "Sept", "Oct", "Nov", "Dec"];
    for (let element of passTimes) {
    // console.log(element);
    // let s = new Date(element.risetime);
      //console.log(s);
      let dateString = new Date(element.risetime).toLocaleDateString("en-US");
      let dateDayMonthYear = dateString.split("/");
      let timeStamp = new Date(element.risetime).toLocaleTimeString("en-US");
      console.log(`Next pass at ${month[Number(dateDayMonthYear[0]) - 1]} ${dateDayMonthYear[1]} ${dateDayMonthYear[2]} ${timeStamp} GMT-0700 (Pacific Daylight Time) for ${element.duration} seconds`);
    };
  // printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
