"use client";

export default function InvoicePage({ params }) {
  const { id } = params;

  return (
    <>
      <h1>Hello, Invoice ID: {id}</h1>
    </>
  );
}
