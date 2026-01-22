# Deploying to AWS

This guide provides step-by-step instructions for deploying this monorepo application to Amazon Web Services (AWS) and testing it on mobile devices.

This application consists of two parts:
1.  **`dashboard`**: A Next.js frontend application.
2.  **`api`**: An Express.js backend application.

We will use two separate AWS services to host them:
-   **AWS Amplify** for the `dashboard` (frontend).
-   **AWS App Runner** for the `api` (backend).

---

## Part 1: Deploy the Application

### A. Deploy the `dashboard` (Frontend) with AWS Amplify

AWS Amplify is a service designed to make hosting modern web applications simple. It connects directly to your GitHub repository.

**Steps:**

1.  **Sign in to the AWS Management Console.** If you don't have an account, you will need to create one.
2.  In the search bar at the top, type **"AWS Amplify"** and select it.
3.  Click **"Host a web app"**.
4.  Under "From your existing code," select **"GitHub"** as the provider and click **"Continue"**.
5.  Authorize AWS to access your GitHub account. You may need to install the AWS app on your GitHub account or specific repositories.
6.  Select this repository (`saas-microservices`) from the list.
7.  Amplify will detect that this is a monorepo. It will prompt you to select the location of the app. Choose the **`apps/dashboard`** directory.
8.  Amplify will auto-detect that this is a Next.js application and configure the build settings. The default settings are usually correct.
9.  Click **"Next"** and then **"Save and deploy"**.
10. Wait for the deployment to complete (this may take 5-10 minutes). Once finished, Amplify will provide you with a public URL (e.g., `https://main.your-app-id.amplifyapp.com`). Keep this URL handy.

### B. Deploy the `api` (Backend) with AWS App Runner

AWS App Runner is a fully managed service that makes it easy to deploy containerized web applications and APIs at scale.

**Steps:**

1.  In the AWS Management Console, search for **"App Runner"** and select it.
2.  Click **"Create service"**.
3.  For "Source," select **"Source code repository"**.
4.  Connect to the same GitHub repository as before.
5.  In the "Configuration" section:
    -   Specify the correct branch (e.g., `main`).
    -   Under "Build settings," select **"Configure all settings here"**.
    -   **Build command:** `pnpm install`
    -   **Start command:** `pnpm dev:api`
    -   **Port:** `3001`
6.  Give your service a name (e.g., `saas-microservices-api`).
7.  Click **"Next"** and then **"Create & deploy"**.
8.  Wait for the deployment to complete. App Runner will provide you with a public URL for your API (e.g., `https://your-api-id.aws-region.run.app`).

### C. Connect the Frontend to the Backend

The final step is to tell the `dashboard` the URL of the `api`.

1.  Go back to your **AWS Amplify** project.
2.  In the left sidebar, click on **"Environment variables"**.
3.  Click **"Manage variables"** and then **"Add variable"**.
4.  Set the variable name to `NEXT_PUBLIC_API_URL`.
5.  Set the value to the URL you got from **AWS App Runner**.
6.  Click **"Save"**. This will trigger a new build and deployment in Amplify. Once it's done, your frontend will be able to communicate with your backend.

---

## Part 2: Test on Mobile Devices with AWS Device Farm

AWS Device Farm gives you remote access to real, physical phones and tablets hosted in AWS data centers.

**Steps:**

1.  In the AWS Management Console, search for **"Device Farm"** and select it.
2.  Click **"Create a new project"** and give it a name.
3.  Inside your project, start a new run and select **"Remote Access"**.
4.  You will see a list of hundreds of devices (iPhones, Samsung Galaxy phones, etc.). Choose the device you want to test on.
5.  Start a new session. A live video stream of the device's screen will appear in your browser.
6.  You can control the device with your mouse. Open the web browser on the device (e.g., Safari or Chrome).
7.  In the browser's address bar, type in the **AWS Amplify URL** for your `dashboard`.
8.  Your application will load. You can now interact with it to test its functionality and appearance on a real mobile device.
