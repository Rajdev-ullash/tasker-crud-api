//app.ts
import createServer from './utils/createServer';
const app = createServer();
// app.use(cors());

// // parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1', routes);

export default app;
