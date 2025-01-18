from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend origin
    allow_credentials=True,  # Allow cookies or authentication
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all HTTP headers
)

mock_result = {
    "num_results": "3",
    "results": [
        {
        "type": "gdoc",
        "link": "https://docs.google.com",
        "name": "Document 1",
        "owner": "John Doe",
        "description": """
        This is a document about the history of the internet.
        This is a document about the history of the internet. 
        This is a document about the history of the internet.
        This is a document about the history of the internet.
        This is a document about the history of the internet. 
        This is a document about the history of the internet.
        """,
        "creation_date": "2021-09-01",
        },
        {
        "type": "gdoc",
        "link": "https://docs.google.com",
        "name": "Document 2",
        "owner": "Jane Smith",
        "description": "This is a document about the history of the internet as well.",
        "creation_date": "2021-09-02",
        },
        {
        "type": "gslide",
        "link": "https://slides.google.com",
        "name": "Presentation 1",
        "owner": "John Doe",
        "description": "This is a presentation about the history of the internet.",
        "creation_date": "2021-09-03",
        }
    ],
}

@app.get("/")
def root():
    time.sleep(2)
    return {"search_results": mock_result}