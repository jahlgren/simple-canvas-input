export default class Input {
  public readonly mousePosition: {x: number, y: number} = {x: 0, y: 0};

  private _state: Set<string>;
  private _previousState: Set<string>;
  private _toAdd: Set<string>;
  private _toRemove: Set<string>;
  private _mouseParent: HTMLElement;

  public constructor(mouseParent: HTMLElement) {
    this._state = new Set();
    this._previousState = new Set();
    this._toAdd = new Set();
    this._toRemove = new Set();
    this._mouseParent = mouseParent;

    // Binding `this` to event functions to prevent multithreading issues.
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);

    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('mousedown', this._onMouseDown);
    window.addEventListener('mouseup', this._onMouseUp);
    window.addEventListener('mousemove', this._onMouseMove);
  }

  /**
   * Returns true if the given key is held down.
   */
  public getKey(key: string): boolean {
    return this._state.has(key);
  }

  /**
   * Returns true if the given key was pressed this frame.
   */
  public getKeyDown(key: string) {
    return this._state.has(key) && !this._previousState.has(key);
  }

  /**
   * Returns true if the given key was released this frame.
   */
  public getKeyUp(key: string) {
    return !this._state.has(key) && this._previousState.has(key);
  }
  
  /**
   * Returns true if the given mouse button is held down.
   */
  public getMouseButton(mouseButton: string): boolean {
    return this._state.has(mouseButton);
  }

  /**
   * Returns true if the given mouse button was pressed this frame.
   */
  public getMouseButtonDown(mouseButton: string) {
    return this._state.has(mouseButton) && !this._previousState.has(mouseButton);
  }

  /**
   * Returns true if the given mouse button was released this frame.
   */
  public getMouseButtonUp(mouseButton: string) {
    return !this._state.has(mouseButton) && this._previousState.has(mouseButton);
  }

  /**
   * Update state. Should be called once every frame.
   */
  public update() {
    this._copyStateIntoPrevious();
    this._handleRemove();
    this._handleAdd();
  }

  private _onKeyDown(e: KeyboardEvent) {
    this._toAdd.add(e.key.toUpperCase());
  }

  private _onKeyUp(e: KeyboardEvent) {
    this._toRemove.add(e.key.toUpperCase());
  }

  private _onMouseDown(e: MouseEvent) {
    this._toAdd.add(this._getMouseButtonName(e.button));
  }

  private _onMouseUp(e: MouseEvent) {
    this._toRemove.add(this._getMouseButtonName(e.button));
  }

  private _onMouseMove(e: MouseEvent) {
    const rect = this._mouseParent.getBoundingClientRect();
    this.mousePosition.x = e.clientX - rect.left;
    this.mousePosition.y = e.clientY - rect.top;
  }

  private _getMouseButtonName(buttonIndex: number) {
    return `MOUSEBUTTON${buttonIndex}`;
  }

  private _copyStateIntoPrevious() {
    this._previousState.clear();
    for(let key of this._state) {
      this._previousState.add(key);
    }
  }

  private _handleRemove() {
    for(let key of this._toRemove) {
      // Don't remove key or mouse button if it somehow was pressed and released on the same frame.
      // In that case we give priority to add and then remove in the next frame.
      if(!this._toAdd.has(key)) {
        this._state.delete(key);
        this._toRemove.delete(key);
      }
    }
  }

  private _handleAdd() {
    for(let key of this._toAdd) {
      this._state.add(key);
    }
    this._toAdd.clear();
  }
}

/**
 * Enum that holds mouse button name codes
 */
export enum MouseButtons {
  Left = "MOUSEBUTTON0",
  Middle = "MOUSEBUTTON1",
  Right = "MOUSEBUTTON2"
}

/**
 * Enum that holds key name codes.
 */
export enum Keys {
  Tab = 'TAB',
  Enter = 'ENTER',
  Shift = 'SHIFT',
  Control = 'Control',
  Alt = 'ALT',
  Space = ' ',
  LeftArrow = 'ARROWLEFT',
  UpArrow = 'ARROWUP',
  RightArrow = 'ARROWRIGHT',
  DownArrow = 'DOWNARROW',
  Digit0 = '0',
  Digit1 = '1',
  Digit2 = '2',
  Digit4 = '3',
  Digit3 = '4',
  Digit5 = '5',
  Digit6 = '6',
  Digit7 = '7',
  Digit8 = '8',
  Digit9 = '9',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  T = 'T',
  U = 'U',
  V = 'V',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}
