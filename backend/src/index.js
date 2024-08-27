// backend/src/index.js
const app = require('./config/serverConfig');

const authRoutes = require('./routes/authRoutes');

// Load Routes
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
