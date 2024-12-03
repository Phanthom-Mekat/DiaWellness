import  { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ArrowLeft } from 'lucide-react'
import { PrescriptionsTable } from './PrescriptionsTable'
import { MedicalRecordsTable } from './MedicalRecords'
import { AddPrescriptionModal } from './AddPrescriptionModal'
import { AddMedicalRecordModal } from './AddMedicalRecordModal'

export default function MyPatientDetails() {
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)
  const [isMedicalRecordModalOpen, setIsMedicalRecordModalOpen] = useState(false)
  const [prescriptions, setPrescriptions] = useState([])
  const [medicalRecords, setMedicalRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulating API call to fetch initial data
    setPrescriptions([
      {
        id: "APt002",
        doctor: {
          name: "Edwin Hendry",
          avatar: "https://i.postimg.cc/15vQ6jwk/ai-generated-9019520-640.jpg"
        },
        type: "Visit",
        date: "25 Jan 2024"
      },
      {
        id: "APt003",
        doctor: {
          name: "Eva Holmes",
          avatar: "https://i.postimg.cc/wxVZRC5H/image.png"
        },
        type: "Visit",
        date: "28 Jan 2024"
      },
    ])

    setMedicalRecords([
      {
        name: "Lab Report",
        date: "24 Nov 2024",
        description: "Glucose Test V12"
      },
      {
        name: "Lab Report",
        date: "27 Nov 2024",
        description: "Complete Blood Count(CBC)"
      },
    ])
  }, [])

  const handleAddPrescription = (newPrescription) => {
    setPrescriptions([...prescriptions, newPrescription])
    setIsPrescriptionModalOpen(false)
  }

  const handleAddMedicalRecord = (newRecord) => {
    setMedicalRecords([...medicalRecords, newRecord])
    setIsMedicalRecordModalOpen(false)
  }

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredMedicalRecords = medicalRecords.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4" data-aos="fade-up">
      <div className="mb-6">
        <Button onClick={() => window.history.back()} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Patient Details
        </Button>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <img src="https://i.postimg.cc/52mKPbvP/image.png" alt="Adrian Marshall" />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">#P0016</h2>
                <span className="text-sm text-muted-foreground">Kelly Stevens</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Age: 37</span>
                <span>Female</span>
                <span>O+</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Last Booking</div>
            <div className="font-medium">24 Mar 2024</div>
          </div>
        </div>

        <Tabs defaultValue="prescription" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescription">Prescription</TabsTrigger>
            <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="prescription">
            <div className="flex justify-between items-center mb-4">
              <Input 
                placeholder="Search prescriptions..." 
                className="max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                onClick={() => setIsPrescriptionModalOpen(true)}
                className="bg-[#3498db] hover:bg-[#2980b9]"
              >
                Add New Prescription
              </Button>
            </div>
            <PrescriptionsTable prescriptions={filteredPrescriptions} />
          </TabsContent>

          <TabsContent value="medical-records">
            <div className="flex justify-between items-center mb-4">
              <Input 
                placeholder="Search medical records..." 
                className="max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                onClick={() => setIsMedicalRecordModalOpen(true)}
                className="bg-[#3498db] hover:bg-[#2980b9]"
              >
                Add Medical Record
              </Button>
            </div>
            <MedicalRecordsTable medicalRecords={filteredMedicalRecords} />
          </TabsContent>
        </Tabs>
      </div>

      <AddPrescriptionModal 
        open={isPrescriptionModalOpen}
        onOpenChange={setIsPrescriptionModalOpen}
        onAddPrescription={handleAddPrescription}
      />
      
      <AddMedicalRecordModal
        open={isMedicalRecordModalOpen}
        onOpenChange={setIsMedicalRecordModalOpen}
        onAddMedicalRecord={handleAddMedicalRecord}
      />
    </div>
  )
}

