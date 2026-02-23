import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Clock, Check, X, Loader2 } from "lucide-react";
import { useConnections } from "@/hooks/useConnections";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConnectButtonProps {
  currentProfileId: string | null;
  targetProfileId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ConnectButton({
  currentProfileId,
  targetProfileId,
  variant = "default",
  size = "default",
  className,
}: ConnectButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const {
    getConnectionStatus,
    sendConnectionRequest,
    acceptConnection,
    withdrawConnection,
  } = useConnections(currentProfileId);

  if (!currentProfileId || currentProfileId === targetProfileId) {
    return null;
  }

  const { status, connectionId, cooldownUntil } = getConnectionStatus(targetProfileId);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await sendConnectionRequest(targetProfileId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!connectionId) return;
    setIsLoading(true);
    try {
      await acceptConnection(connectionId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!connectionId) return;
    setShowWithdrawDialog(false);
    setIsLoading(true);
    try {
      await withdrawConnection(connectionId);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Button variant={variant} size={size} disabled className={className}>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  // Check cooldown
  if (cooldownUntil && new Date(cooldownUntil) > new Date()) {
    const daysLeft = Math.ceil((new Date(cooldownUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return (
      <Button variant="outline" size={size} disabled className={`gap-2 text-muted-foreground ${className}`}>
        <Clock className="w-4 h-4" />
        Wait {daysLeft}d
      </Button>
    );
  }

  switch (status) {
    case "accepted":
      return (
        <Button
          variant="outline"
          size={size}
          className={`gap-2 text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700 ${className}`}
        >
          <Check className="w-4 h-4" />
          Connected
        </Button>
      );

    case "pending_sent":
      return (
        <>
          <Button
            variant="outline"
            size={size}
            className={`gap-2 text-amber-600 border-amber-300 hover:bg-amber-50 ${className}`}
            onClick={() => setShowWithdrawDialog(true)}
          >
            <Clock className="w-4 h-4" />
            Pending
          </Button>

          <AlertDialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Withdraw invitation</AlertDialogTitle>
                <AlertDialogDescription>
                  If you withdraw now, you won't be able to resend to this person for up to 2 weeks.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleWithdraw}>Withdraw</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );

    case "pending_received":
      return (
        <Button
          variant={variant}
          size={size}
          className={`gap-2 ${className}`}
          onClick={handleAccept}
        >
          <Check className="w-4 h-4" />
          Accept Request
        </Button>
      );

    case "rejected":
    case "none":
    default:
      return (
        <Button
          variant={variant}
          size={size}
          className={`gap-2 ${className}`}
          onClick={handleConnect}
        >
          <UserPlus className="w-4 h-4" />
          Connect
        </Button>
      );
  }
}
