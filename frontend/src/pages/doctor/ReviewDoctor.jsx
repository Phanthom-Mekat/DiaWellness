/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, StarHalf } from 'lucide-react'
import { ReviewReplyModal } from '@/components/doctor/ReviewReplyModal'

function StarRating({ rating, className = "" }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#F5C489] text-[#F5C489]" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-[#F5C489] text-[#F5C489]" />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  )
}

function ReviewCard({ review, onReply }) {
  return (
    <Card className="mb-4 border-[#ADD8E6]/30 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-[#ADD8E6]/50">
              <img src={review.avatar || "/placeholder.svg"} alt={review.name} className="object-cover" />
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-800">{review.name}</h3>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>
          <StarRating rating={review.rating} />
        </div>
        <p className="mt-3 text-sm text-gray-700">{review.text}</p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 text-[#3498db] hover:bg-[#3498db]/10"
          onClick={() => onReply(review)}
        >
          Reply
        </Button>

        {review.doctorReply && (
          <div className="mt-4 ml-8 p-4 bg-[#ADD8E6]/10 rounded-lg border border-[#ADD8E6]/20">
            <div className="flex gap-3 mb-2">
              <Avatar className="h-8 w-8 ring-2 ring-[#3498db]/30">
                <img src={review.doctorReply.avatar || "/placeholder.svg"} alt={review.doctorReply.name} className="object-cover" />
              </Avatar>
              <div>
                <h4 className="font-medium text-sm text-gray-800">{review.doctorReply.name}</h4>
                <p className="text-xs text-gray-500">{review.doctorReply.timeAgo}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700">{review.doctorReply.text}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function ReviewDoctor() {
  const [currentPage, setCurrentPage] = useState(1)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Adrian",
      date: "15 Mar 2024",
      rating: 4,
      text: "Dr. Edwin Hendry has been my family's trusted doctor for years. Their genuine care and thorough approach to our health concerns make every visit reassuring. Dr. Edwin Henry's ability to listen and explain complex health issues in understandable terms is delightful. We are glad to have such a dedicated physician by our side.",
      avatar: "https://i.postimg.cc/x8rPf4MJ/image.png",
    },
    {
      id: 2,
      name: "Kelly",
      date: "11 Mar 2024",
      rating: 4,
      text: "I recently completed a series of dental treatments with Dr Edwin Hendry, and I couldn't be more pleased with the results. From my very first appointment, Dr. Edwin Hendry and their team made me feel comfortable at ease, addressing all of my concerns thoroughly. The entire process was smooth and painless, and the final outcome exceeded my expectations. Highly recommended!",
      avatar: "https://i.postimg.cc/76JVykGr/image.png"
    },
  ])
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const [currentReview, setCurrentReview] = useState(null)

  const handleReply = (review) => {
    setCurrentReview(review)
    setIsReplyModalOpen(true)
  }

  const handleSubmitReply = (replyText) => {
    const updatedReviews = reviews.map(review => {
      if (review.id === currentReview.id) {
        return {
          ...review,
          doctorReply: {
            id: Date.now(),
            name: "Dr Edwin Hendry",
            timeAgo: "Just now",
            text: replyText,
            avatar: "https://i.postimg.cc/15vQ6jwk/ai-generated-9019520-640.jpg"
          }
        }
      }
      return review
    })
    setReviews(updatedReviews)
    setIsReplyModalOpen(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl" data-aos="fade-up">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#3498db]">4.0</h2>
              <StarRating 
                rating={4.0} 
                className="mt-1" 
              />
            </div>
            <div className="text-sm text-gray-500">
              30/03/2024 - 12/12/2024
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <ReviewCard 
            key={review.id} 
            review={review}
            onReply={handleReply}
          />
        ))}
      </div>

      <div className="flex justify-center gap-1 mt-6">
        <Button
          variant="outline"
          size="icon"
          className="text-[#3498db] hover:bg-[#3498db]/10"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </Button>
        {[1, 2, 3, 4].map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className={
              currentPage === page 
                ? "bg-[#3498db] text-white hover:bg-[#3498db]/90" 
                : "text-[#3498db] hover:bg-[#3498db]/10"
            }
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          className="text-[#3498db] hover:bg-[#3498db]/10"
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage === 4}
        >
          {'>'}
        </Button>
      </div>

      <ReviewReplyModal 
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onSubmit={handleSubmitReply}
        reviewAuthor={currentReview?.name}
      />
    </div>
  )
}