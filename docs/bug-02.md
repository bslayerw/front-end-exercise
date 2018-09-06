Pressing the DELETE key when the INPUT is '0' throws an error.

### Steps to Reproduce

1. Enter 10.
1. Press DELETE.
1. Press DELETE again.

### Expected Outcome

The application renders a `0` as the INPUT value.

### Actual Outcome

The application renders `NaN` as the INPUT value and throws an error in the console.
