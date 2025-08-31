import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function Footer() {
	return (
		<Card className="w-full border-t-0 rounded-none">
			<CardContent className="flex flex-col items-center text-center gap-2 py-6 px-4">
				<div className="flex flex-wrap justify-center gap-4 mb-2">
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<a href="https://agricoopnic.in.net/" target="_blank" rel="noopener noreferrer">
								Main Website
							</a>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<a href="https://agricoopnic.in.net/about.html" target="_blank" rel="noopener noreferrer">
								About
							</a>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<a href="https://agricoopnic.in.net/contact.html" target="_blank" rel="noopener noreferrer">
								Contact
							</a>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<a href="https://agricoopnic.in.net/Privacy-Policy.html" target="_blank" rel="noopener noreferrer">
								Privacy Policy
							</a>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<a href="https://agricoopnic.in.net/Terms-and-conditions.html" target="_blank" rel="noopener noreferrer">
								Terms & Conditions
							</a>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<a href="https://agricoopnic.in.net/Refund-policy.html" target="_blank" rel="noopener noreferrer">
								Refund Policy
							</a>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<a href="https://merchant.razorpay.com/policy/RBpZP7CHD2GlPk/shipping" target="_blank" rel="noopener noreferrer">
								Shipping Policy
							</a>
						</Badge>
				</div>
				<Separator className="my-2" />
				<div className="text-xs text-gray-500 max-w-2xl space-y-1">
					<p>
						<strong>Privacy Policy:</strong> Read how we protect your personal information and data at our <a href="https://agricoopnic.in.net/Privacy-Policy.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a> page.
					</p>
					<p>
						<strong>Terms & Conditions:</strong> Please review our <a href="https://agricoopnic.in.net/Terms-and-conditions.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Terms & Conditions</a> for using this website and our services.
					</p>
					<p>
						<strong>Refund Policy:</strong> For information about refunds, visit our <a href="https://agricoopnic.in.net/Refund-policy.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Refund Policy</a> page.
					</p>
					<p>
						<strong>Shipping Policy:</strong> For shipping details, visit our <a href="https://merchant.razorpay.com/policy/RBpZP7CHD2GlPk/shipping" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Shipping Policy</a> page.
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col items-center">
				<Separator className="mb-2" />
				<div className="text-xs text-gray-400">&copy; {new Date().getFullYear()} AGRICOOPNIC. All rights reserved.</div>
			</CardFooter>
		</Card>
	);
}
