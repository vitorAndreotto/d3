# Shared Assets Package

This package contains shared assets (images and videos) that can be used across all applications in the monorepo.

## Structure

```
assets/
├── images/     # Shared images
└── videos/     # Shared videos
```

## Usage

To use assets in your application:

1. Add the dependency to your app's package.json:
```json
{
  "dependencies": {
    "@repo/assets": "*"
  }
}
```

2. Import assets in your code:
```typescript
// For images
import myImage from "@repo/assets/images/example.png";

// For videos
import myVideo from "@repo/assets/videos/example.mp4";
```

## Guidelines

- Keep assets organized in appropriate subdirectories
- Use meaningful file names
- Optimize images before adding them
- Consider using WebP format for images when possible
- Use compressed video formats (MP4/WebM) for better performance
