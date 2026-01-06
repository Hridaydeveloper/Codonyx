import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MapPin, Linkedin, Building2, Users, Calendar, Globe, Beaker, Wrench } from "lucide-react";

interface LaboratoryCardProps {
  fullName: string;
  headline?: string | null;
  bio?: string | null;
  location?: string | null;
  organisation?: string | null;
  avatarUrl?: string | null;
  linkedinUrl?: string | null;
  companyType?: string | null;
  companySize?: string | null;
  foundedYear?: number | null;
  websiteUrl?: string | null;
  services?: string | null;
  researchAreas?: string | null;
}

export function LaboratoryCard({
  fullName,
  headline,
  bio,
  location,
  organisation,
  avatarUrl,
  linkedinUrl,
  companyType,
  companySize,
  foundedYear,
  websiteUrl,
  services,
  researchAreas,
}: LaboratoryCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const hasExtendedInfo = companyType || companySize || foundedYear || websiteUrl || services || researchAreas || linkedinUrl;

  const cardContent = (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-divider bg-background cursor-pointer">
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

        {companyType && (
          <Badge 
            variant="outline" 
            className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground border-primary/30"
          >
            {companyType}
          </Badge>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-1 line-clamp-1">
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

  if (!hasExtendedInfo) {
    return cardContent;
  }

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        {cardContent}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4" side="right" align="start">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatarUrl || undefined} alt={fullName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{fullName}</h4>
              {headline && <p className="text-xs text-muted-foreground">{headline}</p>}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            {companyType && (
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Company Type</p>
                  <p className="text-foreground">{companyType}</p>
                </div>
              </div>
            )}

            {companySize && (
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Team Size</p>
                  <p className="text-foreground">{companySize} employees</p>
                </div>
              </div>
            )}

            {foundedYear && (
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Founded</p>
                  <p className="text-foreground">{foundedYear}</p>
                </div>
              </div>
            )}

            {services && (
              <div className="flex items-start gap-2">
                <Wrench className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Services</p>
                  <p className="text-foreground line-clamp-2">{services}</p>
                </div>
              </div>
            )}

            {researchAreas && (
              <div className="flex items-start gap-2">
                <Beaker className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Research Areas</p>
                  <p className="text-foreground line-clamp-2">{researchAreas}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-3">
            {websiteUrl && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(websiteUrl, '_blank');
                }}
              >
                <Globe className="h-4 w-4 mr-2" />
                Website
              </Button>
            )}
            {linkedinUrl && (
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(linkedinUrl, '_blank');
                }}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                Connect
              </Button>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}