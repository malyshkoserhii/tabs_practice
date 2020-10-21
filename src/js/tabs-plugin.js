class Tabs {
  constructor({ rootSelector, activeControlClass = 'active' }) {
    this._refs = this._getRefs(rootSelector);
    this._activeControlClass = activeControlClass;

    this._bindEvents();
  }

  _getRefs(root) {
    const refs = {};

    refs.controls = document.querySelector(`${root} [data-controls]`);
    refs.panes = document.querySelector(`${root} [data-panes]`);

    return refs;
  }

  _bindEvents() {
    this._refs.controls.addEventListener(
      'click',
      this._onControlsClick.bind(this),
    );
  }

  _onControlsClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'A') {
      console.log('Клікнули не на посилання!');
      return;
    }

    const currentActiveControlItem = this._refs.controls.querySelector(
      `.${this._activeControlClass}`,
    );

    if (currentActiveControlItem) {
      currentActiveControlItem.classList.remove(this._activeControlClass);

      const paneId = getPaneId(currentActiveControlItem);
      const pane = getPaneById(paneId);
      pane.classList.remove('pane--active');
      // console.log(paneId);
    }

    console.log(currentActiveControlItem);
  }
}

const tabs1 = new Tabs({
  rootSelector: '#tabs-1',
  activeControlClass: 'controls__item--active',
});

console.log(tabs1);
