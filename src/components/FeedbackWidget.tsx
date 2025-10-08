import { useState } from "react";
import { MessageSquarePlus, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for helping us improve the platform!",
    });
    
    setFeedback("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        >
          <MessageSquarePlus className="h-6 w-6" />
        </Button>
      )}

      {/* Feedback Panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 shadow-xl z-50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Share Feedback</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">How can we improve?</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us about your experience, suggest features, or report issues..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full"
            disabled={!feedback.trim()}
          >
            <Send className="mr-2 h-4 w-4" />
            Submit Feedback
          </Button>
        </Card>
      )}
    </>
  );
}
