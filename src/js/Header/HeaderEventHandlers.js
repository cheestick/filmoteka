export function onClickStatic(event) {
  const { currentTarget: clickedButton } = event;
  isTheSameReferenceElement(this.homeButton, clickedButton) && this.updateToSearchControls();
  isTheSameReferenceElement(this.myLibraryButton, clickedButton) &&
    this.updateToMyLibraryControls();
  isTheSameReferenceElement(this.logoButton, clickedButton) && console.log('LOGO CLICKED');
}

export function onSwitchTab(event) {
  const { currentTarget: clickedTab } = event;
  !isTheSameReferenceElement(this.watchedTab, clickedTab) && this.switchToActiveTab(this.queueTab);
  !isTheSameReferenceElement(this.queueTab, clickedTab) && this.switchToActiveTab(this.watchedTab);
}

export function onSearchSubmit(event) {
  event.preventDefault();
}

export function isTheSameReferenceElement(reference, incomingReference) {
  return reference === incomingReference ? true : false;
}
