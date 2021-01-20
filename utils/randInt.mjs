export default function randInt(a, b) {
  return a + Math.floor(Math.random() * (++b - a));
}
