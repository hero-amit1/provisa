import { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar } from "lucide-react";
import { inquiriesAPI } from '@/lib/api';

const AppointmentPage = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", time: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    await inquiriesAPI.create({ ...form, type: 'appointment' });
      alert("Appointment booked successfully! We will contact you shortly.");
      setForm({ name: "", email: "", phone: "", date: "", time: "", message: "" });
    } catch (err) {
      alert("Error booking appointment. Try again.");
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container max-w-2xl">
          <div className="text-center mb-12">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="section-title mb-4">Book an Appointment</h1>
            <p className="text-muted-foreground">
              Schedule a free consultation with our education experts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { key: "name", label: "Full Name", type: "text" },
              { key: "email", label: "Email", type: "email" },
              { key: "phone", label: "Phone Number", type: "tel" },
              { key: "date", label: "Preferred Date", type: "date" },
              { key: "time", label: "Preferred Time", type: "time" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell us about your study goals..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AppointmentPage;
