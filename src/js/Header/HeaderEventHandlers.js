export function onClickStatic(event) {
  const { currentTarget: ref } = event;
  console.dir(ref);
  isHomeClicked.call(this, ref) && this.loadHomeControls();
  isLibraryClicked.call(this, ref) && this.loadLibraryControls();
}

function isLibraryClicked(target) {
  return target === this.lib ? true : false;
}

function isHomeClicked(target) {
  return target === this.home ? true : false;
}
