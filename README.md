# VectorShift Frontend Technical Assessment

A React-based node editor with drag-and-drop functionality for building pipelines, complete with a FastAPI backend for pipeline analysis.

## 🚀 Features

- **Node-based Pipeline Editor**: Drag and drop interface for creating workflows
- **Dynamic Node System**: Abstracted node architecture for easy extensibility
- **Variable Detection**: Auto-generates input handles from text variables (e.g., `{{ variable }}`)
- **Responsive Design**: Modern, appealing UI with unified styling
- **Backend Integration**: Real-time pipeline analysis and validation
- **DAG Detection**: Automatically detects directed acyclic graphs
- **Real-time Updates**: Dynamic node resizing and handle management

## 📁 Project Structure

```
frontend_technical_assessment/
├── README.md
├── VectorShift - Frontend Technical Assessment Instructions.pdf
├── backend/
│   ├── main.py                 # FastAPI backend with pipeline parsing
│   └── __pycache__/
└── frontend/
    ├── package.json
    ├── public/
    │   ├── index.html
    │   ├── favicon.ico
    │   └── ...
    └── src/
        ├── App.js              # Main application component
        ├── index.js            # React entry point
        ├── store.js            # Zustand state management
        ├── toolbar.js          # Node toolbar component
        ├── ui.js               # Main ReactFlow UI
        ├── submit.js           # Pipeline submission logic
        ├── draggableNode.js    # Draggable node component
        ├── index.css           # Global styles
        └── nodes/
            ├── BaseNode.js     # Abstract base node class
            ├── inputNode.js    # Input node implementation
            ├── outputNode.js   # Output node implementation
            ├── textNode.js     # Text node with variable detection
            ├── llmNode.js      # LLM node implementation
            ├── APINode.js      # API node implementation
            ├── ConditionalNode.js # Conditional logic node
            ├── DatabaseNode.js # Database node implementation
            ├── ImageNode.js    # Image processing node
            └── MergeNode.js    # Data merge node
```

## 🏗️ Architecture Diagram

### System Architecture Flow

![Architecture Diagram](./frontend/public/Architecture%20Diagram.png)

*Complete system architecture showing the integration between React frontend, FastAPI backend, and the node processing pipeline with tech stack relationships.*

## 🛠️ Prerequisites

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

## 🚀 Quick Start

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn networkx pydantic
   ```

3. Start the FastAPI server:
   ```bash
   python -m uvicorn main:app --reload
   ```

The backend API will be available at `http://localhost:8000`

## 🎯 Core Components

### Node Abstraction System

The project implements a flexible node abstraction through the `BaseNode` class:

- **Consistent Interface**: All nodes inherit from `BaseNode` for uniform behavior
- **Easy Extension**: New node types can be created by extending the base class
- **Dynamic Styling**: Unified styling system across all node types
- **Handle Management**: Automatic input/output handle generation

### Supported Node Types

1. **Input Node**: Data entry point for pipelines
2. **Output Node**: Data output endpoint
3. **Text Node**: Text processing with variable detection
4. **LLM Node**: Language model integration
5. **API Node**: External API communication
6. **Conditional Node**: Logic branching
7. **Database Node**: Database operations
8. **Image Node**: Image processing
9. **Merge Node**: Data combination

### Variable Detection

The Text node features intelligent variable detection:
- Detects variables in format `{{ variableName }}`
- Automatically creates input handles
- Dynamic handle management
- Real-time node resizing

## 🔧 Technical Implementation

### Frontend Architecture

- **React 18**: Modern React with hooks
- **ReactFlow**: Node-based editor foundation
- **Zustand**: Lightweight state management
- **CSS3**: Modern styling with flexbox/grid

### Backend Architecture

- **FastAPI**: High-performance Python web framework
- **NetworkX**: Graph analysis and DAG detection
- **Pydantic**: Data validation and serialization
- **CORS**: Cross-origin resource sharing support

### Key Features

1. **Pipeline Analysis**:
   - Node and edge counting
   - DAG validation
   - Graph structure analysis

2. **Dynamic UI**:
   - Responsive node sizing
   - Auto-generated handles
   - Real-time updates

3. **Modern Design**:
   - Clean, professional interface
   - Consistent styling
   - Intuitive user experience

## 📊 API Endpoints

### Backend API

- `GET /`: Health check endpoint
- `POST /pipelines/parse`: Pipeline analysis endpoint

#### Pipeline Parse Response
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## 🎨 Design System

The application features a modern, unified design with:

- **Color Palette**: Professional blue and gray tones
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle depth with box-shadows
- **Responsive**: Mobile-friendly design

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
python -m pytest
```

## 📦 Dependencies

### Frontend Dependencies
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `reactflow`: ^11.8.3
- `zustand`: State management
- `react-scripts`: Build tools

### Backend Dependencies
- `fastapi`: Web framework
- `uvicorn`: ASGI server
- `networkx`: Graph analysis
- `pydantic`: Data validation

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
```

### Backend Deployment
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the VectorShift technical assessment.

## 🔗 Links

- [VectorShift](https://vectorshift.ai)
- [ReactFlow Documentation](https://reactflow.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

Built with ❤️ for the VectorShift technical assessment
