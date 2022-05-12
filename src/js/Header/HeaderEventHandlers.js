export function onClickStatic(event) {
  const { currentTarget: ref } = event;
  console.log(event);
  isTheSameControl(this.home, ref) && this.loadHomeControls();
  isTheSameControl(this.lib, ref) && this.loadLibraryControls();
  isTheSameControl(this.logo, ref) && console.log('LOGO CLICKED');
}

export function onSwitchTab(event) {
  const { currentTarget: ref } = event;
  !isTheSameControl(this.watched, ref) && this.switchToTab(this.queue);
  !isTheSameControl(this.queue, ref) && this.switchToTab(this.watched);
}

export function onSearchSubmit(event) {
  event.preventDefault();
  console.log(event);
}

export const isTheSameControl = (control, ref) => (ref === control ? true : false);
