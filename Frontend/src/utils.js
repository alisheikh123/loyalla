
var CryptoJS = require("crypto-js");
export function getFileExtension(filename) {
  debugger;
  console.log(filename);
  if (typeof filename != "undefined") {
    var ext = filename.type.split("/");
    return ext[1];
  }
  else {
    return null;
  }
}
export function filterIt(arr, searchKey) {

  return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
}

export function getDayName(day) {
  debugger;
  if (day === 1) {
    return 'Monday'
  }
  else if (day === 2) {
    return 'Tuesday'
  }
  else if (day === 3) {
    return 'Wednesday'
  }
  else if (day === 4) {
    return 'Thursday'
  }
  else if (day === 5) {
    return 'Friday'
  }
  else if (day === 6) {
    return 'Saturday'
  }
  else if (day === 7) {
    return 'Sunday'
  }
  else if (day === 8) {
    return 'On Order'
  }
}

// ----Convert Image to Base64URL---

export function getBase64(file) {
  return new Promise(resolve => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      console.log("Called", reader);
      baseURL = reader.result;
      // console.log(baseURL);
      resolve(baseURL);
    };
    //   console.log(fileInfo);
  });
};


// -----decrypt credentials----

export function Decrypted_Identity(local) {
  debugger;
  if (local != null) {
    try {
      var bytes = CryptoJS.AES.decrypt(local, "Meetup54321");
      var usersList = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return usersList;
    }
    catch (ex) {
      console.log("ex" , ex);
      return null;
    }
  }
  else { return null; }
}
