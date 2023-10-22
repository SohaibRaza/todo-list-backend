# Todo List Backend

## Table of Contents

- [Todo List Backend](#todo-list-backend)
  - [Table of Contents](#table-of-contents)
  - [Folder Structure](#folder-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Running Tests](#running-tests)


## Folder Structure

Here's an overview of the project's folder structure:

- `/src`: The main source code directory.
  - `/common`: Common modules used throughout the application.
    - `/constants` common constants.
    - `/db`: Common db schemas and plugins.
    - `/helpers` Reusable helper methods and utilities.
  - `/config` Configuration files i.e db config.
  - `/middlewares`: global middlewares.
  - `/modules`: Core modules of application.
    - `/task` Self contained Task module.
- `index.tsx`: The entry point of the application.

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

Make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/): Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/SohaibRaza/todo-list-backend.git
   ```

2. Navigate to the project directory:

    ```bash
    cd todo-list-backend
    ```

3. Install project dependencies:

    ```bash
    npm install
    ```

### Usage

- Start the development server:

    ```bash
    npm start
    ```

### Running Tests

- To run tests, use the following command:

    ```bash
    npm run test
    ```
