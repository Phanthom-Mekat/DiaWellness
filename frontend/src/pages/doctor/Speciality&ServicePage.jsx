import SpecialtyAndService from '@/components/doctor/Speciality&Service'

function SpecialtyAndServicePage() {
  const handleSave = async (specialties) => {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Saved specialties:', specialties)
    // Here you would typically send the data to your backend
  }

  return (
    <div data-aos="fade-up">
      <SpecialtyAndService onSave={handleSave} />
    </div>
  )
}
export default SpecialtyAndServicePage

