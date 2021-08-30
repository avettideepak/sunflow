function handlePermission(callback) {
  navigator.permissions
    ? navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          report(callback, result.state);

          if (result.state == "granted") {
          } else if (result.state == "prompt") {
          } else if (result.state == "denied") {
          }
          result.onchange = function () {
            report(callback, result.state);
          };
        })
    : navigator.geolocation.getCurrentPosition(
        function (position) {
          console.info("permission", position);
          /** won't be executed for such short timeout */
        },
        function (positionError) {
          switch (positionError.code) {
            // PERMISSION_DENIED
            case 1:
              console.log("Permission denied");
              callback("denied");
              break;
            // POSITION_UNAVAILABLE
            case 2:
              console.log("Permission allowed, location disabled");
              break;
            // TIMEOUT
            case 3:
              console.log("Permission allowed, timeout reached");
              break;
          }
        },
        { timeout: 0 }
      );
}

function report(callback, state) {
  callback(state);
  console.log("Permission " + state);
}

export default handlePermission;
