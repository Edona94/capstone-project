# capstone-project
HRworks is an application for human resource management that offers functionalities such as employee registration, deletion, and data editing, 
exclusively accessible to the admin.
Furthermore, the application provides options such as the ability to sort and search employees by name, as well as graphical representations.

## Installation

* clone the repository
* set up the following environment variables for the backend:
  * `MONGO_URI=mongodb://[SERVER]:[PORT]`
  * `CLOUDINARY_URL=cloudinary://[API_KEY]:[API_SECRET]@[CLOUD_NAME]`
* start the backend with Maven
* `cd` into the frontend folder
* start the frontend with: `npm start`

#### Admin-Level Access
To provide admin-level access to a user, update the role field in the MongoDB users collection to "ADMIN" through manual configuration.
