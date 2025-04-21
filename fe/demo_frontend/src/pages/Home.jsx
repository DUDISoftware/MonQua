import React from 'react'
import Navbar from '../component/NavBar'; // Make sure the file name and import match
import InBoDy from '../component/InBoDy';
import Footer from '../component/footer';
import BackToTop from '../component/BackToTop';
const Home = () => {
    return (
        <>
            <Navbar />
            <InBoDy />
            <Footer />
            <BackToTop />
        </>

    )
}

export default Home
