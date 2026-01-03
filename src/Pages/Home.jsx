import React from 'react';
import Banner from '../Components/Banner';
import FeatureSection from '../Components/FeatureSection';
import GallerySection from '../Components/GallerySection';
import NewsletterSection from '../Components/NewsletterSection';
import StatisticsSection from '../Components/StatisticsSection';
import HowItWorksSection from '../Components/HowItWorksSection';
import EventCategoriesSection from '../Components/EventCategoriesSection';
import TestimonialsSection from '../Components/TestimonialsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StatisticsSection></StatisticsSection>
            <HowItWorksSection></HowItWorksSection>
            <EventCategoriesSection></EventCategoriesSection>
            <FeatureSection></FeatureSection>
            <GallerySection></GallerySection>
            <TestimonialsSection></TestimonialsSection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;