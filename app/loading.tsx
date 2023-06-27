"use client"
import { Progress } from "@nextui-org/react";

export default function App() {
  return (
    <div className="xl" style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Progress
            color="secondary"
            size="md"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md"
        />
    </div>
  );
}