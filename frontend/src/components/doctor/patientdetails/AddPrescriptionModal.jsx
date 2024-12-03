/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function AddPrescriptionModal({ open, onOpenChange, onAddPrescription }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  const [viewPrescription, setViewPrescription] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPrescription = {
      id: `APt${Math.floor(Math.random() * 1000)}`,
      doctor: {
        name: "Edwin Hendry",
        avatar: "https://i.postimg.cc/15vQ6jwk/ai-generated-9019520-640.jpg",
      },
      type: "Prescription",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      ...formData,
    };
    onAddPrescription(newPrescription);
    setViewPrescription(newPrescription);
    setFormData({
      name: "",
      type: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Prescription</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Medicine Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter medicine name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
                value={formData.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="capsule">Capsule</SelectItem>
                  <SelectItem value="syrup">Syrup</SelectItem>
                  <SelectItem value="injection">Injection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                name="dosage"
                value={formData.dosage}
                onChange={handleInputChange}
                placeholder="Enter dosage"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                onValueChange={(value) => handleSelectChange("frequency", value)}
                value={formData.frequency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">Once daily</SelectItem>
                  <SelectItem value="twice">Twice daily</SelectItem>
                  <SelectItem value="thrice">Thrice daily</SelectItem>
                  <SelectItem value="four">Four times daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Enter duration (e.g., 7 days)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="Enter special instructions"
                className="resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#3498db] hover:bg-[#2980b9]">
                Add Prescription
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {viewPrescription && (
        <Dialog open={!!viewPrescription} onOpenChange={() => setViewPrescription(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Prescription Added</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>
                <strong>ID:</strong> {viewPrescription.id}
              </p>
              <p>
                <strong>Medicine Name:</strong> {viewPrescription.name}
              </p>
              <p>
                <strong>Type:</strong> {viewPrescription.type}
              </p>
              <p>
                <strong>Dosage:</strong> {viewPrescription.dosage}
              </p>
              <p>
                <strong>Frequency:</strong> {viewPrescription.frequency}
              </p>
              <p>
                <strong>Duration:</strong> {viewPrescription.duration}
              </p>
              <p>
                <strong>Instructions:</strong> {viewPrescription.instructions}
              </p>
              <p>
                <strong>Prescribed By:</strong> {viewPrescription.doctor.name}
              </p>
              <p>
                <strong>Date:</strong> {viewPrescription.date}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
