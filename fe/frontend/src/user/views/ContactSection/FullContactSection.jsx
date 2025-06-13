import React from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactInfo from "./ContactInfo/ContactInfo";
import Map from "./Map/Map";

const FullContactSection = () => (
    <section className="container mx-auto px-2 sm:px-4 md:px-0 py-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-black mb-8">Liên Hệ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
            <ContactForm />
            <ContactInfo />
        </div>
        <Map />
    </section>
);

export default FullContactSection;
