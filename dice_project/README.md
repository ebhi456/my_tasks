# Two-Sided Dice Selector

A simple enterprise-style full-stack application with a **two-sided dice**.

The dice can ONLY return:

- `1`
- `2`

Click **SPIN DICE** and the backend randomly selects either 1 or 2. The frontend animates the dice and then displays the final result.

## Architecture

```text
Browser
   |
   v
Nginx / React
   |
   v
FastAPI
   |
   +-- Random selection: 1 or 2
```

## Project structure

```text
two-sided-dice-selector/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── docker-compose.yml
├── .env.example
└── .gitignore
```

## Run with Docker Compose

```bash
docker compose up --build -d
```

Check:

```bash
docker compose ps
docker compose logs -f
```

Open:

```text
http://localhost
```

## Deploy to EC2

```bash
git clone <YOUR-GITHUB-REPOSITORY>
cd two-sided-dice-selector

docker compose up --build -d
```

Allow inbound TCP port `80` in the EC2 Security Group.

Then open:

```text
http://<EC2-PUBLIC-IP>
```

## API

### Health

```text
GET /api/health
```

### Spin

```text
POST /api/spin
```

Example:

```json
{
  "result": 2,
  "message": "Dice result generated successfully"
}
```

The backend implementation deliberately uses:

```python
random.choice([1, 2])
```

Therefore **1 or 2 are the only possible results**.

## DevOps extensions

This project is intentionally small enough to understand but structured enough to use as a DevOps deployment project.

Recommended progression:

1. GitHub
2. Docker
3. EC2
4. GitHub Actions/Jenkins CI
5. Docker image registry
6. Terraform
7. Kubernetes
8. EKS
9. Argo CD
10. Prometheus/Grafana
