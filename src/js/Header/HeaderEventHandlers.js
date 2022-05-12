export function onClickStatic(event) {
  const { currentTarget: ref } = event;
  isTheSameControl(this.home, ref) && this.loadHomeControls();
  isTheSameControl(this.lib, ref) && this.loadLibraryControls();
  isTheSameControl(this.logo, ref) && console.log('LOGO CLICKED');
}

const isTheSameControl = (control, ref) => (ref === control ? true : false);
