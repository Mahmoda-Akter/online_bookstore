'use client'
import React from 'react';
import { CiEdit } from "react-icons/ci";

import { Modal, Surface } from "@heroui/react";
import {
    TextField,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
    Button,
    TextArea

} from "@heroui/react"

const Editebook = ({ book }) => {
    console.log(book.title, "from edite page")

    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const updatedData = {
            title: form.get("title") || book.title,
            author: form.get("author") || book.author,
            category: form.get("category") || book.category,
            deliveryFee: form.get("deliveryFee") || book.deliveryFee,
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/books/${book._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            }
        );

        if (res.ok) {
            alert("Updated successfully");
            window.location.reload();
        }
    };
    return (
        <div>
            <Modal>
                <Button variant="secondary" className="bg-green-800 text-white">
                    <CiEdit /> Update
                </Button>

                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-xl">

                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Heading>Update Book</Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="p-6">

                                <Surface variant="default">

                                    <form onSubmit={handleUpdate} className="p-6 space-y-6 w-full bg-slate-100">

                                        <TextField>
                                            <Label>Title</Label>
                                            <Input name="title" defaultValue={book?.title} />
                                        </TextField>

                                        <TextField>
                                            <Label>Author</Label>
                                            <Input name="author" defaultValue={book?.author} />
                                        </TextField>

                                        <TextField>
                                            <Label>Category</Label>
                                            <Input name="category" defaultValue={book?.category} />
                                        </TextField>

                                        <TextField>
                                            <Label>Delivery Fee</Label>
                                            <Input name="deliveryFee" defaultValue={book?.deliveryFee} />
                                        </TextField>

                                        <Button type="submit" className="w-full bg-cyan-500 text-white">
                                            Save
                                        </Button>

                                    </form>

                                </Surface>

                            </Modal.Body>

                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default Editebook;