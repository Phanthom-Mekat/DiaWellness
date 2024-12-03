/* eslint-disable react/prop-types */
import  { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from 'lucide-react'

export function AddMedicalRecordModal({ open, onOpenChange, onAddMedicalRecord }) {
  const [formData, setFormData] = useState({
    recordType: '',
    description: '',
    date: '',
    notes: '',
    file: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      recordType: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prevData => ({
      ...prevData,
      file: file
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.file) {
      alert("Please upload a file before submitting.")
      return
    }
    const newRecord = {
      name: formData.recordType,
      date: formData.date,
      description: formData.description,
      notes: formData.notes,
      file: formData.file.name
    }
    onAddMedicalRecord(newRecord)
    onOpenChange(false)
    setFormData({
      recordType: '',
      description: '',
      date: '',
      notes: '',
      file: null
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Medical Record</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="record-type">Record Type</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select record type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lab Report">Lab Report</SelectItem>
                <SelectItem value="Imaging">Imaging</SelectItem>
                <SelectItem value="Prescription">Prescription</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter record description"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              className="resize-none"
            />
          </div>
          <div className="grid gap-2">
            <Label>Upload File</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById('file-upload').click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {formData.file ? `Selected: ${formData.file.name}` : 'Supported formats: PDF, JPG, PNG (max 10MB)'}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#3498db] hover:bg-[#2980b9]">
              Add Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

