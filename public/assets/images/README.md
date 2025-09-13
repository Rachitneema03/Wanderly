# Background Images for Wanderly Landing Page

This folder contains the background images used in the landing page's dynamic background effect.

## Required Images

Add the following images to this folder:

1. **paris-eiffel-tower.jpg** - Eiffel Tower view
2. **louvre-museum.jpg** - Louvre Museum exterior
3. **sacre-coeur-basilica.jpg** - Sacré-Cœur Basilica
4. **eiffel-tower-close.jpg** - Eiffel Tower close-up
5. **french-cafe.jpg** - Traditional French café
6. **french-market.jpg** - Local French market
7. **paris-hotel.jpg** - Elegant Paris hotel
8. **mountain-landscape.jpg** - Scenic mountain view

## Image Specifications

- **Format**: JPG or PNG
- **Resolution**: 1920x1080 or higher
- **File Size**: Under 2MB each
- **Quality**: High resolution for web use
- **Aspect Ratio**: 16:9 recommended

## How to Add Images

### Option 1: Download Using Script
1. Navigate to this folder: `cd public/assets/images`
2. Run the download script: `node download-images.js`
3. This will automatically download all images from Unsplash

### Option 2: Manual Download
1. Download images from Unsplash or other sources
2. Rename them to match the required filenames
3. Place them in this folder

### Option 3: Use Your Own Images
1. Replace the URLs in `download-images.js` with your own image URLs
2. Run the script to download your custom images

## Fallback System

The application includes a fallback system that will use the original Unsplash URLs if local images are not found. This ensures the application continues to work even if images are missing.

## Notes

- Images are served from the public folder
- URLs are accessible at `/assets/images/filename.jpg`
- The system gracefully handles missing images
- All images are optimized for web performance
- Images cycle every 4 seconds with smooth transitions
