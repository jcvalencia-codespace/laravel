import { Head, useForm } from "@inertiajs/react";
import AppHeaderLayout from "@/layouts/app/app-header-layout";

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import React from "react";

interface Product {
    id: number,
    product_name: string,
    product_category: string,
    product_price: number,
    product_description: string,
}

interface Props {
    product: Product
}

export default function Index({ product }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        product_name: product.product_name,
        product_category: product.product_category,
        product_price: product.product_price,
        product_description: product.product_description,
    });

    const [api, setApi] = React.useState<CarouselApi>()
    return (
        <AppHeaderLayout breadcrumbs={[{ title: 'Home', href: `/home/${product.id}` }]}>
            <Head title={data.product_name} />
            <div className="m-10 grid grid-cols-2 gap-6">
                <Carousel setApi={setApi} className="w-full ">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <Card className="m-px">
                                    <CardContent className="flex aspect-video items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className='m-10'>
                    <div className="flex items-center justify-between">
                        <header className="text-2xl">{data.product_name}</header>
                        <span>₱{data.product_price}.00</span>
                    </div>
                    <div className='mt-10'>
                        <p>{data.product_description}</p>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}