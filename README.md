# Infrastructure Checker Utility (Cloud Native)

A specialized monitoring utility built with **Node.js**, designed to perform infrastructure health checks and deployed as a serverless service on **Google Cloud Platform (GCP)**.

## 🚀 Overview

The **Checker** is a lightweight infrastructure tool that demonstrates how to implement automated monitoring tasks within a **DevSecOps** ecosystem. It focuses on high availability, secure secret management, and automated deployment to **Cloud Run**.

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Cloud Infrastructure:** Google Cloud Run, Artifact Registry
- **CI/CD:** GitHub Actions
- **Security & Linting:** Gitleaks, Hadolint, Trivy

---

## 🏗 CI/CD & DevSecOps Pipeline

The deployment process (`ci.yml`) ensures that this utility is as stable as the infrastructure it monitors:

### 🛡️ Security & Quality Gates
* **Secret Scanning (Gitleaks):** Ensures that monitoring credentials or cloud keys are never exposed in the repository.
* **Dockerfile Linting (Hadolint):** Validates that the container is built using industry-standard security practices.
* **Vulnerability Scanning (Trivy):** Scans the Node.js environment and dependencies for CVEs, ensuring a secure runtime.

### 📦 Deployment Flow
* **Workload Identity Federation:** Secure, keyless connection between GitHub and GCP.
* **Automated Packaging:** Builds and tags the Docker image with the Git SHA, pushing it to **Artifact Registry**.
* **Serverless Deployment:** Deploys to **Cloud Run** in the `europe-west1` region with managed resources.

### 🔥 Verification
* **Self-Check Smoke Test:** After deployment, the pipeline verifies that the Checker is active and responding, ensuring it's ready to perform its monitoring duties.

---

## 🚦 Local Setup

### Installation
```bash
npm install

Run Locally
Bash

npm start

Docker
Bash

docker build -t infrastructure-checker .
docker run -p 8080:8080 infrastructure-checker
