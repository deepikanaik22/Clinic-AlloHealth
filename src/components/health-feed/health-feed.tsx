"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { generateHealthArticle, HealthArticleOutput } from "@/ai/flows/health-content-flow";
import { Loader2, Newspaper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function HealthFeed() {
  const [topic, setTopic] = React.useState("Common Summer Health Concerns");
  const [article, setArticle] = React.useState<HealthArticleOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleGenerateArticle = async () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Topic cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setArticle(null);
    try {
      const result = await generateHealthArticle({ topic });
      setArticle(result);
    } catch (e) {
      console.error(e);
      toast({
        title: "Failed to generate article",
        description: "An error occurred while generating the health article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically generate an article on initial load
  React.useEffect(() => {
    handleGenerateArticle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="text-primary" />
            AI-Generated Health Articles
          </CardTitle>
          <CardDescription>
            Enter a health topic to generate an informative article.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-md items-center space-x-2">
            <Input 
              type="text" 
              placeholder="e.g., Benefits of a balanced diet"
              value={topic}
              onChange={(e) => setTopic(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateArticle()}
            />
            <Button onClick={handleGenerateArticle} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
         <Card>
            <CardContent className="p-6">
                 <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Generating your article...</p>
                 </div>
            </CardContent>
         </Card>
      )}

      {article && (
        <Card>
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <article className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Generated on {new Date().toLocaleDateString()}. This is AI-generated content and should not be considered medical advice.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
