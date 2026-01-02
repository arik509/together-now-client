import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-base-200 py-12">
            <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
                    About <span className="text-green-800">Together Now</span>
                </h1>
                
                <div className="bg-base-100 rounded-lg shadow-lg p-8 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-green-800">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        Together Now is a community-driven platform dedicated to bringing people together 
                        through meaningful events and shared experiences. We believe in the power of connection 
                        and collaboration to create positive change in our communities.
                    </p>
                </div>

                <div className="bg-base-100 rounded-lg shadow-lg p-8 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-green-800">What We Do</h2>
                    <p className="text-lg leading-relaxed mb-4">
                        Our platform makes it easy for organizers to create and manage community events, 
                        while providing participants with a seamless way to discover and join activities 
                        that match their interests.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li>Create and manage community events</li>
                        <li>Connect with like-minded individuals</li>
                        <li>Discover upcoming events in your area</li>
                        <li>Build stronger communities together</li>
                    </ul>
                </div>

                <div className="bg-base-100 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-green-800">Join Us</h2>
                    <p className="text-lg leading-relaxed">
                        Whether you're an event organizer looking to reach more people or someone seeking 
                        to participate in community activities, Together Now is here to help you connect 
                        and engage with your community.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
