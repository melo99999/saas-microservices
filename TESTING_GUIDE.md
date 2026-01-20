# Testing Guide

This guide provides step-by-step instructions for setting up and running the application for testing purposes.

## Setup

Before running the application, you need to install the dependencies. Open your terminal and run the following command:

```sh
pnpm install
```

This will install all the necessary packages for the dashboard and API services.

## Running the Application

To run all the services together, use the following command:

```sh
pnpm dev
```

This will start the Next.js development server for the `dashboard` and the Express.js server for the `api` service.

You can view the dashboard by opening your web browser and navigating to:

[http://localhost:3024](http://localhost:3024)

## Verification

The dashboard will make API calls to the `api` service to fetch and display information. You can verify that the application is working correctly by checking if the dashboard loads without errors and displays data from the API.

## Troubleshooting

- **Port in use:** If you get an error that a port is already in use, make sure you don't have another instance of the application running. You can stop any running instances and try again.
- **Dependency issues:** If you encounter any issues with dependencies, try deleting the `node_modules` folder and the `pnpm-lock.yaml` file and then run `pnpm install` again.
