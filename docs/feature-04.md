The calculator app renders a UI that allows usage without a keyboard.

### Acceptance Criteria

- Utilize [inline styles](https://reactjs.org/docs/dom-elements.html#style), as style rendering performance is not a focus of this exercise.
- The UI mimics the layout found in `/docs/UI.png`.
- When roman numeral mode disabled, the app renders a button UI for every possible decimal numeral input (i.e. 0-9).
- When roman numeral mode enabled, the app renders a button UI for every possible roman numeral input (i.e. i, v, x, l, c, d, m).
- When roman numeral model enabled, the "ROMAN" button color scheme is inverted.
- When a pending operation is set (e.g. ADDITION), the relevant operation button (e.g. `+`) color scheme is inverted.
- Tests cover the functionality of interacting with the button UI.
