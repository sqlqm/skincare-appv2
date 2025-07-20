import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Index() {
  const navigate = useNavigate();
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    // Check if quiz has been completed
    const quizCompleted = localStorage.getItem("quizCompleted") === "true";
    setIsQuizCompleted(quizCompleted);
  }, []);

  const handleRoutineClick = () => {
    if (isQuizCompleted) {
      navigate("/routine");
    } else {
      // Redirect to quiz with a message
      navigate("/quiz?message=complete-quiz");
    }
  };

  const handleStartClick = () => {
    if (isQuizCompleted) {
      // Take to routine results with message
      navigate("/routine?from=start");
    } else {
      // Start fresh quiz
      navigate("/quiz?reset=true");
    }
  };
  const actionButtons = [
    {
      label: "Start",
      description: "Take quiz",
      icon: "🚀",
      link: "/quiz?reset=true",
      isPrimary: true,
    },
    {
      label: "Routine",
      description: "Your results",
      icon: "✨",
      link: "/routine",
      isPrimary: true,
    },
    {
      label: "Learn",
      description: "Education",
      icon: "📚",
      link: "/learn",
      isPrimary: false,
    },
    {
      label: "Browse",
      description: "Products",
      icon: "🔍",
      link: "/browse",
      isPrimary: false,
    },
    {
      label: "Tips",
      description: "Advice",
      icon: "💡",
      link: "/tips",
      isPrimary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
            Build your routine.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Answer a few questions to get skincare recommendations.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-sm mx-auto w-full">
          {/* Action Buttons Grid */}
          <div className="space-y-6">
            {/* Top row - primary actions */}
            <div className="grid grid-cols-2 gap-6">
              {actionButtons.slice(0, 2).map((button) => {
                if (button.label === "Routine") {
                  return (
                    <button
                      key={button.label}
                      onClick={handleRoutineClick}
                      className="group block"
                    >
                      <div
                        className={`relative w-full aspect-square rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                          button.isPrimary
                            ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105"
                            : "bg-card border-2 border-border text-card-foreground hover:border-primary/30 hover:shadow-md hover:scale-105"
                        }`}
                      >
                        <div className="text-3xl mb-2">{button.icon}</div>
                        <div className="font-semibold text-lg mb-1">
                          {button.label}
                        </div>
                        <div
                          className={`text-sm text-center px-2 ${
                            button.isPrimary
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {button.description}
                        </div>
                      </div>
                    </button>
                  );
                }
                if (button.label === "Start") {
                  return (
                    <button
                      key={button.label}
                      onClick={handleStartClick}
                      className="group block"
                    >
                      <div
                        className={`relative w-full aspect-square rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                          button.isPrimary
                            ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105"
                            : "bg-card border-2 border-border text-card-foreground hover:border-primary/30 hover:shadow-md hover:scale-105"
                        }`}
                      >
                        <div className="text-3xl mb-2">{button.icon}</div>
                        <div className="font-semibold text-lg mb-1">
                          {button.label}
                        </div>
                        <div
                          className={`text-sm text-center px-2 ${
                            button.isPrimary
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {button.description}
                        </div>
                      </div>
                    </button>
                  );
                }
                return (
                  <Link
                    key={button.label}
                    to={button.link}
                    className="group block"
                  >
                    <div
                      className={`relative w-full aspect-square rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                        button.isPrimary
                          ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105"
                          : "bg-card border-2 border-border text-card-foreground hover:border-primary/30 hover:shadow-md hover:scale-105"
                      }`}
                    >
                      <div className="text-3xl mb-2">{button.icon}</div>
                      <div className="font-semibold text-lg mb-1">
                        {button.label}
                      </div>
                      <div
                        className={`text-sm text-center px-2 ${
                          button.isPrimary
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {button.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            {/* Bottom row - secondary actions */}
            <div className="grid grid-cols-3 gap-4">
              {actionButtons.slice(2).map((button) => (
                <Link
                  key={button.label}
                  to={button.link}
                  className="group block"
                >
                  <div
                    className={`relative w-full aspect-square rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                      button.isPrimary
                        ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105"
                        : "bg-card border-2 border-border text-card-foreground hover:border-primary/30 hover:shadow-md hover:scale-105"
                    }`}
                  >
                    <div className="text-2xl mb-1">{button.icon}</div>
                    <div className="font-semibold text-base mb-1">
                      {button.label}
                    </div>
                    <div
                      className={`text-xs text-center px-1 leading-tight ${
                        button.isPrimary
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {button.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-12">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Trusted by millions for healthy skin
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Designed by Salam Jadallah
          </p>
        </div>
      </div>
    </div>
  );
}
