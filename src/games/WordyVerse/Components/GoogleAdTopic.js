import React from 'react'
import { Adsense } from '@ctrl/react-adsense';

const GoogleAdTopic = () => {
        return (
            <Adsense
                className='adsbygoogle'
                client="ca-pub-1729981660160138"
                slot="7421222880"
                format="fluid"
                layoutKey='-ge+5+1+2-3'
                style={{
                    width: "100%",
                    overflowX: "hidden",
                    maxHeight: "350px",
                    display: "block"
                }}
            />
        )

    }

export default GoogleAdTopic;