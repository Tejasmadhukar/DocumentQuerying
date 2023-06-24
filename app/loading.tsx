"use client"
import { Progress } from "@nextui-org/react";

export default function App() {
  return (
    <div className="2-xl" style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Progress
            color="secondary"
            size="xl"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md"
        />
    </div>
  );
}