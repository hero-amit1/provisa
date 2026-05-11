import { useState } from "react";
import Layout from "@/components/Layout";
import { inquiriesAPI } from '@/lib/api';
import { Textarea } from "@/components/ui/textarea";
import ContactTopInfo from "@/components/ContactTopInfo";


const ContactPage = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", subject: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inquiriesAPI.create({ ...form, type: 'contact' });
      alert("Thank you! Your message has been sent.");
      setForm({ name: "", email: "", phone: "", address: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Error sending message. Try again.");
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container">
          <div className="mb-12">
            <p className="section-subtitle mb-2">Contact Us</p>
            <h1 className="section-title mb-4">Let us know how we can help</h1>
            <p className="text-muted-foreground max-w-2xl">
              Let's Get Together! We're here to quickly provide you with the info
              and services you need & answer any questions you may have.
            </p>
          </div>

          <ContactTopInfo />


          <div className="bg-muted rounded-2xl p-8 md:p-12">
            <p className="section-subtitle mb-2">Send us your doubts</p>
            <h2 className="section-title mb-4">Do you have any questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              We're here to help and answer any questions you might have.
              Please fill out the form or use the contact information below.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: "name", label: "Full Name", placeholder: "Kumar Shrestha" },
                { key: "email", label: "Email Address", placeholder: "example@gmail.com", type: "email" },
                { key: "phone", label: "Phone Number", placeholder: "9864755749" },
                { key: "address", label: "Address", placeholder: "Kadadhari Kathmandu" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                <input
                  type="text"
                  placeholder="Your subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <Textarea
                  placeholder="Your message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="resize-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
