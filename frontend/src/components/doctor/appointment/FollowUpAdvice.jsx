import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { CalendarClock, MessageCircle } from 'lucide-react'
import { usePatient } from '@/provider/PatientContext'

export function FollowUpAdvice() {
    const {advice, setAdvice} = usePatient()

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-blue-500" />
          Follow-up and Advice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Follow-up Date</label>
          <input type="date" className="w-full rounded-md border border-input px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            <MessageCircle className="w-4 h-4 inline-block mr-2" />
            Advice
          </label>
          <Textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Enter advice for the patient..."
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}


