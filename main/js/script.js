class AppList {
    constructor(containerId, dataUrl) {
        this.container = document.getElementById(containerId);
        this.dataUrl = dataUrl;
    }

    // Fetch data from the given URL
    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) throw new Error('Failed to fetch data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    // Create an app card
    createAppCard(app) {
        const card = document.createElement('div');
        card.className = 'site-card';

        // Title (App Name)
        const title = document.createElement('h2');
        title.className = 'site-title';
        title.textContent = app.name;
        card.appendChild(title);

        // type---
        const type = document.createElement('i');
        type.textContent = app.type;
        card.appendChild(type);

        // Description
        const description = document.createElement('p');
        description.textContent = `${app.description}`;
        card.appendChild(description);

        // Iframe Wrapper (App Preview)
        const iframeWrapper = document.createElement('div');
        iframeWrapper.className = 'iframe-wrapper';

        const iframe = document.createElement('iframe');
        iframe.src = app.website;
        iframeWrapper.appendChild(iframe);

        const iframeOverlay = document.createElement('div');
        iframeOverlay.className = 'iframe-overlay';

        // Visit Site Button
        const visitButton = document.createElement('button');
        visitButton.className = 'toggle-button';
        visitButton.textContent = 'Visit';
        visitButton.onclick = () => window.open(app.website, '_blank');
        iframeOverlay.appendChild(visitButton);

        if (app.file_url) {
            const downloadButton = document.createElement('button');
            downloadButton.className = 'toggle-button';
            downloadButton.textContent = `Download ${app.size} v${app.version}`;
            downloadButton.onclick = () => window.open(app.website, '_blank');
            iframeOverlay.appendChild(downloadButton);
        } else {
            // Optionally, you can display a message or note if the file_url is not available

        }

        // Share Button
        const shareButton = document.createElement('button');
        shareButton.className = 'toggle-button';
        shareButton.textContent = 'Share';
        shareButton.onclick = () => this.shareApp(app.name, app.website);
        iframeOverlay.appendChild(shareButton);

        iframeWrapper.appendChild(iframeOverlay);
        card.appendChild(iframeWrapper);

        return card;
    }

    // Share app function using Web Share API or fallback to clipboard
    async shareApp(appName, appUrl) {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Check out ${appName}`,
                    text: `I found this app, ${appName}. Here's the link:`,
                    url: appUrl,
                });
                alert('Shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(appUrl);
                alert(`Link copied to clipboard: ${appUrl}`);
            } catch (error) {
                console.error('Error copying to clipboard:', error);
                alert('Failed to copy the link.');
            }
        }
    }

    // Render the fetched data into the container
    async render() {
        const data = await this.fetchData();
        if (data.length === 0) {
            this.container.innerHTML = '<p>No apps available to display.</p>';
            return;
        }

        data.forEach(app => {
            const card = this.createAppCard(app);
            this.container.appendChild(card);
        });
    }
}

// Initialize and render the app list
document.addEventListener('DOMContentLoaded', () => {
    const appList = new AppList('app-container', 'https://rentry.co/maxlab/raw');
    appList.render();
});
