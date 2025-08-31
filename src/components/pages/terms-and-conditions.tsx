import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export function TermsAndConditionsPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Card className="border-none shadow-none">
                <CardContent>
                    <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
                    <div className="mb-6">
                        <p>
                            Please read these Terms carefully before using the Platform. By accessing, browsing, or otherwise using Agricoopnic.in.net (including our mobile site and app), you agree to be bound by these Terms & Conditions, our Privacy Policy, and any applicable policies referenced here.
                        </p>
                        <p className="mt-2">
                            <strong>Electronic Record Notice:</strong> This document is an electronic record under the Information Technology Act, 2000 and rules thereunder, as amended, and does not require physical or digital signatures. It is published in accordance with Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011.
                        </p>
                    </div>
                    <Accordion type="multiple" className="space-y-4">
                        <AccordionItem value="business-name">
                            <AccordionTrigger>Business Name</AccordionTrigger>
                            <AccordionContent>
                                <p>Vinod Manpower Services</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="acceptance">
                            <AccordionTrigger> Acceptance of Terms & Contracting Party</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Your use of the Platform and the Services is governed by these Terms & Conditions (the “Terms of Use”), including all policies referenced herein. By mere use of the Platform, you are contracting with the Platform Owner and these Terms create binding obligations on you.
                                </p>
                                <p>
                                    Any additional or conflicting terms proposed by you are expressly rejected and shall have no force or effect.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="scope">
                            <AccordionTrigger> Scope of Services</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    These Terms relate to your use of our website and any applicable goods and/or services (collectively, “Services”). Access to specific Services may be subject to additional terms, policies, or eligibility requirements.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="eligibility">
                            <AccordionTrigger> Eligibility, Registration & Accuracy of Information</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    To access and use the Services, you agree to provide true, accurate, and complete information during and after registration.
                                    You are responsible for all acts done through the use of your registered account on the Platform. Keep your credentials secure.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="warranties">
                            <AccordionTrigger> No Warranties; Your Responsibility</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials offered on the Platform or through the Services for any specific purpose. Such information and materials may contain inaccuracies or errors; we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                                </p>
                                <p>
                                    Your use of the Platform and Services is entirely at your own risk and discretion. You must independently assess whether the Services meet your requirements.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="proprietary">
                            <AccordionTrigger> Proprietary Rights & Intellectual Property</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    The contents of the Platform and the Services are proprietary to or licensed to us. You have no rights, title, or interest in any intellectual property therein, including (without limitation) the design, layout, look, feel, and graphics.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="prohibited">
                            <AccordionTrigger> Prohibited Use & Compliance</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    You agree not to use the Platform and/or the Services for any purpose that is unlawful, illegal, or forbidden by these Terms, or by applicable Indian or local laws.
                                </p>
                                <p>
                                    Unauthorised use of the Platform and/or the Services may result in action against you under these Terms and/or applicable laws.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="third-party">
                            <AccordionTrigger> Third-Party Links</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    The Platform and Services may contain links to third-party websites. Your access and use of such sites is governed by their respective terms of use, privacy policies, and other applicable policies. These links are provided for convenience and additional information.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="transactions">
                            <AccordionTrigger> Transactions & Formation of Contract</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    By initiating a transaction to avail any Services, you acknowledge that you are entering into a legally binding and enforceable contract with the Platform Owner for those Services, subject to these Terms and applicable policies.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="fees">
                            <AccordionTrigger> Fees & Payments</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    You agree to pay the charges associated with availing the Services, as applicable. Additional taxes, fees, and charges may apply as per law.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="indemnity">
                            <AccordionTrigger> Indemnity</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    You shall indemnify and hold harmless the Platform Owner, its affiliates, group companies (as applicable), and their respective officers, directors, agents, and employees, from any claim, demand, action, or penalty (including reasonable attorneys’ fees) arising out of: (a) your breach of these Terms, the Privacy Policy, or other policies; (b) your violation of any law, rules, or regulations; or (c) infringement of third-party rights, including intellectual property rights.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="liability">
                            <AccordionTrigger> Limitation of Liability & Disclaimer</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    To the fullest extent permitted by law, the Platform Owner shall not be liable for any indirect, incidental, special, consequential, or exemplary damages, or loss of profits, data, goodwill, or other intangible losses arising out of or related to your use of (or inability to use) the Platform or Services.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="force-majeure">
                            <AccordionTrigger> Force Majeure</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Neither party shall be liable for any failure to perform obligations under these Terms if performance is prevented or delayed by a force majeure event.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="governing-law">
                            <AccordionTrigger> Governing Law & Jurisdiction</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    These Terms and any dispute or claim relating to them or their enforceability shall be governed by and construed in accordance with the laws of India, without regard to conflict-of-law principles.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="changes">
                            <AccordionTrigger> Changes to Terms</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    We may modify these Terms at any time without assigning any reason. It is your responsibility to periodically review the Terms to stay informed of updates. Continued use of the Platform after changes take effect constitutes your acceptance of the revised Terms.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="contact">
                            <AccordionTrigger> Contact & Notices</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    All concerns or communications relating to these Terms should be sent using the contact information provided on this website.
                                </p>
                                <p className="mt-2 text-xs text-gray-500">
                                    Last updated: 23 August 2025
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}