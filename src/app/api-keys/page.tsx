import { Sidebar } from "~/components/sidebar"
import { ModeToggle } from "~/components/mode-toggle"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { Copy, RefreshCw, Shield, MoreHorizontal, Eye, EyeOff } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

export default function ApiKeysPage() {
  // Mock data for API keys
  const apiKeys = [
    {
      id: 1,
      projectName: "Customer Portal",
      key: "sk_live_*************Hj7K",
      created: "2 days ago",
      lastUsed: "1 hour ago",
      status: "active",
    },
    {
      id: 2,
      projectName: "Marketing Website",
      key: "sk_live_*************9Lm2",
      created: "1 week ago",
      lastUsed: "3 days ago",
      status: "active",
    },
    {
      id: 3,
      projectName: "Mobile App",
      key: "sk_live_*************Rt5P",
      created: "2 weeks ago",
      lastUsed: "1 day ago",
      status: "revoked",
    },
  ]

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-background border-r border-border">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">API Keys</h2>
            <ModeToggle />
          </div>

          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
              <CardDescription>
                Manage your API keys for different projects. Each project can have only one active API key at a time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  API keys should be kept secure and never shared publicly. If you suspect a key has been compromised,
                  revoke it immediately and generate a new one.
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-muted/50">
                    <TableHead>Project</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium">{apiKey.projectName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono">{apiKey.key}</code>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy API key</span>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{apiKey.created}</TableCell>
                      <TableCell>{apiKey.lastUsed}</TableCell>
                      <TableCell>
                        <Badge
                          variant={apiKey.status === "active" ? "default" : "secondary"}
                          className={
                            apiKey.status === "active"
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-neutral-600 hover:bg-neutral-700"
                          }
                        >
                          {apiKey.status === "active" ? "Active" : "Revoked"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Copy className="h-4 w-4 text-blue-500" />
                              Copy API Key
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              {apiKey.status === "active" ? (
                                <>
                                  <EyeOff className="h-4 w-4 text-purple-500" />
                                  Hide API Key
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 text-purple-500" />
                                  Show API Key
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {apiKey.status === "active" ? (
                              <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                                <Shield className="h-4 w-4" />
                                Revoke Key
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="flex items-center gap-2 text-emerald-500">
                                <RefreshCw className="h-4 w-4" />
                                Generate New Key
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border pt-4">
              <Button variant="outline" className="border-border">
                View API Documentation
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Generate New API Key</Button>
            </CardFooter>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>API Key Security</CardTitle>
              <CardDescription>Best practices for keeping your API keys secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Never expose API keys in client-side code</h3>
                <p className="text-sm text-muted-foreground">
                  API keys should only be used in server-side code where they cannot be viewed by users.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Rotate keys regularly</h3>
                <p className="text-sm text-muted-foreground">
                  Regenerate your API keys periodically to minimize the impact of potential leaks.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Use environment variables</h3>
                <p className="text-sm text-muted-foreground">
                  Store your API keys in environment variables rather than hardcoding them in your application.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Revoke compromised keys immediately</h3>
                <p className="text-sm text-muted-foreground">
                  If you suspect a key has been compromised, revoke it immediately and generate a new one.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

