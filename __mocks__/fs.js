const fs = jest.createMockFromModule('fs'); //jest上创建mock的模块fs

function readFile(){
  let msg='my readFile'
  return msg
}
function writeFile(){
  let msg='my writeFile'
  return msg
}

fs.readFile=readFile
fs.writeFile=writeFile

module.exports = fs;