const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 80;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Completion route (S3 Gallery)
app.get('/completion', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'completion.html'));
});

// ROS Deployment route
app.get('/ros', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ros.html'));
});

// API: Get all images from DB
app.get('/api/images', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
    res.json({ success: true, data: db.images, meta: db.metadata });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not read database' });
  }
});

// API: Get single image by ID
app.get('/api/images/:id', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
    const image = db.images.find(img => img.id === parseInt(req.params.id));
    if (!image) return res.status(404).json({ success: false, error: 'Image not found' });
    res.json({ success: true, data: image });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not read database' });
  }
});

// API: Get images by category
app.get('/api/images/category/:cat', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
    const images = db.images.filter(img => img.category === req.params.cat);
    res.json({ success: true, data: images, count: images.length });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not read database' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/images`);
  console.log('Press Ctrl+C to stop.');
});
