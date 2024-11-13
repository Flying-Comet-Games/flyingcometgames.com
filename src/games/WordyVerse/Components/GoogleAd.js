import React from 'react'
import { Adsense } from '@ctrl/react-adsense';
// import './css/AdsenseStylesheet.css';

const GoogleAd = ({ slot }) => {
        return (
            <Adsense
                className='adsbygoogle'
                client="ca-pub-1729981660160138"
                slot={slot}
            />
        )

    }

export default GoogleAd;