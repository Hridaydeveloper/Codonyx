import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";

interface LaboratoryCardProps {
  id: string;
  fullName: string;
  headline?: string | null;
  bio?: string | null;
  location?: string | null;
  organisation?: string | null;
  avatarUrl?: string | null;
  companyType?: string | null;
  services?: string | null;
  linkedinUrl?: string | null;
}

export function LaboratoryCard({
  id,
  fullName,
  headline,
  bio,
  location,
  organisation,
  avatarUrl,
  companyType,
  services,
  linkedinUrl,
}: LaboratoryCardProps) {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const servicesList = services?.split(",").map(s => s.trim()).filter(Boolean).slice(0, 2) || [];

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-divider bg-background">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {location && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-sm text-foreground text-xs font-medium"
          >
            {location}
          </Badge>
        )}
        
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-1">
            {fullName}
          </h3>
          {headline && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {headline}
            </p>
          )}
        </div>

        {/* Service Badges */}
        {servicesList.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {servicesList.map((service, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs font-normal bg-muted/50"
              >
                {service}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={() => navigate(`/profile/${id}`)}
            className="flex-1"
            size="sm"
          >
            View Profile
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              if (linkedinUrl) {
                window.open(linkedinUrl, '_blank');
              }
            }}
            disabled={!linkedinUrl}
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
