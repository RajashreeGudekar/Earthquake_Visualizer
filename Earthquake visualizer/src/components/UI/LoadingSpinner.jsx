
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Earthquake Visualizer</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f5f7fa;
      color: #2c3e50;
    }

    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Navigation */
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .brand-icon {
      font-size: 2rem;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    }

    .nav-stats {
      display: flex;
      gap: 1.5rem;
      background: rgba(255,255,255,0.15);
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      backdrop-filter: blur(10px);
    }

    .stat-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 0.85rem;
    }

    .stat-badge strong {
      font-size: 1.2rem;
      color: #ffd700;
    }

    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
    }

    .mobile-menu-btn span {
      width: 25px;
      height: 3px;
      background: white;
      border-radius: 2px;
      transition: 0.3s;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 0.5rem;
      align-items: center;
    }

    .nav-link {
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 600;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-link:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }

    .nav-link.active {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
    }

    .refresh-btn {
      background: rgba(255,255,255,0.15);
      border: none;
      color: white;
      padding: 0.6rem 1rem;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.3s;
    }

    .refresh-btn:hover {
      background: rgba(255,255,255,0.25);
      transform: scale(1.1);
    }

    .spinning {
      display: inline-block;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Main Content */
    .main-content {
      flex: 1;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      padding: 2rem;
    }

    .page {
      display: none;
    }

    .page.active {
      display: block;
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Home Page */
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 2rem;
      border-radius: 20px;
      text-align: center;
      margin-bottom: 3rem;
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.3rem;
      margin-bottom: 2rem;
      opacity: 0.95;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 25px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary {
      background: white;
      color: #667eea;
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(255,255,255,0.3);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: white;
      color: #667eea;
    }

    .quick-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      gap: 1.5rem;
      transition: all 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }

    .stat-icon {
      font-size: 3rem;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }

    .stat-content h3 {
      font-size: 2.5rem;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .stat-content p {
      font-size: 1.1rem;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    .stat-content small {
      color: #95a5a6;
      font-size: 0.9rem;
    }

    .features {
      margin-top: 3rem;
    }

    .features h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: #2c3e50;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      text-align: center;
      transition: all 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      color: #667eea;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #7f8c8d;
      line-height: 1.6;
    }

    /* Map Page */
    .map-page {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 140px);
    }

    .map-controls {
      background: white;
      padding: 1.5rem;
      border-radius: 15px;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    .map-controls h2 {
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    .filter-controls {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }

    .filter-controls label {
      font-weight: 600;
      color: #2c3e50;
    }

    .filter-controls select {
      padding: 0.6rem 1rem;
      border: 2px solid #e0e6ed;
      border-radius: 8px;
      font-size: 0.95rem;
      background: white;
      cursor: pointer;
      transition: all 0.3s;
    }

    .filter-controls select:hover,
    .filter-controls select:focus {
      border-color: #667eea;
      outline: none;
    }

    .legend {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #2c3e50;
    }

    .legend-item span {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .map-container {
      flex: 1;
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      min-height: 500px;
    }

    #map {
      height: 100%;
      width: 100%;
    }

    /* List Page */
    .list-page {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    .list-header {
      margin-bottom: 2rem;
    }

    .list-header h2 {
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }

    .list-controls {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .search-input {
      flex: 1;
      min-width: 250px;
      padding: 0.8rem 1.2rem;
      border: 2px solid #e0e6ed;
      border-radius: 25px;
      font-size: 0.95rem;
      transition: all 0.3s;
    }

    .search-input:focus {
      border-color: #667eea;
      outline: none;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .sort-select,
    .filter-select {
      padding: 0.8rem 1.2rem;
      border: 2px solid #e0e6ed;
      border-radius: 25px;
      font-size: 0.95rem;
      background: white;
      cursor: pointer;
      transition: all 0.3s;
    }

    .sort-select:hover,
    .filter-select:hover {
      border-color: #667eea;
    }

    .earthquake-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 70vh;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .earthquake-list::-webkit-scrollbar {
      width: 8px;
    }

    .earthquake-list::-webkit-scrollbar-track {
      background: #f1f3f5;
      border-radius: 10px;
    }

    .earthquake-list::-webkit-scrollbar-thumb {
      background: #667eea;
      border-radius: 10px;
    }

    .earthquake-item {
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 12px;
      transition: all 0.3s;
    }

    .earthquake-item:hover {
      background: white;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      transform: translateX(5px);
    }

    .quake-mag {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 70px;
      height: 70px;
      border-radius: 50%;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .quake-details {
      flex: 1;
    }

    .quake-details h3 {
      color: #2c3e50;
      margin-bottom: 0.8rem;
      font-size: 1.1rem;
    }

    .quake-meta {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .tsunami-badge {
      display: inline-block;
      background: #ff6b6b;
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-top: 0.5rem;
    }

    /* Statistics Page */
    .stats-page {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    .stats-page h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #2c3e50;
      font-size: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .stat-box h4 {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
    }

    .charts-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .chart-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 12px;
    }

    .chart-card h3 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }

    .chart-canvas {
      max-height: 300px;
    }

    /* About Page */
    .about-page {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    .about-page h2 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .about-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .about-content section {
      margin-bottom: 2.5rem;
    }

    .about-content h3 {
      color: #667eea;
      margin-bottom: 1rem;
    }

    .about-content p {
      color: #7f8c8d;
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .about-content ul {
      color: #7f8c8d;
      line-height: 1.8;
      padding-left: 2rem;
    }

    .about-content li {
      margin-bottom: 0.5rem;
    }

    /* Footer */
    .footer {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      padding: 2rem;
      text-align: center;
      margin-top: 2rem;
    }

    .footer p {
      margin: 0.5rem 0;
      opacity: 0.9;
    }

    /* Loading Screen */
    .loading-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 400px;
      gap: 1rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .loading-screen p {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .nav-stats {
        display: none;
      }

      .charts-container {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: flex;
      }

      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        flex-direction: column;
        padding: 1rem;
        gap: 0.5rem;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }

      .nav-links.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .nav-link {
        width: 100%;
        justify-content: center;
      }

      .hero h1 {
        font-size: 2rem;
      }

      .hero p {
        font-size: 1.1rem;
      }

      .main-content {
        padding: 1rem;
      }

      .quick-stats {
        grid-template-columns: 1fr;
      }

      .map-page {
        height: auto;
      }

      .map-container {
        height: 500px;
      }

      .filter-controls {
        flex-direction: column;
        align-items: stretch;
      }

      .legend {
        flex-direction: column;
      }

      .list-controls {
        flex-direction: column;
      }

      .search-input {
        width: 100%;
      }

      .earthquake-list {
        max-height: 60vh;
      }

      .quake-meta {
        flex-direction: column;
        gap: 0.5rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .nav-container {
        padding: 0 1rem;
      }

      .nav-brand {
        font-size: 1.2rem;
      }

      .brand-icon {
        font-size: 1.5rem;
      }

      .hero {
        padding: 2rem 1rem;
      }

      .hero h1 {
        font-size: 1.5rem;
      }

      .hero-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }

      .stat-card {
        flex-direction: column;
        text-align: center;
      }

      .earthquake-item {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .quake-details h3 {
        text-align: center;
      }
    }
  </style>
</head>
<body></body>