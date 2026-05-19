import { useState } from "react";
import emailjs from "@emailjs/browser";

import Layout from "@/components/Layout";
import { Textarea } from "@/components/ui/textarea";
import ContactTopInfo from "@/components/ContactTopInfo";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ SEND EMAIL USING EMAILJS
      await emailjs.send(
        "service_c2umit1",
        "template_aasdnak",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          subject: form.subject,
          message: form.message,
        },
        "rFe-t8EnY2t2wUouN"
      );

      toast({
        title: "Message sent successfully",
      });

      // ✅ RESET FORM
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error(error);

      toast({
        title: "Failed to send message",
      });
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container">

          <div className="mb-12">
            <p className="section-subtitle mb-2">
              Contact Us
            </p>

            <h1 className="section-title mb-4">
              Let us know how we can help
            </h1>

            <p className="text-muted-foreground max-w-2xl">
              Let's Get Together! We're here to quickly
              provide you with the info and services you
              need & answer any questions you may have.
            </p>
          </div>

          <ContactTopInfo />

          <div className="bg-muted rounded-2xl p-8 md:p-12">

            <p className="section-subtitle mb-2">
              Send us your doubts
            </p>

            <h2 className="section-title mb-4">
              Do you have any questions?
            </h2>

            <p className="text-muted-foreground mb-8 max-w-2xl">
              We're here to help and answer any questions
              you might have.
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

              {/* MAP */}
              <div className="md:col-span-2">
                <div className="rounded-2xl border border-border bg-background p-4 md:p-6">

                  <p className="section-subtitle mb-1">
                    Visit us
                  </p>

                  <h2 className="section-title mb-3 text-2xl">
                    Kathmandu Office
                  </h2>

                  <div className="rounded-xl overflow-hidden border border-border">
                    <iframe
                      title="Google Map"
                      src="https://maps.google.com/maps?q=Kathmandu&z=13&output=embed"
                      className="w-full h-64 border-0 rounded-xl"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>

                </div>
              </div>

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Kumar Shrestha"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border rounded-lg"
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border rounded-lg"
                  required
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="9864755749"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border rounded-lg"
                  required
                />
              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Address
                </label>

                <input
                  type="text"
                  placeholder="Kathmandu Nepal"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border rounded-lg"
                  required
                />
              </div>

              {/* SUBJECT */}
              <div className="md:col-span-2">

                <label className="block text-sm font-medium mb-1.5">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Your subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border rounded-lg"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div className="md:col-span-2">

                <label className="block text-sm font-medium mb-1.5">
                  Message
                </label>

                <Textarea
                  placeholder="Your message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className="resize-none"
                  required
                />

              </div>

              {/* BUTTON */}
              <div className="md:col-span-2">

                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold"
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