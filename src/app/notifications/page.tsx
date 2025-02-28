import { Sidebar } from "~/components/sidebar"
import { ModeToggle } from "~/components/mode-toggle"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"
import { Slack, MessageSquare, Mail, Phone } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-background border-r border-border">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Notification Settings</h2>
            <ModeToggle />
          </div>

          <Tabs defaultValue="channels" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted">
              <TabsTrigger value="channels">Notification Channels</TabsTrigger>
              <TabsTrigger value="preferences">Notification Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="channels">
              <div className="grid gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Slack className="h-5 w-5 text-blue-500" />
                      <CardTitle>Slack</CardTitle>
                    </div>
                    <CardDescription>Connect your Slack workspace to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        Status: <span className="font-medium text-amber-500">Not Connected</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Connect Slack</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-indigo-500" />
                      <CardTitle>Discord</CardTitle>
                    </div>
                    <CardDescription>Connect your Discord server to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        Status: <span className="font-medium text-emerald-500">Connected</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-border">
                          Configure
                        </Button>
                        <Button variant="destructive">Disconnect</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-purple-500" />
                      <CardTitle>Email</CardTitle>
                    </div>
                    <CardDescription>Configure email notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        Status: <span className="font-medium text-emerald-500">Connected</span>
                      </div>
                      <Button variant="outline" className="border-border">
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-amber-500" />
                      <CardTitle>SMS</CardTitle>
                    </div>
                    <CardDescription>Configure SMS notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        Status: <span className="font-medium text-amber-500">Not Connected</span>
                      </div>
                      <Button className="bg-indigo-600 hover:bg-indigo-700">Connect SMS</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure when and how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Project Notifications</h3>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="project-created">Project Created</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a notification when a new project is created
                          </p>
                        </div>
                        <Switch id="project-created" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="project-updated">Project Updated</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a notification when a project is updated
                          </p>
                        </div>
                        <Switch id="project-updated" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="project-deleted">Project Deleted</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a notification when a project is deleted
                          </p>
                        </div>
                        <Switch id="project-deleted" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">API Key Notifications</h3>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="api-created">API Key Created</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a notification when a new API key is created
                          </p>
                        </div>
                        <Switch id="api-created" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="api-revoked">API Key Revoked</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a notification when an API key is revoked
                          </p>
                        </div>
                        <Switch id="api-revoked" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="api-regenerated">API Key Regenerated</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a notification when an API key is regenerated
                          </p>
                        </div>
                        <Switch id="api-regenerated" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

