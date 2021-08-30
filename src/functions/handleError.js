const handleError = async (error) => {

    const resp = await fetch('https://ipv4.jsonip.com', {mode: 'cors'});
    const ipJSON = await resp.json();

    const data = {
      message : error,
      host: window.location.host,
      ip: ipJSON.ip,
      url: window.location.href
    }
    
    const dataString = JSON.stringify(data);

    // console.info("data", dataString);

    fetch("https://script.google.com/macros/s/AKfycbx6SVxrXe9dh8WlrzqZH5wHFmsH5WRq2qe9NUXzD0QNg48RSf8/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {"Content-Type": "application/json" },
      body: dataString
    }).then(response => {
      console.info("response", response);
    }).catch(err => {
      console.info("error", err);
    });

  }
  
  export default handleError