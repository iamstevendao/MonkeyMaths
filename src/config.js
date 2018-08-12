
function getWindowSize() {
  // get the smaller dimension
  const w = window.innerWidth;
  const h = window.innerHeight;
  return w > h ? h - 150 : w - 150;
}

export default {
  gameWidth: getWindowSize(),
  gameHeight: getWindowSize(),
  localStorageName: 'monkey-maths',
};
