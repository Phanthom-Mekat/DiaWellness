import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Calendar, Clock, MapPin, User, Plus, Trash2, FileText, Stethoscope, Activity, PillIcon as Pills, Building, Weight, Droplet, Thermometer, Heart, SquareRadical, Save, ArrowLeft } from 'lucide-react'
import { usePatient } from '@/provider/PatientContext'
import { LaboratoryTests } from './LaboratoryTests'
import { FollowUpAdvice } from './FollowUpAdvice'
import SessionEndModal from './SessionEndModal'


function AppointmentDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { patientData, medications, setMedications,diagnosis, setDiagnosis } = usePatient()



  const addMedication = () => {
    setMedications([
      ...medications,
      { name: '', type: '', dosage: '', duration: '', frequency: '', instructions: '' },
    ])
  }
  const saveMedication = (index, data) => {
    setMedications(
      medications.map((medication, i) =>
        i === index ? { ...medication, ...data } : medication
      )
    )
    // clear table
    setMedications([])
    console.log(medications)
  }

  const removeMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index)
    setMedications(newMedications)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl" data-aos="fade-up" data-aos-duration="1300">
      <p className='text-2xl font-semibold mb-4'><ArrowLeft className='inline cursor-pointer ' onClick={() => window.history.back()} ></ArrowLeft>  Appointment Details</p>
      {/* Header Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <img src={patientData.patient.image} alt="Doctor" className="rounded-full" />
              </Avatar>
              <div>
                <h2 className="text-xl p-font font-semibold">{patientData.doctor.name}</h2>
                <p className="text-sm text-gray-500 text-muted-foreground">{patientData.doctor.email}</p>
              </div>
            </div>
            <Button variant="outline">Reschedule</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Date of Appointment</p>
                <p className="text-sm text-gray-500 text-muted-foreground">{patientData.appointment.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium  h-font">Appointment Type</p>
                <p className="text-sm  text-gray-500 text-muted-foreground">{patientData.appointment.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Time</p>
                <p className="text-sm text-gray-500 text-muted-foreground">{patientData.appointment.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-gray-500 text-muted-foreground">{patientData.appointment.location}</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Patient Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-500" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Patient Name" defaultValue={patientData.patient.name} />
            <Input placeholder="Email" defaultValue={patientData.patient.email} />
            <Input placeholder="Phone" />
          </div>
        </CardContent>
      </Card>

      {/* Vitals */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-500" />
            Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Heart Rate
              </label>
              <div className="flex items-center gap-2">
                <Input type="number" defaultValue={patientData.patient.heart} className="w-20" />
                <span className="text-sm">Bpm</span>
                <span className="text-sm text-green-500">2%</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-yellow-500" />
                Body Temperature
              </label>
              <div className="flex items-center gap-2">
                <Input type="number" defaultValue={patientData.patient.body} className="w-20" />
                <span className="text-sm">°C</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                Glucose Level
              </label>
              <div className="flex items-center gap-2">
                <Input type="text" defaultValue={patientData.patient.glucose} className="w-24" />
                <span className="text-sm text-green-500">6%</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <SquareRadical className="w-4 h-4 text-purple-500" />
                SPO2
              </label>
              <div className="flex items-center gap-2">
                <Input type="number" defaultValue={patientData.patient.spo2} className="w-20" />
                <span className="text-sm">%</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                Blood Pressure
              </label>
              <div className="flex items-center gap-2">
                <Input type="number" defaultValue={patientData.patient.bp} className="w-20" />
                <span className="text-sm">mg/dl</span>
                <span className="text-sm text-green-500">2%</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Weight className="w-4 h-4 text-orange-500" />
                BMI
              </label>
              <div className="flex items-center gap-2">
                <Input type="number" defaultValue={patientData.patient.bmi} className="w-20" />
                <span className="text-sm">kg/m²</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Diagnosis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-cyan-500" />
            Diagnosis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symptom</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {diagnosis.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.symptom}</TableCell>
                  <TableCell>
                    <select
                      className="w-full rounded-md border border-input px-3 py-2"
                      value={item.status}
                      onChange={(e) => {
                        const newDiagnosis = [...diagnosis]
                        newDiagnosis[index].status = e.target.value
                        setDiagnosis(newDiagnosis)
                      }}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Hypothetical </option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Clinical Notes */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-yellow-500" />
            Clinical Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Enter clinical notes here..." defaultValue={patientData.patient.notes} className="min-h-[140px]" />
        </CardContent>
      </Card>

      {/* Medications */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pills className="w-5 h-5 text-pink-500" />
            Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Instruction</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications.map((medication, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      placeholder="Medicine name"
                      value={medication.name}
                      onChange={(e) => {
                        const updatedMedications = [...medications];
                        updatedMedications[index].name = e.target.value;
                        setMedications(updatedMedications);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Type"
                      value={medication.type}
                      onChange={(e) => {
                        const updatedMedications = [...medications];
                        updatedMedications[index].type = e.target.value;
                        setMedications(updatedMedications);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Dosage"
                      value={medication.dosage}
                      onChange={(e) => {
                        const updatedMedications = [...medications];
                        updatedMedications[index].dosage = e.target.value;
                        setMedications(updatedMedications);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Duration"
                      value={medication.duration}
                      onChange={(e) => {
                        const updatedMedications = [...medications];
                        updatedMedications[index].duration = e.target.value;
                        setMedications(updatedMedications);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Frequency"
                      value={medication.frequency}
                      onChange={(e) => {
                        const updatedMedications = [...medications];
                        updatedMedications[index].frequency = e.target.value;
                        setMedications(updatedMedications);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Instructions"
                      value={medication.instructions || ""}
                      onChange={(e) => {
                        const updatedMedications = [...medications];
                        updatedMedications[index].instructions = e.target.value;
                        setMedications(updatedMedications);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMedication(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='flex justify-between mx-2'> 
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={addMedication}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 btn-outline shadow-xl bg-gray-100 "
              onClick={saveMedication}
            >
              <Save className="w-4 h-4 mr-2 text-yellow-500" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>


      <LaboratoryTests />
      <FollowUpAdvice />

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
        <Button onClick={() => setIsModalOpen(true)}>Save & Exit</Button>
      </div>

      {/* Session End Modal */}
      <SessionEndModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default AppointmentDetails;