
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/lib/portfolio-data";
import { PlusCircle, Trash2, X } from "lucide-react";

export default function AdminSkillsPage() {
    const { skills: skillData } = portfolioData;

    const handleAction = (message: string) => {
        alert(message);
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Skills DNA</h1>
                <Button onClick={() => handleAction('Save All Changes clicked!')}>Save All Changes</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                    <CardDescription>Create a new category to group your skills.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Input placeholder="Category Title (e.g., 'Databases')" />
                    <Button onClick={() => handleAction('Add New Category clicked!')}>
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
                                    <Button variant="ghost" size="icon" onClick={() => handleAction(`Delete category: ${category.title}`)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                                <AccordionContent className="pt-6">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {category.skills.map((skill) => (
                                            <Badge key={skill.name} variant="secondary" className="text-sm">
                                                {skill.name}
                                                <button onClick={() => handleAction(`Remove skill: ${skill.name}`)} className="ml-2 rounded-full p-0.5 hover:bg-destructive/50">
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input placeholder="New skill name..." />
                                        <Button variant="outline" size="sm" onClick={() => handleAction(`Add skill to ${category.title}`)}>
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
