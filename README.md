# E2S Team 5

## Introduction

This project was created as part of a 3rd year group Client Project during the Applied Software Engineering BSc programme at Cardiff University, and had the following contributors:

* Josh Gill - gillj8@cardiff.ac.uk / joshgill2013@gmail.com
* Haroon Mohammed - mohammedhz@cardiff.ac.uk
* Marwa Omar - omarfm@cardiff.ac.uk
* Ahmad Shahin - shahina@cardiff.ac.uk
* Sami Ahmed - ahmedms4@cardiff.ac.uk

## Running the Project

To run the project, please follow the following steps:

1. Install NPM and NodeJS - [Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Run `npm i -g firebase-tools`
3. Clone this project
4. In the root directory of the project, run `firebase login`
5. When prompted, enter the following credentials
   * Email - e2steam5@gmail.com
   * Password - E2ST52022!
6. In the "web-app" directory, run `npm i --force`
7. Optionally, if you intend to work on and add more cloud functions, in the "cloud-functions" directory, run `npm i --force`
8. To start the development server, within the "web-app" directory run `npm start`

When looking to work on the project, please email Josh (details found below), so he can allow you access to the database and it's functionalities. Due to the public, pay-as-you-go model needed from Google Firebase, database access will be locked unless explicitly requested otherwise.

## Assumptions made

During development, we made the following assumptions

* Data passed into the "File Upload" page must be in the following format
  * The Top-Left position (A1) is empty
  * Headers for data sources must be on the first line (B1 onwards on line 1)
  * Date and Time of data is on the left hand side (column A), in the following format: "DD/MM/YYYY HH:mm"
