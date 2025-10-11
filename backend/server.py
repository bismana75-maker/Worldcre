from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact/Profile Models
class ContactInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    location: str
    title: str
    signature: str = ""
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactInfoCreate(BaseModel):
    name: str
    email: str
    phone: str
    location: str
    title: str
    signature: str = ""

class ContactInfoUpdate(BaseModel):
    name: str = None
    email: str = None
    phone: str = None
    location: str = None
    title: str = None
    signature: str = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact/Profile endpoints
@api_router.get("/contact", response_model=ContactInfo)
async def get_contact_info():
    """Get current contact information"""
    contact = await db.contact_info.find_one({"active": True}, {"_id": 0})
    
    if not contact:
        # Return default contact info if none exists
        default_contact = ContactInfo(
            name="Worldcreation",
            email="Worldcreation@gmail.com",
            phone="0745485037",
            location="Île-de-France, France",
            title="Créateur d'Expériences Web",
            signature=""
        )
        
        # Save default to database
        doc = default_contact.model_dump()
        doc['updated_at'] = doc['updated_at'].isoformat()
        doc['active'] = True
        await db.contact_info.insert_one(doc)
        
        return default_contact
    
    # Convert ISO string timestamp back to datetime
    if isinstance(contact['updated_at'], str):
        contact['updated_at'] = datetime.fromisoformat(contact['updated_at'])
    
    return ContactInfo(**contact)

@api_router.put("/contact", response_model=ContactInfo)
async def update_contact_info(contact_update: ContactInfoUpdate):
    """Update contact information"""
    # Get current contact info
    current_contact = await db.contact_info.find_one({"active": True})
    
    if not current_contact:
        # If no contact exists, create a new one with provided data
        new_contact_data = {
            "name": contact_update.name or "Worldcreation",
            "email": contact_update.email or "Worldcreation@gmail.com",
            "phone": contact_update.phone or "0745485037",
            "location": contact_update.location or "Île-de-France, France",
            "title": contact_update.title or "Créateur d'Expériences Web",
            "signature": contact_update.signature or ""
        }
        new_contact = ContactInfo(**new_contact_data)
    else:
        # Update existing contact with provided fields
        update_data = {}
        if contact_update.name is not None:
            update_data['name'] = contact_update.name
        if contact_update.email is not None:
            update_data['email'] = contact_update.email
        if contact_update.phone is not None:
            update_data['phone'] = contact_update.phone
        if contact_update.location is not None:
            update_data['location'] = contact_update.location
        if contact_update.title is not None:
            update_data['title'] = contact_update.title
        if contact_update.signature is not None:
            update_data['signature'] = contact_update.signature
            
        # Merge with existing data
        current_contact.update(update_data)
        current_contact['updated_at'] = datetime.now(timezone.utc)
        new_contact = ContactInfo(**current_contact)
    
    # Deactivate old records
    await db.contact_info.update_many({"active": True}, {"$set": {"active": False}})
    
    # Save updated contact
    doc = new_contact.model_dump()
    doc['updated_at'] = doc['updated_at'].isoformat()
    doc['active'] = True
    await db.contact_info.insert_one(doc)
    
    return new_contact

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()