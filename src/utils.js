// export default function generateId() {
//   return Date.now();
// }

export default function generateUniqueIdentifier() {
  return `${Math.floor(Math.random() * 101)}`;
}
