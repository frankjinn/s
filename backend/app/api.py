from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os


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
