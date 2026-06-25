"use client"
import React from 'react';
import { AlertDialog, Button } from "@heroui/react";


const Deletereviews = ({review}) => {
     const handeldeletebtn = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/review/${review._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            // body: JSON.stringify(appoinment)
        })
        const data = await res.json()
        console.log(data)
    }
    return (
        <div>
            <AlertDialog>
                <Button variant="danger">
                    Delete Review
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">

                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                    Delete review permanently?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete your review and it cannot be undone.
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>

                                <Button
                                    slot="close"
                                    variant="danger"
                                    onClick={handeldeletebtn}
                                >
                                    Delete
                                </Button>
                            </AlertDialog.Footer>

                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default Deletereviews;