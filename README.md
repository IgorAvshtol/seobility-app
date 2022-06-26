## npm run dev  

# Before you start please read this small article

## What was done:
* It's a test task of a Seobility company;
## Technologies used:
* React, TypeScript, Module.scss, Webpack;
## What needed to be done:
Implement a feedback form with the following fields:
* First Name Last Name
* Email
* Phone number (with Russian number mask)
* Date of Birth
* Message
Form requirements:
#### Validation
* The field “First Name Last Name” can only consist of 2 words (first name and last name) of the Latin alphabet. The minimum length of each word is 3 characters, the maximum is 30. There can only be 1 space between words. Characters must be entered in upper case.
* E-mail must be valid (browser validation must be disabled).
* For the phone number, use the mask of the Russian number.
* The date of birth is entered through the calendar.
* The Message field has a minimum length of 10 characters and a maximum length of 300.
* Submitting a form
* Sending occurs Ajax request to the server. The response should contain json with 2 possible statuses: error/success and error text/”successful submission”. The response must be processed on the front and the corresponding message should be displayed under the form.
* Until a response is received from the server, the form cannot be resubmitted.
* In case of a successful response from the server, clear all form fields.
* All validation must be written independently, without the use of third-party libraries.
Form fields must be validated during entry and before being sent to the server.
If the field does not pass validation, display an appropriate message below the field.
