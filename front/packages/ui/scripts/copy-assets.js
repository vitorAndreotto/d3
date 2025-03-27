const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/assets');
const destDir = path.join(__dirname, '../dist/assets');

function copyDirectory(src, dest) {
  // Cria o diretório de destino se não existir
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Lê todos os arquivos do diretório
  const files = fs.readdirSync(src);

  // Copia cada arquivo
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    // Se for um diretório, copia recursivamente
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} to ${path.relative(destDir, destPath)}`);
    }
  });
}

// Inicia a cópia
if (fs.existsSync(srcDir)) {
  copyDirectory(srcDir, destDir);
} else {
  console.log('Source directory does not exist:', srcDir);
}
