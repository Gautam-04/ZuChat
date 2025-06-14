# ZuChat 🌍 – Encrypted Chat Application

**ZuChat** is a secure, end-to-end encrypted messaging platform designed for private and real-time communication. Built with **React.js**, **Node.js**, and **AWS Cloud Services**, it ensures message confidentiality, performance, and scalability with modern cloud infrastructure.

## 🔐 Features

- **End-to-End Encryption (E2EE)** – AES-256 encrypted messages readable only by sender and receiver
- **Group Chat Security** – Encrypted symmetric key for private group conversations
- **Real-Time Messaging** – Powered by WebSockets using Socket.io
- **Encrypted File Sharing** – Files encrypted client-side and stored securely on S3
- **Self-Destructing Messages** – Optional message auto-deletion with TTL in DynamoDB
- **User Authentication** – Secure login and JWT session management
- **Analytics & Engagement** – Real-time metrics using AWS Pinpoint
- **Scalable Cloud Infrastructure** – Auto-scaling with AWS Fargate & EC2

---

## 🧱 System Architecture

### AWS Integration

| Component         | Service/Technology                   |
|------------------|---------------------------------------|
| Frontend          | React.js, Chakra UI (Hosted on S3)   |
| Backend           | Node.js, Socket.io (EC2, Vercel )    |
| Database          | Amazon DynamoDB, Amazon RDS          |
| Storage           | Amazon S3                            |
| Analytics         | AWS Pinpoint                         |
| Containerization  | Docker                               |

---

---
## 🖼️ Screenshots

### 🔐 Home Page
![Home Page](https://github.com/user-attachments/assets/27794f79-f1b2-4fe4-ab4a-913c85237e43)

### 💬 Chat Interface
![Chat Interface](https://github.com/user-attachments/assets/b5fb2e71-5139-4d94-b29e-34486b350d98)
![Chat UI](https://github.com/user-attachments/assets/59d988a3-3e31-4a81-905b-fe8e00982fe8)


---

## 🧭 Application Workflow

1. **User Authentication**
   - Login/Register with credentials stored in Amazon RDS
   - JWT token used for securing user sessions

2. **Message Encryption**
   - Messages encrypted client-side using recipient's public key
   - Stored encrypted in DynamoDB; unreadable by backend

3. **Real-Time Messaging**
   - Persistent Socket.io connection via WebSocket
   - Immediate message delivery and read receipts

4. **Encrypted Media Sharing**
   - Client-side encrypted uploads to S3
   - Secure, expiring pre-signed download links

7. **Logout & Cleanup**
   - Token invalidation, socket disconnect, memory cleanup

---

## 🖼️ Architecture Diagram
![ZuChat System Architecture](https://github.com/user-attachments/assets/ea36dd75-d93d-434a-8c4d-f14f834fdd86)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/zuchat.git
cd zuchat
```

### 2. Install Dependencies
```
npm install            # For frontend
cd backend
npm install            # For backend
```

### 3. Configure Environment Variables
Create a .env file in both frontend/ and backend/ directories:
```
AWS_REGION=<your-aws-region>
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
JWT_SECRET=<your-jwt-secret>
S3_BUCKET_NAME=<your-s3-bucket>
DYNAMODB_TABLE_NAME=<your-table-name>
RDS_CONNECTION_STRING=<your-rds-uri>
```

### 4. Run the Application
# Start backend
```
cd backend
node index.js
```
# Start frontend
```
cd ../frontend
npm start
```
