"use client";

const REVIEWS = [
  { text: "The noodles were so good I cried.", name: "Rahul S.", rating: 5 },
  { text: "Best late-night food. Period.", name: "Aisha M.", rating: 5 },
  { text: "Chilli garlic oil is pure magic.", name: "Karan V.", rating: 4 },
  { text: "Wok Master has some serious skills.", name: "Priya K.", rating: 5 },
  { text: "Literally eating it while writing this.", name: "Sneha P.", rating: 5 },
  { text: "Spicy enough to make me sweat. Love it.", name: "Arjun D.", rating: 5 },
  { text: "Fast, fresh, and unapologetic.", name: "Riya T.", rating: 4 },
];

export default function ReviewMarquee() {
  return (
    <section className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-track">
          {/* Render two sets for seamless infinite scrolling */}
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <span className="review-name">- {review.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
