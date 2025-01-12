# Generic Inventory: Microservices-based Project

**Author**: Harsh Agarwal 

---

## Table of Contents

1. [Introduction](#introduction)  
2. [Project Features & Mindset](#project-features--mindset)  
3. [Architecture Overview](#architecture-overview)  
4. [Tech Stack](#tech-stack)  
5. [Prerequisites & Requirements](#prerequisites--requirements)  
6. [Local Installation Without Docker](#local-installation-without-docker)  
   - [Mac/Linux Steps](#maclinux-steps-for-non-docker-installation)  
   - [Windows Steps](#windows-steps-for-non-docker-installation)  
7. [Local Installation With Docker](#local-installation-with-docker) 
8. [Running the Project](#running-the-project)  

---

## Introduction

Welcome to **Generic Inventory**—a personal project showcasing a **microservices architecture** with **FastAPI** (Python) for backend services and **React + Vite** for the frontend.
This project is a microservices-based system for managing a store's inventory and order processing. The Product Microservice handles product inventory by allowing you to create, update, retrieve, and delete product entries. It uses Redis as its primary data store via redis-om and communicates with other services through Redis Streams. For instance, when an order is placed, a listener (running in the background) will update the inventory accordingly.
The goal of this project is to demonstrate:

- **Scalability**: Splitting functionalities into separate, independently deployable services.  
- **Containerization**: Using Docker to package and run applications uniformly across environments.  
- **Messaging**: Employing **Redis Streams** for inter-service communication (e.g., updating product inventory on new orders).  
- **Production Mindset**: Integrating best practices in code structure, logging, testing, and deployment.

**This project includes:**
- A **Product** microservice (manages product inventory).
  - Handles product management (adding, updating, fetching, and deleting products).
  - Uses Redis for data persistence through the redis-om library.
  - Listens to events via Redis Streams to, for example, update product inventory when an order is processed.
  - Designed with scalability in mind, enabling each service to be updated or scaled independently.
    
- An **Order** microservice (handles order creation, completes and refunds orders using Redis Streams).
  - Responsible for processing customer orders.
  - Verifies product availability by querying the Product Microservice.
  - Uses background tasks and Redis Streams to update order status and trigger inventory updates or refunds.
    
- A **React/Vite** Frontend (UI) that interacts with these services via RESTful APIs.
  - A React application built with Vite that interacts with both microservices.
  - Provides a user interface to manage products and orders, making HTTP requests to the backend services.
    
**Theory Behind the Design:**

- Microservices Architecture: The system is split into separate services, each handling a specific domain (products and orders). This allows for better modularity, isolation, and scalability. In production, individual services can be scaled independently or even deployed using different technology stacks if needed.

- Redis for Data Persistence and Messaging:
  - Data Persistence: Using redis-om, this project leverages Redis as a fast and scalable data store for product and order data.
  - Messaging via Redis Streams: Event-driven communication between services is achieved using Redis Streams. For example, when an order is completed, an event is published that the Product Microservice listens to in order to update the stock levels accordingly.

- Containerization and Scalability: The project is designed with Docker in mind, making it easy to containerize, test, and deploy. Docker enables the project to run consistently across different environments (local, development, production), while docker-compose allows for managing multi-container setups.

---

## Project Features & Mindset

### What I Have Implemented
1. **Microservices**: Two separate FastAPI applications (Product and Order) plus a React-based UI.  
2. **Redis as a Data Store**:  
   - **redis-om** for storing and retrieving product and order data.  
   - **Redis Streams** for event-driven communication (inventory update events, refunds, etc.).  
3. **Scalability & Fault Tolerance**:  
   - Each service can be deployed and scaled independently, or replaced without impacting other services.  
   - Supervisord is used to run both the FastAPI app and the listener process in the Product microservice.  
4. **Dockerization**:  
   - Dockerfiles for each service, enabling containerized development and production.  
   - (Optional) docker-compose to orchestrate multi-container deployments locally.  
5. **Testing & Logging**:  
   - **pytest** for the Product service to ensure routes and logic are working.  
   - Basic logging for better observability.  

### Why I Implemented It
- **Learning**: To deepen my understanding of microservices, Docker, and distributed systems.  
- **Scalability**: Splitting the application by domain (product, order) makes it easier to scale.  
- **Clean Architecture**: Microservices keep codebases more organized, allowing for separate teams or processes in real-world scenarios.  
- **Interview Readiness**: To showcase production-level thinking—covering aspects like containerization, testing, logging, and environment-based configuration.

---

## Architecture Overview
- **UI**: React + Vite, hosted separately (e.g., Vercel, or local dev).  
- **Product Microservice**: Manages product data and inventory levels.  
- **Order Microservice**: Creates, completes, and refunds orders.  
- **Redis**:  
  - Stores product and order data via [redis-om](https://redis.io/docs/stack/python/redis-om/).  
  - Streams are used for communication (inventory update events, refunds).  

---

## Tech Stack

- **Backend**: Python 3.12, FastAPI, Redis OM, Supervisord  
- **Frontend**: React 18.3, Vite  
- **Database / Messaging**: Redis  
- **Containerization**: Docker, optional docker-compose  
- **Testing**: pytest, fastapi.testclient  

---

## Prerequisites & Requirements

1. **Git** installed.  
2. **Python** installed (version 3.8+ recommended) if running without Docker.  
3. **Node.js** and **npm** (or Yarn) installed for local UI setup if you’re not using Docker.  
4. **Docker** (optional) if you plan to run containers.  
   - **Mac/Linux**: Install Docker Desktop or [Docker Engine](https://docs.docker.com/engine/install/).  
   - **Windows**: Install Docker Desktop and enable WSL2 backend if needed.

---

## Local Installation Without Docker

This approach requires manual setup of each part: the UI, Product microservice, Order microservice, and a Redis instance.

> **Note**: You also need a local or remote Redis. For local testing, you can install Redis via Homebrew (macOS) or Windows installers, or reference a remote Redis server.

### Mac/Linux Steps for Non-Docker Installation

0. **Create a Directory**  
   ```bash
     mkdir Inventory
     cd Inventory
   ```
   - Follow commands given below.
   - Always execute commands while being in this directory only, until specified anything else.

1. **Clone the Repositories**  
   ```bash
     git clone https://github.com/Harsh-00/Inventory_Product_Microservice.git
     git clone https://github.com/Harsh-00/Inventory_Order_Microservice.git
     git clone https://github.com/Harsh-00/Inventory_UI.git
   ```
2. **Set Up the UI**  
   - By default, the UI is served at http://localhost:5173 (or the port Vite chooses).
     
   ```bash
     cd Inventory_UI
     npm install
     #
     # Create a .env file in the project root (if it doesn't already exist)
     # with the following content (update the values as needed):
     #
     #   VITE_PRODUCT_ENDPOINT=http://localhost:8000
     #   VITE_ORDER_ENDPOINT=http://localhost:8001
     #
     npm run dev
   ```
3. **Set Up Product Microservice**  
   ```bash
     cd Inventory_Product_Microservice
     python -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     #
     # Create a .env file in the project root (if it doesn't already exist)
     # with the following content (update the values as needed):
     # Using remote Redis ( use cloud based redis DB )
     #
     #   REDIS_ENDPOINT=your-redis-endpoint
     #   REDIS_PORT=your-redis-port
     #   REDIS_PASSWORD=your-redis-password
     #   FRONT_URL= "http://localhost:5173"
     #
     uvicorn main:app --host 0.0.0.0 --port 8000
   ```
4. **Set Up Order Microservice**  
   ```bash
     cd Inventory_Order_Microservice
     python -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     #
     # Create a .env file in the project root (if it doesn't already exist)
     # with the following content (update the values as needed):
     # Using remote Redis ( use cloud based redis DB )
     #
     #   REDIS_ENDPOINT=your-redis-endpoint
     #   REDIS_PORT=your-redis-port
     #   REDIS_PASSWORD=your-redis-password
     #   WAREHOUSE_URL = "http://localhost:8000"
     #   FRONT_URL= "http://localhost:5173"
     #
     uvicorn main:app --host 0.0.0.0 --port 8001
   ```
5. **Verify**
   - Open your browser to the UI: http://localhost:5173
   - Product Microservice: http://localhost:8000
   - Order Microservice: http://localhost:8001
     
### Windows Steps for Non-Docker Installation

0. **Create a Directory**  
   ```bash
     mkdir Inventory
     cd Inventory
   ```
   - Follow commands given below.
   - Always execute commands while being in this directory only, until specified anything else.

1. **Clone the Repositories**  
   ```bash
     git clone https://github.com/Harsh-00/Inventory_Product_Microservice.git
     git clone https://github.com/Harsh-00/Inventory_Order_Microservice.git
     git clone https://github.com/Harsh-00/Inventory_UI.git
   ```
2. **Set Up the UI**  
   - By default, the UI is served at http://localhost:5173 (or the port Vite chooses).
     
   ```bash
     cd Inventory_UI
     npm install
     npm run dev
   ```
3. **Set Up Product Microservice**  
   ```bash
     cd Inventory_Product_Microservice
     python -m venv venv
     .\venv\Scripts\activate
     pip install -r requirements.txt
     #
     # Create a .env file in the project root (if it doesn't already exist)
     # with the following content (update the values as needed):
     # Using remote Redis ( use cloud based redis DB )
     #
     #   REDIS_ENDPOINT=your-redis-endpoint
     #   REDIS_PORT=your-redis-port
     #   REDIS_PASSWORD=your-redis-password
     #   FRONT_URL= "http://localhost:5173"
     #
     uvicorn main:app --host 0.0.0.0 --port 8000
   ```
4. **Set Up Order Microservice**  
   ```bash
     cd Inventory_Order_Microservice
     python -m venv venv
     .\venv\Scripts\activate
     pip install -r requirements.txt
     #
     # Create a .env file in the project root (if it doesn't already exist)
     # with the following content (update the values as needed):
     # Using remote Redis ( use cloud based redis DB )
     #
     #   REDIS_ENDPOINT=your-redis-endpoint
     #   REDIS_PORT=your-redis-port
     #   REDIS_PASSWORD=your-redis-password
     #   WAREHOUSE_URL = "http://localhost:8000"
     #   FRONT_URL= "http://localhost:5173"
     #
     uvicorn main:app --host 0.0.0.0 --port 8001
   ```
5. **Verify**
   - Open your browser to the UI: http://localhost:5173
   - Product Microservice: http://localhost:8000
   - Order Microservice: http://localhost:8001

---

## Local Installation With Docker

This approach uses Docker to containerize each service and optionally uses docker-compose to orchestrate everything. It simplifies the setup significantly.
> **Note**: Same for both Mac/Linux and Windows Users. Ensure Docker Is Installed and Running

0. **Create a Directory**  
   ```bash
     mkdir Inventory
     cd Inventory
   ```
   - Follow commands given below.
   - Always execute commands while being in this directory only, until specified anything else.
   
1. **Clone the Repositories**  
   ```bash
     git clone https://github.com/Harsh-00/Inventory_Deployment.git
     git clone https://github.com/Harsh-00/Inventory_Product_Microservice.git
     git clone https://github.com/Harsh-00/Inventory_Order_Microservice.git
     git clone https://github.com/Harsh-00/Inventory_UI.git
   ```
2. **Build and Run Containers**
   - This command pulls up the UI, Product microservice, Order microservice within seprate containers.
     
   ```bash
     cd Inventory_Deployment
     docker-compose up --build
   ```
3. **Verify**
   - Open your browser to the UI: http://localhost:5173
   - Product Microservice: http://localhost:8000
   - Order Microservice: http://localhost:8001
     
4. **Stop Containers**
   - In the terminal where docker-compose up is running, press Ctrl + C.
   - Or run `docker-compose down` in a new terminal within the Inventory_Deployment directory.
   - Order Microservice: http://localhost:8001

---

## Running the Project
  - Once the UI and both microservices are up (via Docker or manual setup)
  1. **Open the UI**
       - http://localhost:5173
       - You’ll see a simple React interface with tabs for Products and Orders.
  2. **Test the Endpoints**
       - Product Microservice : http://localhost:8000/docs
       - Order Microservice : http://localhost:8001/docs
  3. **Interactions**
       - **Add or Update Products** via the Products tab in the UI.
       - **Place Orders** in the Orders tab. This triggers the Order microservice, which in turn updates the Product inventory via Redis Streams.
---
