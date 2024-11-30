import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FlaskRoundIcon as Flask, Plus, Trash2 } from 'lucide-react'
import { usePatient } from '@/provider/PatientContext'

export function LaboratoryTests() {
    const {tests, setTests} = usePatient()

  const addTest = () => {
    setTests([...tests, { name: '', date: '', result: '' }])
  }

  const removeTest = (index) => {
    const newTests = tests.filter((_, i) => i !== index)
    setTests(newTests)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flask className="w-5 h-5 text-purple-500" />
          Laboratory Tests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Result</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input defaultValue={test.name} placeholder="Test name" />
                </TableCell>
                <TableCell>
                  <Input type="date" defaultValue={test.date} />
                </TableCell>
                <TableCell>
                  <Input defaultValue={test.result} placeholder="Result" />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTest(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={addTest}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Test
        </Button>
      </CardContent>
    </Card>
  )
}

