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
              Responsible Gambling Policy
            </h1>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
              {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Our Commitment to Responsible Gaming</h2>
                <p>Skill Game is committed to promoting responsible gambling and providing a safe, fair, and enjoyable gaming environment for all users. We recognize that while gaming can be entertaining, it can also pose risks for some individuals. This Responsible Gambling Policy outlines our comprehensive approach to helping users maintain control over their gaming activities and providing support for those who may need assistance.</p>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Understanding Problem Gambling</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">What is Problem Gambling?</h3>
                <p>Problem gambling occurs when gambling becomes compulsive and negatively impacts a person's life, relationships, finances, or mental health. It can range from mild concerns to severe addiction requiring professional intervention.</p>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Warning Signs</h3>
                <p>Recognizing the warning signs of problem gambling is crucial for early intervention:</p>
                <ul>
                    <li><strong>Financial Warning Signs:</strong> Gambling with money needed for essentials, borrowing money to gamble, selling possessions to fund gambling</li>
                    <li><strong>Emotional Warning Signs:</strong> Anxiety or depression related to gambling, lying about gambling activities, feeling guilty after gambling</li>
                    <li><strong>Behavioral Warning Signs:</strong> Chasing losses, gambling longer than intended, neglecting responsibilities, isolating from family and friends</li>
                    <li><strong>Physical Warning Signs:</strong> Sleep disturbances, loss of appetite, neglecting personal hygiene, physical symptoms of stress</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Self-Help Tools and Controls</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Deposit Limits</h3>
                <p>Skill Game provides comprehensive deposit limit controls to help users manage their spending:</p>
                <ul>
                    <li><strong>Daily Limits:</strong> Set maximum deposit amounts per 24-hour period</li>
                    <li><strong>Weekly Limits:</strong> Control spending over 7-day periods</li>
                    <li><strong>Monthly Limits:</strong> Establish monthly budget boundaries</li>
                    <li><strong>Loss Limits:</strong> Set maximum loss thresholds for automatic account restrictions</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Time Management Tools</h3>
                <ul>
                    <li><strong>Session Limits:</strong> Set maximum time periods for gaming sessions</li>
                    <li><strong>Reality Checks:</strong> Receive periodic notifications about time spent gaming</li>
                    <li><strong>Break Reminders:</strong> Scheduled breaks to encourage rest and reflection</li>
                    <li><strong>Activity Tracking:</strong> Detailed reports on gaming time and spending patterns</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Account Restriction Options</h3>
                <ul>
                    <li><strong>Time-Out Periods:</strong> Temporary self-exclusion for specified periods (24 hours to 6 months)</li>
                    <li><strong>Self-Exclusion:</strong> Extended account suspension for 6 months to 5 years</li>
                    <li><strong>Permanent Closure:</strong> Complete and irreversible account termination</li>
                    <li><strong>Cooling-Off Periods:</strong> Mandatory breaks after intensive gaming sessions</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Balance and Transaction Monitoring</h3>
                <ul>
                    <li>Real-time balance displays during gameplay</li>
                    <li>Spending summaries and transaction history</li>
                    <li>Alerts for approaching limit thresholds</li>
                    <li>Detailed financial reporting tools</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Age Verification and Underage Protection</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Strict Age Requirements</h3>
                <ul>
                    <li>Minimum age of 18 years for account registration</li>
                    <li>Mandatory age verification during registration process</li>
                    <li>Ongoing monitoring for underage account activity</li>
                    <li>Immediate account suspension for confirmed underage users</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Parental Controls</h3>
                <ul>
                    <li>Family-friendly account management tools</li>
                    <li>Parental monitoring and restriction capabilities</li>
                    <li>Educational resources for parents and guardians</li>
                    <li>Reporting mechanisms for underage gambling concerns</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Education and Awareness</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Information Resources</h3>
                <ul>
                    <li>Comprehensive responsible gambling guides and tutorials</li>
                    <li>Interactive self-assessment tools and quizzes</li>
                    <li>Regular educational content about gambling risks</li>
                    <li>Clear explanations of odds and house edge information</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Community Engagement</h3>
                <ul>
                    <li>Partnerships with responsible gambling organizations</li>
                    <li>Sponsorship of awareness campaigns and research</li>
                    <li>Regular communication about responsible gaming practices</li>
                    <li>User testimonials and success stories</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Support and Intervention</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">In-House Support</h3>
                <ul>
                    <li>24/7 customer support with trained staff</li>
                    <li>Dedicated responsible gambling helpline</li>
                    <li>Immediate assistance for users seeking help</li>
                    <li>Referral to professional support services</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">External Resources</h3>
                <ul>
                    <li>National Problem Gambling Helpline: 1-800-522-4700 (US)</li>
                    <li>Gamblers Anonymous: www.gamblersanonymous.org</li>
                    <li>National Council on Problem Gambling: www.ncpgambling.org</li>
                    <li>International resources for global users</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Professional Referrals</h3>
                <ul>
                    <li>Partnerships with licensed therapists and counselors</li>
                    <li>Referral to specialized treatment programs</li>
                    <li>Support for family members and loved ones</li>
                    <li>Coordination with healthcare providers</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Detection and Monitoring</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Behavioral Analysis</h3>
                <ul>
                    <li>Automated monitoring for at-risk gambling patterns</li>
                    <li>Algorithmic detection of problematic behaviors</li>
                    <li>Early intervention protocols for concerning activities</li>
                    <li>Regular review and refinement of detection methods</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Staff Training</h3>
                <ul>
                    <li>Comprehensive training on problem gambling recognition</li>
                    <li>Regular updates on intervention techniques</li>
                    <li>Collaboration with gambling addiction specialists</li>
                    <li>Clear protocols for reporting and referral</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Advertising and Marketing Standards</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Responsible Marketing</h3>
                <ul>
                    <li>No targeting of vulnerable populations</li>
                    <li>Clear and honest representation of odds and risks</li>
                    <li>Prominent display of responsible gambling messages</li>
                    <li>Prohibition of misleading or exaggerated claims</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Content Guidelines</h3>
                <ul>
                    <li>Age-appropriate advertising and promotional materials</li>
                    <li>Inclusion of helpline information in all marketing</li>
                    <li>Balance of promotional and responsible gambling content</li>
                    <li>Regular review of advertising effectiveness and impact</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Research and Development</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Continuous Improvement</h3>
                <ul>
                    <li>Investment in responsible gambling research</li>
                    <li>Development of new protection technologies</li>
                    <li>Collaboration with academic institutions</li>
                    <li>Implementation of industry best practices</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Analysis</h3>
                <ul>
                    <li>Regular analysis of user behavior patterns</li>
                    <li>Identification of risk factors and trends</li>
                    <li>Evaluation of intervention effectiveness</li>
                    <li>Contribution to broader industry research</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Compliance and Oversight</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Regulatory Adherence</h3>
                <ul>
                    <li>Compliance with all applicable gambling regulations</li>
                    <li>Regular audits by independent compliance firms</li>
                    <li>Cooperation with regulatory authorities</li>
                    <li>Transparent reporting of responsible gambling metrics</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Internal Monitoring</h3>
                <ul>
                    <li>Dedicated responsible gambling compliance officer</li>
                    <li>Regular policy reviews and updates</li>
                    <li>Staff accountability for responsible gambling practices</li>
                    <li>Continuous improvement of protection measures</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">User Rights and Responsibilities</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">User Rights</h3>
                <ul>
                    <li>Right to access responsible gambling tools and resources</li>
                    <li>Right to request account restrictions or closure</li>
                    <li>Right to privacy and confidentiality when seeking help</li>
                    <li>Right to receive clear information about gambling risks</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">User Responsibilities</h3>
                <ul>
                    <li>Responsibility to gamble within personal means</li>
                    <li>Responsibility to recognize and address problem behaviors</li>
                    <li>Responsibility to seek help when needed</li>
                    <li>Responsibility to protect account access from others</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Community Impact</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Social Responsibility</h3>
                <ul>
                    <li>Support for community gambling awareness programs</li>
                    <li>Participation in industry-wide responsible gambling initiatives</li>
                    <li>Contribution to problem gambling research and treatment</li>
                    <li>Promotion of healthy gaming culture and practices</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Environmental Considerations</h3>
                <ul>
                    <li>Energy-efficient server operations</li>
                    <li>Digital-first approach to reduce environmental impact</li>
                    <li>Sustainable business practices</li>
                    <li>Support for environmental causes and initiatives</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Policy Review and Updates</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Regular Assessment</h3>
                <ul>
                    <li>Quarterly review of responsible gambling practices</li>
                    <li>Annual comprehensive policy evaluation</li>
                    <li>Incorporation of latest research findings</li>
                    <li>Feedback integration from users and stakeholders</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Continuous Evolution</h3>
                <ul>
                    <li>Adaptation to changing regulatory landscape</li>
                    <li>Implementation of emerging protection technologies</li>
                    <li>Enhancement of user support services</li>
                    <li>Expansion of educational and awareness programs</li>
                </ul>

                <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Contact and Support</h2>
                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Getting Help</h3>
                <p>If you or someone you know needs help with gambling issues, please contact us immediately:</p>
                <ul>
                    <li><strong>Responsible Gambling Helpline:</strong> 1-888-SKILL-GAME</li>
                    <li><strong>Email Support:</strong> responsible@skillgame.com</li>
                    <li><strong>Live Chat:</strong> Available 24/7 through our website</li>
                    <li><strong>Emergency Support:</strong> For immediate crisis intervention</li>
                </ul>

                <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Confidentiality Assurance</h3>
                <p>All communications regarding responsible gambling concerns are treated with the utmost confidentiality and respect. We are committed to providing non-judgmental support and appropriate resources to help users maintain healthy gaming habits.</p>
              {/* ` }} /> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ResponsibleGambling;