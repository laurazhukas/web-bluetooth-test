const button = document.getElementById("getDetails");
const details = document.getElementById("details");
const buttonInfo = document.getElementById("getInfo");

button.addEventListener("click", async () => {
  try {
    // Request the Bluetooth device through browser
    const device = await navigator.bluetooth.requestDevice({
      optionalServices: ["battery_service", "device_information","00000001-627e-47e5-a3fc-ddabd97aa966"],
      acceptAllDevices: true,
    });

    // Connect to the GATT server
    // We also get the name of the Bluetooth device here
    let deviceName = device.gatt.device.name;
    server = await device.gatt.connect();
    console.log("CONNECTED")

    
  } catch (err) {
    console.log(err);
    alert("An error occured while fetching device details");
  }
});

buttonInfo.addEventListener("click", async () => {
  i = 1;
  ecg = [];
  while(i=1) {
  try {
  // Getting the services we mentioned before through GATT server
  const batteryService = await server.getPrimaryService("battery_service");
  const infoService = await server.getPrimaryService("device_information");
  const ECGService = await server.getPrimaryService('00000001-627e-47e5-a3fc-ddabd97aa966');

  // Getting the current battery level
  const batteryLevelCharacteristic = await batteryService.getCharacteristic(
    "battery_level"
  );
  // AccX.forEach(async (characteristic, index, array) => {
  //   // Returns a buffer
  //   const value = await characteristic.readValue();
  //   console.log(new TextDecoder().decode(value));
  //   // Convert the buffer to string
  //   infoValues1.push(new TextDecoder().decode(value));
  //   if (index === array.length - 1) resolve();
  // });
  let infoValues1 = [];
  var AccX = ECGService.getCharacteristics();


  AccX = await AccX;
  AccX.forEach(async (characteristic, index, array) => {
    // Returns a buffer
    const value = await characteristic.readValue();
    ecg.push(new TextDecoder().decode(value));
    // Convert the buffer to string
    infoValues1.push(new TextDecoder().decode(value));
  });
  AccX.then
  if (ecg.length==460) {
    console.log("done"); 
    console.log(ecg); 
  }
  // const ECGSignal = await ECGService.getCharacteristic("00-00-00-02-62-7E-47-E5-A3-fC-DD-AB-D9-7A-A9-66");
  // Convert recieved buffer to number
  const batteryLevel = await batteryLevelCharacteristic.readValue();
  const batteryPercent = await batteryLevel.getUint8(0);
  // Getting device information
  // We will get all characteristics from device_information
  const infoCharacteristics = await infoService.getCharacteristics();

  // let infoValues = [];
  // const promise = new Promise((resolve, reject) => {
  //   infoCharacteristics.forEach(async (characteristic, index, array) => {
  //     // Returns a buffer
  //     const value = await characteristic.readValue();
  //     console.log(new TextDecoder().decode(value));
  //     // Convert the buffer to string
  //     infoValues.push(new TextDecoder().decode(value));
  //     if (index === array.length - 1) resolve();
  //   });
  // });

  // promise.then(() => {
  //   console.log(infoValues);
  //   // Display all the information on the screen
  //   // use innerHTML
  //   details.innerHTML = `
  //   Device Name - ${deviceName}<br />
  //   Battery Level - ${batteryPercent}%<br />
  //   Device Information:
  //   <ul>
  //     ${infoValues.map((value) => `<li>${value}</li>`).join("")}
  //   </ul> 
  // `;
  // });
  } 
  finally {
    
  }
}
});
