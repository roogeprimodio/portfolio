
"use client"

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, X, Loader2, Save } from "lucide-react";
import { getSkills, updateSkills } from "@/lib/data-actions";
import { useToast } from "@/hooks/use-toast";

type SkillsState = Awaited<ReturnType<typeof getSkills>> | null;

export default function AdminSkillsPage() {
    const [skillData, setSkillData] = useState<SkillsState>(null);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    useEffect(() => {
        getSkills().then(setSkillData);
    }, []);

    const handleSave = () => {
        startTransition(async () => {
            if (skillData) {
                const result = await updateSkills(skillData);
                toast({ title: "Update Status", description: result.message });
            }
        });
    };

    if (!skillData) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Skills DNA</h1>
                <Button onClick={handleSave} disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save All Changes
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                    <CardDescription>Create a new category to group your skills.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Input placeholder="Category Title (e.g., 'Databases')" />
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Category
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Manage Skill Categories</CardTitle>
                    <CardDescription>Update your existing skills below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" className="w-full space-y-4">
                        {skillData.map((category) => (
                            <AccordionItem value={category.title} key={category.title} className="border rounded-lg p-4 bg-background">
                                <div className="flex justify-between items-center">
                                    <AccordionTrigger className="flex-1 text-lg py-0">{category.title}</AccordionTrigger>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                                <AccordionContent className="pt-6">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {category.skills.map((skill) => (
                                            <Badge key={skill.name} variant="secondary" className="text-sm">
                                                {skill.name}
                                                <button className="ml-2 rounded-full p-0.5 hover:bg-destructive/50">
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input placeholder="New skill name..." />
                                        <Button variant="outline" size="sm">
                                            <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
