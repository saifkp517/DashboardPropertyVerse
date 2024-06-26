
import Image from "next/image"
import PropertyCard from "../PropertyCard";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import axios from "axios";

export default function MyProperties({ sendChangedComponent }: any) {


    const [propDetails, setPropDetails] = useState<any>([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/properties`)
        .then(res => {
            console.log(res.data.properties)
            setPropDetails(res.data.properties)
        })
    }, []);

    return (
        <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Uploaded Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propDetails.map((property: any) => (
                <PropertyCard
                    sendChangedComponent={sendChangedComponent}
                    key={property.id}
                    id={property.id}
                    name={property.building_name}
                    image={property.images[0]}
                    location={property.location}
                    funded={property.funded}
                    invamt={property.minimum_investment}
                    irr={property.irr}
                />
            ))}
        </div>
        {/* Additional details section */}
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Note.</h2>
            <p className="text-lg">Properties listed here will be reviewd and calculated by our brokers for Credit Risk Analysis</p>
            {/* Add more details here as needed */}
        </div>
    </div>


    )
}
