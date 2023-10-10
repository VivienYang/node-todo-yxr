const db = require('../db')
const fs = require('fs')
jest.mock('fs'); // 使用mock的fs 

describe("db",()=>{
  it("can read",()=>{
    console.log('*********',require('fs').readFile())
    expect(fs.readFile()).toBe('my readFile')
  })
  it("can write",()=>{
    console.log('*********',require('fs').writeFile())
    expect(fs.writeFile()).toBe('my writeFile')
  })
})