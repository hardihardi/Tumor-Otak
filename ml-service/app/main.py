from fastapi import FastAPI, UploadFile, HTTPException
import torch
from PIL import Image
import torchvision.transforms as transforms
import io
import os

app = FastAPI(title="Brain Tumor Detection ML Service")

MODEL_PATH = "brain_tumor_model.pt"

model = None

def get_model():
    global model
    if model is None:
        if os.path.exists(MODEL_PATH):
            try:
                model = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
                model.eval()
            except Exception as e:
                print(f"Error loading model: {e}")
        else:
            print("Model file not found. Running in mock mode.")
    return model

transform_pipeline = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/predict")
async def predict_mri(file: UploadFile):
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert('RGB')
    except Exception as error:
        raise HTTPException(status_code=400, detail="Invalid MRI image format")

    tensor = transform_pipeline(image).unsqueeze(0)

    current_model = get_model()
    if current_model is None:
        import random
        return {
            "prediction": random.randint(0, 3),
            "confidence": random.uniform(0.8, 0.99),
            "mock": True
        }

    with torch.no_grad():
        prediction = current_model(tensor)
        probabilities = torch.nn.functional.softmax(prediction[0], dim=0)
        conf, pred = torch.max(probabilities, dim=0)

    return {
        "prediction": pred.item(),
        "confidence": conf.item(),
        "classes": ["Glioma", "Meningioma", "Pituitary", "No Tumor"]
    }
