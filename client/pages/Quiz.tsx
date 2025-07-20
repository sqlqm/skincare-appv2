import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

type SkinConcern = "Dryness" | "Acne" | "Redness" | "Oily Skin";
type SkinType = "Normal" | "Dry" | "Oily" | "Combination" | "Sensitive";

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: string[];
  type: "concern" | "skin-type";
}

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // Always start at Question 1
  const [showMessage, setShowMessage] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const totalSteps = 8;

  useEffect(() => {
    // Check if user was redirected from Routine button
    if (searchParams.get("message") === "complete-quiz") {
      setShowMessage(true);
      // Clear the message after 5 seconds
      setTimeout(() => setShowMessage(false), 5000);
    }

    // Clear any existing quiz state when starting fresh
    const reset = searchParams.get("reset");
    if (reset === "true") {
      localStorage.removeItem("quizAnswers");
      localStorage.removeItem("quizCompleted");
      setSelectedAnswers({});
      setCurrentStep(1);
    }
  }, [searchParams]);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What's your main skin concern?",
      subtitle: "Help us understand your skin better",
      options: ["Dryness", "Acne", "Redness", "Oily Skin"],
      type: "concern",
    },
    {
      id: 2,
      question: "What's your skin type?",
      subtitle:
        "Understanding your skin type helps us recommend the right products",
      options: ["Normal", "Dry", "Oily", "Combination", "Sensitive"],
      type: "skin-type",
    },
    {
      id: 3,
      question: "What texture do you prefer for cleansers?",
      subtitle: "Choose the cleanser texture that feels best on your skin",
      options: ["Foaming", "Creamy", "Gel", "No Preference"],
      type: "texture",
    },
    {
      id: 4,
      question: "Do you want fragrance-free products?",
      subtitle: "Fragrance-free products are ideal for sensitive skin",
      options: ["Yes", "No", "Doesn't Matter"],
      type: "fragrance",
    },
    {
      id: 5,
      question: "How many steps do you want in your routine?",
      subtitle: "Choose the routine complexity that fits your lifestyle",
      options: ["Basic (2–3 steps)", "Full (4–5+ steps)", "Not sure"],
      type: "routine-steps",
    },
    {
      id: 6,
      question: "Do you have any of these conditions?",
      subtitle: "This helps us recommend suitable products for your skin",
      options: ["🔴 Eczema", "🌹 Rosacea", "✅ None", "❓ Not sure"],
      type: "conditions",
    },
    {
      id: 7,
      question: "What time of day will you use this routine?",
      subtitle: "Different times may require different product recommendations",
      options: ["🌅 Morning", "🌙 Night", "🌅🌙 Both"],
      type: "time-of-day",
    },
    {
      id: 8,
      question: "Would you like sunscreen included?",
      subtitle:
        "Sunscreen is essential for protecting your skin from UV damage",
      options: ["Yes", "No", "Recommend if needed"],
      type: "sunscreen",
    },
  ];

  const currentQuestion = questions.find((q) => q.id === currentStep);
  const selectedAnswer = selectedAnswers[currentStep];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentStep]: answer,
    }));
  };

  const handleNext = () => {
    if (selectedAnswer && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else if (selectedAnswer && currentStep === totalSteps) {
      // Save final answer
      const finalAnswers = {
        ...selectedAnswers,
        [currentStep]: selectedAnswer,
      };

      // Quiz completed - save answers and mark as completed
      localStorage.setItem("quizAnswers", JSON.stringify(finalAnswers));
      localStorage.setItem("quizCompleted", "true");
      navigate("/routine");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Question not found</h2>
          <Link to="/" className="text-primary hover:text-primary/80">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Message Banner */}
      {showMessage && (
        <div className="bg-primary/10 border border-primary/20 text-primary px-6 py-3 text-center">
          Complete your quiz to view personalized recommendations.
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-3">
          <Link
            to="/"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-all duration-200 -ml-3"
          >
            ← Home
          </Link>
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 -mt-16">
        <div className="max-w-md mx-auto w-full">
          {/* Question */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
              {currentQuestion.question}
            </h1>
            <p className="text-muted-foreground text-lg">
              {currentQuestion.subtitle}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-4 mb-16">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-5 rounded-2xl border-2 text-left font-semibold text-lg transition-all duration-200 ${
                  selectedAnswer === option
                    ? "border-primary bg-primary text-primary-foreground shadow-lg scale-[1.02]"
                    : "border-border bg-card text-card-foreground hover:border-primary/30 hover:shadow-md hover:scale-[1.01]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      selectedAnswer === option
                        ? "bg-primary-foreground border-primary-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedAnswer === option && (
                      <div className="w-full h-full rounded-full bg-primary scale-75" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-6">
        <div className="max-w-md mx-auto w-full flex gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 border-2 border-border bg-card text-card-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {currentStep === totalSteps ? "See My Results" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
