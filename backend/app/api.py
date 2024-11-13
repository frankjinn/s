from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel  # Add this line
import json
import os
from app.coverage_checker import CoverageChecker

app = FastAPI()
todos = [{"id": "1", "item": "Read a book."}, {"id": "2", "item": "Cycle around town."}]

# print(os.path.dirname(os.path.realpath(__file__)))
# with open("./exampleUser.json") as f:
#     data = json.load(f)

origins = ["http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load policy and user databases at startup
with open("./examplePolicy.json", "r") as file:
    policy_database = json.load(file)

with open("./exampleUser.json", "r") as file:
    user_database = json.load(file)


class CoverageRequest(BaseModel):
    member_id: str
    procedure: str
    procedure_cost: float

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": todos}


@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    return {"data": todos}


@app.post("/todo", tags=["todos"])
async def add_todo(todo: dict) -> dict:
    todos.append(todo)
    return {"data": {"Todo added."}}


@app.get("/loadUsers", tags=["loadUsers"])
async def get_users() -> dict:
    print(os.path.dirname(os.path.realpath(__file__)))
    with open("./exampleUser.json") as f:
        file = json.load(f)
        print(file)
    return {"userList": file}


@app.post("/calculateCoverage", tags=["coverage"])
async def calculate_coverage(request: CoverageRequest):
    # Find user info based on member_id
    user_info = next((user for user in user_database if user["MemberID"] == request.member_id), None)
    if not user_info:
        raise HTTPException(status_code=404, detail=f"User with MemberID {request.member_id} not found.")

    # Check if the policy matches
    policy_num = user_info["PolicyNum"]
    if policy_database.get("PolicyNumber") != policy_num:
        raise HTTPException(status_code=404, detail=f"Policy with PolicyNum {policy_num} not found for user {user_info['Name']}.")

    # Instantiate CoverageChecker and calculate coverage
    coverage_checker = CoverageChecker(policy_database, user_info)
    result = coverage_checker.check_coverage(request.procedure, request.procedure_cost)
    return {"coverage": result}