import { PlaceHolderImages } from "./placeholder-images";

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  aadhaar: string;
  avatarUrl: string;
  bloodType: string;
  allergies: string[];
  medicalHistory: {
    condition: string;
    diagnosed: string;
  }[];
  medicalRecord: string;
};

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Ananya Sharma',
    age: 45,
    gender: 'Female',
    aadhaar: 'XXXX XXXX 1234',
    avatarUrl: findImage('patient1'),
    bloodType: 'O+',
    allergies: ['Peanuts', 'Pollen'],
    medicalHistory: [
      { condition: 'Hypertension', diagnosed: '2020' },
      { condition: 'Type 2 Diabetes', diagnosed: '2018' },
    ],
    medicalRecord: 'Patient is a 45-year-old female with a history of hypertension and Type 2 Diabetes, managed with medication. Last check-up on 2023-11-10 showed stable blood pressure at 130/85 mmHg and HbA1c at 6.8%. Complains of occasional headaches. Current medications: Metformin 500mg BID, Lisinopril 10mg OD. Patient is a non-smoker, drinks socially. Works a desk job and has a sedentary lifestyle. Recommended lifestyle changes including regular exercise and a balanced diet.'
  },
  {
    id: '2',
    name: 'Rohan Gupta',
    age: 32,
    gender: 'Male',
    aadhaar: 'XXXX XXXX 5678',
    avatarUrl: findImage('patient2'),
    bloodType: 'A-',
    allergies: ['None'],
    medicalHistory: [
      { condition: 'Asthma', diagnosed: '2005' },
    ],
    medicalRecord: 'Patient is a 32-year-old male with a history of childhood asthma. Uses an albuterol inhaler as needed, approximately 2-3 times a month, usually triggered by exercise or cold air. No hospitalizations for asthma in the past 10 years. Otherwise healthy and active. Annual physical on 2024-01-15 was normal. Vital signs are stable. Lung function test shows mild obstructive pattern, consistent with asthma history.'
  },
  {
    id: '3',
    name: 'Priya Patel',
    age: 68,
    gender: 'Female',
    aadhaar: 'XXXX XXXX 9012',
    avatarUrl: findImage('patient3'),
    bloodType: 'B+',
    allergies: ['Sulfa drugs'],
    medicalHistory: [
        { condition: 'Osteoarthritis', diagnosed: '2015' },
        { condition: 'Coronary Artery Disease', diagnosed: '2019' },
    ],
    medicalRecord: 'Patient is a 68-year-old female with osteoarthritis in both knees and a history of coronary artery disease, status post-stent placement in 2019. She is on Aspirin 81mg and Atorvastatin 20mg daily. Reports knee pain that worsens with activity, managed with OTC NSAIDs. Cardiac stress test in 2023 was negative for ischemia. ECG shows normal sinus rhythm. Patient is retired and lives with her family. Follow-up with cardiology scheduled in 3 months.'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    age: 55,
    gender: 'Male',
    aadhaar: 'XXXX XXXX 3456',
    avatarUrl: findImage('patient4'),
    bloodType: 'AB+',
    allergies: ['None'],
    medicalHistory: [
        { condition: 'Gout', diagnosed: '2021' },
    ],
    medicalRecord: 'Patient is a 55-year-old male presenting with acute pain and swelling in the right great toe, consistent with a gout flare. This is his third flare in two years. Serum uric acid level is elevated at 9.2 mg/dL. He has a history of enjoying red meat and alcohol. Started on colchicine for the acute flare and advised on dietary modifications. Allopurinol will be considered for long-term management once the acute flare resolves. Blood pressure and other vitals are within normal limits.'
  },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  availability: 'Online' | 'Offline';
  avatarUrl: string;
};

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Meena Reddy',
    specialty: 'Cardiologist',
    availability: 'Online',
    avatarUrl: findImage('doctor1'),
  },
  {
    id: '2',
    name: 'Dr. Arjun Desai',
    specialty: 'General Physician',
    availability: 'Online',
    avatarUrl: findImage('doctor2'),
  },
  {
    id: '3',
    name: 'Dr. Sanjay Verma',
    specialty: 'Pediatrician',
    availability: 'Offline',
    avatarUrl: findImage('doctor3'),
  },
  {
    id: '4',
    name: 'Dr. Aisha Khan',
    specialty: 'Dermatologist',
    availability: 'Online',
    avatarUrl: findImage('doctor4'),
  },
];
