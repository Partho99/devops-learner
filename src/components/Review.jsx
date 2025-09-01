import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Star } from 'lucide-react';

// Dummy review data
const DUMMY_REVIEWS = [
    { id: 1, name: 'Alice', rating: 5, comment: 'Amazing course! Learned so much.', date: '2025-08-25' },
    { id: 2, name: 'Bob', rating: 4, comment: 'Very informative, but some topics were fast.', date: '2025-08-22' },
    { id: 3, name: 'Charlie', rating: 5, comment: 'Excellent explanations and exercises!', date: '2025-08-20' },
];

const ReviewCard = ({ review }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow border border-gray-100 p-4"
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                ))}
            </div>
        </div>
        <p className="mt-2 text-gray-700">{review.comment}</p>
    </motion.div>
);

const Reviews = () => {
    const [reviews, setReviews] = useState(DUMMY_REVIEWS);
    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewToAdd = {
            ...newReview,
            id: reviews.length + 1,
            date: new Date().toISOString().split('T')[0],
        };
        setReviews([reviewToAdd, ...reviews]);
        setNewReview({ name: '', rating: 5, comment: '' });
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-6 font-inter">Course Reviews</h1>

                {/* Add new review */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Leave a Review</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className="w-full mt-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                value={newReview.name}
                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                required
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rating</label>
                            <select
                                className="w-full mt-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                value={newReview.rating}
                                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                            >
                                {[5, 4, 3, 2, 1].map((r) => (
                                    <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Comment</label>
                            <textarea
                                className="w-full mt-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 resize-none"
                                rows={4}
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                required
                                placeholder="Write your review here..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition-colors font-semibold"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>

                {/* List reviews */}
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Reviews;
