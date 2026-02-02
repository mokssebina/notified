import React from 'react'

const NextCodeSnippet = () => {
  return (
    <div className="w-full mt-8 bg-muted/50 rounded-lg p-4 sm:p-6 border border-primary/30 shadow-lg shadow-primary/40">
            <h3 className="text-sm font-semibold text-foreground mb-3">Next JS Integration Example</h3>
            <div className="overflow-x-auto">
                <pre className="text-base text-muted-foreground font-mono whitespace-pre">

                    {
                    `// src/app/layout.tsx
                    "use client";
                    
import { FeatureMessageProvider } from "react-notified-next";


// Make sure the provider is inside the BrowserRouter component 
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
          <FeatureMessageProvider projectKey="YOUR_PROJECT_KEY" />
          {children}
        </body>
      </html>
    );
  }

  export default App;
`}
                </pre>
            </div>
        </div>
  )
}

export default NextCodeSnippet