import { config } from 'dotenv';
config();

import '@/ai/flows/predict-risk-from-patient-data.ts';
import '@/ai/flows/summarize-patient-records.ts';