import  { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  UploadIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

// Validation Schema
const PatientFormSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  location: z.string().min(2, "Location is required"),
  gender: z.enum(['male', 'female', 'other']),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  age: z.string().refine(val => {
    const age = parseInt(val);
    return age >= 0 && age <= 120;
  }, { message: "Age must be between 0 and 120" }),
  image: z.instanceof(File).optional()
});

const PatientForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setValidationErrors({})

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      location: e.target.location.value,
      gender: e.target.gender.value,
      bloodType: e.target.bloodType.value,
      age: e.target.age.value,
      image: e.target.image.files[0]
    }

    try {
      // Validate form data using Zod
      const validatedData = PatientFormSchema.parse(formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Log form data to console
      console.log('Patient Profile Created:', validatedData)
      
      toast.success('Patient profile created successfully!', {
        icon: '🩺',
        style: {
          background: '#4682B4',
          color: 'white',
        }
      })
      
      // Reset form
      e.target.reset()
      setPreviewImage(null)
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errors = error.flatten().fieldErrors
        setValidationErrors(errors)
        
        toast.error('Please correct the form errors', {
          icon: '❌',
          style: {
            background: '#FF5252',
            color: 'white',
          }
        })
      } else {
        toast.error('Error submitting form. Please try again.', {
          icon: '🚨',
          style: {
            background: '#FF5252',
            color: 'white',
          }
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-100/40  flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl border-2 border-blue-200">
        <CardHeader className="text-center bg-blue-50 py-6">
          <CardTitle className="text-4xl font-extrabold text-blue-600 tracking-tight">
            Patient Profile Registration
          </CardTitle>
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
                    <UploadIcon className="text-blue-500" size={32} />
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
                <Label htmlFor="phoneNumber" className="text-blue-600 font-semibold">Phone Number *</Label>
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
                <Label htmlFor="location" className="text-blue-600 font-semibold">Location *</Label>
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
                <Label className="text-blue-600 font-semibold">Gender *</Label>
                <Select name="gender">
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
                <Label className="text-blue-600 font-semibold">Blood Type *</Label>
                <Select name="bloodType">
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
              <div className="space-y-2">
                <Label htmlFor="age" className="text-blue-600 font-semibold">Age *</Label>
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
              {isSubmitting ? 'Submitting...' : 'Create Patient Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientForm