
"use client"

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Trash2, Loader2, Save } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getPersonalInfo, getSocialLinks, updatePersonalInfo, updateSocialLinks } from "@/lib/data-actions";
import { useToast } from "@/hooks/use-toast";

type PersonalInfoState = Awaited<ReturnType<typeof getPersonalInfo>> | null;
type SocialLinksState = Awaited<ReturnType<typeof getSocialLinks>> | null;

export default function AdminPersonalInfoPage() {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfoState>(null);
    const [socialLinks, setSocialLinks] = useState<SocialLinksState>(null);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    useEffect(() => {
        getPersonalInfo().then(setPersonalInfo);
        getSocialLinks().then(setSocialLinks);
    }, []);

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!personalInfo) return;
        setPersonalInfo({ ...personalInfo, [e.target.id]: e.target.value });
    };

    const handleSave = () => {
        startTransition(async () => {
            if (personalInfo) {
                const result = await updatePersonalInfo(personalInfo);
                toast({ title: "Update Status", description: result.message });
            }
            if (socialLinks) {
                // In a real app, you would handle social link updates separately
                // For now, we just log it.
                // await updateSocialLinks(socialLinks);
            }
        });
    };

    if (!personalInfo || !socialLinks) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Personal Info</h1>
                <Button onClick={handleSave} disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save All Changes
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Core Information</CardTitle>
                    <CardDescription>This is the main information displayed in the hero section.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" value={personalInfo.jobTitle} onChange={handlePersonalInfoChange} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="tagline">Tagline</Label>
                        <Textarea id="tagline" value={personalInfo.tagline} onChange={handlePersonalInfoChange} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="profileImage">Profile Image URL</Label>
                        <Input id="profileImage" value={personalInfo.profileImage} onChange={handlePersonalInfoChange} placeholder="e.g., /jagdish.png"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="url">Website URL</Label>
                        <Input id="url" value={personalInfo.url} onChange={handlePersonalInfoChange} placeholder="e.g., https://your-domain.com"/>
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
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
