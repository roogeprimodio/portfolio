
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { portfolioData } from "@/lib/portfolio-data";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminAboutPage() {
    const { about } = portfolioData;

    const handleActionClick = (action: string, item: string) => {
        alert(`${action} clicked for: ${item}`);
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">About Page Content</h1>
                <Button onClick={() => alert('Save All Changes clicked!')}>Save All Changes</Button>
            </div>

            <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="summary">Summary & Contact</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="mt-6">
                    <div className="grid gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Self-Summary</CardTitle>
                                <CardDescription>A brief paragraph about yourself.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Textarea defaultValue={about.summary} rows={5} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" defaultValue={about.contactInfo.address} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue={about.contactInfo.email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" type="tel" defaultValue={about.contactInfo.phone} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                
                <TabsContent value="experience" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Experience Log</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {about.experience.map((item) => (
                                        <TableRow key={item.role}>
                                            <TableCell className="font-medium">{item.role}</TableCell>
                                            <TableCell>{item.company}</TableCell>
                                            <TableCell>{item.duration}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleActionClick('Edit', item.role)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleActionClick('Delete', item.role)} className="text-destructive">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-6">
                                <Button variant="outline" size="sm"><PlusCircle className="h-4 w-4 mr-2" /> Add Experience</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="education" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Education Archive</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Degree</TableHead>
                                        <TableHead>Institution</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {about.education.map((item) => (
                                        <TableRow key={item.degree}>
                                            <TableCell className="font-medium">{item.degree}</TableCell>
                                            <TableCell>{item.institution}</TableCell>
                                            <TableCell>{item.duration}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleActionClick('Edit', item.degree)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleActionClick('Delete', item.degree)} className="text-destructive">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-6">
                                <Button variant="outline" size="sm"><PlusCircle className="h-4 w-4 mr-2" /> Add Education</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
