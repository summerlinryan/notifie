import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

export default function Settings() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Notification Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Configure Notifications</CardTitle>
          <CardDescription>Customize how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="todo-notifications">TODO Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications for TODO comments</p>
            </div>
            <Switch id="todo-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="fixme-notifications">FIXME Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications for FIXME comments</p>
            </div>
            <Switch id="fixme-notifications" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notification-frequency">Notification Frequency</Label>
            <Select>
              <SelectTrigger id="notification-frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

