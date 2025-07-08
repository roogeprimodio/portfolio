
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { portfolioData } from "@/lib/portfolio-data";
import { MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminPersonalInfoPage() {
    const { personalInfo, socialLinks } = portfolioData;

    const handleActionClick = (action: string, item: string) => {
        alert(`${action} clicked for: ${item}`);
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Personal Info</h1>
                <Button onClick={() => alert('Save All Changes clicked!')}>Save All Changes</Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Core Information</CardTitle>
                    <CardDescription>This is the main information displayed in the hero section.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue={personalInfo.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" defaultValue={personalInfo.jobTitle} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="tagline">Tagline</Label>
                        <Textarea id="tagline" defaultValue={personalInfo.tagline} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="profileImage">Profile Image URL</Label>
                        <Input id="profileImage" defaultValue={personalInfo.profileImage} placeholder="e.g., /jagdish.png"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="url">Website URL</Label>
                        <Input id="url" defaultValue={personalInfo.url} placeholder="e.g., https://your-domain.com"/>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>Manage the social media and contact links displayed on your site.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>URL / Href</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {socialLinks.map((link) => (
                                <TableRow key={link.name}>
                                    <TableCell className="font-medium">{link.name}</TableCell>
                                    <TableCell>{link.href}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleActionClick('Edit', link.name)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleActionClick('Delete', link.name)} className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-6">
                        <Button variant="outline" size="sm">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Social Link
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
