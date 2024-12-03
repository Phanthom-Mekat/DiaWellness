/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Link2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function PrescriptionsTable({ prescriptions }) {
  const [viewPrescription, setViewPrescription] = useState(null)
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Prescribed By</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prescriptions.map((prescription) => (
            <TableRow key={prescription.id}>
              <TableCell className="font-medium">{prescription.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <img src={prescription.doctor.avatar} alt={prescription.doctor.name} />
                  </Avatar>
                  {prescription.doctor.name}
                </div>
              </TableCell>
              <TableCell>{prescription.type}</TableCell>
              <TableCell>{prescription.date}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => setViewPrescription(prescription)}>
                  <Link2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {viewPrescription && (
        <Dialog open={!!viewPrescription} onOpenChange={() => setViewPrescription(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Prescription Details</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p><strong>ID:</strong> {viewPrescription.id}</p>
              <p><strong>Type:</strong> {viewPrescription.type}</p>
              <p><strong>Prescribed By:</strong> {viewPrescription.doctor.name}</p>
              <p><strong>Date:</strong> {viewPrescription.date}</p>
              {viewPrescription.name && <p><strong>Medicine Name:</strong> {viewPrescription.name}</p>}
              {viewPrescription.dosage && <p><strong>Dosage:</strong> {viewPrescription.dosage}</p>}
              {viewPrescription.frequency && <p><strong>Frequency:</strong> {viewPrescription.frequency}</p>}
              {viewPrescription.duration && <p><strong>Duration:</strong> {viewPrescription.duration}</p>}
              {viewPrescription.instructions && <p><strong>Instructions:</strong> {viewPrescription.instructions}</p>}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

