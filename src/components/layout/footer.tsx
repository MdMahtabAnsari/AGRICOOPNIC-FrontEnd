import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export function Footer() {
	return (
		<Card className="w-full border-t-0 rounded-none">
			<CardContent className="flex flex-col items-center text-center gap-2 py-6 px-4">
				<div className="flex flex-wrap justify-center gap-4 mb-2">
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<Link to="/about">
								About
							</Link>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<Link to="/contact">
								Contact
							</Link>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<Link to="/privacy-policy">
								Privacy Policy
							</Link>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<Link to="/terms-and-conditions">
								Terms & Conditions
							</Link>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<Link to="/refund-policy">
								Refund Policy
							</Link>
						</Badge>
						<Badge asChild variant="outline" className="rounded-full px-4 py-2 bg-white/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
							<Link to="/shipping-and-delivery-policy">
								Shipping & Delivery Policy
							</Link>
						</Badge>
				</div>
				<Separator className="my-2" />
				<div className="text-xs text-gray-500 max-w-2xl space-y-1">
					<p>
						<strong>Privacy Policy:</strong> Read how we protect your personal information and data at our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> page.
					</p>
					<p>
						<strong>Terms & Conditions:</strong> Please review our <Link to="/terms-and-conditions" className="text-blue-600 hover:underline">Terms & Conditions</Link> for using this website and our services.
					</p>
					<p>
						<strong>Refund Policy:</strong> For information about refunds, visit our <Link to="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</Link> page.
					</p>
					<p>
						<strong>Shipping & Delivery Policy:</strong> Learn about our shipping methods and delivery timelines at our <Link to="/shipping-and-delivery-policy" className="text-blue-600 hover:underline">Shipping & Delivery Policy</Link> page.
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
