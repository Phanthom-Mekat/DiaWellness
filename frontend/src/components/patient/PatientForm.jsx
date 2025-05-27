import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from 'lucide-react'
import { z } from 'zod'

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
  const [isEdit, setIsEdit] = useState(false)
  const [patientId, setPatientId] = useState(null)

  // Backend API base URL - adjust as needed
  const API_BASE_URL = 'http://localhost:5000' // Change this to your backend URL

  const showToast = (message, type = 'success') => {
    // Simple toast implementation since react-hot-toast isn't available
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

  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.status === 404) {
        return null
      }
      
      if (response.ok) {
        const userData = await response.json()
        return userData
      }
      
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to check user`)
      
    } catch (error) {
      console.error('Error checking user:', error)
      throw error
    }
  }

  const createUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: userData.name,
          Email: userData.email,
          Photo: userData.photo || ''
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to create user`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  const updatePatientProfile = async (patientId, formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
        method: 'PUT',
        body: formData, // FormData object for file upload
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to update patient profile`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error updating patient:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      const validatedData = PatientFormSchema.parse(formValues)
      
      // Check if user exists
      let userId = patientId
      let existingUser = null
      
      if (!userId) {
        try {
          existingUser = await checkUserExists(validatedData.email)
          if (existingUser) {
            userId = existingUser.id
            setPatientId(userId)
            setIsEdit(true)
          }
        } catch (checkError) {
          if (checkError.message.includes('Failed to fetch') || checkError.message.includes('HTTP 5')) {
            throw new Error('Unable to connect to server. Please check your connection and try again.')
          }
          console.log('User check failed, assuming new user:', checkError.message)
        }
      }

      // If user doesn't exist, create them first
      if (!existingUser && !userId) {
        const newUser = await createUser({
          name: validatedData.name,
          email: validatedData.email,
          photo: previewImage || ''
        })
        userId = newUser.userId
        setPatientId(userId)
        showToast('User account created successfully!')
      }

      // Prepare FormData for patient profile update
      const formData = new FormData()
      formData.append('name', validatedData.name)
      formData.append('email', validatedData.email)
      
      if (validatedData.phoneNumber) {
        formData.append('phoneNumber', validatedData.phoneNumber)
      }
      if (validatedData.location) {
        formData.append('location', validatedData.location)
      }
      if (validatedData.gender) {
        formData.append('gender', validatedData.gender)
      }
      if (validatedData.bloodType) {
        formData.append('bloodType', validatedData.bloodType)
      }
      if (validatedData.age) {
        formData.append('age', validatedData.age)
      }
      if (validatedData.image) {
        formData.append('image', validatedData.image)
      }

      // Update patient profile
      const result = await updatePatientProfile(userId, formData)
      
      // Update the preview image if a new one was uploaded
      if (result.patient?.photo) {
        setPreviewImage(`${API_BASE_URL}${result.patient.photo}`)
      }
      
      showToast(isEdit ? 'Patient profile updated successfully!' : 'Patient profile created successfully!')
      
      // Don't reset form if it's an edit
      if (!isEdit) {
        e.target.reset()
        setPreviewImage(null)
        setSelectedGender("")
        setSelectedBloodType("")
        setPatientId(null)
      }

    } catch (error) {
      console.error('Form submission error:', error)
      
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors
        setValidationErrors(errors)
        showToast('Please correct the form errors', 'error')
      } else {
        showToast(error.message || 'Error submitting form. Please try again.', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-100/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl border-2 border-blue-200">
        <CardHeader className="text-center bg-blue-50 py-6">
          <CardTitle className="text-4xl font-extrabold text-blue-600 tracking-tight">
            {isEdit ? 'Update Patient Profile' : 'Patient Profile Registration'}
          </CardTitle>
          {patientId && (
            <p className="text-sm text-blue-500 mt-2">Patient ID: {patientId}</p>
          )}
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
                  className={`${validationErrors.location ? 'border-red-500' : ''}`}
                />
                {validationErrors.location && (
                  <p className="text-red-500 text-sm">{validationErrors.location[0]}</p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-blue-600 font-semibold">Gender</Label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
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
                <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
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
              {isSubmitting ? 'Submitting...' : (isEdit ? 'Update Patient Profile' : 'Create Patient Profile')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientForm