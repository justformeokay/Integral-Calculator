# Solid of Revolution Calculator

A full-stack web application that demonstrates the calculation of volumes of solids of revolution using integral calculus, featuring interactive 3D visualizations.

## Features

* **Accurate Mathematical Computation**
  * Symbolic integration using SymPy
  * Numerical integration using SciPy (fallback)
  * Support for both x-axis and y-axis rotation
  * Disk/Washer and Shell methods
* **Interactive Visualization**
  * 2D function plots with Matplotlib
  * Interactive 3D solid visualization with Plotly
  * Real-time rendering
* **Security**
  * Input validation and sanitization
  * Protection against code injection
  * Safe expression parsing
* **Production Ready**
  * Nginx reverse proxy
  * Systemd service management
  * Clean architecture with separation of concerns

## Architecture

```
solid-revolution/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── services/
│   │   ├── __init__.py
│   │   ├── math_service.py     # Mathematical calculations
│   │   └── visualization_service.py  # Plot generation
│   └── requirements.txt
├── frontend/
│   └── index.html             # Web interface
├── config/
│   ├── nginx.conf             # Nginx configuration
│   └── solid-revolution.service  # Systemd service
└── deploy.sh                  # Deployment script
```

## Technology Stack

### Backend

* **FastAPI** - Modern Python web framework
* **SymPy** - Symbolic mathematics
* **SciPy** - Scientific computing and numerical integration
* **NumPy** - Numerical operations
* **Matplotlib** - 2D plotting
* **Plotly** - Interactive 3D visualization

### Frontend

* **HTML5/CSS3** - Modern web interface
* **JavaScript (ES6+)** - Client-side logic
* **Fetch API** - HTTP requests

### Infrastructure

* **Nginx** - Reverse proxy and web server
* **Uvicorn** - ASGI server
* **Systemd** - Service management

## Installation

### Prerequisites

* Linux VPS (Ubuntu 20.04+ recommended)
* Python 3.8+
* Nginx
* Root or sudo access

### Quick Deploy

1. Clone or download the project files to your server
2. Make the deployment script executable:

bash

```bash
chmod +x deploy.sh
```

3. Run the deployment script:

bash

```bash
./deploy.sh
```

4. Update the Nginx configuration with your domain:

bash

```bash
sudo nano /etc/nginx/sites-available/solid-revolution
# Change 'your-domain.com' to your actual domain or IP
```

5. Restart Nginx:

bash

```bash
sudo systemctl restart nginx
```

### Manual Installation

#### 1. Install System Dependencies

bash

```bash
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv nginx
```

#### 2. Create Application Directory

bash

```bash
sudo mkdir -p /var/www/solid-revolution/{backend,frontend}
```

#### 3. Set Up Backend

bash

```bash
cd /var/www/solid-revolution/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python packages
pip install -r requirements.txt
```

#### 4. Deploy Frontend

bash

```bash
# Copy index.html to /var/www/solid-revolution/frontend/
```

#### 5. Configure Nginx

bash

```bash
sudo cp config/nginx.conf /etc/nginx/sites-available/solid-revolution
sudo ln -s /etc/nginx/sites-available/solid-revolution /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

#### 6. Set Up Systemd Service

bash

```bash
sudo cp config/solid-revolution.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable solid-revolution
sudo systemctl start solid-revolution
```

## Usage

### Web Interface

1. Access the application at** **`http://your-domain.com`
2. Enter a mathematical function (e.g.,** **`x**2`,** **`sin(x)`,** **`sqrt(x)`)
3. Set integration bounds (lower and upper limits)
4. Choose axis of rotation (x-axis or y-axis)
5. Click "Calculate Volume"
6. View the results:
   * Calculated volume
   * Integral expression
   * 2D function plot
   * Interactive 3D solid of revolution

### Supported Functions

* **Polynomials**:** **`x**2`,** **`x**3 - 2*x`, etc.
* **Trigonometric**:** **`sin(x)`,** **`cos(x)`,** **`tan(x)`
* **Exponential**:** **`exp(x)`,** **`exp(-x)`
* **Roots**:** **`sqrt(x)`,** **`x**(1/3)`
* **Logarithmic**:** **`log(x)`
* **Combinations**:** **`x**2 + sin(x)`

### Example Problems

1. **Parabola rotated around x-axis**
   * Function:** **`x**2`
   * Bounds: [0, 2]
   * Axis: x-axis
   * Volume: ≈ 10.053 cubic units
2. **Square root function**
   * Function:** **`sqrt(x)`
   * Bounds: [0, 4]
   * Axis: x-axis
   * Volume: ≈ 25.133 cubic units
3. **Sine wave**
   * Function:** **`sin(x)`
   * Bounds: [0, π]
   * Axis: x-axis
   * Volume: ≈ 4.935 cubic units

## API Documentation

### Endpoint: POST /api/volume

Calculate the volume of a solid of revolution.

**Request Body:**

json

```json
{
  "function": "x**2",
  "lower_bound": 0,
  "upper_bound": 2,
  "axis": "x-axis"
}
```

**Response:**

json

```json
{
  "success": true,
  "volume_numerical": 10.053096,
  "volume_symbolic": "32*pi/5",
  "integral_expression": "π∫[0,2] (x**2)² dx",
  "function": "x**2",
  "bounds": {
    "lower": 0,
    "upper": 2
  },
  "axis": "x-axis",
  "plot_2d": "data:image/png;base64,...",
  "plot_3d": "<html>...</html>"
}
```

### Interactive API Documentation

Access the auto-generated API documentation at:

* Swagger UI:** **`http://your-domain.com/docs`
* ReDoc:** **`http://your-domain.com/redoc`

## Mathematical Theory

### Disk Method (x-axis rotation)

When rotating a function** **`f(x)` around the x-axis:

```
V = π ∫[a,b] [f(x)]² dx
```

### Shell Method (y-axis rotation)

When rotating a function** **`f(x)` around the y-axis:

```
V = 2π ∫[a,b] x·f(x) dx
```

## Monitoring and Maintenance

### Check Service Status

bash

```bash
sudo systemctl status solid-revolution
```

### View Logs

bash

```bash
# Real-time logs
sudo journalctl -u solid-revolution -f

# Last 100 lines
sudo journalctl -u solid-revolution -n 100
```

### Restart Services

bash

```bash
# Restart backend
sudo systemctl restart solid-revolution

# Restart Nginx
sudo systemctl restart nginx
```

### Update Application

bash

```bash
cd /var/www/solid-revolution/backend
source venv/bin/activate
pip install --upgrade -r requirements.txt
sudo systemctl restart solid-revolution
```

## Security Considerations

1. **Input Validation**: All user inputs are validated and sanitized
2. **Expression Parsing**: Only safe mathematical expressions are allowed
3. **No Code Execution**: User input is never executed as code
4. **Rate Limiting**: Consider adding rate limiting for production
5. **HTTPS**: Use SSL/TLS certificates (Let's Encrypt) for production

### Adding HTTPS (Let's Encrypt)

bash

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
sudo systemctl restart nginx
```

## Troubleshooting

### Backend not starting

bash

```bash
# Check logs
sudo journalctl -u solid-revolution -n 50

# Check if port 8000 is in use
sudo netstat -tulpn | grep 8000

# Test backend directly
cd /var/www/solid-revolution/backend
source venv/bin/activate
python main.py
```

### Nginx errors

bash

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

### Module import errors

bash

```bash
# Reinstall dependencies
cd /var/www/solid-revolution/backend
source venv/bin/activate
pip install --force-reinstall -r requirements.txt
```

## Performance Optimization

1. **Enable Gzip compression** (already configured in Nginx)
2. **Use caching** for repeated calculations
3. **Increase Uvicorn workers** for high traffic:

ini

```ini
   ExecStart=/path/to/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --workers 8
```

4. **Add Redis** for caching computed results
5. **Use CDN** for static assets

## Contributing

Contributions are welcome! Areas for improvement:

* Support for more complex functions
* Washer method (difference of two functions)
* Volume calculation using different methods
* Export results to PDF
* Animation of rotation process
* Multiple language support

## License

This project is provided as-is for educational purposes.

## Support

For issues, questions, or contributions, please refer to the project repository or documentation.

---

**Built with ❤️ for mathematics and education**
