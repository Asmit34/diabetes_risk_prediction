import os
import logging
import traceback
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from motor.motor_asyncio import AsyncIOMotorClient
import numpy as np
import joblib
import bcrypt

# Load environment variables
load_dotenv()

# MongoDB settings from environment variables
DATABASE_NAME = os.getenv("DATABASE_NAME", "Project")
REGISTER_DATA_COLLECTION_NAME = os.getenv("REGISTER_DATA_COLLECTION_NAME", "register_data")
DIABETES_COLLECTION_NAME = os.getenv("DIABETES_COLLECTION_NAME", "diabetes")
MONGO_DB_URL = os.getenv("MONGO_DB_URL")

# Paths for model and preprocessing files
MODEL_PATH = os.getenv("MODEL_PATH", r'C:\Users\Asmit\Desktop\diabetes_detection\saved_models\1731484161\model.pkl')
PREPROCESSING_PATH = os.getenv("PREPROCESSING_PATH", r'C:\Users\Asmit\Desktop\diabetes_detection\artifact\11_13_2024_13_34_13\data_transformation\transformed_object\preprocessing.pkl')

# Initialize FastAPI app
app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Set up logging
import logging

logging.basicConfig(
    level=logging.INFO,  # Set the logging level
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # Log format
    filename="app.log",  # Log file path
    filemode="a"  # Append mode; use 'w' to overwrite
)

logger = logging.getLogger(__name__)


@app.get("/", tags=["authentication"])
async def index():
    return RedirectResponse(url="/docs")

# MongoDB connection setup with error handling
try:
    client = AsyncIOMotorClient(MONGO_DB_URL)
    db = client[DATABASE_NAME]
    register_data_collection = db[REGISTER_DATA_COLLECTION_NAME]
    diabetes_collection = db[DIABETES_COLLECTION_NAME]
    logger.info("Connected to MongoDB successfully.")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise HTTPException(status_code=500, detail="Database connection error.")

# Load model and preprocessing pipeline
try:
    model = joblib.load(MODEL_PATH)
    preprocessing = joblib.load(PREPROCESSING_PATH)
    logger.info("Model and preprocessing pipeline loaded successfully.")
except Exception as e:
    logger.error(f"Error loading model or preprocessing pipeline: {e}")
    raise HTTPException(status_code=500, detail="Model loading error.")

# Define User model for registration
class User(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    gender: str = Field(..., pattern="^(Male|Female)$")
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15, pattern="^[0-9]+$")
    address: str = Field(..., min_length=1, max_length=100)
    password: str = Field(..., min_length=6)

# Define Login data model
class LoginData(BaseModel):
    email: EmailStr
    password: str

# Define Diabetes form data model
class DiabetesFormData(BaseModel):
    age: int = Field(..., gt=1, le=65)
    sex: int = Field(..., ge=0, le=1)
    polyuria: int = Field(..., ge=0, le=1)
    polydipsia: int = Field(..., ge=0, le=1)
    suddenWeightLoss: int = Field(..., ge=0, le=1)
    weakness: int = Field(..., ge=0, le=1)
    polyphagia: int = Field(..., ge=0, le=1)
    genitalThrush: int = Field(..., ge=0, le=1)
    visualBlurring: int = Field(..., ge=0, le=1)
    itching: int = Field(..., ge=0, le=1)
    irritability: int = Field(..., ge=0, le=1)
    delayedHealing: int = Field(..., ge=0, le=1)
    partialParesis: int = Field(..., ge=0, le=1)
    muscleStiffness: int = Field(..., ge=0, le=1)
    alopecia: int = Field(..., ge=0, le=1)
    obesity: int = Field(..., ge=0, le=1)

# Define prediction response model
class PredictionResponse(BaseModel):
    diabetesStatus: int
    recommendation: str
    probability: float

# Medical recommendation based on probability
def get_medical_recommendation(probability):
    if 0 <= probability < 0.3:
        return (
            "Low Risk: \nYour risk of diabetes is currently low. To maintain a healthy lifestyle, follow these guidelines:\n"
            "-Diet: Focus on whole grains, fresh fruits, vegetables, lean proteins, and healthy fats. Avoid processed and sugary foods.\n"
            "-Exercise: Engage in regular physical activity such as brisk walking, jogging, cycling, or swimming for at least 30 minutes, 5 days a week.\n"
            "-Lifestyle: Stay hydrated, get adequate sleep (7-8 hours per night), and manage stress with techniques like yoga or meditation.\n"
            "-Health Monitoring: Schedule regular check-ups to monitor your blood sugar levels and overall health."
        )
    elif 0.3 <= probability < 0.7:
        return (
            "-Moderate Risk: \nYour risk of diabetes is moderate. To reduce your risk, consider the following actions:\n"
            "-Diet: Reduce carbohydrate intake, particularly refined carbs, and increase fiber-rich foods like legumes and whole grains.\n"
            "-Exercise: Incorporate a mix of aerobic exercise and strength training. Aim for at least 150 minutes of moderate-intensity exercise per week.\n"
            "-Weight Management: If you are overweight, work towards a healthy weight by consulting a dietitian or using structured weight loss programs.\n"
            "-Lifestyle: Avoid smoking, limit alcohol consumption, and practice mindfulness to reduce stress.\n"
            "-Health Monitoring: Check your blood sugar levels more frequently and consult a healthcare provider if you notice unusual symptoms like frequent urination, extreme fatigue, or excessive thirst."
        )
    elif 0.7 <= probability <= 1:
        return (
            "High Risk: \nYour risk of diabetes is high. Immediate action is recommended to prevent complications:\n"
            "-Diet: Follow a strict low-glycemic diet under the guidance of a registered dietitian. Avoid sugary drinks, desserts, and high-carb foods.\n"
            "-Exercise: Engage in low-impact exercises like walking, cycling, or yoga to avoid putting too much stress on your body. Start slowly if you're not used to exercising.\n"
            "-Medical Advice: Schedule an appointment with your healthcare provider for a comprehensive evaluation. Medication or insulin therapy may be necessary.\n"
            "-Lifestyle: Implement stress management techniques like deep breathing or relaxation exercises. Avoid high-stress situations if possible.\n"
            "-Health Monitoring: Regularly monitor your blood glucose levels and watch for symptoms of high blood sugar, such as blurry vision or slow-healing wounds.\n"
            "-Support: Consider joining a diabetes support group or speaking with a counselor to manage the emotional aspects of living with a high risk of diabetes."
        )
    else:
        return "Invalid probability value. Please enter a probability between 0 and 1."


# Register user endpoint
@app.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user: User):
    try:
        # Log the incoming user data for debugging
        logger.info(f"Received registration data: {user.dict()}")

        # Check if email is already registered
        existing_user = await register_data_collection.find_one({"email": user.email})
        if existing_user:
            logger.warning(f"Email already registered: {user.email}")
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash the password
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

        # Insert new user into the database with the hashed password
        user_data = user.dict()
        user_data['password'] = hashed_password
        result = await register_data_collection.insert_one(user_data)
        logger.info(f"User registered successfully with ID: {result.inserted_id}")
        return {"message": "User registered successfully", "user": user}

    except Exception as e:
        logger.error(f"Error during registration: {e}")
        logger.debug(f"Exception details: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="An error occurred during registration")

# Login user endpoint
@app.post("/login", status_code=status.HTTP_200_OK)
async def login_user(login_data: LoginData):
    try:
        # Fetch the user document from the database
        user = await register_data_collection.find_one({"email": login_data.email})
        if not user:
            logger.warning(f"User not found: {login_data.email}")
            raise HTTPException(status_code=400, detail="Invalid email or password")

        # Verify password
        if not bcrypt.checkpw(login_data.password.encode('utf-8'), user['password']):
            logger.warning(f"Invalid password for email: {login_data.email}")
            raise HTTPException(status_code=400, detail="Invalid email or password")

        logger.info(f"User logged in successfully: {login_data.email}")
        return {"message": "Login successful", "user": user['email']}

    except Exception as e:
        logger.error(f"Error during login: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Login processing error.")

# Diabetes prediction endpoint
@app.post("/predict", response_model=PredictionResponse, status_code=status.HTTP_200_OK)
async def predict(data: DiabetesFormData):
    try:
        # Extract features
        features = np.array([[data.age, data.sex, data.polyuria, data.polydipsia,
                              data.suddenWeightLoss, data.weakness, data.polyphagia,
                              data.genitalThrush, data.visualBlurring, data.itching,
                              data.irritability, data.delayedHealing, data.partialParesis,
                              data.muscleStiffness, data.alopecia, data.obesity]])

        # Preprocess input
        features = preprocessing.transform(features)

        # Predict probability
        probability = float(model.predict_proba(features)[0][1])

        # Get recommendation
        recommendation = get_medical_recommendation(probability)

        # Save form data to MongoDB
        await diabetes_collection.insert_one(data.dict())

        return PredictionResponse(
            diabetesStatus=int(probability >= 0.5),
            recommendation=recommendation,
            probability=probability
        )

    except Exception as e:
        logger.error(f"Prediction error: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Prediction processing error.")
