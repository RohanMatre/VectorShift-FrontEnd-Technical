# Copied from backend/main.py for Vercel serverless function
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class NodeData(BaseModel):
    nodeType: str
    id: str
    text: str = None

class Node(BaseModel):
    id: str
    type: str
    data: NodeData

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelinePayload(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: PipelinePayload):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    is_dag = True

    if num_nodes > 0:
        graph = nx.DiGraph()
        for node in pipeline.nodes:
            graph.add_node(node.id)
        for edge in pipeline.edges:
            if graph.has_node(edge.source) and graph.has_node(edge.target):
                graph.add_edge(edge.source, edge.target)
        is_dag = nx.is_directed_acyclic_graph(graph)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
