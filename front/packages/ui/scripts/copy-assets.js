const fs = require('fs');
const path = require('path');

// Create icones directory in dist if it doesn't exist
const sourceDir = path.join(__dirname, '../src/icones');
const targetDir = path.join(__dirname, '../dist/icones');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all PNG files
fs.readdirSync(sourceDir).forEach(file => {
  if (file.endsWith('.png')) {
    fs.copyFileSync(
      path.join(sourceDir, file),
      path.join(targetDir, file)
    );
    console.log(`Copied ${file} to dist/icones`);
  }
});
