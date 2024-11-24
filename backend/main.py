import logging
import colorlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import setup_db
from app.api.routes import main as routes
from contextlib import asynccontextmanager

# Create a colorized formatter
formatter = colorlog.ColoredFormatter(
    # "%(log_color)s%(asctime)s - %(levelname)s - %(message)s",
    "%(log_color)s%(levelname)s - %(message)s",
    log_colors={
        "DEBUG": "cyan",
        "INFO": "green",
        "WARNING": "yellow",
        "ERROR": "red",
        "CRITICAL": "bold_red",
    },
    datefmt="%Y-%m-%d %H:%M:%S"
)

# Set up handler and root logger
handler = logging.StreamHandler()
handler.setFormatter(formatter)

logging.basicConfig(
    level=logging.INFO,
    handlers=[handler]
)

# Reduce verbosity for specific libraries
logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
logging.getLogger("uvicorn").setLevel(logging.WARNING)

logger = logging.getLogger("app_logger")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup event
    logger.info("Starting application...")
    setup_db()
    logger.info("Database setup complete!")
    yield
    # Shutdown event
    logger.info("Shutting down application...")

app = FastAPI(
    title="APP_NAME",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

app.include_router(routes.api_router)
