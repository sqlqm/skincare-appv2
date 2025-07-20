import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

export default function Routine() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showAnswerReview, setShowAnswerReview] = useState(false);
  const [showFromStartMessage, setShowFromStartMessage] = useState(false);

  useEffect(() => {
    // Check if quiz has been completed
    const quizCompleted = localStorage.getItem("quizCompleted") === "true";
    setIsQuizCompleted(quizCompleted);

    // Get stored quiz answers (in a real app, this would come from a backend)
    const storedAnswers = localStorage.getItem("quizAnswers");
    if (storedAnswers) {
      setQuizAnswers(JSON.parse(storedAnswers));
    }

    // Check if user came from Start button
    if (searchParams.get("from") === "start" && quizCompleted) {
      setShowFromStartMessage(true);
    }

    // Redirect to quiz if not completed
    if (!quizCompleted) {
      navigate("/quiz?message=complete-quiz");
    }
  }, [navigate, searchParams]);

  const handleRetakeQuiz = () => {
    // Clear quiz completion and answers
    localStorage.removeItem("quizCompleted");
    localStorage.removeItem("quizAnswers");
    navigate("/quiz?reset=true");
  };

  // Check if sunscreen should be included based on quiz answer
  const shouldIncludeSunscreen = () => {
    const sunscreenAnswer = quizAnswers[8]; // Question 8 answer
    return (
      sunscreenAnswer === "Yes" || sunscreenAnswer === "Recommend if needed"
    );
  };

  const quizQuestions = [
    {
      id: 1,
      question: "What's your main skin concern?",
      options: ["Dryness", "Acne", "Redness", "Oily Skin"],
    },
    {
      id: 2,
      question: "What's your skin type?",
      options: ["Normal", "Dry", "Oily", "Combination", "Sensitive"],
    },
    {
      id: 3,
      question: "What texture do you prefer for cleansers?",
      options: ["Foaming", "Creamy", "Gel", "No Preference"],
    },
    {
      id: 4,
      question: "Do you want fragrance-free products?",
      options: ["Yes", "No", "Doesn't Matter"],
    },
    {
      id: 5,
      question: "How many steps do you want in your routine?",
      options: ["Basic (2–3 steps)", "Full (4–5+ steps)", "Not sure"],
    },
    {
      id: 6,
      question: "Do you have any of these conditions?",
      options: ["🔴 Eczema", "🌹 Rosacea", "✅ None", "❓ Not sure"],
    },
    {
      id: 7,
      question: "What time of day will you use this routine?",
      options: ["🌅 Morning", "🌙 Night", "🌅🌙 Both"],
    },
    {
      id: 8,
      question: "Would you like sunscreen included?",
      options: ["Yes", "No", "Recommend if needed"],
    },
  ];

  const products: Product[] = [
    {
      id: "cleanser",
      name: "CeraVe Foaming Facial Cleanser",
      description:
        "Gentle cleanser that removes dirt and oil while maintaining the skin's natural barrier.",
      image: "/placeholder.svg",
      category: "Cleanser",
    },
    {
      id: "moisturizer",
      name: "CeraVe Daily Moisturizing Lotion",
      description:
        "24-hour hydration with essential ceramides and hyaluronic acid for all skin types.",
      image: "/placeholder.svg",
      category: "Moisturizer",
    },
  ];

  if (shouldIncludeSunscreen()) {
    products.push({
      id: "sunscreen",
      name: "CeraVe AM Facial Moisturizing Lotion SPF 30",
      description:
        "Broad-spectrum SPF 30 protection with ceramides and niacinamide for daily use.",
      image: "/placeholder.svg",
      category: "Sunscreen",
    });
  }

  if (!isQuizCompleted) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-all duration-200 -ml-3"
          >
            ← Home
          </Link>
        </div>

        {/* Message when user came from Start button */}
        {showFromStartMessage && (
          <div className="max-w-md mx-auto mb-6">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-center">
              <p className="text-primary font-medium mb-3">
                You've already completed the quiz. Would you like to retake it?
              </p>
              <button
                onClick={handleRetakeQuiz}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-primary/90"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Your Personalized Routine
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your quiz results, here's your recommended skincare routine
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1 px-6 pb-6">
        <div className="max-w-md mx-auto space-y-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-card rounded-2xl border-2 border-border p-6 shadow-sm"
            >
              {/* Step Number */}
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold mr-3">
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-primary">
                  {product.category}
                </span>
              </div>

              {/* Product Image Placeholder */}
              <div className="w-full h-32 bg-secondary rounded-xl mb-4 flex items-center justify-center">
                <div className="text-4xl">🧴</div>
              </div>

              {/* Product Info */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 px-4 rounded-xl border-2 border-border bg-card text-card-foreground font-semibold text-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                  Learn More
                </button>
                <button className="flex-1 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:bg-primary/90 shadow-md">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-8">
        <div className="max-w-md mx-auto">
          {/* Results Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-6">
            <h4 className="font-semibold text-primary mb-2">
              ✨ Your Routine Summary
            </h4>
            <p className="text-sm text-primary/80">
              {products.length === 3
                ? "Complete 3-step routine with cleanser, moisturizer, and sunscreen protection."
                : "Essential 2-step routine with gentle cleanser and hydrating moisturizer."}
            </p>
          </div>

          {/* Review Answers Button */}
          <button
            onClick={() => setShowAnswerReview(!showAnswerReview)}
            className="w-full py-4 px-6 rounded-2xl border-2 border-primary text-primary font-semibold text-lg transition-all duration-200 hover:bg-primary/5 hover:shadow-md mb-4"
          >
            {showAnswerReview ? "Hide My Answers" : "Review My Answers"}
          </button>

          {/* Collapsible Answer Review Section */}
          {showAnswerReview && (
            <div className="bg-card border-2 border-border rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-foreground">
                  📋 Your Quiz Answers
                </h4>
                <button
                  onClick={() => setShowAnswerReview(false)}
                  className="text-muted-foreground hover:text-primary transition-colors p-2"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {quizQuestions.map((q) => {
                  const userAnswer = quizAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="border-b border-border pb-4 last:border-b-0"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {q.id}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-foreground text-sm">
                            {q.question}
                          </h5>
                          {userAnswer ? (
                            <div className="mt-2 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                              ✓ {userAnswer}
                            </div>
                          ) : (
                            <div className="mt-2 px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm">
                              No answer recorded
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Retake Quiz Button */}
          <button
            onClick={handleRetakeQuiz}
            className="w-full py-4 px-6 rounded-2xl border-2 border-primary text-primary font-semibold text-lg transition-all duration-200 hover:bg-primary/5 hover:shadow-md"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
