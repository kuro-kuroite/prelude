export default function parallel(...promises) {
  return Promise.all(promises.map(p => p()));
}
