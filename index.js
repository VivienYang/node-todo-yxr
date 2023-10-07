const db = require('./db')
// import { input } from '@inquirer/prompts';
const inquirer = require('inquirer')
// import inquirer from 'inquirer'
// import select, { Separator } from '@inquirer/select';

module.exports.add = async (taskNames)=>{
  //读取之前的任务
  let list = await db.read()
  //往之前任务里面添加新的任务
  taskNames.forEach(taskName => {
    list.push({
      title:taskName,
      done:false
    })
  });
  //存储任务到文件
  await db.write(list)
}
module.exports.clear = async ()=>{
  await db.write([])
}
async function markAsDone(list,taskIndex){
  // 将任务设置为已完成
  list[taskIndex].done=true
  await db.write(list)
}

async function markAsUnDone(list,taskIndex){
  // 将任务设置为未完成
  list[taskIndex].done=false
  await db.write(list)
}
async function updateTitle(list,taskIndex){
  // 修改任务标题
  inquirer.prompt({
    type:'input',
    name:'updatetaskname',
    message:"请输入新的标题",
    default:list[taskIndex].title
  }).then(async answer3=>{
    list[taskIndex].title=answer3.updatetaskname
    await db.write(list)
  })
}
async function delTask(list,taskIndex){
  // 删除任务
  list.splice(taskIndex,1)
  await db.write(list)
}
function askForAction(list, taskIndex){
  // 对任务进行操作 askForAction
  const actions={markAsDone,markAsUnDone,updateTitle,delTask}
  inquirer.prompt({
    type:'list',
    name:'action',
    message:'请选择操作',
    choices:[
      {name:'退出', value:'quit'},
      {name:'已完成', value:'markAsDone'},
      {name:'未完成', value:'markAsUnDone'},
      {name:'改标题', value:'updateTitle'},
      {name:'删除', value:'delTask'},
    ]
  }).then( async (answer2)=>{
    let fun = actions[answer2.action]
    if(typeof fun === 'function'){
      fun(list,taskIndex)
    }
    // switch(answer2.action){
    //   case 'markAsDone':
    //     markAsDone(list,taskIndex)
    //     break;
    //   case 'markAsUnDone':
    //     markAsUnDone(list,taskIndex)
    //     break;
    //   case 'updateTitle':
    //     updateTitle(list,taskIndex)
    //     break;
    //   case 'delTask':
    //     delTask(list,taskIndex)
    //     break;
    // }
  })
}

function askForAddTask(list){
  //创建任务 askForAddTask
  inquirer.prompt({
    type:'input',
    name:'newtaskname',
    message:"请输入创建的任务名称",
  }).then(async answer=>{
    list.push({
      title:answer.newtaskname,
      done:false,
    })
    await db.write(list)
  })
}
function printTasks(list){
  //打印之前的任务 printTasks
  inquirer.prompt({
    type:'list',
    name:'taskIndex',
    message:'please select a task',
    choices:[
      {name:'退出', value:'-1'},
      ...list.map((task,index)=>{
          return {name:`${task.done?'[x]':'[_]'} ${index+1} - ${task.title}`,value:index.toString()}
      }),
      {name:'+ 创建任务', value:'-2'},
  ]
  })
  .then((answer) => {
    let taskIndex=parseInt(answer.taskIndex)
    if(taskIndex>=0){
      // 选中了一个任务
      askForAction(list, taskIndex)

    }else if(taskIndex===-2){
      //创建任务 askForAddTask
      askForAddTask(list)
    }
  })
}
module.exports.showAll = async ()=>{
  //读取之前的任务
  let list = await db.read()
  printTasks(list)
}
