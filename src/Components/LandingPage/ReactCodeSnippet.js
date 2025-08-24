import React from 'react'

const ReactCodeSnippet = () => {
    return (
        <div className="w-full mt-8 bg-muted/50 rounded-lg p-4 sm:p-6 border border-primary/30 shadow-lg shadow-primary/40">
            <h3 className="text-sm font-semibold text-foreground mb-3">React Integration Example</h3>
            <div className="overflow-x-auto">
                <pre className="text-base text-muted-foreground font-mono whitespace-pre">

                    {
                    `// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotifiedProvider } from "@react-notified/react";


// Make sure the provider is inside the BrowserRouter component 
function App() {
    return (
      <Router>

        {/*------Insert it here------*/}
        <NotifyProvider projectKey="YOUR_PROJECT_KEY" />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </Router>
    );
  }

  export default App;
`}
                </pre>
            </div>
        </div>
    )
}

export default ReactCodeSnippet