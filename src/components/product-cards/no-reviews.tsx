import Card from "@component/Card";
import { CardContent } from "@mui/material";
import { SmilePlus } from "lucide-react";

export default function NoReviews() {
 return (
  <Card className="w-full max-w-lg mx-auto">
   <CardContent className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
    <div className="rounded-full bg-muted p-4 w-16 h-16 flex items-center justify-center">
     <SmilePlus className="w-8 h-8 text-muted-foreground" />
    </div>
    <div className="space-y-2">
     <h3 className="text-lg font-medium text-muted-foreground">
      This product has no reviews.
     </h3>
     <p className="text-sm text-muted-foreground max-w-[300px] mx-auto">
      Let others know what do you think and be the first to write a review.
     </p>
    </div>
   </CardContent>
  </Card>
 );
}
