const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
