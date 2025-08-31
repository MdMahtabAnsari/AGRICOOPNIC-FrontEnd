import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export function PrivacyPolicyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Card className="border-none shadow-none">
                <CardContent>
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                    <div className="mb-6">
                        <p>
                            This page explains how VINOD KUMAR TIWARI and its affiliates
                            (collectively “VINOD KUMAR TIWARI”, “we”, “our”, “us”)
                            collect, use, share, protect, and otherwise process your
                            information/personal data when you use Agricoopnic.in.net (the
                            “Platform”).
                        </p>
                        <p className="mt-2">
                            By using this Platform, you agree to this Privacy Policy, the
                            Terms of Use, and applicable service/product terms, governed by
                            the laws of India. If you do not agree, please do not use or
                            access our Platform.
                        </p>
                    </div>
                    <Accordion type="multiple" className="space-y-4">
                        <AccordionItem value="overview">
                            <AccordionTrigger>Overview</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    We may allow browsing of certain sections of the Platform
                                    without registration. We do not offer any product/service
                                    under this Platform outside India and your personal data will
                                    primarily be stored and processed in India.
                                </p>
                                <p>
                                    By visiting this Platform, providing your information, or
                                    availing any product/service offered on the Platform, you
                                    expressly agree to be bound by this Privacy Policy, the Terms
                                    of Use and the applicable service/product terms and
                                    conditions, and agree to be governed by the laws of India
                                    including but not limited to the laws applicable to data
                                    protection and privacy. If you do not agree please do not use
                                    or access our Platform.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="collection">
                            <AccordionTrigger>Collection</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    We collect your personal data when you use our Platform,
                                    services or otherwise interact with us during the course of
                                    our relationship, and related information provided from time
                                    to time.
                                </p>
                                <ul className="list-disc ml-6">
                                    <li>
                                        Personal data/information provided during sign-up/registering
                                        or using our Platform such as name, date of birth, address,
                                        telephone/mobile number, email ID, and/or any such
                                        information shared as proof of identity or address.
                                    </li>
                                    <li>
                                        Sensitive personal data (with your consent) such as bank
                                        account details or payment instrument information, or
                                        biometric information (e.g., facial features or physiological
                                        information) to enable opted features, in accordance with
                                        applicable law(s).
                                    </li>
                                    <li>
                                        Behavioural and preference data regarding your use of the
                                        Platform; this may be compiled and analysed on an aggregated
                                        basis.
                                    </li>
                                    <li>
                                        Information related to your transactions on the Platform and
                                        on third-party business partner platforms.
                                    </li>
                                </ul>
                                <p>
                                    You always have the option to not provide specific information
                                    by choosing not to use a particular service or feature on the
                                    Platform.
                                </p>
                                <p>
                                    When a third-party business partner collects your personal data
                                    directly from you, you will be governed by their privacy
                                    policies. We are not responsible for third-party privacy
                                    practices or policy content; please read their policies before
                                    disclosing information.
                                </p>
                                <strong>Fraud Alert:</strong>
                                <p>
                                    If you receive an email or call from a person/association
                                    claiming to be VINOD KUMAR TIWARI seeking personal data like
                                    debit/credit card PIN, net-banking or mobile banking password,
                                    do not provide such information. If you have already revealed
                                    such information, report it immediately to the appropriate law
                                    enforcement agency.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="usage">
                            <AccordionTrigger>Usage</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    We use personal data to provide the services you request. Where
                                    we use your personal data to market to you, you will have the
                                    ability to opt out.
                                </p>
                                <ul className="list-disc ml-6">
                                    <li>
                                        Assist sellers and business partners in handling and
                                        fulfilling orders.
                                    </li>
                                    <li>Enhance customer experience and customise your experience.</li>
                                    <li>Resolve disputes and troubleshoot problems.</li>
                                    <li>
                                        Inform you about online/offline offers, products, services,
                                        and updates.
                                    </li>
                                    <li>
                                        Detect, prevent, and protect against error, fraud, and other
                                        criminal activity.
                                    </li>
                                    <li>Enforce our terms and conditions.</li>
                                    <li>Conduct marketing research, analysis, and surveys.</li>
                                    <li>Any other purpose described to you at the time of collection.</li>
                                </ul>
                                <p>
                                    You understand that access to certain products/services may be
                                    affected if permission is not provided.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sharing">
                            <AccordionTrigger>Sharing</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    We may share your personal data internally within our group
                                    entities, other corporate entities, and affiliates to provide you
                                    access to services and products offered by them. These entities and
                                    affiliates may market to you as a result of such sharing unless you
                                    explicitly opt out.
                                </p>
                                <p>
                                    We may disclose personal data to third parties such as sellers,
                                    business partners, and third-party service providers (including
                                    logistics partners, prepaid payment instrument issuers, third-party
                                    reward programs, and other payment options you choose). These
                                    disclosures may be required to provide access to our services/products,
                                    comply with legal obligations, enforce our user agreement, facilitate
                                    marketing/advertising activities, and prevent, detect, mitigate, and
                                    investigate fraudulent or illegal activities.
                                </p>
                                <p>
                                    We may disclose personal and sensitive personal data to government
                                    or authorised law enforcement agencies if required by law or in good
                                    faith where such disclosure is reasonably necessary to respond to
                                    subpoenas, court orders, or other legal processes.
                                </p>
                                <p>
                                    We may disclose personal data to law enforcement offices,
                                    third-party rights owners, or others in the good faith belief that
                                    such disclosure is reasonably necessary to: enforce our Terms of Use
                                    or Privacy Policy; respond to claims that an advertisement, posting
                                    or other content violates the rights of a third party; or protect the
                                    rights, property or personal safety of our users or the general public.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="security">
                            <AccordionTrigger>Security Precautions</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    To protect your personal data from unauthorised access or
                                    disclosure, loss, or misuse, we adopt reasonable security practices
                                    and procedures. When your information is in our possession, or
                                    whenever you access your account information, we adhere to our
                                    security guidelines and offer the use of a secure server.
                                </p>
                                <p>
                                    However, the transmission of information over the internet is not
                                    completely secure and is beyond our complete control. By using the
                                    Platform, you accept the security implications of data transmission
                                    over the internet, which cannot always be guaranteed as completely
                                    secure. There are inherent risks regarding use of the Platform.
                                    Users are responsible for protecting login and password records for
                                    their accounts.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="deletion">
                            <AccordionTrigger>Data Deletion and Retention</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    You may delete your account via your profile/settings on the
                                    Platform. This action results in loss of all information related to
                                    your account. You may also write to us at the contact information
                                    provided below to assist with such requests.
                                </p>
                                <p>
                                    We may refuse or delay deletion in the event of pending grievances,
                                    claims, shipments, or other services. Once deleted, you will lose
                                    access to the account.
                                </p>
                                <p>
                                    We retain personal data for no longer than required for the purpose
                                    for which it was collected or as required by applicable law. We may
                                    retain data to prevent fraud, future abuse, or for other legitimate
                                    purposes. We may continue to retain data in anonymised form for
                                    analytical and research purposes.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="rights">
                            <AccordionTrigger>Your Rights</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    You may access, rectify, and update your personal data directly
                                    through functionalities provided on the Platform.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="consent">
                            <AccordionTrigger>Consent</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    By visiting our Platform or by providing your information, you
                                    consent to the collection, use, storage, disclosure and otherwise
                                    processing of your information on the Platform in accordance with
                                    this Privacy Policy.
                                </p>
                                <p>
                                    If you disclose personal data relating to other people, you
                                    represent that you have the authority to do so and permit us to use
                                    the information in accordance with this Privacy Policy.
                                </p>
                                <p>
                                    While providing your personal data over the Platform or any partner
                                    platforms or establishments, you consent to us (including our other
                                    corporate entities, affiliates, lending partners, technology partners,
                                    marketing channels, business partners and other third parties)
                                    contacting you through SMS, instant messaging apps, call and/or e-mail
                                    for the purposes specified in this Privacy Policy.
                                </p>
                                <p>
                                    You may withdraw consent previously provided by writing to the
                                    Grievance Officer at the contact information provided below, with
                                    the subject line “Withdrawal of consent for processing personal data”.

                                    We may verify such requests before acting. Withdrawal of consent is
                                    not retrospective and is subject to the Terms of Use, this Privacy
                                    Policy, and applicable laws. If you withdraw consent, we may restrict
                                    or deny services for which such information is necessary.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="changes">
                            <AccordionTrigger>Changes to this Privacy Policy</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Please check this Privacy Policy periodically for changes. We may
                                    update it to reflect changes to our information practices and may
                                    alert/notify you about significant changes as required under
                                    applicable laws.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}