import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface AdvisorCardProps {
  id: string;
  fullName: string;
  headline?: string | null;
  bio?: string | null;
  location?: string | null;
  organisation?: string | null;
  avatarUrl?: string | null;
}

export function AdvisorCard({
  id,
  fullName,
  headline,
  bio,
  location,
  organisation,
  avatarUrl,
}: AdvisorCardProps) {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-divider bg-background cursor-pointer"
      onClick={() => navigate(`/profile/${id}`)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        
        {location && (
          <Badge 
            variant="secondary" 
            className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-foreground"
          >
            <MapPin className="w-3 h-3 mr-1" />
            {location}
          </Badge>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="font-heading text-xl font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {fullName}
        </h3>
        
        {headline && (
          <p className="text-sm text-primary font-medium mb-2 line-clamp-1">
            {headline}
          </p>
        )}
        
        {organisation && (
          <p className="text-sm text-muted-foreground mb-3">
            {organisation}
          </p>
        )}
        
        {bio && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {bio}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
