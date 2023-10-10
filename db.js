const userHomeDir = require("os").homedir();
const home = process.env.HOME || userHomeDir
const p = require("path")
const filePath = p.join(home,'.todo')
const fs = require("fs")

const db={
  read(file=filePath){
    return new Promise((resolve,reject)=>{
      fs.readFile(file,{flag:'a+'},(err, data)=>{
        if (err) return reject(err) ;
        
        let list
        try {
          list=JSON.parse(data.toString())
        } catch (error) {
          list=[]
        }
        resolve(list)
      });
    })

  },
  write(list,file=filePath){
    return new Promise((resolve,reject)=>{
      fs.writeFile(file, JSON.stringify(list)+'\n', (err) => {
        if (err) return reject(err);
        console.log('The task has been saved!');
        console.log(JSON.stringify(list))
        resolve()
      });       
    })
  },
}
module.exports=db