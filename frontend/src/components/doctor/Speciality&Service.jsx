import  { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import toast from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
export default function SpecialtyAndService({ onSave }) {
  const [specialties, setSpecialties] = useState([
    { id: "1", name: "Diabetes", services: [], isOpen: true },
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const addSpecialty = () => {
    const newSpecialty = {
      id: Date.now().toString(),
      name: "",
      services: [],
      isOpen: true,
    };
    setSpecialties([...specialties, newSpecialty]);
  };

  const addService = (specialtyId) => {
    setSpecialties(
      specialties.map((specialty) =>
        specialty.id === specialtyId
          ? {
              ...specialty,
              services: [
                ...specialty.services,
                { id: Date.now().toString(), name: "", price: "", about: "" },
              ],
            }
          : specialty
      )
    );
  };

  const updateService = (specialtyId, serviceId, field, value) => {
    setSpecialties(
      specialties.map((specialty) =>
        specialty.id === specialtyId
          ? {
              ...specialty,
              services: specialty.services.map((service) =>
                service.id === serviceId
                  ? { ...service, [field]: value }
                  : service
              ),
            }
          : specialty
      )
    );
  };

  const deleteService = (specialtyId, serviceId) => {
    setSpecialties(
      specialties.map((specialty) =>
        specialty.id === specialtyId
          ? {
              ...specialty,
              services: specialty.services.filter(
                (service) => service.id !== serviceId
              ),
            }
          : specialty
      )
    );
  };

  const toggleSpecialty = (specialtyId) => {
    setSpecialties(
      specialties.map((specialty) =>
        specialty.id === specialtyId
          ? { ...specialty, isOpen: !specialty.isOpen }
          : specialty
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(specialties);
      toast.success('Changes saved successfully');
      setSpecialties(specialties.map((s) => ({
        ...s,
        services: s.services.map((svc) => ({ ...svc, price: '', about: '' }))
      })));
    } catch {
      toast.error('There was a problem saving your changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setSpecialties([{ id: "1", name: "Diabetes", services: [], isOpen: true }]);
    toast('Changes discarded', { icon: '🔄' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Specialty & Services</h2>
        <Button
          onClick={addSpecialty}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add New Specialty
        </Button>
      </div>

      <div className="space-y-4">
        {specialties.map((specialty) => (
          <div key={specialty.id} className="border rounded-lg shadow-sm bg-white p-4">
            <Collapsible open={specialty.isOpen}>
              <div className="flex items-center justify-between">
                <Select
                  defaultValue="diabetes"
                  onValueChange={(value) =>
                    updateService(specialty.id, specialty.id, "name", value)
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="nephrology">Nephrology</SelectItem>
                  </SelectContent>
                </Select>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0">
                    {specialty.isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-4">
                {specialty.services.map((service) => (
                  <div key={service.id} className="grid grid-cols-12 gap-4 mb-4 items-start">
                    <div className="col-span-4">
                      <Select
                        value={service.name}
                        onValueChange={(value) =>
                          updateService(specialty.id, service.id, "name", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="checkup">Regular Checkup</SelectItem>
                          <SelectItem value="treatment">Diabetes Treatment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="text"
                        placeholder="Price ($)"
                        value={service.price}
                        onChange={(e) =>
                          updateService(
                            specialty.id,
                            service.id,
                            "price",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-5">
                      <Input
                        type="text"
                        placeholder="About service"
                        value={service.about}
                        onChange={(e) =>
                          updateService(
                            specialty.id,
                            service.id,
                            "about",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteService(specialty.id, service.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => addService(specialty.id)}
                  variant="outline"
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Service
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSaving}
        >
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
