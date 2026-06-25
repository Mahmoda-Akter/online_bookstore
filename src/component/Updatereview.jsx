"use client"
import React from 'react';
import { Modal, Surface } from "@heroui/react";
import { CiEdit } from "react-icons/ci";
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

const Updatereview = ({review}) => {
    
    const OnSubmitt = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const fromvalue = Object.fromEntries(formdata.entries())

        const form = e.target
        const updateuser = {
            rating: form.rating.value,
            comment: form.comment.value,
        }

        console.log(updateuser, "from updatefunction")
        // const { data: token } = await authClient.token()

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/review/${review._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify(updateuser)
        })
        const data = await res.json()
        // console.log(data)
        if (res.ok) {
            // toast.success("Update data successfully")
            // router.refresh()
            alert("edite success fully")
        }
        else {
            // toast.error("Something went wrong")
            alert("edite wrong")
        }
    }
    return (
        <div>
            <Modal>
                <Button variant="secondary" className={"bg-green-800 text-white"}>
                    <CiEdit /> Update
                </Button>

                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-xl">

                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Heading>Update Review</Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                <Surface variant="default">

                                    <form
                                        onSubmit={OnSubmitt}
                                        className="p-10 space-y-8 w-full bg-slate-100"
                                    >

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                            {/* Rating */}
                                            <div className="md:col-span-2">
                                                <TextField>
                                                    <Label>Review</Label>
                                                    <select
                                                        defaultValue={review?.rating}
                                                        name="rating"
                                                        className="w-full p-3 rounded-2xl border"
                                                    >
                                                        <option value="5">⭐⭐⭐⭐⭐</option>
                                                        <option value="4">⭐⭐⭐⭐</option>
                                                        <option value="3">⭐⭐⭐</option>
                                                        <option value="2">⭐⭐</option>
                                                        <option value="1">⭐</option>
                                                    </select>
                                                    <FieldError />
                                                </TextField>
                                            </div>

                                            {/* Comment */}
                                            <TextField>
                                                <Label>Comment</Label>
                                                <Input
                                                    defaultValue={review?.comment}
                                                    name="comment"
                                                    placeholder="Write your review"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>

                                        </div>

                                        {/* Button */}
                                        <Button
                                            type="submit"
                                            variant="outline"
                                            className="rounded-none w-full bg-cyan-500 text-white"
                                        >
                                            Update Review
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

export default Updatereview;