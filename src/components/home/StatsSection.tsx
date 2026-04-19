import { Award, Users, Globe, Clock } from "lucide-react";

const stats = [
  { icon: Award, value: "3,000+", label: "Visas approved" },
  { icon: Users, value: "5,000+", label: "Students placed" },
  { icon: Globe, value: "17+", label: "Countries" },
  { icon: Clock, value: "15+", label: "Years of experience" },
];

const StatsSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="section-container text-center">
        <p className="section-subtitle mb-2">Our Statistics</p>
        <h2 className="section-title mb-4">Our students are always happy</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Ensuring our students' happiness is at the heart of everything we do.
          We pride ourselves on providing personalized support and guidance that
          goes beyond expectations.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
