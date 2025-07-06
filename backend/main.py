# backend/main.py

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
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

    print("\n--- Backend Received Data ---")
    print(f"Received {num_nodes} nodes and {num_edges} edges.")
    print("Nodes Payload:", [n.model_dump() for n in pipeline.nodes]) 
    print("Edges Payload:", [e.model_dump() for e in pipeline.edges]) 
    print("---------------------------\n")

    is_dag = True # Default for empty graphs or if logic below doesn't run

    if num_nodes > 0:
        graph = nx.DiGraph() # Create a directed graph

        # Add nodes to the graph
        for node in pipeline.nodes:
            graph.add_node(node.id)
            print(f"Added node to graph: {node.id}")

        # Add edges to the graph
        for edge in pipeline.edges:
            # Ensure source and target nodes exist in the graph before adding edge
            if graph.has_node(edge.source) and graph.has_node(edge.target):
                graph.add_edge(edge.source, edge.target)
                print(f"Added edge to graph: {edge.source} -> {edge.target}")
            else:
                print(f"Skipping edge {edge.id}: Source ({edge.source}) or Target ({edge.target}) node not found in graph.")


        print("\n--- NetworkX Graph State ---")
        print("Graph Nodes:", list(graph.nodes))
        print("Graph Edges:", list(graph.edges)) # This will show (source, target) tuples
        print("----------------------------\n")

        is_dag = nx.is_directed_acyclic_graph(graph)
        print(f"Final DAG Check Result: {is_dag}")

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }