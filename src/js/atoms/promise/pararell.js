export default function pararels(...promises) {
  return Promise.all(promises.map(p => p()));
}
