// src/pages/Legal/ResponsibleGambling.tsx
import React, { useEffect }  from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResponsibleGambling: React.FC = () => {
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
              Responsible Gaming Policy
            </h1>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                <p className="text-sm text-gray-400">Prepared for: UNITRYSE HOLDING LTD, Registration Number: 474712</p>
                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
              <p>The Responsible Gaming Policy ("Policy") sets out UNITRYSE HOLDING LTD's ("the Company") commitment to providing a safe, fair, and supportive environment for Users of the Skillgame.pro platform ("the Platform").</p>
              <p>While the Platform offers skill-based games and not games of chance, we recognize that any form of competitive gaming involving Entry Fees may pose risks to certain individuals.</p>
              <p>This Policy outlines preventive measures, educational initiatives, and available tools to help Users manage their participation responsibly.</p>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
              <p>This Policy applies to:</p>
              <ul>
                <li>All Users of the Platform.</li>
                <li>All games, tournaments, and competitions offered.</li>
                <li>All promotional activities related to gameplay.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. Definitions</h2>
              <ul>
                <li><strong>"Responsible Gaming"</strong> – Practices ensuring that participation in games is for entertainment and skill enhancement, without causing financial, social, or personal harm.</li>
                <li><strong>"Self-Exclusion"</strong> – A voluntary process by which a User requests to block access to their account for a set period.</li>
                <li><strong>"Deposit Limit"</strong> – A cap on the amount a User can spend on Entry Fees within a set time frame.</li>
                <li><strong>"Reality Check"</strong> – A reminder displayed during gameplay sessions to inform the User of the elapsed time or amount spent.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Principles of Responsible Gaming</h2>
              <p>The Company follows these key principles:</p>
              <ul>
                <li><strong>Transparency</strong> – Clear communication of all rules, fees, and terms.</li>
                <li><strong>Control</strong> – Tools to help Users manage spending and time.</li>
                <li><strong>Protection of Minors</strong> – Strict age verification to prevent access by under-18s.</li>
                <li><strong>Support</strong> – Access to resources for players seeking help.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. Preventive Measures Implemented by the Company</h2>
              <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5.1 Age Verification</h3>
              <ul>
                <li>All new Users must confirm they are at least 18 years old.</li>
                <li>KYC verification includes government-issued ID checks.</li>
              </ul>

              <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5.2 Self-Exclusion</h3>
              <ul>
                <li>Users can request temporary self-exclusion (minimum 7 days, maximum 6 months).</li>
                <li>Permanent self-exclusion is available and irreversible for a period of 5 years.</li>
              </ul>

              <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5.3 Deposit & Spending Limits</h3>
              <ul>
                <li>Users can set daily, weekly, or monthly spending limits on Entry Fees.</li>
                <li>Once reached, no further purchases are allowed until the limit resets.</li>
              </ul>

              <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5.4 Time Limits & Reality Checks</h3>
              <ul>
                <li>Users may enable session time limits.</li>
                <li>Automatic pop-up reminders every 60 minutes to inform players of the elapsed time.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Identifying Problematic Behavior</h2>
              <p>The Company monitors behavioral patterns such as:</p>
              <ul>
                <li>Sudden increases in spending.</li>
                <li>Playing for extended periods without breaks.</li>
                <li>Frequent requests for bonus credits.</li>
              </ul>
              <p>If identified, the Company may:</p>
              <ul>
                <li>Contact the User with information on responsible gaming.</li>
                <li>Offer self-exclusion options.</li>
                <li>Temporarily restrict account spending.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Education & Support</h2>
              <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7.1 Information Resources</h3>
              <p>The Platform provides dedicated pages with information on:</p>
              <ul>
                <li>Recognizing signs of problematic gaming.</li>
                <li>Tips for healthy gameplay habits.</li>
                <li>Contact information for support organizations.</li>
              </ul>

              <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7.2 External Support Services</h3>
              <p>Users experiencing gaming-related difficulties are encouraged to contact:</p>
              <ul>
                <li>GamCare (UK) – www.gamcare.org.uk</li>
                <li>Gambling Therapy – www.gamblingtherapy.org</li>
                <li>Cyprus National Betting Authority Helpline – +357 1454</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Staff Training</h2>
              <p>All relevant staff members receive annual training on:</p>
              <ul>
                <li>Identifying problem gaming behavior.</li>
                <li>Communicating with Users who may be at risk.</li>
                <li>Applying self-exclusion and limit tools effectively.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. Enforcement</h2>
              <p>The Company reserves the right to impose restrictions on accounts showing risky patterns, even without a User request, in order to protect the User's well-being.</p>

              <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. References</h2>
              <ul>
                <li>Cyprus National Betting Authority – Responsible Gaming Guidelines</li>
                <li>EU Responsible Gambling Standards</li>
                <li>GamCare Responsible Gambling Code of Conduct</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ResponsibleGambling;