![cover](ali.png)
Alitaptap is an AI-powered fire safety inspector for household photos. By using GenAI computer vision, our web application allows anyone to snap a photo of a room and instantly receive a quantifiable "Flammability Score." The system acts as a pocket fire inspector, identifying spatial hazards and providing an actionable, step-by-step checklist to resolve risks and generate compliance reports.
> We’ve become blind to the clutter that fuels these disasters.*

# 📖 The Problem & Vision
The Fire Crisis: In just the first four months of 2026, the Philippines has faced a fire crisis. From January 1 to May 1, 2026, fire incidents nationwide surged to 8,068 cases—a staggering 36% jump compared to last year. With fire damage in Metro Manila alone rising by 34% this year, we cannot afford to wait for the sirens.

The Hidden Hazards: According to the Bureau of Fire Protection (BFP), structural fires rose significantly by 29.20%. While we often feel safe at home, human negligence and unattended hazards are the primary drivers of this increase. Household fire hazards are often hidden in plain sight, created by the spatial relationship between everyday objects rather than the objects themselves.

# 💡 Our Solution
The average person understands basic fire safety but lacks the spatial awareness to identify compounding risks (like overloaded power strips hidden under flammable clutter). Hiring a professional fire inspector is an expensive, high-friction process. Alitaptap democratizes home safety, turning your smartphone into a digital fire inspector.

# 🏗️ The 4 Pillars of Alitaptap
Our app scans your room for the top causes of structural fires:
- Stuff: Combustible waste and clutter.
- Power: Electrical faults and overloaded outlets.
- Space: Open flames, cooking hazards, and inadequate clearance around heat sources.
- Path (Exit): Blocked doors and windows—addressing a major BFP concern where storage boxes or equipment chain emergency exits shut.

# ✨ Features
- Instant Analysis: Upload or capture a photo for immediate fire risk assessment.
- AI-Powered: Utilizes the Gemini API for advanced computer vision and contextual awareness.
- Comprehensive Scoring: Four-pillar scoring system (Stuff, Power, Space, Path).
- Actionable Insights: Provides a risk summary, hazard breakdown, and a clear, step-by-step remediation checklist.
- Digital Certification: View a safety certificate upon completion of your audit.
- Accessible Design: PWA-ready frontend with a smooth, mobile-friendly layout, loading states, and an intuitive dashboard.
- Serverless & Automated: Fully automated CI/CD deployment pipelines using GitHub Actions, deployed to AWS Lambda and GitHub Pages for highly scalable, zero-maintenance hosting.

# 🏛️ Architecture
![Architecture Diagram](alitaptap.drawio.svg)

# 🛠️ Tech Stack
- Frontend: React, Vite, React Router, CSS Modules (Hosted on GitHub Pages)
- Backend: FastAPI, Python, Pillow, Google Gen AI (Gemini) (Serverless via AWS Lambda)
- Infrastructure (IaC): Terraform (AWS IAM & Lambda Provisioning)
- CI/CD: GitHub Actions

# 📁 Project Structure
```text
├── .github/workflows/       # CI/CD pipelines (Backend Lambda & Frontend GH Pages)
├── backend/                 # FastAPI app, Mangum wrapper, and Gemini integration
├── frontend/                # React app and UI components
└── terraform/               # Infrastructure as Code (AWS resource provisioning)
```

# 🚀 Getting Started

### Requirements
- Node.js: v20 or newer
- Python: v3.11 or newer
- AWS CLI & Terraform: (For managing infrastructure)
- API Key: Google Gemini API key for backend access

### Environment Variables
**Backend (AWS Lambda / `backend/.env` for local):**
- `GEMINI_API_KEY`: Your Gemini API key (Required)
- `ENVIRONMENT`: Optional, typically set to `production` in prod.

**Frontend (`frontend/.env`):**
- `VITE_API_URL`: Backend AWS Lambda URL used by the frontend
- `VITE_ENABLE_DASHBOARD_BYPASS`: Optional testing bypass for the dashboard

# 💻 Local Development

### 1. Backend Setup
Open a terminal and navigate to the backend directory:

```bash
cd backend
python -m venv .venv

# Activate virtual environment
# On Windows: .venv\Scripts\activate
# On macOS/Linux: source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
- API Base URL: `http://localhost:8000`
- Health Check: `http://localhost:8000/api/health`

### 2. Frontend Setup
Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```
- App URL: `http://localhost:5173`

# ☁️ Deployment (Serverless Architecture)

This project uses **GitHub Actions** for automated deployments. Pushing code to the `main` branch triggers the deployment workflows automatically.

### Infrastructure Provisioning (Terraform)
If setting up a new environment, provision the AWS resources first:
```bash
cd terraform
terraform init
terraform plan
terraform apply
```
*(Note: Ensure your `terraform.tfstate` files are in `.gitignore` and never committed to the repository).*

### Automated CI/CD
- **Backend:** The GitHub Action automatically compiles Linux-compatible binaries for the FastAPI application, packages them into a `.zip`, and deploys them to AWS Lambda.
- **Frontend:** The GitHub Action builds the React application using Vite and deploys the static static assets securely to GitHub Pages.

# 📡 API Overview
`GET /api/health`
Returns the backend's current health status.

`POST /api/assess`
Accepts: `multipart/form-data` containing a file (uploaded image).
Returns JSON: Contains `overall_score`, `classification`, `pillars`, `assessments`, `agent_note`, and `remarks`.

> "Let’s use Alitaptap to clear the clutter and quench the risk. For every Filipino home, for every 'Alab' in our hearts—let's make safety a routine."

### 💻 Boolean Gaesody
*Bright Eyes, Dimmed Danger* 🌟

- [@paulo10011](https://github.com/paulo10011) 
- [@Neil-023](https://github.com/Neil-023)   
- [@alhtb](https://github.com/alhtb) 