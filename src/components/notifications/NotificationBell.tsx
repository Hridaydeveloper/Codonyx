import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, UserPlus, UserCheck, TrendingUp, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications, Notification } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";

interface NotificationBellProps {
  profileId: string | null;
}

const notificationIcon = (type: string) => {
  switch (type) {
    case "connection_request":
      return <UserPlus className="h-4 w-4 text-blue-500" />;
    case "connection_accepted":
      return <UserCheck className="h-4 w-4 text-emerald-500" />;
    case "new_deal":
      return <TrendingUp className="h-4 w-4 text-amber-500" />;
    default:
      return <Bell className="h-4 w-4 text-primary" />;
  }
};

export function NotificationBell({ profileId }: NotificationBellProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications(profileId);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getInitials = (name: string) =>
    name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      await markAsRead(notification.id);
    }

    if (notification.link) {
      setOpen(false);
      navigate(notification.link);
    } else if (notification.related_profile_id) {
      setOpen(false);
      navigate(`/profile/${notification.related_profile_id}`);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-0 shadow-lg border-border/50" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllAsRead()}
              className="flex items-center gap-1 text-xs text-primary hover:underline transition-colors"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>
        <ScrollArea className="max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 opacity-40" />
              </div>
              <p className="text-sm font-medium">No notifications yet</p>
              <p className="text-xs mt-1 opacity-70">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-muted/60 transition-all duration-200 ${
                    !notification.is_read
                      ? "bg-primary/5 border-l-2 border-l-primary"
                      : "border-l-2 border-l-transparent"
                  }`}
                >
                  {notification.related_profile ? (
                    <div className="relative shrink-0">
                      <Avatar
                        className="h-10 w-10 ring-2 ring-background cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(false);
                          navigate(`/profile/${notification.related_profile!.id}`);
                        }}
                      >
                        <AvatarImage src={notification.related_profile.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                          {getInitials(notification.related_profile.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-background flex items-center justify-center">
                        {notificationIcon(notification.type)}
                      </div>
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                      {notificationIcon(notification.type)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">
                      {notification.message}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1.5">
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary shrink-0 mt-2 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
