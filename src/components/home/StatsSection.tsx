import { useEffect, useState } from "react";
import { Award, Users, Globe, Clock } from "lucide-react";

const stats = [
  { icon: Award, value: 3000, suffix: "+", label: "Visas approved" },
  { icon: Users, value: 5000, suffix: "+", label: "Students placed" },
  { icon: Globe, value: 17, suffix: "+", label: "Countries" },
  { icon: Clock, value: 15, suffix: "+", label: "Years of experience" },
];

// Hook for count-up animation
const useCountUp = (end: number, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

const StatsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-muted/50 to-background">
      <div className="section-container text-center">

        {/* HEADER */}
        <div className="mb-12">
          <p className="section-subtitle mb-2">Our Statistics</p>

          <h2 className="section-title mb-4">
            Trusted by thousands of students
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            We take pride in delivering successful visa approvals and university placements worldwide.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((stat, index) => {
            const count = useCountUp(stat.value);

            return (
              <div
                key={stat.label}
                className="group relative bg-background border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >

                {/* ICON */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>

                {/* NUMBER */}
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {count}{stat.suffix}
                </div>

                {/* LABEL */}
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>

                {/* GLOW EFFECT */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-primary/5 blur-xl -z-10" />
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default StatsSection;