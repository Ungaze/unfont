document.addEventListener('DOMContentLoaded', function() {
    // Get all control elements
    const fontSizeSlider = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const lineHeightSlider = document.getElementById('lineHeight');
    const lineHeightValue = document.getElementById('lineHeightValue');
    const fontFamilySelect = document.getElementById('fontFamily');
    const screenSizeSelect = document.getElementById('screenSize');
    const customWidthControl = document.getElementById('customWidthControl');
    const customHeightControl = document.getElementById('customHeightControl');
    const customWidthInput = document.getElementById('customWidth');
    const customHeightInput = document.getElementById('customHeight');
    const websitePreview = document.getElementById('websitePreview');
    const resetButton = document.getElementById('resetButton');
    const previewContent = document.getElementById('previewContent');
    const scaleInfo = document.getElementById('scaleInfo');
    const deviceInfo = document.getElementById('deviceInfo');
    const currentFontSize = document.getElementById('currentFontSize');
    const sidebar = document.querySelector('.controls-sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    
    // Get text elements
    const headerText = document.getElementById('headerText');
    const subheaderText = document.getElementById('subheaderText');
    const contentTitle = document.getElementById('contentTitle');
    const contentText = document.getElementById('contentText');
    const secondaryTitle = document.getElementById('secondaryTitle');
    const secondaryText = document.getElementById('secondaryText');
    const footerText = document.getElementById('footerText');
    
    // Screen size presets
    const screenSizes = {
        'old-mobile': { width: 320, height: 480, name: 'Older Phone (320×480)' },
        'mobile': { width: 360, height: 640, name: 'Mobile (360×640)' },
        'large-mobile': { width: 414, height: 896, name: 'Large Mobile (414×896)' },
        'high-res-mobile': { width: 1440, height: 2560, name: 'High-Res Phone (1440×2560)' },
        'small-tablet': { width: 768, height: 1024, name: 'Small Tablet (768×1024)' },
        'tablet': { width: 1024, height: 1366, name: 'Tablet (1024×1366)' },
        'laptop': { width: 1366, height: 768, name: 'Laptop (1366×768)' },
        'desktop': { width: 1920, height: 1080, name: 'Desktop (1920×1080)' },
        'large-desktop': { width: 2560, height: 1440, name: 'Large Desktop (2560×1440)' },
        'ultrawide': { width: 3440, height: 1440, name: 'Ultrawide (3440×1440)' },
        '4k': { width: 3840, height: 2160, name: '4K Display (3840×2160)' },
        'custom': { width: 1200, height: 800, name: 'Custom Size' }
    };
    
    // Store original dimensions
    let originalWidth = 1920;
    let originalHeight = 1080;
    let currentScale = 1;
    
    // Update function
    function updateFontStyles() {
        const fontSize = fontSizeSlider.value + 'px';
        const lineHeight = lineHeightSlider.value;
        const fontFamily = fontFamilySelect.value;
        
        // Update value displays
        fontSizeValue.textContent = fontSize;
        lineHeightValue.textContent = lineHeight;
        currentFontSize.textContent = fontSize;
        
        // Apply base styles to body
        contentText.style.fontSize = fontSize;
        contentText.style.lineHeight = lineHeight;
        contentText.style.fontFamily = fontFamily;
        
        // Apply scaled styles to other elements
        const baseSize = parseInt(fontSize);
        headerText.style.fontSize = (baseSize * 2.5) + 'px';
        subheaderText.style.fontSize = (baseSize * 1.2) + 'px';
        contentTitle.style.fontSize = (baseSize * 1.8) + 'px';
        secondaryTitle.style.fontSize = (baseSize * 1.4) + 'px';
        secondaryText.style.fontSize = (baseSize * 1) + 'px';
        footerText.style.fontSize = (baseSize * 0.9) + 'px';
        
        // Apply common styles
        const textElements = [headerText, subheaderText, contentTitle, contentText, secondaryTitle, secondaryText, footerText];
        textElements.forEach(el => {
            el.style.fontFamily = fontFamily;
        });
        
        // Set line height for all text elements
        contentText.style.lineHeight = lineHeight;
        secondaryText.style.lineHeight = lineHeight;
    }
    
    // Update screen size function
    function updateScreenSize() {
        const screenSize = screenSizeSelect.value;
        const isCustom = screenSize === 'custom';
        
        // Show/hide custom controls
        customWidthControl.style.display = isCustom ? 'block' : 'none';
        customHeightControl.style.display = isCustom ? 'block' : 'none';
        
        // Get dimensions
        if (isCustom) {
            originalWidth = parseInt(customWidthInput.value);
            originalHeight = parseInt(customHeightInput.value);
        } else {
            originalWidth = screenSizes[screenSize].width;
            originalHeight = screenSizes[screenSize].height;
        }
        
        // Update website preview
        websitePreview.style.width = originalWidth + 'px';
        websitePreview.style.height = originalHeight + 'px';
        
        // Update device info
        deviceInfo.textContent = screenSizes[screenSize].name;
        
        // Scale the preview to fit
        scalePreview();
    }
    
    // Scale the preview to fit the container
    function scalePreview() {
        const containerWidth = previewContent.clientWidth;
        const containerHeight = previewContent.clientHeight;
        
        // Calculate scale to fit
        const scaleX = containerWidth / originalWidth;
        const scaleY = containerHeight / originalHeight;
        currentScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
        
        // Apply scaling
        websitePreview.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
        
        // Update scale info
        scaleInfo.textContent = `${Math.round(currentScale * 100)}%`;
    }
    
    // Reset all settings
    resetButton.addEventListener('click', function() {
        fontSizeSlider.value = 16;
        lineHeightSlider.value = 1.5;
        fontFamilySelect.value = "system-ui, -apple-system, sans-serif";
        screenSizeSelect.value = "desktop";
        customWidthInput.value = 1200;
        customHeightInput.value = 800;
        
        updateFontStyles();
        updateScreenSize();
    });

    // Toggle sidebar
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        setTimeout(scalePreview, 300); // Wait for transition to finish
    });
    
    // Add event listeners to all controls
    fontSizeSlider.addEventListener('input', updateFontStyles);
    lineHeightSlider.addEventListener('input', updateFontStyles);
    fontFamilySelect.addEventListener('change', updateFontStyles);
    screenSizeSelect.addEventListener('change', updateScreenSize);
    customWidthInput.addEventListener('input', updateScreenSize);
    customHeightInput.addEventListener('input', updateScreenSize);
    
    // Handle window resize
    window.addEventListener('resize', scalePreview);
    
    // Initialize
    updateFontStyles();
    updateScreenSize();
});