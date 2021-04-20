import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faTwitter, faWhatsapp, faLinkedinIn, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';

export default (props)=>{
    let divStyle={
        margin: '0 auto',
        textAlign:'center',
        ...props.style
    }

    let socialIconsStyle={
        margin: '0px 15px'
    }

    return(
        <div
            style={divStyle}
        >
            {
                props.facebook &&
                    <a
                        href={`http://www.fb.com/${props.facebook}`}
                    >
                        <FontAwesomeIcon
                            icon={faFacebook}
                            size='2x'
                            style={socialIconsStyle}
                        />
                    </a>
            }
            
            {
                props.twitter &&
                    <a
                        href={`http://www.twitter.com/${props.twitter}`}
                    >
                        <FontAwesomeIcon
                            icon={faTwitter}
                            size='2x'
                            style={socialIconsStyle}
                        />
                    </a>
            }

            {
                props.instagram &&
                    <a
                        href={`http://www.instagram.com/${props.instagram}`}
                    >
                        <FontAwesomeIcon
                            icon={faInstagram}
                            size='2x'
                            style={socialIconsStyle}
                        />
                    </a>
            }

            {
                props.youTube &&
                    <a
                      href={`http://www.youtube.com/${props.youTube}`}
                    >
                        <FontAwesomeIcon
                            icon={faYoutube}
                            size='2x'
                            style={socialIconsStyle}
                        />
                    </a>
            }

            {
                props.whatsApp &&
                    <a
                        href={`http://www.whatsapp.com/${props.whatsApp}`}
                    >
                        <FontAwesomeIcon
                            icon={faWhatsapp}
                            size='2x'
                            style={socialIconsStyle}
                        />
                    </a>
            }

            {
                props.linkedIn &&
                    <a
                        href={`http://www.linkedin.com/${props.linkedIn}`}
                    >
                        <FontAwesomeIcon
                            icon={faLinkedinIn}
                            size='2x'
                            style={socialIconsStyle}
                        />
                    </a>
            }
        </div>
    )
}