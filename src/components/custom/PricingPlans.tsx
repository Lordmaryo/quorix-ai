import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "../ui/button";

const plans = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Access to basic AI writer",
      "Limited modes & features",
      "Human-like tone",
      "5 responses/month",
    ],
    highlight: false,
  },
  {
    title: "Pro",
    price: "$2.99/mo",
    features: [
      "Everything in Free",
      "Bypasses AI detection (90%)",
      "1000 responses/month",
      "Advanced tone matching",
      "Export to Markdown, PDF",
    ],
    highlight: true,
  },
  // {
  //   title: "Premium",
  //   price: "$4.99/mo",
  //   features: [
  //     "Everything in Pro",
  //     "Bypasses ALL AI detection",
  //     "Unlimited responses",
  //     "SEO-optimized content",
  //     "Watermark-free and future-proof",
  //     "Blog & documentation templates",
  //     "Grammar-enhanced rewrites",
  //   ],
  //   highlight: true,
  // },
];

const PricingPlans = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {plans.map((plan, index) => (
        <Card key={index} className={""}>
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {plan.title}
                {plan.title === "Premium" && (
                  <Star className="text-yellow-500 w-5 h-5" />
                )}
              </h2>
              <p className="text-3xl font-semibold mt-2">{plan.price}</p>
            </div>
            <Button className="cursor-pointer w-full my-2">
              {plan.title === "Free"
                ? "Start Free trial"
                : "Upgrade to " + plan.title}
            </Button>
            <ul className="space-y-2 mt-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle className="text-green-500 w-4 h-4 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PricingPlans;
