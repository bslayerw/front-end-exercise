Changing the operation erroneously applies previous pending operation.

### Steps to Reproduce

1. Enter 10.
1. Press the + key.
1. Enter 20.
1. Press the + key.
1. Press the - key.

### Expected Outcome

The pending operation is set to SUBTRACTION, but the RESULT does not change and remains as 30.

### Actual Outcome

The pending operation is set to SUBTRACTION, but the RESULT is changed to 40.
