/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

const PatientContext = createContext()

export function PatientProvider({ children }) {
  const [patientData] = useState({
    doctor: {
      name: "Mary Jensen",
      email: "mary@example.com",
      image: "/placeholder.svg?height=50&width=50"
    },
    patient: {
      name: "Kalasnikobi",
      age: 45,
      gender: "Male",
      bloodType: "AB+",
      email: "kala@gmail.com",
      image: "https://i.postimg.cc/76JVykGr/image.png",
      heart:140,
      body:37.5,
      glucose:"70-90",
      spo2:96,
      bp:100,
      bmi:20.1,
      notes: `
        Chief Complaints: Polyuria, polydipsia, weight loss. History of diabetes; blood glucose level: 170mg/dl\n
        Medications: Metformin 500mg BID, Atorvastatin 10mg QD. Smoker. History of hypertension; BP: 130/80 mmHg\n
        Lipid Profile: Total cholesterol: 200mg/dl, LDL: 100mg/dl, HDL: 50mg/dl, Triglycerides: 150mg/dl\n
        Chronic Conditions: CKD (serum creatinine: 1.5mg/dl, eGFR: 45ml/min), anemia (hemoglobin: 12g/dl), hypothyroidism (Levothyroxine 50mcg QD)\n
        Other: Depression (Escitalopram 10mg QD), COPD (FEV1: 60%), bronchiectasis, heart failure (Ejection fraction: 30%), stroke (Clopidogrel 75mg QD)`

    },
    appointment: {
      date: "22 Jul 2024",
      time: "10:00 AM",
      location: "Dhaka, Bangladesh",
      type: "GENERAL"
    }
  })
  const [medications, setMedications] = useState([
    { name: '', type: '', dosage: '', duration: '', frequency: '', instructions: '' },
  ])
  const [tests, setTests] = useState([
    { name: 'Blood Test', date: '2023-07-01', result: 'Need to Identify' }
  ])

  const [diagnosis, setDiagnosis] = useState([
    { symptom: 'Increased thirst', status: 'Present', relatedTo: 'Diabetes' },
    { symptom: 'Frequent urination', status: 'Present', relatedTo: 'Diabetes' },
    // { symptom: 'Unexplained weight loss', status: 'Present', relatedTo: 'Diabetes' },
    // { symptom: 'Blurred vision', status: 'Present', relatedTo: 'Diabetes' },
    { symptom: 'Fatigue', status: 'Present', relatedTo: 'Diabetes' },
    { symptom: 'Slow-healing sores', status: 'Present', relatedTo: 'Diabetes' },
    { symptom: 'Tingling or numbness in hands or feet', status: 'Present', relatedTo: 'Diabetes' },
  ])

  const [advice, setAdvice] = useState('')

  return (
    <PatientContext.Provider value={{patientData, medications, setMedications, tests, setTests, diagnosis, setDiagnosis,advice,setAdvice}}>
      {children}
    </PatientContext.Provider>
  )
}

export function usePatient() {
  return useContext(PatientContext)
}

