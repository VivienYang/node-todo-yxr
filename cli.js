#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const api = require('./index.js')
const pkg = require("./package.json")

program
  .name('taskTodo')
  .description('CLI to log your todo things')
  .version(pkg.version);

program
  .option('-d,--debug', 'output extra debugging') 

program
  .command('add')
  .argument('<tasks...>')
  .description('add task(s), more than one task can split by space')
  .action((tasks) => {
    api.add(tasks)
  });

  program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    console.log('清空所有任务');
    api.clear()
  });

if(process.argv && process.argv.length===2){
  // 展示所有task
  api.showAll()
  // program.parse(process.argv);
}else{
  program.parse(process.argv);
}





