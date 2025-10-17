# 🌐 HTML5/JS REST Client - Blueprints Management System (ARSW)

## 👥 **Team Members**

- [Jesús Alfonso Pinzón Vega](https://github.com/JAPV-X2612)
- [David Felipe Velásquez Contreras](https://github.com/DavidVCAI)

---

## 📚 **Project Overview**

This project implements a comprehensive **Blueprints Management System** built with **HTML5**, **JavaScript**, **CSS3**, and **Spring Boot**. The system provides a modern web interface for managing architectural blueprints with interactive canvas drawing capabilities and full CRUD operations.

### 🎯 **Project Objectives**

- Build a **fat client** web application consuming REST APIs
- Implement **HTML5 Canvas** for interactive blueprint drawing
- Use **JavaScript Promises** for asynchronous operation management
- Create a **responsive user interface** with Bootstrap integration
- Develop **RESTful web services** with Spring Boot
- Apply **modern web development patterns** and best practices

---

## 📖 **Documentation Structure**

This project is documented in two main parts:

### 📋 **Part I: Foundation Implementation**
**Document:** [README_PART_1.md](README_PART_1.md)

**Covers:**
- ✅ Project setup and architecture design
- ✅ HTML5 foundation with WebJars integration
- ✅ JavaScript Module Pattern implementation
- ✅ Basic blueprint visualization and management
- ✅ REST API integration with Spring Boot
- ✅ Functional programming with map/reduce operations
- ✅ Initial canvas drawing implementation

### 📋 **Part II: Interactive Enhancement**
**Document:** [README_PART_2.md](README_PART_2.md)

**Covers:**
- ✅ HTML5 Canvas pointer events and cross-platform compatibility
- ✅ Interactive blueprint editing with real-time updates
- ✅ JavaScript Promises for asynchronous CRUD operations
- ✅ Complete Create, Update, Delete functionality
- ✅ Backend API enhancement with DELETE endpoints
- ✅ Advanced user interface with context-sensitive controls
- ✅ Error handling and state synchronization

---

## 🚀 **Quick Start**

### **Prerequisites**
- Java 8+ installed
- Maven 3.6+ installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### **Running the Application**

```bash
# Clone the repository
git clone https://github.com/DavidVCAI/LAB7-HTML5-JS_REST_CLIENT_Blueprints-2.git

# Navigate to project directory
cd LAB7-HTML5-JS_REST_CLIENT_Blueprints-2

# Build and run the application
mvn spring-boot:run

# Access the application
# Open browser at: http://localhost:8080
```

### **Expected Output**
```
Started BlueprintsAPIApplication in X.XXX seconds
Tomcat started on port(s): 8080 (http)
```

---

## 🏗️ **Architecture Overview**

```
┌─────────────────────────────────────┐
│       Frontend (Web Browser)        │
│  ┌─────────────────────────────┐    │
│  │        HTML5 UI             │    │
│  │  - Interactive Canvas       │    │
│  │  - Bootstrap Styling        │    │
│  │  - Responsive Design        │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │     JavaScript Engine       │    │
│  │  - Module Pattern           │    │
│  │  - Promise-based CRUD       │    │
│  │  - Event-driven UI          │    │
│  │  - Canvas Drawing API       │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
              │ HTTP/JSON
              │ REST API
┌─────────────▼───────────────────────┐
│      Backend (Spring Boot)          │
│  ┌─────────────────────────────┐    │
│  │    REST Controllers         │    │
│  │  - GET /blueprints          │    │
│  │  - POST /blueprints         │    │
│  │  - PUT /blueprints/{id}     │    │
│  │  - DELETE /blueprints/{id}  │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │    Business Services        │    │
│  │  - Blueprint Management     │    │
│  │  - Filtering & Validation   │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │   Persistence Layer         │    │
│  │  - In-Memory Storage        │    │
│  │  - Thread-safe Operations   │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## 🎯 **Key Features**

### ✅ **Frontend Capabilities**
- **Interactive Canvas Drawing** with HTML5 Canvas API
- **Cross-platform Event Handling** (mouse, touch, pen)
- **Real-time Blueprint Visualization** with connected line segments
- **Promise-based Asynchronous Operations** for smooth UX
- **Responsive Bootstrap UI** with professional styling
- **Context-sensitive Controls** adapting to application state

### ✅ **Backend Capabilities**
- **RESTful API Design** following HTTP standards
- **Complete CRUD Operations** for blueprint management
- **Thread-safe Data Persistence** with concurrent operations
- **Comprehensive Error Handling** with appropriate HTTP status codes
- **Layered Architecture** with clear separation of concerns
- **Spring Boot Integration** with auto-configuration

### ✅ **Technical Achievements**
- **Module Pattern Implementation** for clean JavaScript architecture
- **Functional Programming** with map/reduce operations
- **Event-driven Programming** with proper event handling
- **Promise Chaining** for complex asynchronous workflows
- **State Management** across multiple UI components
- **Cross-browser Compatibility** with fallback mechanisms

---

## 📊 **Project Statistics**

| Category | Count | Details |
|----------|--------|---------|
| **Frontend Files** | 4 | HTML, CSS, 2x JavaScript modules |
| **Backend Classes** | 8 | Controllers, Services, Models, Persistence |
| **REST Endpoints** | 6 | Complete CRUD operations |
| **JavaScript Functions** | 15+ | Modular architecture with clear responsibilities |
| **Test Scenarios** | 10+ | Comprehensive functionality testing |
| **Browser Support** | Modern | Chrome, Firefox, Safari, Edge |

---

## 🏆 **Learning Outcomes**

This project successfully demonstrates:

✅ **Modern Web Development** - HTML5, CSS3, JavaScript ES5+  
✅ **REST API Design** - RESTful services with Spring Boot  
✅ **Asynchronous Programming** - Promises and callback patterns  
✅ **Interactive Graphics** - HTML5 Canvas with event handling  
✅ **Responsive Design** - Bootstrap integration and mobile support  
✅ **Software Architecture** - Layered design with separation of concerns  
✅ **Error Handling** - Comprehensive validation and user feedback  
✅ **State Management** - Consistent application state across components  

---

## 📝 **Additional Resources**

- **Screenshot Guide:** [SCREENSHOT_GUIDE.md](SCREENSHOT_GUIDE.md) - Detailed guide for capturing project screenshots
- **Part I Documentation:** [README_PART_1.md](README_PART_1.md) - Foundation implementation details
- **Part II Documentation:** [README_PART_2.md](README_PART_2.md) - Interactive enhancement details

---

## 👨‍💻 **Development Team**

**Jesús Alfonso Pinzón Vega**  
- Frontend JavaScript development
- Canvas drawing implementation  
- User interface design

**David Felipe Velásquez Contreras**  
- Backend Spring Boot development
- REST API design and implementation
- System architecture and documentation

---

**🏁 Project completed successfully with full CRUD functionality and interactive canvas drawing capabilities.**