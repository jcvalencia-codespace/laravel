import { Head, Link, usePage } from "@inertiajs/react";
import { type SharedData } from '@/types';
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Product {
    id: number,
    product_name: string,
    product_category: string,
    product_price: number,
    product_description: string,
}

interface PageProp {
    products: Product[]
}

export default function Index() {

    const { auth } = usePage<SharedData>().props;
    const { products } = usePage().props as unknown as PageProp;
    return (
        <AppHeaderLayout breadcrumbs={[{ title: 'Home', href: '/home' }]}>
            <div className="m-4">
                <Head title='Home' />
                <header className="text-4xl">Welcome!</header>
                <p>Hello {auth.user.name}, welcome to your first Inertia app!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 m-4 gap-4">
                {products.map((product) => (
                    <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col rounded-2xl pt-0 overflow-hidden">
                        <div className="absolute inset-0 z-30 aspect-video bg-black/35 rounded-t-2xl" />
                        <img
                            src="https://avatar.vercel.sh/shadcn1"
                            alt="Event cover"
                            className="relative z-20 rounded-t-2xl aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                        />
                        <CardHeader>
                            <CardAction>
                                <Badge variant="default" className="justify-between">Featured</Badge>
                            </CardAction>
                            <CardTitle>{product.product_name}</CardTitle>
                            <CardDescription className="line-clamp-3">
                                {product.product_description}
                            </CardDescription>
                            <CardFooter>₱{product.product_price}.00</CardFooter>
                        </CardHeader>
                        <CardFooter className="mt-auto">
                            <Link href={route('home.viewitem', product.id)}>
                                <Button className="w-full">View Item</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </AppHeaderLayout>
    );
}