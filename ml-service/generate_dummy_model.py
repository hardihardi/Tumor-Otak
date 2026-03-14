import torch
import torchvision.models as models
try:
    model = models.resnet50(pretrained=False)
    model.fc = torch.nn.Linear(model.fc.in_features, 4)
    torch.save(model, "brain_tumor_model.pt")
    print("Dummy model saved")
except Exception as e:
    print(f"Failed to generate model: {e}")
