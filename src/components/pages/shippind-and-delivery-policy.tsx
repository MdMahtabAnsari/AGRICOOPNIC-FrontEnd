import { Card, CardContent } from "@/components/ui/card";

export function ShippingAndDeliveryPolicyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Card className="border-none shadow-none">
                <CardContent>
                    <h1 className="text-3xl font-bold mb-6">Shipping & Delivery Policy</h1>
                    <p className="text-sm text-gray-500 mb-4">Last updated on Aug 31st 2025</p>
                    <div className="mb-6">
                        <p>
                            For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.
                        </p>
                        <p className="mt-2">
                            Orders are shipped within Not Applicable or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms. Vinod Manpower Service is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within Not Applicable from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
                        </p>
                        <p className="mt-2">
                            Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
                        </p>

                        <p className="mt-2">For any issues in utilizing our services you may mail us at{" "}
                            <a href="mailto:Info@agricoopnic.org" className="text-blue-600 hover:underline">Info@agricoopnic.org</a>.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}