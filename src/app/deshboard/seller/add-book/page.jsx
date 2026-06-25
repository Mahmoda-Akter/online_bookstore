
"use client";

import React, { useState } from "react";
import {
    TextField,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
    Button,
    TextArea,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const AddBookPage = () => {
    const { data: session } = authClient.useSession();

    const user = session?.user;

    

    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];

        if (!image) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("image", image);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (data.success) {
                setImageUrl(data.data.display_url);
            }
        } catch (error) {
            console.log(error);
            alert("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const OnSubmitt = async (e) => {
        e.preventDefault();

         

        if (!imageUrl) {
            return alert("Please upload a book cover image first");
        }

        const formData = new FormData(e.currentTarget);

        const bookData = Object.fromEntries(formData.entries());

        const newBook = {
            ...bookData,
            imageUrl,
            sellerId: user?.id,
            sellerName: user?.name,
            sellerEmail: user?.email,
            status: "Pending Approval",
            createdAt: new Date(),
        };

        console.log(newBook);
        const {data:tokendata}=await authClient.token()

        // Later API Call
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/seller/books`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization:`Bearer ${tokendata?.token}`
                    },
                    body: JSON.stringify(newBook),
                }
            );

            const data = await res.json();
            console.log(newBook)
            console.log(tokendata)

            console.log(data);

            if (res.ok) {
                alert('Company added successfully');
                redirect('/')
            }
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    };

    return (
        <div className="w-full p-3 sm:p-4 md:p-6 flex justify-center">
            <form
                onSubmit={OnSubmitt}
                className="
          w-full
          max-w-5xl
          mx-auto
          bg-white
          border
          shadow-lg
          rounded-2xl
          p-4
          sm:p-6
          md:p-8
          lg:p-10
          space-y-8
        "
            >
                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Add New Book
                    </h1>

                    <p className="text-default-500 mt-2">
                        Submit your book for admin approval
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Book Title */}
                    <div className="md:col-span-2">
                        <TextField name="title" isRequired>
                            <Label>Book Title</Label>

                            <Input
                                placeholder="Atomic Habits"
                                className="rounded-xl"
                            />

                            <FieldError />
                        </TextField>
                    </div>

                    {/* Author */}
                    <TextField name="author" isRequired>
                        <Label>Author Name</Label>

                        <Input
                            placeholder="James Clear"
                            className="rounded-xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Category */}
                    <div>
                        <Select
                            name="category"
                            isRequired
                            className="w-full"
                            placeholder="Select Category"
                        >
                            <Label>Category</Label>

                            <Select.Trigger className="rounded-xl">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>

                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="Fiction">
                                        Fiction
                                    </ListBox.Item>

                                    <ListBox.Item id="Non-Fiction">
                                        Non-Fiction
                                    </ListBox.Item>

                                    <ListBox.Item id="Science">
                                        Science
                                    </ListBox.Item>

                                    <ListBox.Item id="History">
                                        History
                                    </ListBox.Item>

                                    <ListBox.Item id="Biography">
                                        Biography
                                    </ListBox.Item>

                                    <ListBox.Item id="Self Help">
                                        Self Help
                                    </ListBox.Item>

                                    <ListBox.Item id="Technology">
                                        Technology
                                    </ListBox.Item>

                                    <ListBox.Item id="Business">
                                        Business
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Delivery Fee */}
                    <TextField
                        name="deliveryFee"
                        type="number"
                        isRequired
                    >
                        <Label>Delivery Fee</Label>

                        <Input
                            type="number"
                            placeholder="50"
                            className="rounded-xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Publisher */}
                    <TextField name="publisher">
                        <Label>Publisher</Label>

                        <Input
                            placeholder="Penguin Books"
                            className="rounded-xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Publication Year */}
                    <TextField
                        name="publicationYear"
                        type="number"
                    >
                        <Label>Publication Year</Label>

                        <Input
                            type="number"
                            placeholder="2024"
                            className="rounded-xl"
                        />

                        <FieldError />
                    </TextField>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-sm font-medium">
                            Book Cover Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required
                            className="file-input file-input-bordered w-full"
                        />

                        {uploading && (
                            <p className="mt-2 text-cyan-500">
                                Uploading image...
                            </p>
                        )}

                        {imageUrl && (
                            <div className="mt-4">
                                <img
                                    src={imageUrl}
                                    alt="Book Cover"
                                    className="
                    w-24
                    h-32
                    md:w-32
                    md:h-40
                    object-cover
                    rounded-xl
                    border
                    shadow
                  "
                                />
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <TextField name="description" isRequired>
                            <Label>Book Description</Label>

                            <TextArea
                                placeholder="Write details about the book..."
                                className="rounded-xl"
                            />

                            <FieldError />
                        </TextField>
                    </div>
                </div>

                <Button
                    type="submit"
                    isDisabled={uploading}
                    className="
            w-full
            h-12
            rounded-xl
            bg-cyan-600
            text-white
            font-semibold
          "
                >
                    {uploading
                        ? "Uploading Image..."
                        : "Submit For Approval"}
                </Button>
            </form>
        </div>
    );
};

export default AddBookPage;

