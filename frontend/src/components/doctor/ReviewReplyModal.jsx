/* eslint-disable react/prop-types */
import  { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ReviewReplyModal({ isOpen, onClose, onSubmit, reviewAuthor }) {
  const [replyText, setReplyText] = useState('')

  const handleSubmit = () => {
    onSubmit(replyText)
    setReplyText('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reply to {reviewAuthor}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Type your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-[#3498db] hover:bg-[#2980b9]">Submit Reply</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

