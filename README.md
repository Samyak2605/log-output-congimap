# Log Output App with ConfigMap (Kubernetes Exercise 2.5)

This project is part of the **DevOps with Kubernetes** course. It demonstrates how to use a Kubernetes `ConfigMap` to inject configuration into a Node.js application via:

- 📁 A file mounted as a volume (`information.txt`)
- 🌿 An environment variable (`MESSAGE`)

---

## 📦 Project Structure

log-output/
├── Dockerfile
├── index.js
├── package.json
├── package-lock.json
└── manifests/
├── configmap.yaml
├── deployment.yaml
└── service.yaml

yaml
Copy
Edit

---

## 🚀 Application Behavior

On startup, the app:
- Prints contents of `information.txt` (mapped via volume from `ConfigMap`)
- Prints value of `MESSAGE` (injected from environment variable)
- Logs a unique ID and ping/pong count every 5 seconds

---

## 🛠️ Prerequisites

- [Docker](https://www.docker.com/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- Access to a Kubernetes cluster (like Docker Desktop)
- Public Docker Hub account

---

## 🔨 Setup Instructions

### 1. Build and Push the Docker Image

```bash
# Navigate to project root
cd log-output

# Build image
docker build -t samyak2605/log-output .

# Tag as latest (optional but recommended)
docker tag samyak2605/log-output samyak2605/log-output:latest

# Push to Docker Hub
docker push samyak2605/log-output:latest
2. Create the Namespace
bash
Copy
Edit
kubectl create namespace exercises
3. Deploy to Kubernetes
bash
Copy
Edit
# Apply ConfigMap, Deployment, and Service
kubectl apply -f manifests/configmap.yaml -n exercises
kubectl apply -f manifests/deployment.yaml -n exercises
kubectl apply -f manifests/service.yaml -n exercises
4. Verify Deployment
bash
Copy
Edit
# Check pods
kubectl get pods -n exercises

# View logs
kubectl logs <log-output-pod-name> -n exercises
You should see output like:

yaml
Copy
Edit
file content: this text is from file
env variable: MESSAGE=hello world
2024-03-30T12:15:17.705Z: 8523ecb1-c716-4cb6-a044-b9e83bb98e43.
Ping / Pongs: 3
📄 ConfigMap Details
yaml
Copy
Edit
# configmap.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: log-output-config
data:
  information.txt: |
    this text is from file
  MESSAGE: hello world
🧹 Cleanup
bash
Copy
Edit
kubectl delete -f manifests/ -n exercises
kubectl delete namespace exercises
