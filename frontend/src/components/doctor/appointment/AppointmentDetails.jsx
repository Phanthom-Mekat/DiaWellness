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
  const { patientData, medications, setMedications, diagnosis, setDiagnosis } = usePatient()

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
    <div className="container px-2 sm:px-4 mx-auto max-w-6xl" data-aos="fade-up" data-aos-duration="1300">
      <p className='text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 flex items-center'>
        <ArrowLeft className='inline cursor-pointer w-5 h-5 sm:w-6 sm:h-6 mr-1' onClick={() => window.history.back()} />
        <span>Appointment Details</span>
      </p>
      
      {/* Header Section */}
      <Card className="mb-3 sm:mb-6">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-start gap-2 sm:gap-4">
              <Avatar className="w-8 h-8 sm:w-12 sm:h-12">
                <img src={patientData.patient.image} alt="Doctor" className="rounded-full" />
              </Avatar>
              <div>
                <h2 className="text-sm sm:text-xl p-font font-semibold">{patientData.doctor.name}</h2>
                <p className="text-xs sm:text-sm text-gray-500 text-muted-foreground">{patientData.doctor.email}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto sm:px-3 sm:py-2 sm:h-auto">Reschedule</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-2 sm:mt-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Calendar className="w-3 h-3 sm:w-5 sm:h-5 text-blue-500" />
              <div>
                <p className="text-xs sm:text-sm font-medium">Date</p>
                <p className="text-xs sm:text-sm text-gray-500 text-muted-foreground">{patientData.appointment.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Building className="w-3 h-3 sm:w-5 sm:h-5 text-emerald-600" />
              <div>
                <p className="text-xs sm:text-sm font-medium h-font">Type</p>
                <p className="text-xs sm:text-sm text-gray-500 text-muted-foreground">{patientData.appointment.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Clock className="w-3 h-3 sm:w-5 sm:h-5 text-green-500" />
              <div>
                <p className="text-xs sm:text-sm font-medium">Time</p>
                <p className="text-xs sm:text-sm text-gray-500 text-muted-foreground">{patientData.appointment.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <MapPin className="w-3 h-3 sm:w-5 sm:h-5 text-red-500" />
              <div>
                <p className="text-xs sm:text-sm font-medium">Location</p>
                <p className="text-xs sm:text-sm text-gray-500 text-muted-foreground">{patientData.appointment.location}</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Patient Information */}
      <Card className="mb-3 sm:mb-6">
        <CardHeader className="p-3 sm:p-6 pb-0 sm:pb-0">
          <CardTitle className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-2 sm:pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <Input placeholder="Patient Name" defaultValue={patientData.patient.name} className="text-xs sm:text-sm h-8 sm:h-10" />
            <Input placeholder="Email" defaultValue={patientData.patient.email} className="text-xs sm:text-sm h-8 sm:h-10" />
            <Input placeholder="Phone" className="text-xs sm:text-sm h-8 sm:h-10" />
          </div>
        </CardContent>
      </Card>

      {/* Vitals */}
      <Card className="mb-3 sm:mb-6">
        <CardHeader className="p-3 sm:p-6 pb-0 sm:pb-0">
          <CardTitle className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            Vitals
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-2 sm:pt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
            <div>
              <label className="text-xs sm:text-sm font-medium flex items-center gap-1">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                Heart Rate
              </label>
              <div className="flex items-center gap-1 sm:gap-2">
                <Input type="number" defaultValue={patientData.patient.heart} className="w-16 sm:w-20 text-xs sm:text-sm h-6 sm:h-8" />
                <span className="text-xs sm:text-sm">Bpm</span>
                <span className="text-xs sm:text-sm text-green-500">2%</span>
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium flex items-center gap-1">
                <Thermometer className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                Temperature
              </label>
              <div className="flex items-center gap-1 sm:gap-2">
                <Input type="number" defaultValue={patientData.patient.body} className="w-16 sm:w-20 text-xs sm:text-sm h-6 sm:h-8" />
                <span className="text-xs sm:text-sm">°C</span>
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium flex items-center gap-1">
                <Droplet className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                Glucose
              </label>
              <div className="flex items-center gap-1 sm:gap-2">
                <Input type="text" defaultValue={patientData.patient.glucose} className="w-16 sm:w-24 text-xs sm:text-sm h-6 sm:h-8" />
                <span className="text-xs sm:text-sm text-green-500">6%</span>
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium flex items-center gap-1">
                <SquareRadical className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                SPO2
              </label>
              <div className="flex items-center gap-1 sm:gap-2">
                <Input type="number" defaultValue={patientData.patient.spo2} className="w-16 sm:w-20 text-xs sm:text-sm h-6 sm:h-8" />
                <span className="text-xs sm:text-sm">%</span>
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium flex items-center gap-1">
                <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                BP
              </label>
              <div className="flex items-center gap-1 sm:gap-2">
                <Input type="number" defaultValue={patientData.patient.bp} className="w-16 sm:w-20 text-xs sm:text-sm h-6 sm:h-8" />
                <span className="text-xs sm:text-sm">mg/dl</span>
                <span className="text-xs sm:text-sm text-green-500">2%</span>
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium flex items-center gap-1">
                <Weight className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                BMI
              </label>
              <div className="flex items-center gap-1 sm:gap-2">
                <Input type="number" defaultValue={patientData.patient.bmi} className="w-16 sm:w-20 text-xs sm:text-sm h-6 sm:h-8" />
                <span className="text-xs sm:text-sm">kg/m²</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Diagnosis */}
      <Card className="mb-3 sm:mb-6">
        <CardHeader className="p-3 sm:p-6 pb-0 sm:pb-0">
          <CardTitle className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
            Diagnosis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-2 sm:pt-4 overflow-x-auto">
          <div className="min-w-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm py-2 px-2 sm:px-4">Symptom</TableHead>
                  <TableHead className="text-xs sm:text-sm py-2 px-2 sm:px-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {diagnosis.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs sm:text-sm py-1 px-2 sm:px-4">{item.symptom}</TableCell>
                    <TableCell className="text-xs sm:text-sm py-1 px-2 sm:px-4">
                      <select
                        className="w-full rounded-md border border-input px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm"
                        value={item.status}
                        onChange={(e) => {
                          const newDiagnosis = [...diagnosis]
                          newDiagnosis[index].status = e.target.value
                          setDiagnosis(newDiagnosis)
                        }}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Hypothetical</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Clinical Notes */}
      <Card className="mb-3 sm:mb-6">
        <CardHeader className="p-3 sm:p-6 pb-0 sm:pb-0">
          <CardTitle className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            Clinical Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-2 sm:pt-4">
          <Textarea 
            placeholder="Enter clinical notes here..." 
            defaultValue={patientData.patient.notes} 
            className="min-h-[100px] sm:min-h-[140px] text-xs sm:text-sm" 
          />
        </CardContent>
      </Card>

      {/* Medications */}
      <Card className="mb-3 sm:mb-6">
        <CardHeader className="p-3 sm:p-6 pb-0 sm:pb-0">
          <CardTitle className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            <Pills className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
            Medications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-2 sm:pt-4">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm py-2 px-1 sm:px-4">Name</TableHead>
                    <TableHead className="text-xs sm:text-sm py-2 px-1 sm:px-4">Type</TableHead>
                    <TableHead className="text-xs sm:text-sm py-2 px-1 sm:px-4">Dosage</TableHead>
                    <TableHead className="text-xs sm:text-sm py-2 px-1 sm:px-4">Duration</TableHead>
                    <TableHead className="text-xs sm:text-sm py-2 px-1 sm:px-4">Frequency</TableHead>
                    <TableHead className="text-xs sm:text-sm py-2 px-1 sm:px-4">Instruction</TableHead>
                    <TableHead className="text-xs sm:text-sm py-2 px-1 sm:px-4"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((medication, index) => (
                    <TableRow key={index}>
                      <TableCell className="p-1 sm:p-2">
                        <Input
                          placeholder="Med name"
                          value={medication.name}
                          className="text-xs sm:text-sm h-6 sm:h-8"
                          onChange={(e) => {
                            const updatedMedications = [...medications];
                            updatedMedications[index].name = e.target.value;
                            setMedications(updatedMedications);
                          }}
                        />
                      </TableCell>
                      <TableCell className="p-1 sm:p-2">
                        <Input
                          placeholder="Type"
                          value={medication.type}
                          className="text-xs sm:text-sm h-6 sm:h-8"
                          onChange={(e) => {
                            const updatedMedications = [...medications];
                            updatedMedications[index].type = e.target.value;
                            setMedications(updatedMedications);
                          }}
                        />
                      </TableCell>
                      <TableCell className="p-1 sm:p-2">
                        <Input
                          placeholder="Dosage"
                          value={medication.dosage}
                          className="text-xs sm:text-sm h-6 sm:h-8"
                          onChange={(e) => {
                            const updatedMedications = [...medications];
                            updatedMedications[index].dosage = e.target.value;
                            setMedications(updatedMedications);
                          }}
                        />
                      </TableCell>
                      <TableCell className="p-1 sm:p-2">
                        <Input
                          placeholder="Duration"
                          value={medication.duration}
                          className="text-xs sm:text-sm h-6 sm:h-8"
                          onChange={(e) => {
                            const updatedMedications = [...medications];
                            updatedMedications[index].duration = e.target.value;
                            setMedications(updatedMedications);
                          }}
                        />
                      </TableCell>
                      <TableCell className="p-1 sm:p-2">
                        <Input
                          placeholder="Frequency"
                          value={medication.frequency}
                          className="text-xs sm:text-sm h-6 sm:h-8"
                          onChange={(e) => {
                            const updatedMedications = [...medications];
                            updatedMedications[index].frequency = e.target.value;
                            setMedications(updatedMedications);
                          }}
                        />
                      </TableCell>
                      <TableCell className="p-1 sm:p-2">
                        <Input
                          placeholder="Instructions"
                          value={medication.instructions || ""}
                          className="text-xs sm:text-sm h-6 sm:h-8"
                          onChange={(e) => {
                            const updatedMedications = [...medications];
                            updatedMedications[index].instructions = e.target.value;
                            setMedications(updatedMedications);
                          }}
                        />
                      </TableCell>
                      <TableCell className="p-1 sm:p-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 sm:h-8 sm:w-8"
                          onClick={() => removeMedication(index)}
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className='flex justify-between mx-1 sm:mx-2 mt-2'> 
            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm px-2 py-1 h-6 sm:h-8"
              onClick={addMedication}
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Add Medication
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm px-2 py-1 h-6 sm:h-8 bg-gray-100"
              onClick={saveMedication}
            >
              <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-500" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      <LaboratoryTests />
      <FollowUpAdvice />

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 sm:gap-4 mt-2 sm:mt-4 mb-4">
        <Button variant="outline" size="sm" className="text-xs sm:text-sm h-8 sm:h-10" onClick={() => setIsModalOpen(false)}>Cancel</Button>
        <Button size="sm" className="text-xs sm:text-sm h-8 sm:h-10" onClick={() => setIsModalOpen(true)}>Save & Exit</Button>
      </div>

      {/* Session End Modal */}
      <SessionEndModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default AppointmentDetails;