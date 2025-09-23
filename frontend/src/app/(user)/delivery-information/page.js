"use client";

import Banner from "../../components/user/InnerBanner";

const privacyData = [
  {
    para: "This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from saajriwaaj.com."
  },
  {
    heading: "Personal information we collect",
    para: "When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”. We collect Device Information using Cookies, Log Files, Web Beacons, Tags, and Pixels."
  },
  {
    heading: "Order Information",
    para: "Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as “Order Information”."
  },
  {
    heading: "Definition of Personal Information",
    para: "When we talk about “Personal Information” in this Privacy Policy, we are talking about both Device Information and Order Information."
  },
  {
    heading: "How do we use your personal information?",
    para: "We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to communicate with you; screen our orders for potential risk or fraud; and, when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services."
  },
  {
    heading: "Device Information Usage",
    para: "We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns)."
  },
  {
    heading: "Sharing your Personal Information",
    para: "We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store and Google Analytics to help us understand how our customers use the Site. Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights."
  },
  {
    heading: "Behavioural advertising",
    para: "We use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. You can opt out of targeted advertising through Facebook, Google, Bing, or via the Digital Advertising Alliance’s opt-out portal at http://optout.aboutads.info/."
  },
  {
    heading: "Do Not Track",
    para: "Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser."
  },
  {
    heading: "Your Rights (European Residents)",
    para: "If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. Additionally, please note that your information may be transferred outside of Europe, including to India and other countries where our systems operate."
  },
  {
    heading: "Data retention",
    para: "When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information."
  },
  {
    heading: "Changes",
    para: "We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons."
  },
  {
    heading: "Minors",
    para: "The Site is not intended for individuals under the age of 12."
  },
  {
    heading: "Contact Us",
    para: "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at support@saajriwaaj.com or by mail using the details provided below: Saaj Riwaaj [Re: Privacy Compliance Officer] S V Inc, #26 5th main ssi area rajajinagar 5th block, Bangalore, 560010, Karnataka, India."
  }
];



export default function PrivacyPage() {
  return (
    <div>
      {/* Banner */}
      <Banner title="Delivery Information" />

      {/* Content */}
      <div className=" px-4 sm:px-8 lg:px-24 xl:px-60 mx-auto my-16">
        {privacyData.map((section, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-lg font-semibold mb-3">{section.heading}</h2>
            <p className="text-gray-700 leading-7">{section.para}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
