import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Connection {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
  // Joined profile data
  sender_profile?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    headline: string | null;
    user_type: string;
    organisation: string | null;
  };
  receiver_profile?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    headline: string | null;
    user_type: string;
    organisation: string | null;
  };
}

export function useConnections(currentProfileId: string | null) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnections = useCallback(async () => {
    if (!currentProfileId) {
      setIsLoading(false);
      return;
    }

    try {
      // Fetch connections where user is sender
      const { data: sentData, error: sentError } = await supabase
        .from("connections")
        .select(`
          *,
          receiver_profile:profiles!connections_receiver_id_fkey(id, full_name, avatar_url, headline, user_type, organisation)
        `)
        .eq("sender_id", currentProfileId);

      // Fetch connections where user is receiver
      const { data: receivedData, error: receivedError } = await supabase
        .from("connections")
        .select(`
          *,
          sender_profile:profiles!connections_sender_id_fkey(id, full_name, avatar_url, headline, user_type, organisation)
        `)
        .eq("receiver_id", currentProfileId);

      if (sentError || receivedError) {
        console.error("Error fetching connections:", sentError || receivedError);
        return;
      }

      const allConnections = [
        ...(sentData || []).map(c => ({ ...c, receiver_profile: c.receiver_profile })),
        ...(receivedData || []).map(c => ({ ...c, sender_profile: c.sender_profile })),
      ] as Connection[];

      setConnections(allConnections);
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentProfileId]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const getConnectionStatus = useCallback((targetProfileId: string): { 
    status: "none" | "pending_sent" | "pending_received" | "accepted" | "rejected";
    connectionId?: string;
  } => {
    const connection = connections.find(
      c => c.sender_id === targetProfileId || c.receiver_id === targetProfileId
    );

    if (!connection) return { status: "none" };

    if (connection.status === "accepted") {
      return { status: "accepted", connectionId: connection.id };
    }

    if (connection.status === "rejected") {
      return { status: "rejected", connectionId: connection.id };
    }

    // Pending
    if (connection.sender_id === currentProfileId) {
      return { status: "pending_sent", connectionId: connection.id };
    }
    return { status: "pending_received", connectionId: connection.id };
  }, [connections, currentProfileId]);

  const sendConnectionRequest = async (targetProfileId: string) => {
    if (!currentProfileId) return false;

    try {
      const { error } = await supabase
        .from("connections")
        .insert({
          sender_id: currentProfileId,
          receiver_id: targetProfileId,
        });

      if (error) {
        console.error("Error sending connection request:", error);
        toast({
          title: "Error",
          description: "Failed to send connection request. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Request Sent",
        description: "Your connection request has been sent.",
      });
      
      await fetchConnections();
      return true;
    } catch (error) {
      console.error("Error sending connection request:", error);
      return false;
    }
  };

  const acceptConnection = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from("connections")
        .update({ status: "accepted" })
        .eq("id", connectionId);

      if (error) {
        console.error("Error accepting connection:", error);
        toast({
          title: "Error",
          description: "Failed to accept connection request.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Connection Accepted",
        description: "You are now connected.",
      });
      
      await fetchConnections();
      return true;
    } catch (error) {
      console.error("Error accepting connection:", error);
      return false;
    }
  };

  const rejectConnection = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from("connections")
        .update({ status: "rejected" })
        .eq("id", connectionId);

      if (error) {
        console.error("Error rejecting connection:", error);
        toast({
          title: "Error",
          description: "Failed to reject connection request.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Request Declined",
        description: "Connection request has been declined.",
      });
      
      await fetchConnections();
      return true;
    } catch (error) {
      console.error("Error rejecting connection:", error);
      return false;
    }
  };

  const removeConnection = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from("connections")
        .delete()
        .eq("id", connectionId);

      if (error) {
        console.error("Error removing connection:", error);
        toast({
          title: "Error",
          description: "Failed to remove connection.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Connection Removed",
        description: "Connection has been removed.",
      });
      
      await fetchConnections();
      return true;
    } catch (error) {
      console.error("Error removing connection:", error);
      return false;
    }
  };

  // Get accepted connections
  const acceptedConnections = connections.filter(c => c.status === "accepted");
  
  // Get pending sent requests
  const pendingSentRequests = connections.filter(
    c => c.status === "pending" && c.sender_id === currentProfileId
  );
  
  // Get pending received requests
  const pendingReceivedRequests = connections.filter(
    c => c.status === "pending" && c.receiver_id === currentProfileId
  );

  return {
    connections,
    acceptedConnections,
    pendingSentRequests,
    pendingReceivedRequests,
    isLoading,
    getConnectionStatus,
    sendConnectionRequest,
    acceptConnection,
    rejectConnection,
    removeConnection,
    refetch: fetchConnections,
  };
}
