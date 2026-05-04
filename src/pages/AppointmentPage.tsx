import { useState } from "react";
import Layout from "@/components/Layout";
import { inquiriesAPI } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";

const AppointmentPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    subject: "",
    year: "",
    gpa: "",
    country: "",
    test: "",
    course: "",
    visited: "",
    date: "",
    message: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inquiriesAPI.create({ ...form, type: "appointment" });
      alert("Appointment booked successfully!");
    } catch {
      alert("Error submitting form");
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container max-w-5xl">

          {/* Header */}
          <div className="mb-10">
            <p className="text-orange-500 text-sm font-semibold">
              Appointment Form
            </p>
            <h1 className="text-3xl font-bold mt-2">
              Book an Appointment
            </h1>
            <p className="text-muted-foreground mt-2">
              Please fill out the form below to book an appointment with us.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

            {/* Left Side */}
            <Input label="Full Name" value={form.name} onChange={(v) => handleChange("name", v)} />
            <Input label="Email Address" value={form.email} onChange={(v) => handleChange("email", v)} />

            <Input label="Phone Number" value={form.phone} onChange={(v) => handleChange("phone", v)} />
            <Input label="Address" value={form.address} onChange={(v) => handleChange("address", v)} />

            <Select label="Education Level" onChange={(v) => handleChange("education", v)} />
            <Select label="Select Subject" onChange={(v) => handleChange("subject", v)} />

            <Input type="date" label="Passed Year" value={form.year} onChange={(v) => handleChange("year", v)} />
            <Input label="GPA / Percentage" value={form.gpa} onChange={(v) => handleChange("gpa", v)} />

            <Select label="Destination Country" onChange={(v) => handleChange("country", v)} />
            <Select label="Test Preparation" onChange={(v) => handleChange("test", v)} />

            <Select label="Course" onChange={(v) => handleChange("course", v)} />

            {/* Radio */}
            <div>
              <label className="block text-sm mb-2 font-medium">
                Have you visited before?
              </label>
              <div className="flex gap-4">
                <label>
                  <input type="radio" name="visit" onChange={() => handleChange("visited", "yes")} /> Yes
                </label>
                <label>
                  <input type="radio" name="visit" onChange={() => handleChange("visited", "no")} /> No
                </label>
              </div>
            </div>

            <Input type="date" label="Appointment Date" value={form.date} onChange={(v) => handleChange("date", v)} />

            {/* Full Width Message */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-2 font-medium">
                Message
              </label>
              <Textarea
                rows={4}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Book an Appointment
              </button>
            </div>

          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AppointmentPage;




// 🔹 Reusable Input Component
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const Input = ({ label, value, onChange, type = "text" }: InputProps) => (
  <div>
    <label className="block text-sm mb-1 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none"
      required
    />
  </div>
);

// 🔹 Reusable Select Component
interface SelectProps {
  label: string;
  onChange: (value: string) => void;
}

const Select = ({ label, onChange }: SelectProps) => (
  <div>
    <label className="block text-sm mb-1 font-medium">{label}</label>
    <select
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none"
    >
      <option>--- Select ---</option>
      <option>IELTS</option>
      <option>TOEFL</option>
      <option>SAT</option>
      <option>PTE</option>
      <option>Japanese Language</option>
    </select>
  </div>
);
