'use client';

import { Button } from "antd";
import Space from "antd/es/space";
import { columns, type Payment } from "./columns";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./DataTable";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"

const ShadCN = () => {
    return (
        <div className="2xl:container w-[80%] mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-4">
                ShadCN UI Components
            </h1>

            <Separator className='my-10' />

            <div>
                <Space>
                    <h4 className='text-lg'>Sidebar -</h4>
                    <Button type="primary" href="/sidebar">
                        Link
                    </Button>
                </Space>
            </div>

            <Separator className='my-10' />

            <Space>
                <h4 className='text-lg'>Sheet -</h4>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button type="primary">Open</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you&apos;re done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-demo-name">Name</Label>
                                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-demo-username">Username</Label>
                                <Input id="sheet-demo-username" defaultValue="@peduarte" />
                            </div>
                        </div>
                        <Separator className='my-6' />
                        <SheetFooter>
                            <Button type="primary">Save changes</Button>
                            <SheetClose asChild>
                                <Button type="primary">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </Space>

            <Separator className='my-10' />

            <div className="container mx-auto">
                <h4 className="text-lg">Data Table</h4>
                <DataTable columns={columns} data={[
                    { id: '1', amount: 100, status: 'success', email: 'user1@example.com' },
                    { id: '2', amount: 50, status: 'pending', email: 'user2@example.com' },
                    { id: '3', amount: 75, status: 'failed', email: 'user3@example.com' },
                ] as Payment[]} />
            </div>

            <Separator className='my-10' />

            <div>
                <Space>
                    <h4 className="text-lg">Pagination -</h4>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </Space>
            </div>
            <Separator className='my-10' />
            <div>
                <Space>
                    <h4 className="text-lg">Popover -</h4>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button type="primary">Open Popover</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64" align="start">
                            <PopoverHeader>
                                <PopoverTitle>Dimensions</PopoverTitle>
                                <PopoverDescription>
                                    Set the dimensions for the layer.
                                </PopoverDescription>
                            </PopoverHeader>
                            <FieldGroup className="gap-4">
                                <Field orientation="horizontal">
                                    <FieldLabel htmlFor="width" className="w-1/2">
                                        Width
                                    </FieldLabel>
                                    <Input id="width" defaultValue="100%" />
                                </Field>
                                <Field orientation="horizontal">
                                    <FieldLabel htmlFor="height" className="w-1/2">
                                        Height
                                    </FieldLabel>
                                    <Input id="height" defaultValue="25px" />
                                </Field>
                            </FieldGroup>
                        </PopoverContent>
                    </Popover>
                </Space>
            </div>

            <Separator className='my-10' />

            <div>
                <div className="flex items-center gap-6">
                    <h4 className="text-lg">Spinner -</h4>
                    <Spinner className="size-3" />
                    <Spinner className="size-4" />
                    <Spinner className="size-6" />
                    <Spinner className="size-8" />
                    <Badge>
                        <Spinner data-icon="inline-start" />
                        Syncing
                    </Badge>
                </div>
            </div>

        </div>
    );
};

export default ShadCN;
