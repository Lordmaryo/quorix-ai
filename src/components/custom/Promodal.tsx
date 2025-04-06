import { DialogOverlay } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UseGlobalStore } from "@/app/hooks/useGlobalStore";
import PricingPlans from "./PricingPlans";
import { Button } from "../ui/button";
import Link from "next/link";

const Promodal = () => {
  const proModel = UseGlobalStore();

  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span>Upgrade to Absolute Human</span>
            <span className="text-sm ml-4 bg-purple-500 px-4 py-1 rounded-2xl">
              Pro
            </span>
          </DialogTitle>
          <DialogDescription>
            Your Plan is exhasusted. Upgrade to Pro for unlimited access to all
            features and modes. Get started with our Pro plan for just
            $2.99/month.
          </DialogDescription>
        </DialogHeader>
        <DialogOverlay>
          <Link href={"/pricing"}>
            <Button
              className="w-full cursor-pointer"
              onClick={() => proModel.onClose()}
            >
              Proceed to Upgrade
            </Button>
          </Link>
        </DialogOverlay>
      </DialogContent>
    </Dialog>
  );
};

export default Promodal;
