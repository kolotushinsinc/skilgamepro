// src/pages/Legal/CookiePolicy.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiePolicy: React.FC = () => {
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
                            Cookie Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Introduction</h2>
                            <p>This Cookie Policy explains how Skill Game uses cookies and similar tracking technologies when you visit our website, use our mobile applications, or interact with our services. By using Skill Game's platform, you consent to the use of cookies as described in this policy.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">What Are Cookies?</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Definition</h3>
                            <p>Cookies are small text files that are stored on your device (computer, tablet, smartphone, or other mobile device) when you visit websites. They are widely used to make websites work more efficiently and to provide information to website owners.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Similar Technologies</h3>
                            <p>In addition to cookies, we may use other tracking technologies including:</p>
                            <ul>
                                <li><strong>Web Beacons:</strong> Small graphic files that allow us to monitor user activity</li>
                                <li><strong>Pixel Tags:</strong> Invisible tags that track page views and interactions</li>
                                <li><strong>Local Storage:</strong> Browser-based storage for enhanced functionality</li>
                                <li><strong>Device Fingerprinting:</strong> Collection of device characteristics for identification</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Types of Cookies We Use</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Essential Cookies</h3>
                            <ul>
                                <li><strong>Purpose:</strong> Necessary for basic website functionality and security</li>
                                <li><strong>Examples:</strong> Authentication cookies, security tokens, load balancing</li>
                                <li><strong>Duration:</strong> Session-based or persistent as needed</li>
                                <li><strong>Management:</strong> Cannot be disabled without affecting service functionality</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Performance Cookies</h3>
                            <ul>
                                <li><strong>Purpose:</strong> Collect information about how visitors use our website</li>
                                <li><strong>Examples:</strong> Analytics cookies, performance monitoring, error tracking</li>
                                <li><strong>Duration:</strong> Typically 30 days to 2 years</li>
                                <li><strong>Management:</strong> Can be disabled without affecting core functionality</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Functionality Cookies</h3>
                            <ul>
                                <li><strong>Purpose:</strong> Enable enhanced features and personalization</li>
                                <li><strong>Examples:</strong> Language preferences, region settings, user interface customizations</li>
                                <li><strong>Duration:</strong> Typically 1 year or until manually cleared</li>
                                <li><strong>Management:</strong> Can be disabled with reduced personalization</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Targeting Cookies</h3>
                            <ul>
                                <li><strong>Purpose:</strong> Deliver personalized advertising and content</li>
                                <li><strong>Examples:</strong> Interest-based advertising, retargeting, campaign tracking</li>
                                <li><strong>Duration:</strong> Typically 90 days to 2 years</li>
                                <li><strong>Management:</strong> Can be disabled to opt-out of personalized advertising</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Specific Cookie Providers</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Analytics Providers</h3>
                            <ul>
                                <li><strong>Google Analytics:</strong> Website usage statistics and performance metrics</li>
                                <li><strong>Adobe Analytics:</strong> Advanced analytics and user behavior tracking</li>
                                <li><strong>Mixpanel:</strong> Event-based analytics and user engagement tracking</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Advertising Partners</h3>
                            <ul>
                                <li><strong>Google Ads:</strong> Targeted advertising and campaign performance</li>
                                <li><strong>Facebook Pixel:</strong> Social media advertising and retargeting</li>
                                <li><strong>DoubleClick:</strong> Display advertising and audience segmentation</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Functional Services</h3>
                            <ul>
                                <li><strong>Cloudflare:</strong> Security and performance optimization</li>
                                <li><strong>Hotjar:</strong> User experience research and feedback</li>
                                <li><strong>Zendesk:</strong> Customer support and communication</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">How We Use Cookies</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Service Provision</h3>
                            <ul>
                                <li>Authentication and account security</li>
                                <li>Session management and user preferences</li>
                                <li>Load balancing and server optimization</li>
                                <li>Shopping cart and transaction processing</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Performance Optimization</h3>
                            <ul>
                                <li>Website speed and responsiveness monitoring</li>
                                <li>Error detection and troubleshooting</li>
                                <li>A/B testing and feature optimization</li>
                                <li>Capacity planning and infrastructure management</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">User Experience Enhancement</h3>
                            <ul>
                                <li>Personalized content and recommendations</li>
                                <li>Language and regional preferences</li>
                                <li>Accessibility settings and customizations</li>
                                <li>Progress saving and user state management</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Marketing and Analytics</h3>
                            <ul>
                                <li>Advertising campaign effectiveness</li>
                                <li>User behavior and engagement analysis</li>
                                <li>Conversion tracking and attribution</li>
                                <li>Market research and demographic analysis</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Third-Party Cookies</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">External Services</h3>
                            <p>We work with various third-party service providers who may set their own cookies:</p>
                            <ul>
                                <li><strong>Social Media Platforms:</strong> Facebook, Twitter, LinkedIn for social sharing</li>
                                <li><strong>Payment Processors:</strong> Stripe, PayPal, cryptocurrency exchanges</li>
                                <li><strong>Content Delivery Networks:</strong> Cloudflare, Akamai for global distribution</li>
                                <li><strong>Analytics Services:</strong> Google, Adobe, and other analytics providers</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Third-Party Privacy</h3>
                            <p>These third parties have their own privacy policies and cookie practices. We recommend reviewing their policies to understand how they use cookies and tracking technologies.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Managing Cookies</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Browser Controls</h3>
                            <p>You can control and manage cookies through your browser settings:</p>
                            <ul>
                                <li><strong>Google Chrome:</strong> Settings - Privacy and Security  Cookies and other site data</li>
                                <li><strong>Mozilla Firefox:</strong> Options - Privacy & Security - Cookies and Site Data</li>
                                <li><strong>Safari:</strong> Preferences - Privacy - Cookies and website data</li>
                                <li><strong>Microsoft Edge:</strong> Settings - Cookies and site permissions</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Cookie Consent Manager</h3>
                            <p>Skill Game provides a comprehensive cookie consent manager:</p>
                            <ul>
                                <li>Granular control over different cookie categories</li>
                                <li>Easy opt-in and opt-out functionality</li>
                                <li>Clear explanations of each cookie type</li>
                                <li>Real-time updates to cookie preferences</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Mobile Applications</h3>
                            <p>Mobile app cookie management varies by platform:</p>
                            <ul>
                                <li><strong>iOS:</strong> Settings - Privacy - Tracking</li>
                                <li><strong>Android:</strong> Settings - Google - Ads - Opt out of Ads Personalization</li>
                                <li><strong>In-App Settings:</strong> Dedicated privacy controls within our applications</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Impact of Cookie Management</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Essential Cookies</h3>
                            <p>Disabling essential cookies will severely impact website functionality and may prevent access to certain features.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Performance Cookies</h3>
                            <p>Disabling performance cookies will not affect core functionality but may impact our ability to optimize the service and fix issues.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Functionality Cookies</h3>
                            <p>Disabling functionality cookies will result in a less personalized experience but will not prevent basic service access.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Targeting Cookies</h3>
                            <p>Disabling targeting cookies will opt you out of personalized advertising but will not stop all advertising.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Collection and Processing</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Information Gathered</h3>
                            <p>Cookies may collect the following types of information:</p>
                            <ul>
                                <li>Device and browser characteristics</li>
                                <li>IP address and general location</li>
                                <li>Pages visited and time spent</li>
                                <li>Click patterns and user interactions</li>
                                <li>Referral sources and exit pages</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Usage</h3>
                            <ul>
                                <li>Statistical analysis and reporting</li>
                                <li>Service improvement and optimization</li>
                                <li>Personalization and content delivery</li>
                                <li>Security monitoring and fraud prevention</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Security Measures</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Cookie Security</h3>
                            <ul>
                                <li>Secure flag implementation for HTTPS connections</li>
                                <li>HttpOnly flag to prevent client-side script access</li>
                                <li>SameSite attribute for cross-site request protection</li>
                                <li>Regular security audits of cookie implementations</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Protection</h3>
                            <ul>
                                <li>Encryption of sensitive cookie data</li>
                                <li>Regular review of cookie expiration dates</li>
                                <li>Minimization of data collected through cookies</li>
                                <li>Compliance with GDPR, CCPA, and other privacy regulations</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">International Considerations</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Regional Compliance</h3>
                            <p>Our cookie practices comply with regulations in various jurisdictions:</p>
                            <ul>
                                <li><strong>European Union:</strong> GDPR cookie consent requirements</li>
                                <li><strong>United States:</strong> CCPA and state-level privacy laws</li>
                                <li><strong>Canada:</strong> PIPEDA and provincial privacy legislation</li>
                                <li><strong>Other Regions:</strong> Local privacy and data protection laws</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Cross-Border Data Transfer</h3>
                            <p>Cookie data may be transferred across international borders in compliance with applicable data protection laws and appropriate safeguards.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Updates and Changes</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Policy Modifications</h3>
                            <p>We may update this Cookie Policy to reflect changes in our practices or legal requirements:</p>
                            <ul>
                                <li>Notification of significant changes through website banners</li>
                                <li>Email notifications for major policy updates</li>
                                <li>Regular review and updates to cookie practices</li>
                                <li>Clear communication of new cookie types or purposes</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Technology Evolution</h3>
                            <ul>
                                <li>Adaptation to new tracking technologies</li>
                                <li>Implementation of enhanced privacy features</li>
                                <li>Integration of privacy-by-design principles</li>
                                <li>Response to browser and platform changes</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">User Rights</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Privacy Rights</h3>
                            <p>Users have various rights regarding cookie </p>
                            <ul>
                                <li>Right to know what cookies are being used</li>
                                <li>Right to consent to or refuse non-essential cookies</li>
                                <li>Right to access information collected through cookies</li>
                                <li>Right to request deletion of cookie data</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Exercise of Rights</h3>
                            <ul>
                                <li>Cookie consent manager for preference management</li>
                                <li>Contact form for privacy-related requests</li>
                                <li>Browser-based cookie deletion tools</li>
                                <li>Clear instructions for opting out of tracking</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Contact Information</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Cookie-Related Inquiries</h3>
                            <p>For questions about our cookie practices or to exercise your rights:</p>
                            <ul>
                                <li><strong>Email:</strong> cookies@skillgame.com</li>
                                <li><strong>Phone:</strong> +1-800-COOKIE-HELP</li>
                                <li><strong>Mail:</strong> Privacy Department, Skill Game, [Address]</li>
                                <li><strong>Website:</strong> Cookie preference center available on all pages</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Protection Officer</h3>
                            <p>For data protection inquiries related to cookies: dpo@skillgame.com</p>
                            {/* ` }} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default CookiePolicy;