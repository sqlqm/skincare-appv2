import { Link } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <div className="max-w-md mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-4xl">🚧</div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Coming Soon
          </h2>
          <p className="text-muted-foreground mb-8">
            This section is currently under development. Continue prompting to
            have us build out this feature for you!
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
