import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import AddSlotModal from "@/components/doctor/AddSlotModal"

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DEFAULT_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM']

function AvailabilityScheduler() {
  const [activeTab, setActiveTab] = useState("general")
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [appointmentFee, setAppointmentFee] = useState("254")
  const [savedSlots, setSavedSlots] = useState({
    general: {},
    clinic: {}
  })
  
  const [generalTimeSlots, setGeneralTimeSlots] = useState({
    Monday: [...DEFAULT_SLOTS],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  })
  
  const [clinicTimeSlots, setClinicTimeSlots] = useState({
    Monday: [...DEFAULT_SLOTS],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  })

  const timeSlots = activeTab === "general" ? generalTimeSlots : clinicTimeSlots
  const setTimeSlots = activeTab === "general" ? setGeneralTimeSlots : setClinicTimeSlots

  const handleAddSlot = () => {
    setIsModalOpen(true)
  }

  const handleModalSave = ({ slots, duration, space }) => {
    setTimeSlots(prev => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], ...slots]
    }))
    toast.success(`Added ${slots.length} slots with ${duration} minutes duration for Space ${space}`)
  }

  const handleDeleteAll = () => {
    setTimeSlots(prev => ({
      ...prev,
      [selectedDay]: []
    }))
    toast.success('All slots deleted')
  }

  const handleSaveChanges = () => {
    const availability = {
      general: generalTimeSlots,
      clinic: clinicTimeSlots,
      appointmentFee
    }
    console.log('Saving availability:', availability)
    setSavedSlots({
      general: { ...generalTimeSlots },
      clinic: { ...clinicTimeSlots }
    })
    toast.success('Availability settings saved successfully!')
  }

  const isSlotSaved = (day, time) => {
    return savedSlots[activeTab][day]?.includes(time)
  }

    const renderAvailabilityContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Available Slots</h3>
        
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Select Available days</p>
          <div className="flex flex-wrap gap-2">
            {DAYS.map(day => (
              <Button
                
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}

              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">{selectedDay}</h4>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddSlot}
              >
                Add Slots
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDeleteAll}
              >
                Delete All
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {timeSlots[selectedDay].map((time, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 rounded-md px-3 py-2 border ${
                  isSlotSaved(selectedDay, time) ? 'bg-primary text-primary-foreground' : 'bg-background'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">
          Appointment Fees ($)
          <Input
            type="number"
            value={appointmentFee}
            onChange={(e) => setAppointmentFee(e.target.value)}
            className="mt-1 max-w-[200px]"
          />
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-secondary " onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6">Available Timings</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="general">General Availability</TabsTrigger>
              <TabsTrigger value="clinic">Clinic Availability</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              {renderAvailabilityContent()}
            </TabsContent>
            <TabsContent value="clinic">
              {renderAvailabilityContent()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddSlotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
      />
    </div>
  )
}


export default AvailabilityScheduler;