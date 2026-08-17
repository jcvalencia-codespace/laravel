import AppLayout from '@/layouts/app-layout';
import { Button } from '../../components/ui/button';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, CirclePlus, SquarePen, Trash } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from 'react';

interface Product {
    id: number,
    product_name: string,
    product_category: string,
    product_price: number,
    product_description: string,
}

interface PageProp {
    flash: {
        message?: string;
    }
    products: Product[]
}

export default function Index() {

    const { products, flash } = usePage().props as unknown as PageProp;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, product_name: string) => {
        if (confirm(`Do you want to delete - ${id} : ${product_name} `)) {
            destroy(route('products.destroy', id));
        }
    }

    const [showFlash, setShowFlash] = useState(!!flash.message);

    useEffect(() => {
        if (flash.message) {
            setShowFlash(true);
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash.message]);

    return (
        <AppLayout breadcrumbs={[{ title: 'Products', href: '/products' }]}>
            <Head title="Products" />
            <div className='m-4 flex items-center justify-between'>
                <header className='text-4xl'>Overview of all the Products</header>
                <span>
                    <Link href={route('products.create')}>
                        <Button className='bg-blue-400 hover:bg-blue-500'><CirclePlus />Create a Product</Button>
                    </Link>
                </span>
            </div>
            <p className='ml-4'>Review and manage all the products</p>
            <div className='m-4'>
                {showFlash && flash.message && (
                    <Alert>
                        <Bell className='h-4 w-4' />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            {products.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.product_name}</TableCell>
                                    <TableCell>{product.product_category}</TableCell>
                                    <TableCell>{product.product_price}</TableCell>
                                    <TableCell className="text-left">{product.product_description}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('products.edit', product.id)}>
                                            <Button disabled={processing} className='bg-slate-600 hover:bg-slate-800'>
                                                <SquarePen />
                                            </Button>
                                        </Link>
                                        <Button disabled={processing} onClick={() => handleDelete(product.id, product.product_name)} className='bg-red-500 hover:bg-red-700'>
                                            <Trash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
