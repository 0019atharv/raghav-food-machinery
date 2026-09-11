const { execSync } = require('child_process');
const path = require('path');
const { Client } = require(path.join(__dirname, '..', 'server', 'node_modules', 'ssh2'));

const VM_CONFIG = {
  host: '70.153.151.62',
  port: 22,
  username: 'azureuser',
  password: 'RaghavFood@2026!',
  readyTimeout: 40000,
  keepaliveInterval: 10000
};

const GIT_EXE = 'C:\\Users\\dhakr\\AppData\\Local\\Programs\\PortableGit\\cmd\\git.exe';
const ROOT_DIR = path.resolve(__dirname, '..');

async function runDeploy() {
  console.log('\n==================================================');
  console.log('🚀 Starting 1-Click Deployment to Azure Production');
  console.log('==================================================\n');

  // 1. Check for uncommitted changes
  try {
    const status = execSync(`"${GIT_EXE}" status --porcelain`, { cwd: ROOT_DIR }).toString().trim();
    if (status) {
      console.log('📦 Staging local changes and committing...');
      execSync(`"${GIT_EXE}" add .`, { cwd: ROOT_DIR, stdio: 'inherit' });
      const customMsg = process.argv[2];
      const commitMsg = customMsg || `Platform update - ${new Date().toLocaleString()}`;
      execSync(`"${GIT_EXE}" commit -m "${commitMsg}"`, { cwd: ROOT_DIR, stdio: 'inherit' });
      console.log('✅ Committed:', commitMsg);
    } else {
      console.log('✅ Local files are clean, nothing new to commit.');
    }
  } catch (e) {
    console.log('Git note:', e.message);
  }

  // 2. Push to GitHub
  console.log('\n📤 Pushing latest code to GitHub (main)...');
  try {
    execSync(`"${GIT_EXE}" push origin main`, { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log('✅ Pushed to GitHub successfully!');
  } catch (e) {
    console.error('❌ Failed to push to GitHub:', e.message);
    return;
  }

  // 3. Connect to Azure VM via SSH
  console.log('\n☁️  Connecting to Azure VM (' + VM_CONFIG.host + ')...');
  const conn = new Client();
  await new Promise((resolve, reject) => {
    conn.on('ready', resolve).on('error', reject).connect(VM_CONFIG);
  });
  console.log('✅ Connected to Azure VM!');

  // 4. Run update commands on the VM
  console.log('\n⚡ Pulling code, rebuilding frontend & reloading services on VM...\n');
  const remoteScript = `
    set -e
    cd /var/www/rfpm/app
    git pull origin main
    
    # Update backend
    cd /var/www/rfpm/app/server
    npm install --omit=dev
    pm2 reload rfpm-backend --update-env || pm2 restart rfpm-backend --update-env
    
    # Rebuild frontend
    cd /var/www/rfpm/app/client
    npm install
    export VITE_API_URL=https://raghavfoodprocessingmachines.com
    npm run build
    
    # Reload Nginx
    sudo systemctl reload nginx
  `;

  await new Promise((resolve, reject) => {
    conn.exec(`echo "${VM_CONFIG.password}" | sudo -S bash -c '${remoteScript}'`, { pty: true }, (err, stream) => {
      if (err) return reject(err);
      stream.on('close', (code) => {
        conn.end();
        if (code === 0) resolve();
        else reject(new Error('Remote update exited with code ' + code));
      }).on('data', (d) => process.stdout.write(d))
        .stderr.on('data', (d) => process.stderr.write(d));
    });
  });

  console.log('\n==================================================');
  console.log('🎉 DEPLOYMENT COMPLETE! Your changes are LIVE at:');
  console.log('👉 https://raghavfoodprocessingmachines.com');
  console.log('==================================================\n');
}

runDeploy().catch((err) => {
  console.error('\n❌ Deployment failed:', err.message);
  process.exit(1);
});

