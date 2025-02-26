import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <Tabs defaultValue="api-keys" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for different projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter project name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="api-key"
                    placeholder="Your API key will appear here"
                    readOnly
                  />
                  <Button>Generate</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save API Key</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect Notifie to your communication platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/icons/slack.svg"
                  alt="Slack"
                  width={24}
                  height={24}
                  className="text-[#4A154B]"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">Slack</h3>
                  <p className="text-sm text-gray-400">
                    Connect to receive notifications on Slack
                  </p>
                </div>
                <Button>Connect</Button>
              </div>
              <div className="flex items-center space-x-4">
                <MessageSquare className="h-8 w-8 text-[#5865F2]" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">Discord</h3>
                  <p className="text-sm text-gray-400">
                    Connect to receive notifications on Discord
                  </p>
                </div>
                <Button>Connect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
