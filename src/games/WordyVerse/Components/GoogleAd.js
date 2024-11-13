import React from 'react'
import { Adsense } from '@ctrl/react-adsense';
// import './css/AdsenseStylesheet.css';

const GoogleAd = ({ slot }) => {
        //console.log("Ads Shown")
        return (
            <Adsense
                className='adsbygoogle'
                client="ca-pub-1729981660160138"
                slot={slot}
            />
        )

    }

export default GoogleAd;

// const GoogleAd = ({ slot }) => {
//   useEffect(() => {
//     try {
//       // Add the AdSense script if it hasn't been added yet
//       if (!(window.adsbygoogle || []).push) {
//         const script = document.createElement('script');
//         script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1729981660160138';
//         script.async = true;
//         script.crossOrigin = 'anonymous';
//         document.head.appendChild(script);
//       }

//       // Push the ad
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (error) {
//       console.error('Error loading AdSense:', error);
//     }
//   }, []);

//   return (
//     <ins
//       className="adsbygoogle"
//       style={{ display: 'block', textAlign: 'center' }}
//       data-ad-client="ca-pub-1729981660160138"
//       data-ad-slot={slot}
//       data-ad-format="auto"
//       data-full-width-responsive="true"
//     />
//   );
// };

