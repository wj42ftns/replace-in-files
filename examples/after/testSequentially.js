/* eslint-disable */

function* main() {
  const myLog = {};
  const Log = loopback.getModel('Log');
  const TEST79 =  yield Log.create(log);

  console.log(created1);

  const myFile = {};
  const File = loopback.getModel('File');
  const TEST42 =  yield File.create(file);

  alert("worked!")
}

main();
