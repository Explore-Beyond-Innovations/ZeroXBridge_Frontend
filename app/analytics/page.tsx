'use client'
import AnalyticsDashboard from "../components/analytics";


export default function AnalyticsPage() {
  
    return (
      <div className={`min-h-screen bg-black  p-4 font-manrope`}>
        {/* to test out the connect state, please change isconnected to true */}
        <AnalyticsDashboard isConnected={false} />
      </div>
    );
  }