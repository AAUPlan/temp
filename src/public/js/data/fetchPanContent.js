
  
  export async function fetchpanData(token) {
    const options= createOptions(token);
    const response = await fetch(
      "http://94.231.110.64:3000/api/pandata/pancontent",
      options
    );
      
      const data = await response.json();
      //console.log(data);
   return data;
   
  }

  
  //Managing post options
  function createOptions(data="") {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : data
      }
    };
    return options;
  }
  