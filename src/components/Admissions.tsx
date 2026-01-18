import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, User, MessageSquare, BookOpen } from "lucide-react";
import coursesData from "../data/coursesData";

const Admissions: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; phone?: string } = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const msg = `Admission enquiry from ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0ACourse: ${form.course}%0AMessage: ${form.message}`;
    const wa = `https://wa.me/+918878979958?text=${encodeURIComponent(msg)}`;
    window.open(wa, "_blank");

    setForm({ name: "", email: "", phone: "", course: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Admissions - Ujjwal Academy Mauganj</title>
        <meta
          name="description"
          content="Admissions open at Ujjwal Academy Mauganj for SSC, Railway, MPSI and other exam coaching. Flexible batches and expert faculty."
        />
        <meta
          name="keywords"
          content="admissions ujjwal academy, mauganj coaching admissions, ssc coaching admissions"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://ujjwalacademymauganj.in/admissions"
        />
      </Helmet>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Admissions</h1>
          <p className="text-gray-700 mb-6">
            Admissions are open year-round. Fill the quick form below to get in
            touch and enroll.
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <User className="h-4 w-4 text-gray-400" /> Full Name*
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`mt-1 block w-full rounded-lg border px-4 py-2 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.name ? "border-red-400" : "border-gray-200"}`}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <Phone className="h-4 w-4 text-gray-400" /> Phone*
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`mt-1 block w-full rounded-lg border px-4 py-2 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                  placeholder="Mobile number"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <Mail className="h-4 w-4 text-gray-400" /> Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border px-4 py-2 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition border-gray-200"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="course"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <BookOpen className="h-4 w-4 text-gray-400" /> Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className="appearance-none block w-full rounded-lg border px-4 py-2 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition border-gray-200"
                >
                  <option value="">Select a course (optional)</option>
                  {coursesData.map((c) => (
                    <option key={c.slug} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <MessageSquare className="h-4 w-4 text-gray-400" /> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border px-4 py-2 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition border-gray-200"
                  placeholder="Any questions or message (optional)"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  We'll contact you shortly after you submit.
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:opacity-95 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  Send via WhatsApp
                </button>
              </div>
            </form>

            <div className="pt-4 border-t">
              <h2 className="text-lg font-semibold mb-2">
                Other ways to contact
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href="tel:+918878979958"
                  className="flex items-center gap-2 text-blue-600"
                >
                  <Phone className="h-5 w-5" /> Call: +91 8878979958
                </a>
                <a
                  href="mailto:ujjwalacademymauganj@gmail.com"
                  className="flex items-center gap-2 text-blue-600"
                >
                  <Mail className="h-5 w-5" /> Email:
                  ujjwalacademymauganj@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admissions;
