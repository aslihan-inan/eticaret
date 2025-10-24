const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://eticaret-26.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
