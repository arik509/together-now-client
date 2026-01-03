import React from "react";
import { Shield, Lock, Eye, FileText, AlertTriangle, Scale } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-base-100 to-base-200 py-12">
      <div className="w-11/12 lg:w-9/12 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
              <Shield className="w-12 h-12 text-green-700" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-green-700 mb-4">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-lg text-accent max-w-3xl mx-auto">
            Last updated: January 4, 2026
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-green-700">Quick Navigation</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#privacy" className="flex items-center gap-2 text-sm hover:text-green-700 transition-colors">
                    <Lock className="w-4 h-4" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="flex items-center gap-2 text-sm hover:text-green-700 transition-colors">
                    <FileText className="w-4 h-4" />
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#data" className="flex items-center gap-2 text-sm hover:text-green-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    Data Collection
                  </a>
                </li>
                <li>
                  <a href="#rights" className="flex items-center gap-2 text-sm hover:text-green-700 transition-colors">
                    <Scale className="w-4 h-4" />
                    Your Rights
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Privacy Policy Section */}
            <section id="privacy" className="bg-base-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-green-700" />
                <h2 className="text-3xl font-bold text-green-700">Privacy Policy</h2>
              </div>

              <div className="space-y-6 text-accent">
                <div>
                  <h3 className="text-xl font-bold mb-3">Introduction</h3>
                  <p className="leading-relaxed">
                    At Together Now, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Information We Collect</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, and profile photo when you create an account.</li>
                    <li><strong>Event Data:</strong> Information about events you create, join, or interact with.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our platform, including pages visited and features used.</li>
                    <li><strong>Device Information:</strong> Browser type, IP address, and operating system for security and analytics purposes.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">How We Use Your Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide and maintain our services</li>
                    <li>To notify you about events and updates</li>
                    <li>To improve our platform and user experience</li>
                    <li>To prevent fraud and ensure platform security</li>
                    <li>To communicate with you about your account</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Data Sharing and Disclosure</h3>
                  <p className="leading-relaxed mb-3">
                    We do not sell your personal information. We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With event organizers when you join their events</li>
                    <li>With service providers who assist in operating our platform</li>
                    <li>When required by law or to protect our rights</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Collection Section */}
            <section id="data" className="bg-base-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-green-700" />
                <h2 className="text-3xl font-bold text-green-700">Data Collection & Security</h2>
              </div>

              <div className="space-y-6 text-accent">
                <div>
                  <h3 className="text-xl font-bold mb-3">Data Security</h3>
                  <p className="leading-relaxed">
                    We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Cookies and Tracking</h3>
                  <p className="leading-relaxed mb-3">
                    We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Data Retention</h3>
                  <p className="leading-relaxed">
                    We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You may request deletion of your account and data at any time.
                  </p>
                </div>
              </div>
            </section>

            {/* Terms of Service Section */}
            <section id="terms" className="bg-base-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-green-700" />
                <h2 className="text-3xl font-bold text-green-700">Terms of Service</h2>
              </div>

              <div className="space-y-6 text-accent">
                <div>
                  <h3 className="text-xl font-bold mb-3">Acceptance of Terms</h3>
                  <p className="leading-relaxed">
                    By accessing and using Together Now, you accept and agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">User Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and truthful information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Use the platform in compliance with all applicable laws</li>
                    <li>Respect other users and community guidelines</li>
                    <li>Not engage in fraudulent or harmful activities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Event Organizer Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate event information</li>
                    <li>Ensure events comply with local laws and regulations</li>
                    <li>Take responsibility for event safety and logistics</li>
                    <li>Communicate clearly with participants</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Prohibited Activities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Creating fake accounts or impersonating others</li>
                    <li>Posting offensive, discriminatory, or harmful content</li>
                    <li>Spamming or engaging in unauthorized commercial activities</li>
                    <li>Attempting to hack or compromise platform security</li>
                    <li>Violating intellectual property rights</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Intellectual Property</h3>
                  <p className="leading-relaxed">
                    All content on Together Now, including text, graphics, logos, and software, is the property of Together Now or its content suppliers and is protected by intellectual property laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Limitation of Liability</h3>
                  <p className="leading-relaxed">
                    Together Now provides the platform "as is" without warranties. We are not responsible for event outcomes, user interactions, or any damages arising from platform use.
                  </p>
                </div>
              </div>
            </section>

            {/* User Rights Section */}
            <section id="rights" className="bg-base-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-8 h-8 text-green-700" />
                <h2 className="text-3xl font-bold text-green-700">Your Rights</h2>
              </div>

              <div className="space-y-6 text-accent">
                <div>
                  <h3 className="text-xl font-bold mb-3">Access and Control</h3>
                  <p className="leading-relaxed mb-3">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your account and data</li>
                    <li>Export your data in a portable format</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Lodge a complaint with data protection authorities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Changes to This Policy</h3>
                  <p className="leading-relaxed">
                    We may update this Privacy Policy and Terms of Service from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Contact Us</h3>
                  <p className="leading-relaxed mb-3">
                    If you have questions about this Privacy Policy or Terms of Service, please contact us:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="font-semibold">Email:</span>
                      <a href="mailto:to.now@gmail.com" className="text-green-700 hover:underline">
                        to.now@gmail.com
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-semibold">Phone:</span>
                      <a href="tel:+8801511515555" className="text-green-700 hover:underline">
                        +880 1511 515 555
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Important Notice */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg p-6">
              <div className="flex gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">Important Notice</h4>
                  <p className="text-sm text-accent">
                    By using Together Now, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy and Terms of Service. Continued use of the platform constitutes acceptance of any updates to these terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
