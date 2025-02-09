#import nest-asyncio
#nest_asyncio.apply()


from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import yolo

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)



@app.post("/predict")
#image: or file:
async def predict(image: UploadFile = File(...)):
    image_bytes = await image.read()
    json_results, img_byte_arr = yolo.predict(image_bytes)

    if "error" in json_results:
        raise HTTPException(status_code=400, detail=json_results["error"])

    return {
        "results": json_results,
        "image": img_byte_arr.decode('ISO-8859-1')  # Convert bytes to a string for JSON serialization
    }


@app.get("/image")
async def get_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    _, img_byte_arr = yolo.predict(image_bytes)
    return StreamingResponse(io.BytesIO(img_byte_arr), media_type="image/png")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)