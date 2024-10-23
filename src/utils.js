// export default function generateId() {
//   return Date.now();
// }

export default function generateUniqueIdentifier() {
  //console.log(task.status)
  //task.id=`${task.status}_${Math.floor(Math.random() * 101)}`;
  //console.log(`taskID: ${task.id}`)
  return `${Math.floor(Math.random() * 101)}`;
}
