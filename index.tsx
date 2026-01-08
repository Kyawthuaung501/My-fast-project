
import React, { ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Fix: Use React.Component explicitly with generic types to ensure 'state' and 'props' are correctly inherited and recognized by TypeScript
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Fix: Correctly initialize state property inherited from React.Component within the constructor
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App Crash Caught:", error, errorInfo);
  }

  render() {
    // Fix: Access state and props from the base class safely after ensuring proper inheritance
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-red-100 max-w-lg text-center">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">⚠️</div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">အမှားတစ်ခု ဖြစ်သွားပါသည်</h2>
            <p className="text-slate-500 mb-8 font-medium">App ကို ပြန်လည် စတင်ရန် အောက်က ခလုတ်ကို နှိပ်ပေးပါ။</p>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl active:scale-95 transition-all"
            >
              RESTART APP
            </button>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
