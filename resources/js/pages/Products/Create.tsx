import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

export default function Index() {

    const { data, setData, post, processing, errors } = useForm({
        product_name: '',
        product_category: '',
        product_price: '',
        product_description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route('products.store'));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Create a New Product', href: '/products/create'}]}>
            <Head title="Create a New Product" />
            <div className='w-8/12 p-4'>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* Display Error */}

                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className='h-4 w-4'/>
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className='g-1.5'>
                        <Label htmlFor="product name">Name</Label>
                        <Input
                            placeholder='Product Name'
                            value={data.product_name}
                            onChange={(e) => setData("product_name", e.target.value)}>

                        </Input>
                    </div>
                    <div className='g-1.5'>
                        <Label htmlFor="product category">Category</Label>
                        <Input
                            placeholder='Product Category'
                            value={data.product_category}
                            onChange={(e) => setData("product_category", e.target.value)}>

                        </Input>
                    </div>
                    <div className='g-1.5'>
                        <Label htmlFor="product price">Price</Label>
                        <Input
                            placeholder='Product Price'
                            value={data.product_price}
                            onChange={(e) => setData("product_price", e.target.value)}>
                        </Input>
                    </div>
                    <div className='g-1.5'>
                        <Label htmlFor="product description">Description</Label>
                        <Textarea
                            placeholder='Description'
                            value={data.product_description}
                            onChange={(e) => setData("product_description", e.target.value)}>

                        </Textarea>
                    </div>
                    <Button disabled={processing} type="submit">Add Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
