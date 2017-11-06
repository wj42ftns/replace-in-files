/* eslint-disable */

function* main() {
  const log = {};
  const Log = loopback.getModel('Log');
  const created1 =  yield Log.create(log);

  console.log(created1);

  const file = {};
  const File = loopback.getModel('File');
  const created2 =  yield File.create(file);

  console.log(created2);
}

main();
