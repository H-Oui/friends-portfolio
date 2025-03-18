import React from 'react';

const LegalMentions = () => {
    const today = new Date().toLocaleDateString();

    return (
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px', fontSize: '12px' }}>
            <h1>Legal Mentions</h1>
            <h2>1. General Information</h2>
            <p>
                This website is a personal project created by Ashwi DIPEN as part of an interactive project based on the TV series Friends.
            </p>

            <h2>2. Intellectual Property</h2>
            <p>
                Images, GIFs, and sounds: All images, GIFs, and sound excerpts on this site are from the TV series Friends, produced by Warner Bros. Television.
            </p>
            <p>
                Quotes: The citations and dialogues used come directly from the TV series Friends.
            </p>
            <p>
                Copyright: Friends is a registered trademark of Warner Bros. Entertainment Inc. This site has no official affiliation with Warner Bros. and is a non-commercial fan-made tribute project.
            </p>

            <h2>3. Website Author</h2>
            <p>
                Name: Ashwi DIPEN
            </p>
            <p>
                Contact Email: ashwidipen@gmail.com
            </p>
            <p>
                Hosting: Vercel
            </p>

            <h2>4. Liability</h2>
            <p>
                This website is a personal, non-profit project with no commercial purpose. It is intended as an interactive experience for Friends fans.
            </p>

            <h2>5. Access to the Site</h2>
            <p>
                The website is accessible free of charge, subject to availability.
            </p>

            <h2>6. Contact</h2>
            <p>
                For any requests to delete content or questions about the project, you can contact me at the email mentioned above.
            </p>

            <p>Last updated: 18/03/2025</p>
        </div>
    );
};

export default LegalMentions;
