import React from 'react'

const ReactCodeSnippet = () => {
    return (
        <div className="w-full mt-8 bg-muted/50 rounded-lg p-4 sm:p-6 border border-primary/30 shadow-lg shadow-primary/40">
            <h3 className="text-sm font-semibold text-foreground mb-3">React Integration Example</h3>
            <div className="overflow-x-auto">
                <pre className="text-base text-muted-foreground font-mono whitespace-pre">

                    {
                    `// src/index.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FeatureMessagesProvider } from "your-package-name";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FeatureMessagesProvider projectKey="YOUR_PROJECT_KEY">
    <App />
  </FeatureMessagesProvider>
);


  export default App;
`}
                </pre>
            </div>
        </div>
    )
}

export default ReactCodeSnippet