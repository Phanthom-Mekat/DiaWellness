/* eslint-disable react/prop-types */
import  { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, FileText, Link2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function MedicalRecordsTable({ medicalRecords }) {
  const [viewRecord, setViewRecord] = useState(null)

  const handleDownload = (record) => {
    // In a real application, this would trigger a file download
    // For this example, we'll just log to the console
    console.log(`Downloading: ${record.file}`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicalRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#3498db]" />
                  {record.name}
                </div>
              </TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.description}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setViewRecord(record)}>
                    <Link2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDownload(record)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {viewRecord && (
        <Dialog open={!!viewRecord} onOpenChange={() => setViewRecord(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{viewRecord.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p><strong>Date:</strong> {viewRecord.date}</p>
              <p><strong>Description:</strong> {viewRecord.description}</p>
              <p><strong>Notes:</strong> {viewRecord.notes}</p>
              <p><strong>File:</strong> {viewRecord.file}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

