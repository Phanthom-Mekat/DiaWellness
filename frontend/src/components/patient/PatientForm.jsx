import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from 'lucide-react'
import { z } from 'zod'
import { AuthContext } from "@/provider/AuthProvider"

// Validation Schema
const PatientFormSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required").optional().or(z.literal("")),
  gender: z.enum(['male', 'female', 'other']).optional(),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  age: z.string().refine(val => {
    if (!val) return true; // Allow empty age
    const age = parseInt(val);
    return age >= 0 && age <= 120;
  }, { message: "Age must be between 0 and 120" }).optional(),
  image: z.instanceof(File).optional()
});

const PatientForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const [selectedGender, setSelectedGender] = useState("")
  const [selectedBloodType, setSelectedBloodType] = useState("")
  const [patientData, setPatientData] = useState(null)
  const {user} = useContext(AuthContext);
  // Backend API base URL - adjust as needed
  const API_BASE_URL = 'http://localhost:5000'
 const patientMail = user?.email;
 console.log(user);
 console.log(patientMail);
  // Fetch patient data on component mount
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        

        

        const response = await fetch(`${API_BASE_URL}/patients/${patientMail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch patient data')
        }

        const data = await response.json()
        setPatientData(data)
        setSelectedGender(data.gender || '')
        setSelectedBloodType(data.bloodType || '')
        if (data.photo) {
          setPreviewImage(`${API_BASE_URL}${data.photo}`)
        }
      } catch (error) {
        console.error('Error fetching patient data:', error)
        showToast(error.message, 'error')
      }
    }

    fetchPatientData()
  }, [])

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => document.body.removeChild(toast), 3000)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const updatePatientProfile = async (patientMail, formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/${patientMail}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Failed to update patient profile`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating patient:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!patientData) return
    
    setIsSubmitting(true)
    setValidationErrors({})

    // Get form data
    const formValues = {
      name: e.target.name.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      location: e.target.location.value,
      gender: selectedGender,
      bloodType: selectedBloodType,
      age: e.target.age.value,
      image: e.target.image.files[0]
    }

    try {
      // Validate form data using Zod
      PatientFormSchema.parse(formValues)
      
      // Prepare FormData for patient profile update
      const formData = new FormData()
      formData.append('name', formValues.name)
      formData.append('email', formValues.email)
      
      if (formValues.phoneNumber) formData.append('phoneNumber', formValues.phoneNumber)
      if (formValues.location) formData.append('location', formValues.location)
      if (formValues.gender) formData.append('gender', formValues.gender)
      if (formValues.bloodType) formData.append('bloodType', formValues.bloodType)
      if (formValues.age) formData.append('age', formValues.age)
      if (formValues.image) formData.append('image', formValues.image)

      // Update patient profile
      const result = await updatePatientProfile(patientMail, formData)
      
      // Update the preview image if a new one was uploaded
      if (result.photo) {
        setPreviewImage(`${API_BASE_URL}${result.photo}`)
      }
      
      // Update local patient data
      setPatientData(prev => ({ ...prev, ...result }))
      
      showToast('Patient profile updated successfully!')
      
    } catch (error) {
      console.error('Form submission error:', error)
      
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors
        setValidationErrors(errors)
        showToast('Please correct the form errors', 'error')
      } else {
        showToast(error.message || 'Error updating profile. Please try again.', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!patientData) {
    return (
      <div className="min-h-screen bg-blue-100/40 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-2xl border-2 border-blue-200">
          <CardHeader className="text-center bg-blue-50 py-6">
            <CardTitle className="text-4xl font-extrabold text-blue-600 tracking-tight">
              Loading Patient Data...
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <p>Please wait while we load your patient information...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-100/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl border-2 border-blue-200">
        <CardHeader className="text-center bg-blue-50 py-6">
          <CardTitle className="text-4xl font-extrabold text-blue-600 tracking-tight">
            Update Patient Profile
          </CardTitle>
          <p className="text-sm text-blue-500 mt-2">Patient ID: {patientData.id}</p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div className="space-y-2">
              <Label className="text-blue-600 font-semibold">Profile Image</Label>
              <div className="flex items-center gap-6">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <Upload className="text-blue-500" size={32} />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-600 font-semibold">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  defaultValue={patientData.name}
                  className={`${validationErrors.name ? 'border-red-500' : ''}`}
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm">{validationErrors.name[0]}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-600 font-semibold">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="patient@example.com"
                  defaultValue={patientData.email}
                  className={`${validationErrors.email ? 'border-red-500' : ''}`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm">{validationErrors.email[0]}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-blue-600 font-semibold">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+1234567890"
                  defaultValue={patientData.phoneNumber || ''}
                  className={`${validationErrors.phoneNumber ? 'border-red-500' : ''}`}
                />
                {validationErrors.phoneNumber && (
                  <p className="text-red-500 text-sm">{validationErrors.phoneNumber[0]}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-blue-600 font-semibold">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, Country"
                  defaultValue={patientData.location || ''}
                  className={`${validationErrors.location ? 'border-red-500' : ''}`}
                />
                {validationErrors.location && (
                  <p className="text-red-500 text-sm">{validationErrors.location[0]}</p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-blue-600 font-semibold">Gender</Label>
                <Select 
                  value={selectedGender} 
                  onValueChange={setSelectedGender}
                  defaultValue={patientData.gender || ''}
                >
                  <SelectTrigger className={`${validationErrors.gender ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.gender && (
                  <p className="text-red-500 text-sm">{validationErrors.gender[0]}</p>
                )}
              </div>

              {/* Blood Type */}
              <div className="space-y-2">
                <Label className="text-blue-600 font-semibold">Blood Type</Label>
                <Select 
                  value={selectedBloodType} 
                  onValueChange={setSelectedBloodType}
                  defaultValue={patientData.bloodType || ''}
                >
                  <SelectTrigger className={`${validationErrors.bloodType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.bloodType && (
                  <p className="text-red-500 text-sm">{validationErrors.bloodType[0]}</p>
                )}
              </div>

              {/* Age */}
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="age" className="text-blue-600 font-semibold">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Age"
                  min="0"
                  max="120"
                  defaultValue={patientData.age || ''}
                  className={`${validationErrors.age ? 'border-red-500' : ''}`}
                />
                {validationErrors.age && (
                  <p className="text-red-500 text-sm">{validationErrors.age[0]}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update Patient Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientForm