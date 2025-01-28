from sqlalchemy import create_engine, Column, String, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import DATABASE_URL

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserCredentials(Base):
    __tablename__ = "user_credentials"
    
    user_id = Column(String, primary_key=True, index=True)
    auth_token = Column(String, nullable=False, comment="Stores Google Drive auth token")
    refresh_token = Column(
        String, 
        nullable=False,
        comment="Stores Google Drive refresh token"
    )    

Base.metadata.create_all(bind=engine)
