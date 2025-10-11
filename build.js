// Script de build pour Vercel
const { exec } = require('child_process');
const path = require('path');

async function build() {
  console.log('🚀 Building for Vercel...');
  
  try {
    // Build du frontend
    console.log('📦 Building frontend...');
    await execPromise('cd frontend && yarn build');
    
    console.log('✅ Build completed successfully!');
    console.log('📁 Output directory: frontend/build');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      console.log(stdout);
      if (stderr) console.error(stderr);
      resolve(stdout);
    });
  });
}

build();