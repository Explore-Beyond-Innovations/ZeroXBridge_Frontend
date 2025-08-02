"use client";

const stats = [
  {
    title: "Wallet",
    value: "$1.13",
  },
  {
    title: "Total Value Locked",
    value: "$92,294,191",
  },
  {
    title: "24H Volume",
    value: "$165,003,398",
  },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-card-border rounded-xl p-4 hover:shadow-sm transition-all duration-200 hover:border-primary/20"
        >
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </h3>
            <p className="text-xl font-bold text-primary-text">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 