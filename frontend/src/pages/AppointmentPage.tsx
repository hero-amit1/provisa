import { useState } from "react";
import emailjs from "@emailjs/browser";

import Layout from "@/components/Layout";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AppointmentPage = () => {
  const { toast } = useToast();

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
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_c2umit1",
        "template_n95q56m",
        {
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,

          education: form.education,
          subject: form.subject,

          passed_year: form.year,
          gpa: form.gpa,

          country: form.country,
          test_preparation: form.test,
          course: form.course,

          visited_before: form.visited,
          appointment_date: form.date,

          message: form.message,
        },
        "rFe-t8EnY2t2wUouN"
      );

      toast({
        title: "Appointment sent successfully",
      });

      setForm({
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

    } catch (err) {
      console.error(err);

      toast({
        title: "Error submitting form",
      });
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container max-w-5xl">

          <div className="mb-10">
            <p className="text-orange-500 text-sm font-semibold">
              Appointment Form
            </p>

            <h1 className="text-3xl font-bold mt-2">
              Book an Appointment
            </h1>

            <p className="text-muted-foreground mt-2">
              Please fill out the form below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

            <Input label="Full Name" value={form.name} onChange={(v) => handleChange("name", v)} />
            <Input label="Email Address" value={form.email} onChange={(v) => handleChange("email", v)} />
            <Input label="Phone Number" value={form.phone} onChange={(v) => handleChange("phone", v)} />
            <Input label="Address" value={form.address} onChange={(v) => handleChange("address", v)} />

            <Select label="Education Level"
              options={["SLC", "Intermediate", "Bachelor", "Master", "PHD"]}
              onChange={(v) => handleChange("education", v)}
            />

            <Select label="Subject"
              options={["Science", "Management", "Humanities", "Engineering", "Medical"]}
              onChange={(v) => handleChange("subject", v)}
            />

            <Input type="date" label="Passed Year" value={form.year} onChange={(v) => handleChange("year", v)} />
            <Input label="GPA / Percentage" value={form.gpa} onChange={(v) => handleChange("gpa", v)} />

            <Select label="Country"
              options={["Australia", "Canada", "China", "Europe", "India", "Japan", "South Korea", "UK", "USA"]}
              onChange={(v) => handleChange("country", v)}
            />

            <Select label="Test Preparation"
              options={["IELTS", "TOEFL", "SAT", "PTE", "Japanese Language"]}
              onChange={(v) => handleChange("test", v)}
            />

            <Select label="Course"
              options={["Diploma", "Bachelor", "Master", "PhD", "Post Graduate Diploma", "Certificate", "Vocational", "Others"]}
              onChange={(v) => handleChange("course", v)}
            />

            <div>
              <label className="block text-sm mb-2 font-medium">
                Have you visited before?
              </label>

              <div className="flex gap-4">
                <label>
                  <input type="radio" name="visit" onChange={() => handleChange("visited", "Yes")} /> Yes
                </label>

                <label>
                  <input type="radio" name="visit" onChange={() => handleChange("visited", "No")} /> No
                </label>
              </div>
            </div>

            <Input type="date" label="Appointment Date" value={form.date} onChange={(v) => handleChange("date", v)} />

            <div className="md:col-span-2">
              <label className="block text-sm mb-2 font-medium">Message</label>
              <Textarea
                rows={4}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div className="md:col-span-2 text-right">
              <button type="submit" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                Submit
              </button>
            </div>

          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AppointmentPage;

// INPUT
const Input = ({ label, value, onChange, type = "text" }) => (
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

// SELECT
const Select = ({ label, options, onChange }) => (
  <div>
    <label className="block text-sm mb-1 font-medium">{label}</label>
    <select
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none"
      required
    >
      <option value="">--- Select ---</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);