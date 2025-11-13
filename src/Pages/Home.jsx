import React from 'react';
import Banner from '../Components/Banner';
import FeatureSection from '../Components/FeatureSection';
import GallerySection from '../Components/GallerySection';
import NewsletterSection from '../Components/NewsletterSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <GallerySection></GallerySection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;