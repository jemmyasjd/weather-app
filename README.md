# 🌤️ [Weather Explorer](https://climate-risk-explorer.vercel.app/)

## **Explanation Video:** [Click Here](#)

<img width="1831" height="671" alt="Screenshot from 2025-12-09 12-41-12" src="https://github.com/user-attachments/assets/b436612f-8bb1-4ef8-88b8-680e22f60ecc" />

---

## **What it Does 👷**

Weather Explorer is a full-stack web application that allows users to:

1. Select a location (latitude, longitude) and date range (≤31 days).
2. Fetch historical daily weather data (temperature max/min, apparent temperature) via Open-Meteo API.
3. Store the raw JSON data in an AWS S3 bucket.
4. List stored weather files and view individual file content.
5. Visualize daily temperature trends in a responsive dashboard using charts and tables.

---

## **Tech Stack 🔧**

**Frontend:**

* Next.js (React framework) with Tailwind CSS
* Vercel deployment for live hosting

**Backend:**

* Python FastAPI
* AWS S3 for cloud storage
* AWS App Runner deployment

**Other Integrations:**

* Open-Meteo API for historical weather data
* CORS enabled for frontend-backend communication

---

## **How I Built It 🔧**

* **Frontend Development:** Developed a responsive dashboard using Next.js with Tailwind CSS, featuring forms, tables, and line charts for visualization.
* **Backend Development:** Built a modular FastAPI backend with routes for storing, listing, and retrieving weather data.
* **Cloud Storage:** Integrated AWS S3 to store JSON files with dynamic naming:

  ```
  weather_<lat>_<lon>_<start>_<end>_<timestamp>.json
  ```
* **Deployment:** Frontend deployed on Vercel; backend deployed on AWS App Runner for scalable execution.
* **Validation:** Input validation for latitude, longitude, date ranges (≤31 days), and proper error handling with status codes 400/404/5xx.

---

## **Features 🚀**

1. **Input Panel:**

   * Latitude, Longitude, Start Date, End Date
   * Fetch & Store Data
   * Loading/error states with returned file name display

2. **Stored Files Browser:**

   * List files from S3
   * Click a file to view JSON content
   * Metadata display: size, creation date

3. **Data Visualization:**

   * Line chart for daily max/min temperature
   * Paginated table (10/20/50 rows)
   * Fully responsive (desktop/tablet/mobile)

---

## **App Architecture 🏗️**

<img width="389" height="333" alt="Screenshot from 2025-12-09 12-50-16" src="https://github.com/user-attachments/assets/ea145278-20d9-43ab-b69b-3c7fa8f9ef05" />


**Flow Explanation:**

1. User submits latitude, longitude, and date range via frontend.
2. Frontend sends a POST request to `/store-weather-data`.
3. FastAPI backend validates input, calls Open-Meteo API, and stores the JSON in AWS S3.
4. Backend responds with file name and status.
5. Users can fetch `/list-weather-files` and `/weather-file-content/{file}` to view stored files.
6. Frontend visualizes data with charts and tables, fetching data from S3 via backend API.

---



## Live Demo 

* **Live Demo:** [Click Here](#)

---

## **Project Setup & Running Locally ⚙️**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/weather-explorer.git
cd weather-explorer
```

---

### **2. Backend Setup (FastAPI)**

1. Navigate to the backend folder:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python3 -m venv venv
```

3. Activate the virtual environment:

* On Linux/macOS:

```bash
source venv/bin/activate
```

* On Windows:

```bash
venv\Scripts\activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Create a `.env` file in `backend/app/` with your AWS credentials:

```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name
```

6. Ensure your `config.py` in `backend/app/` is like this:

```python
# backend/app/config.py
import os
from dotenv import load_dotenv

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")
```

7. Run the FastAPI server:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> Backend API will be available at: `http://localhost:8000`

---

### **3. Frontend Setup (Next.js)**

1. Navigate to the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the frontend root:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

> Frontend will be available at: `http://localhost:3000`

---

