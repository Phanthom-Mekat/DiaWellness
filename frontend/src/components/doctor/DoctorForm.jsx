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
const DoctorFormSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  specialty: z.enum(['cardiology', 'dermatology', 'neurology', 'orthopedics', 'pediatrics']),
  location: z.string().min(2, "Location is required"),
  dob: z.string().refine(val => {
    const birthDate = new Date(val);
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    return birthDate < minAge;
  }, { message: "Doctor must be at least 25 years old" }),
  gender: z.enum(['male', 'female', 'other']),
  phoneNumber: z.string().min(11, "Phone number is required"),
  email: z.string().min(3, "Email address is required"),
  nid: z.string().min(11, "National ID must be at least 11 characters"),
  yearsOfExperience: z.string().refine(val => {
    const experience = parseInt(val);
    return experience >= 0 && experience <= 50;
  }, { message: "Years of experience must be between 0 and 50" }),
  image: z.instanceof(File).optional()
});

const DoctorForm = () => {
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
      specialty: e.target.specialty.value,
      location: e.target.location.value,
      dob: e.target.dob.value,
      gender: e.target.gender.value,
      phoneNumber: e.target.phoneNumber.value,
      email: e.target.email.value,
      nid: e.target.nid.value,
      yearsOfExperience: e.target.yearsOfExperience.value,
      image: e.target.image.files[0]
    }

    try {
      // Validate form data using Zod
      const validatedData = DoctorFormSchema.parse(formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Log form data to console
      console.log('Form submitted:', validatedData)
      
      toast.success('Doctor profile created successfully!', {
        icon: '👩‍⚕️',
        style: {
          background: '#4CAF50',
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
    <div className="min-h-screen  flex items-center justify-center p-6" data-aos='fade-up'>
      <Card className="w-full max-w-3xl shadow-2xl border-2 border-blue-200">
        <CardHeader className="text-center bg-blue-50 py-6">
          <CardTitle className="text-4xl font-extrabold text-blue-600 tracking-tight">
            Doctor Registration
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
                  placeholder="Dr. John Doe"
                  className={`${validationErrors.name ? 'border-red-500' : ''}`}
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm">{validationErrors.name[0]}</p>
                )}
              </div>

              {/* Specialty Field */}
              <div className="space-y-2">
                <Label className="text-blue-600 font-semibold">Specialty *</Label>
                <Select name="specialty">
                  <SelectTrigger className={`${validationErrors.specialty ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.specialty && (
                  <p className="text-red-500 text-sm">{validationErrors.specialty[0]}</p>
                )}
              </div>

              {/* Rest of the form fields with similar error handling */}
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

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-blue-600 font-semibold">Date of Birth *</Label>
                <div className="relative">
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    className={`${validationErrors.dob ? 'border-red-500' : ''}`}
                  />
                </div>
                {validationErrors.dob && (
                  <p className="text-red-500 text-sm">{validationErrors.dob[0]}</p>
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

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-600 font-semibold">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="doctor@example.com"
                  className={`${validationErrors.email ? 'border-red-500' : ''}`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm">{validationErrors.email[0]}</p>
                )}
              </div>

              {/* National ID */}
              <div className="space-y-2">
                <Label htmlFor="nid" className="text-blue-600 font-semibold">National ID *</Label>
                <Input
                  id="nid"
                  name="nid"
                  placeholder="National ID Number"
                  className={`${validationErrors.nid ? 'border-red-500' : ''}`}
                />
                {validationErrors.nid && (
                  <p className="text-red-500 text-sm">{validationErrors.nid[0]}</p>
                )}
              </div>

              {/* Years of Experience */}
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience" className="text-blue-600 font-semibold">Years of Experience *</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  placeholder="Years of Experience"
                  min="0"
                  className={`${validationErrors.yearsOfExperience ? 'border-red-500' : ''}`}
                />
                {validationErrors.yearsOfExperience && (
                  <p className="text-red-500 text-sm">{validationErrors.yearsOfExperience[0]}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Create Doctor Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default DoctorForm