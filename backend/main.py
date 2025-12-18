from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
import uvicorn
from typing import Optional, Literal
import re

app = FastAPI(title="Solid of Revolution Calculator")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VolumeRequest(BaseModel):
    function: str
    lower_bound: float
    upper_bound: float
    axis: Literal["x-axis", "y-axis"] = "x-axis"
    
    @validator('function')
    def validate_function(cls, v):
        # Sanitize input - only allow safe mathematical expressions
        allowed = re.compile(r'^[x0-9+\-*/().\s**sqrt()sincostanexplog]+$')
        if not allowed.match(v.replace(' ', '')):
            raise ValueError('Invalid function expression')
        return v
    
    @validator('upper_bound')
    def validate_bounds(cls, v, values):
        if 'lower_bound' in values and v <= values['lower_bound']:
            raise ValueError('Upper bound must be greater than lower bound')
        return v

@app.get("/")
def read_root():
    return {
        "message": "Solid of Revolution Calculator API",
        "endpoints": {
            "/api/volume": "POST - Calculate volume of solid of revolution",
            "/docs": "API documentation"
        }
    }

@app.post("/api/volume")
async def calculate_volume(request: VolumeRequest):
    try:
        from services.math_service import MathService
        from services.visualization_service import VisualizationService
        
        math_service = MathService()
        viz_service = VisualizationService()
        
        # Calculate volume
        result = math_service.calculate_volume(
            request.function,
            request.lower_bound,
            request.upper_bound,
            request.axis
        )
        
        # Generate visualization
        plot_data = viz_service.generate_plot(
            request.function,
            request.lower_bound,
            request.upper_bound,
            request.axis,
            result['volume_numerical']
        )
        
        return {
            "success": True,
            "volume_numerical": result['volume_numerical'],
            "volume_symbolic": result['volume_symbolic'],
            "integral_expression": result['integral_expression'],
            "function": request.function,
            "bounds": {
                "lower": request.lower_bound,
                "upper": request.upper_bound
            },
            "axis": request.axis,
            "plot_2d": plot_data['plot_2d'],
            "plot_3d": plot_data['plot_3d']
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)