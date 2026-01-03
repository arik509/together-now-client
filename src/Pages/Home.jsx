import React from 'react';
import Banner from '../Components/Banner';
import FeatureSection from '../Components/FeatureSection';
import GallerySection from '../Components/GallerySection';
import NewsletterSection from '../Components/NewsletterSection';
import StatisticsSection from '../Components/StatisticsSection';
import HowItWorksSection from '../Components/HowItWorksSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StatisticsSection></StatisticsSection>
            <HowItWorksSection></HowItWorksSection>
            <FeatureSection></FeatureSection>
            <GallerySection></GallerySection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;