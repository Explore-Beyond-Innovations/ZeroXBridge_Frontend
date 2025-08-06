"use client";


interface Stat {
  id: string;
 title: string;
 value: string;
}

interface StatsOverviewProps {
  stats: Stat[];
  isLoading?: boolean;
}

export default function StatsOverview({ stats, isLoading }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
     {stats.map((stat) => (
         <div
        key={stat.id}
           className="bg-card border border-card-border rounded-xl p-4 hover:shadow-sm transition-all duration-200 hover:border-primary/20"
       
           role="article"
         aria-labelledby={`stat-${stat.id}`}
         >
           <div className="space-y-1">
           <h3 id={`stat-${stat.id}`} className="text-sm font-medium text-muted-foreground">
               {stat.title}
             </h3>
                    <p className="text-xl font-bold text-primary-text" aria-describedby={`stat-${stat.id}`}>
               {stat.value}
             </p>
           </div>
    </div>
      ))}
    </div>
  );
} 