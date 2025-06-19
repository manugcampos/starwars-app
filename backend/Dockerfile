FROM ubuntu:22.04

WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3 python3-pip ca-certificates curl && \
    update-ca-certificates --fresh && \
    rm -rf /var/lib/apt/lists/*

# Forzar que Python use el bundle de certificados del sistema
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

COPY app/ ./app/

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"] 