import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GDPRPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div id="top" className="pt-16 min-h-screen flex flex-col bg-gray-900 text-gray-300">
        <div className="py-12 px-4 sm:px-6 lg:px-8 flex-grow">
          <div className="max-w-4xl mx-auto prose prose-invert prose-headings:text-white prose-a:text-blue-400 prose-a:hover:text-blue-300">
            <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              General Data Protection Regulation (GDPR)
            </h1>
            <p className="text-lg text-center text-gray-400 mb-10">
              Your privacy rights and our commitment under EU law
            </p>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
              {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Introduction</h2>
                <p>This GDPR Policy outlines how Skill Game complies with the General Data Protection Regulation (Regulation (EU) 2016/679), a regulation in EU law on data protection and privacy for individuals within the European Union (EU) and the European Economic Area (EEA). It also addresses the transfer of personal data outside the EU and EEA areas.</p>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Your Rights Under GDPR</h2>
                <p>The GDPR provides you with specific rights regarding your personal data:</p>
                <ul>
                    <li><strong>Right to Information:</strong> You have the right to be informed about the collection and use of your personal data.</li>
                    <li><strong>Right of Access:</strong> You have the right to obtain confirmation as to whether or not personal data concerning you is being processed, and, where that is the case, access the personal data.</li>
                    <li><strong>Right to Rectification:</strong> You have the right to obtain from us the rectification of inaccurate personal data concerning you.</li>
                    <li><strong>Right to Erasure (Right to be Forgotten):</strong> You have the right to obtain from us the erasure of personal data concerning you.</li>
                    <li><strong>Right to Restrict Processing:</strong> You have the right to obtain from us the restriction of processing.</li>
                    <li><strong>Right to Data Portability:</strong> You have the right to receive the personal data concerning you, which you have provided to us, in a structured, commonly used and machine-readable format.</li>
                    <li><strong>Right to Object:</strong> You have the right to object, on grounds relating to your particular situation, at any time, to processing of personal data concerning you.</li>
                    <li><strong>Rights Related to Automated Decision Making:</strong> You have the right not to be subject to a decision based solely on automated processing, including profiling.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">How We Process Your Data</h2>
                <h3>Lawful Basis for Processing</h3>
                <p>We process your personal data based on one or more of the following lawful grounds:</p>
                <ul>
                    <li><strong>Contract Performance:</strong> Processing is necessary for the performance of a contract we are about to enter or have entered with you (e.g., providing our services).</li>
                    <li><strong>Legal Obligation:</strong> Processing is necessary for compliance with a legal obligation to which we are subject.</li>
                    <li><strong>Legitimate Interests:</strong> Processing is necessary for the purposes of legitimate interests pursued by us or by a third party, except where such interests are overridden by your interests or fundamental rights and freedoms (e.g., fraud prevention, security).</li>
                    <li><strong>Consent:</strong> Processing is based on your consent for specific purposes (e.g., marketing communications).</li>
                    <li><strong>Vital Interests:</strong> Processing is necessary to protect the vital interests of you or another natural person (rarely used).</li>
                </ul>

                <h3>Data Categories We Process</h3>
                <ul>
                    <li><strong>Identity Data:</strong> Name, username, date of birth, gender.</li>
                    <li><strong>Contact Data:</strong> Email address, postal address, telephone number.</li>
                    <li><strong>Financial Data:</strong> Payment card information, bank account details, transaction history.</li>
                    <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of services you have purchased from us.</li>
                    <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access our site or services.</li>
                    <li><strong>Profile Data:</strong> Your username and password, game preferences, feedback and survey responses.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website, services, and games.</li>
                    <li><strong>Marketing and Communications Data:</strong> Your preferences in receiving marketing from us and your communication preferences.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Retention</h2>
                <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. The retention period depends on the category of data and the purpose for which it was collected.</p>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Security</h2>
                <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">International Data Transfers</h2>
                <p>Your personal data may be transferred to and stored at a destination outside the European Economic Area ("EEA"). If you are located in the EEA, we will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this policy and the GDPR.</p>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Third-Party Processors</h2>
                <p>We use third-party service providers to help us operate our business and the Site or Service, such as payment processors, email delivery services, and customer support platforms. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Exercising Your Rights</h2>
                <p>If you wish to exercise any of the rights set out above, please contact us using the contact details provided in our main Privacy Policy. We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data (or to exercise any of your other rights).</p>
                <p>Usually, you will not have to pay a fee to access your personal data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive. Alternatively, we may refuse to comply with your request in these circumstances.</p>
                <p>We try to respond to all legitimate requests within one month. Occasionally it may take us longer than a month if your request is particularly complex or you have made a number of requests. In this case, we will notify you and keep you updated.</p>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Changes to This GDPR Policy</h2>
                <p>We may update our GDPR Policy from time to time. We will notify you of any changes by posting the new GDPR Policy on this page and updating the "Last Updated" date.</p>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Contact Us</h2>
                <p>If you have any questions about this GDPR Policy or wish to exercise your rights, please contact our Data Protection Officer:</p>
                <ul>
                    <li><strong>Email:</strong> dpo@skillgame.com</li>
                    <li><strong>Mail:</strong> Data Protection Officer, Skill Game Limited, [Company Address]</li>
                </ul>
                <p>You also have the right to lodge a complaint with a supervisory authority, in particular in the Member State of your habitual residence, place of work or place of the alleged infringement.</p>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Last Updated</h2>
                <p>This GDPR Policy was last updated on [Date].</p>
              {/* ` }} /> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default GDPRPage;