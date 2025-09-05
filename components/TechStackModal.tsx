import React from 'react';

type TechStackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const TechStackModal = ({ isOpen, onClose }: TechStackModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content tech-stack-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close project info">×</button>
        <h2>Project Info</h2>
        
        <section>
          <h3>Running This Project Locally</h3>
          <p>To run the project from its GitHub repository, follow these steps:</p>
          <ol>
            <li>
              <strong>Clone the Repository:</strong>
              <pre><code>git clone https://github.com/Bharath136/grocery-webapp</code></pre>
            </li>
            <li>
              <strong>Install Dependencies:</strong>
              <pre><code>cd grocery-webapp<br/>npm install</code></pre>
            </li>
            <li>
              <strong>Start the Development Server:</strong>
              <pre><code>npm run dev</code></pre>
              <p>The app will be accessible at <a href="http://localhost:5100" target="_blank" rel="noopener noreferrer">http://localhost:5100</a>.</p>
            </li>
          </ol>
          <h4>Helpful Links:</h4>
          <ul>
            <li><a href="https://github.com/Bharath136/grocery-webapp" target="_blank" rel="noopener noreferrer">Project Repository Link</a></li>
            <li><a href="https://drive.google.com/file/d/1KTGK0XZj0XWOiDeNKJVRKQHXLyVWZYLM/view?usp=sharing" target="_blank" rel="noopener noreferrer">Video Tutorial for Cloning</a></li>
          </ul>
        </section>

        <section>
            <h3>Full-Stack Prerequisites</h3>
            <p>To build a full-stack version of this application, you would typically need the following technologies:</p>
            <h4>Backend</h4>
            <ul>
                <li><strong>Node.js and npm:</strong> Server-side JavaScript runtime.</li>
                <li><strong>Express.js:</strong> Web application framework for Node.js.</li>
            </ul>
            <h4>Database</h4>
            <ul>
                <li><strong>MongoDB:</strong> NoSQL database for storing application data.</li>
                <li><strong>Mongoose:</strong> ODM library to connect Node.js with MongoDB.</li>
            </ul>
            <h4>Frontend</h4>
            <ul>
                <li><strong>React (or Angular):</strong> This version uses React. Angular is another popular choice.</li>
                <li><strong>HTML, CSS, and JavaScript:</strong> The foundational languages of the web.</li>
            </ul>
             <h4>Development Tools</h4>
            <ul>
                <li><strong>Git:</strong> Version control system.</li>
                <li><strong>Code Editor:</strong> VS Code, Sublime Text, or WebStorm.</li>
            </ul>
        </section>
        
        <section>
          <h3>Project Development Flow</h3>
          <p>Building a full-stack application like this involves several key stages:</p>
          
          <h4>1. Frontend Development</h4>
          <p>This involves building the user interface (UI) and visual elements. It focuses on creating an intuitive and engaging user experience.</p>
          <p>To set up the frontend and connect Node.js with a MongoDB Database, check out this video tutorial: <a href="https://drive.google.com/file/d/1b5bMvnqmASXLnSZ74B2t3EzNjuWHj63g/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Frontend Setup & DB Connection Video</a></p>
          <h5>Key Frontend Features:</h5>
          <ul>
            <li><strong>User Interface (UI) Design:</strong> Create a visually appealing and consistent design using modern principles (typography, color, spacing). Use tools like Figma or Sketch for wireframes and mockups.</li>
            <li><strong>Responsive Design:</strong> Utilize CSS media queries to ensure the app looks great on all devices, from desktops to mobile phones.</li>
            <li><strong>Product Catalog:</strong> A product listing page displaying images, titles, prices, and descriptions, with search, filtering, and sorting functionality.</li>
            <li><strong>Shopping Cart and Checkout Process:</strong> A cart component to add, view, and manage items, followed by a multi-step checkout process for shipping and payment.</li>
            <li><strong>Payment Integration:</strong> Integrate with a payment gateway like Stripe or PayPal. Implement a secure payment flow and handle transaction success/failure scenarios.</li>
            <li><strong>User Authentication:</strong> Implement a user registration and login system, with profile pages for users to manage their information and view order history.</li>
          </ul>

          <h4>2. Backend Development</h4>
          <p>Backend development involves building the server-side components and logic of the online shopping web application. It focuses on handling the business logic, processing requests from the front end, and interacting with the database. The following activities are part of the backend development process:</p>
          <h5>Set Up Project Structure:</h5>
          <ul>
            <li>Create a new directory for your project and set up a package.json file using npm init command.</li>
            <li>Install necessary dependencies such as Express.js, Mongoose, and other required packages.</li>
          </ul>
          <h5>Database Configuration:</h5>
          <ul>
            <li>Set up a MongoDB database either locally or using a cloud-based MongoDB service like MongoDB Atlas.</li>
            <li>Create a database and define the necessary collections for hotels, users, bookings, and other relevant data.</li>
          </ul>
          <h5>Create Express.js Server:</h5>
          <ul>
            <li>Set up an Express.js server to handle HTTP requests and serve API endpoints.</li>
            <li>Configure middleware such as body-parser for parsing request bodies and cors for handling cross-origin requests.</li>
          </ul>
          <h5>Define API Routes:</h5>
          <ul>
            <li>Create separate route files for different API functionalities such as hotels, users, bookings, and authentication.</li>
            <li>Define the necessary routes for listing hotels, handling user registration and login, managing bookings, etc.</li>
            <li>Implement route handlers using Express.js to handle requests and interact with the database.</li>
          </ul>
          <h5>Implement Data Models:</h5>
          <ul>
            <li>Define Mongoose schemas for the different data entities like hotels, users, and bookings.</li>
            <li>Create corresponding Mongoose models to interact with the MongoDB database.</li>
            <li>Implement CRUD operations (Create, Read, Update, Delete) for each model to perform database operations.</li>
          </ul>
          <h5>API Design and Development:</h5>
          <ul>
            <li>Identify the necessary functionality and data required by the frontend.</li>
            <li>Design a set of RESTful APIs using a framework like Express.js or Django REST Framework.</li>
            <li>Define API endpoints for user management, product catalog, shopping cart, order management, payment gateway integration, shipping integration, etc.</li>
            <li>Implement the API routes, controllers, and data models to handle the corresponding operations.</li>
            <li>Ensure that the APIs follow best practices, are secure, and provide appropriate responses.</li>
          </ul>
          <h5>User Management and Authentication:</h5>
          <ul>
            <li>Implement user registration and login functionality.</li>
            <li>Choose an authentication mechanism like session-based authentication or token-based authentication (e.g., JWT).</li>
            <li>Store and hash user credentials securely.</li>
            <li>Implement middleware to authenticate API requests and authorize access to protected routes.</li>
          </ul>
          <h5>Product Catalog and Inventory Management:</h5>
          <ul>
            <li>Design the database schema to store product details, pricing, availability, and inventory levels.</li>
            <li>Create APIs to retrieve product information, update inventory quantities, and handle search and filtering.</li>
            <li>Implement validations to ensure data integrity and consistency.</li>
          </ul>
          <h5>Shopping Cart and Order Management:</h5>
          <ul>
            <li>Design the database schema to store shopping cart details and order information.</li>
            <li>Create APIs to handle cart operations like adding items, modifying quantities, and placing orders.</li>
            <li>Implement logic to calculate totals, apply discounts, and manage the order lifecycle.</li>
          </ul>
          <h5>Payment Gateway Integration:</h5>
          <ul>
            <li>Choose a suitable payment gateway provider (e.g., Stripe, COD).</li>
            <li>Integrate the payment gateway SDK or API to handle secure payment processing.</li>
            <li>Implement APIs or callback endpoints to initiate transactions, handle payment callbacks, and receive payment confirmation.</li>
          </ul>
          <h5>Shipping and Logistics Integration:</h5>
          <ul>
            <li>Identify shipping and logistics providers that align with your application's requirements.</li>
            <li>Utilize the APIs provided by these providers to calculate shipping costs, generate shipping labels, and track shipments.</li>
            <li>Implement APIs or services to fetch rates, generate labels, and obtain tracking information.</li>
          </ul>
          <h5>Database Integration:</h5>
          <ul>
            <li>Choose a suitable database technology (e.g., MySQL, PostgreSQL, MongoDB) based on your application's requirements.</li>
            <li>Design the database schema to efficiently store and retrieve flower and gift delivery data.</li>
            <li>Establish a connection to the database and handle data persistence and retrieval.</li>
          </ul>
          <h5>External Service Integration:</h5>
          <ul>
            <li>Identify third-party services like email service providers, analytics services, or CRM systems that are required for your application.</li>
            <li>Utilize the APIs or SDKs provided by these services to exchange data and perform necessary operations.</li>
            <li>Implement the integration logic to send order confirmations, track user behavior, or manage customer relationships.</li>
          </ul>
          <h5>Security and Data Protection:</h5>
          <ul>
            <li>Apply appropriate security measures like encryption techniques for secure data transmission and storage.</li>
            <li>Implement input validation and sanitization to prevent common security vulnerabilities.</li>
            <li>Implement access control to ensure authorized access to sensitive data.</li>
          </ul>
          <h5>Error Handling and Logging:</h5>
          <ul>
            <li>Implement error handling mechanisms to handle exceptions and provide meaningful error messages to the frontend.</li>
            <li>Use logging frameworks to record application logs for monitoring and troubleshooting purposes.</li>
          </ul>

          <h4>3. Integration</h4>
          <p>Integration is the process of combining and connecting the frontend and backend components of the online grocery web application to create a unified and fully functional system. It involves establishing communication channels, exchanging data, and ensuring seamless interaction between the frontend UI and backend APIs. The following activities are part of the integration process:</p>
          <ul>
            <li><strong>API Consumption:</strong> Connecting the frontend components to the backend RESTful APIs to fetch and display data (e.g., product lists, user details).</li>
            <li><strong>Data Flow Implementation:</strong> Ensuring that data from user actions (like adding to cart or submitting a review) is correctly sent to the backend, processed, and stored in the database.</li>
            <li><strong>Authentication & Authorization:</strong> Integrating the frontend login and registration forms with backend authentication endpoints, and managing user sessions or tokens to protect routes.</li>
            <li><strong>End-to-End Testing:</strong> Performing comprehensive testing of complete user workflows (e.g., from browsing to checkout) to identify and fix issues between the client and server.</li>
            <li><strong>CORS Configuration:</strong> Handling Cross-Origin Resource Sharing policies on the backend to allow the frontend application to make secure API requests.</li>
            <li><strong>Environment Configuration:</strong> Setting up environment variables for both frontend and backend to manage API URLs, database connections, and other sensitive information for different stages like development and production.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};