import { config } from 'dotenv';
config();

import '@/server/flows/patient-wait-time-prediction.ts';
import '@/ai/flows/health-content-flow.ts';
