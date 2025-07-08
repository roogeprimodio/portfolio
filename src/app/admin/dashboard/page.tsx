import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
    return (
        <div>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4" x-chunk="dashboard-02-chunk-1"
            >
                <div className="flex flex-col items-center gap-1 text-center p-12">
                    <h3 className="text-2xl font-bold tracking-tight">
                        Welcome to your Portfolio Admin Panel
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Select a section from the sidebar to start editing your content.
                    </p>
                </div>
            </div>
        </div>
    )
}
