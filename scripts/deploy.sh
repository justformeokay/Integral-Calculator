#!/bin/bash

# Solid of Revolution Calculator - Deployment Script
# This script sets up the complete application on a Linux VPS

set -e

echo "=========================================="
echo "Solid of Revolution Calculator Deployment"
echo "=========================================="

# Configuration
APP_DIR="/var/www/solid-revolution"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"
VENV_DIR="$APP_DIR/venv"

# Update system
echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install dependencies
echo "Installing system dependencies..."
sudo apt-get install -y python3 python3-pip python3-venv nginx git

# Create application directory
echo "Creating application directory..."
sudo mkdir -p $APP_DIR
sudo mkdir -p $BACKEND_DIR
sudo mkdir -p $FRONTEND_DIR
sudo mkdir -p $BACKEND_DIR/services

# Set permissions
sudo chown -R $USER:$USER $APP_DIR

# Copy backend files
echo "Setting up backend..."
cd $BACKEND_DIR

# Create main.py
cat > main.py << 'EOF'
# Copy content from main.py artifact
EOF

# Create services directory structure
mkdir -p services

# Create math_service.py
cat > services/math_service.py << 'EOF'
# Copy content from math_service.py artifact
EOF

# Create visualization_service.py
cat > services/visualization_service.py << 'EOF'
# Copy content from visualization_service.py artifact
EOF

# Create __init__.py for services package
touch services/__init__.py

# Create virtual environment
echo "Creating Python virtual environment..."
python3 -m venv $VENV_DIR

# Activate virtual environment and install packages
echo "Installing Python packages..."
source $VENV_DIR/bin/activate
pip install --upgrade pip

# Create requirements.txt
cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
sympy==1.12
scipy==1.11.4
numpy==1.26.2
matplotlib==3.8.2
plotly==5.18.0
python-multipart==0.0.6
EOF

pip install -r requirements.txt

# Copy frontend files
echo "Setting up frontend..."
cd $FRONTEND_DIR

# Create index.html
cat > index.html << 'EOF'
# Copy content from index.html artifact
EOF

# Configure Nginx
echo "Configuring Nginx..."
sudo cat > /etc/nginx/sites-available/solid-revolution << 'EOF'
# Copy content from nginx.conf artifact
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/solid-revolution /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Create systemd service
echo "Creating systemd service..."
sudo cat > /etc/systemd/system/solid-revolution.service << 'EOF'
# Copy content from solid-revolution.service artifact
EOF

# Reload systemd
sudo systemctl daemon-reload

# Start services
echo "Starting services..."
sudo systemctl enable solid-revolution
sudo systemctl start solid-revolution
sudo systemctl restart nginx

# Check status
echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo ""
echo "Service Status:"
sudo systemctl status solid-revolution --no-pager
echo ""
echo "Nginx Status:"
sudo systemctl status nginx --no-pager
echo ""
echo "Application is now running!"
echo "Frontend: http://your-server-ip/"
echo "API Docs: http://your-server-ip/docs"
echo ""
echo "To check logs:"
echo "  sudo journalctl -u solid-revolution -f"
echo ""
echo "To restart services:"
echo "  sudo systemctl restart solid-revolution"
echo "  sudo systemctl restart nginx"
echo ""