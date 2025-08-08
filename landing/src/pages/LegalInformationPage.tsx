// src/pages/Legal/LegalInformation.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LegalInformation: React.FC = () => {
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
                            Legal Information
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Company Details</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Corporate Information</h3>
                            <ul>
                                <li><strong>Company Name:</strong> UNITRYSE HOLDING LTD</li>
                                <li><strong>Registration Number:</strong> 474712</li>
                                <li><strong>Incorporation Date:</strong> May 4, 2025</li>
                                <li><strong>Registered Office:</strong> Archiepiskopou Makariou III, 84 Office 1 6017, Larnaca, Cyprus</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Contact Information</h3>
                            <ul>
                                <li><strong>Customer Support:</strong> support@skillgame.com</li>
                                <li><strong>Legal Inquiries:</strong> legal@skillgame.com</li>
                                <li><strong>Compliance Officer:</strong> compliance@skillgame.com</li>
                                <li><strong>Privacy Officer:</strong> privacy@skillgame.com</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Licensing and Regulatory Compliance</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Operating Licenses</h3>
                            <ul>
                                <li><strong>Anti-Money Laundering Compliance:</strong> Fully compliant with FATF standards</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Regulatory Bodies</h3>
                            <ul>
                                <li><strong>Compliance Audits:</strong> Annual independent compliance reviews</li>
                                <li><strong>Reporting Requirements:</strong> Monthly regulatory reporting</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Governing Law and Jurisdiction</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Applicable Law</h3>
                            <p>These services and all related agreements are governed by the laws of Cyprus, without regard to its conflict of law provisions. The application of the United Nations Convention on Contracts for the International Sale of Goods is expressly excluded.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Jurisdiction</h3>
                            <p>Any disputes arising out of or in connection with these services shall be subject to the exclusive jurisdiction of the courts located in Larnaca, Cyprus. Users agree to submit to the personal jurisdiction of these courts.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Dispute Resolution</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Alternative Dispute Resolution</h3>
                            <p>Skill Game is committed to resolving disputes amicably and efficiently:</p>
                            <ul>
                                <li><strong>Internal Resolution:</strong> 30-day period for internal dispute resolution</li>
                                <li><strong>Mediation:</strong> Voluntary mediation through certified mediators</li>
                                <li><strong>Arbitration:</strong> Binding arbitration under Cyprus</li>
                                <li><strong>Court Proceedings:</strong> Final resort for unresolved disputes</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Dispute Process</h3>
                            <ol>
                                <li>Initial complaint submission through customer support</li>
                                <li>Investigation and response within 10 business days</li>
                                <li>Escalation to senior management for complex issues</li>
                                <li>Alternative dispute resolution if internal resolution fails</li>
                                <li>Legal proceedings as final option</li>
                            </ol>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Intellectual Property Rights</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Trademarks</h3>
                            <ul>
                                <li><strong>Skill Game:</strong> Registered trademark in multiple jurisdictions</li>
                                <li><strong>Logo and Branding:</strong> Protected intellectual property</li>
                                <li><strong>Service Marks:</strong> Various service marks for platform features</li>
                                <li><strong>Domain Names:</strong> Registered domain names worldwide</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Copyrights</h3>
                            <ul>
                                <li><strong>Website Content:</strong> Copyright © 2024 Skill Game Limited</li>
                                <li><strong>Software Code:</strong> Proprietary software protected by copyright</li>
                                <li><strong>Game Content:</strong> Original game designs and mechanics</li>
                                <li><strong>Documentation:</strong> All policy and procedural documents</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Financial Information</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Banking Partners</h3>
                            <ul>
                                <li><strong>Payment Processing:</strong> Licensed payment service providers</li>
                                <li><strong>Segregated Accounts:</strong> Player funds held in separate accounts</li>
                                <li><strong>Audit Requirements:</strong> Annual financial audits by certified auditors</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Insurance Coverage</h3>
                            <ul>
                                <li><strong>Professional Liability:</strong> Comprehensive professional indemnity insurance</li>
                                <li><strong>Cyber Security:</strong> Cyber liability and data breach insurance</li>
                                <li><strong>Business Interruption:</strong> Coverage for service disruptions</li>
                                <li><strong>Directors and Officers:</strong> D&O liability insurance</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Corporate Governance</h2>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Committees</h3>
                            <ul>
                                <li><strong>Audit Committee:</strong> Oversees financial reporting and compliance</li>
                                <li><strong>Risk Committee:</strong> Manages operational and financial risks</li>
                                <li><strong>Compliance Committee:</strong> Ensures regulatory adherence</li>
                                <li><strong>Technology Committee:</strong> Oversees technological development</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Protection and Privacy Compliance</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">GDPR Compliance</h3>
                            <ul>
                                <li><strong>Data Controller:</strong> Skill Game Limited</li>
                                <li><strong>Privacy Impact Assessments:</strong> Regular DPIA conducted</li>
                                <li><strong>Data Processing Agreements:</strong> Signed with all processors</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">International Compliance</h3>
                            <ul>
                                <li><strong>CCPA Compliance:</strong> California Consumer Privacy Act adherence</li>
                                <li><strong>PIPEDA Compliance:</strong> Canadian privacy law compliance</li>
                                <li><strong>APPI Compliance:</strong> Japanese Act on Protection of Personal Information</li>
                                <li><strong>Other Jurisdictions:</strong> Compliance with local privacy laws</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Security and Risk Management</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Security Certifications</h3>
                            <ul>
                                <li><strong>ISO 27001:</strong> Information Security Management certification</li>
                                <li><strong>PCI DSS:</strong> Payment Card Industry Data Security Standard</li>
                                <li><strong>SOC 2:</strong> Service Organization Control Type 2 compliance</li>
                                <li><strong>Regular Audits:</strong> Quarterly security assessments</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Risk Management Framework</h3>
                            <ul>
                                <li><strong>Operational Risk:</strong> Comprehensive risk assessment procedures</li>
                                <li><strong>Financial Risk:</strong> Regular financial risk monitoring</li>
                                <li><strong>Technology Risk:</strong> Continuous technology risk evaluation</li>
                                <li><strong>Compliance Risk:</strong> Ongoing regulatory compliance monitoring</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Business Continuity</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Disaster Recovery</h3>
                            <ul>
                                <li><strong>Data Backup:</strong> Daily encrypted backups with 90-day retention</li>
                                <li><strong>Redundancy:</strong> Multiple data centers for service continuity</li>
                                <li><strong>Recovery Time:</strong> Maximum 4-hour recovery time objective</li>
                                <li><strong>Testing:</strong> Quarterly disaster recovery testing</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Business Continuity Plan</h3>
                            <ul>
                                <li><strong>Critical Functions:</strong> Identification and protection of critical services</li>
                                <li><strong>Alternate Facilities:</strong> Backup operational facilities</li>
                                <li><strong>Communication Plan:</strong> Emergency communication protocols</li>
                                <li><strong>Regular Updates:</strong> Annual business continuity plan review</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Corporate Social Responsibility</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Environmental Initiatives</h3>
                            <ul>
                                <li><strong>Carbon Neutral:</strong> Commitment to carbon-neutral operations</li>
                                <li><strong>Energy Efficiency:</strong> Green data center partnerships</li>
                                <li><strong>Paperless Operations:</strong> Digital-first approach to reduce paper usage</li>
                                <li><strong>Sustainable Practices:</strong> Environmentally responsible business practices</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Community Engagement</h3>
                            <ul>
                                <li><strong>Education Programs:</strong> Support for educational gaming initiatives</li>
                                <li><strong>Charitable Giving:</strong> Regular charitable contributions</li>
                                <li><strong>Employee Volunteering:</strong> Paid volunteer time for employees</li>
                                <li><strong>Industry Leadership:</strong> Active participation in gaming industry associations</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Financial Reporting</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Annual Reports</h3>
                            <ul>
                                <li><strong>Publication:</strong> Annual financial reports available to stakeholders</li>
                                <li><strong>Audit:</strong> Independent audit of financial statements</li>
                                <li><strong>Transparency:</strong> Detailed financial performance disclosure</li>
                                <li><strong>Regulatory Filing:</strong> Compliance with all financial reporting requirements</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Key Performance Indicators</h3>
                            <ul>
                                <li><strong>User Growth:</strong> Monthly active user statistics</li>
                                <li><strong>Revenue Metrics:</strong> Financial performance indicators</li>
                                <li><strong>Compliance Metrics:</strong> Regulatory compliance measurements</li>
                                <li><strong>Security Metrics:</strong> Cybersecurity and data protection statistics</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Updates and Changes</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Policy Review</h3>
                            <ul>
                                <li><strong>Annual Review:</strong> Comprehensive annual review of all legal information</li>
                                <li><strong>Regulatory Updates:</strong> Immediate updates for regulatory changes</li>
                                <li><strong>Corporate Changes:</strong> Prompt disclosure of corporate structure changes</li>
                                <li><strong>Stakeholder Communication:</strong> Regular communication of material changes</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Communication Channels</h3>
                            <ul>
                                <li><strong>Website Updates:</strong> Current legal information on company website</li>
                                <li><strong>Regulatory Filings:</strong> Official filings with regulatory authorities</li>
                                <li><strong>Investor Relations:</strong> Direct communication with investors and stakeholders</li>
                                <li><strong>Public Announcements:</strong> Press releases for significant corporate events</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Last Updated</h2>
                            <p>This legal information was last updated on 1 Aug, 2025 and is subject to regular review and updates as required by law, regulation, or corporate changes.</p>
                            {/* ` }} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default LegalInformation;