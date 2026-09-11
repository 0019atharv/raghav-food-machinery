const path = require('path');
const { Client } = require(path.join(__dirname, '..', 'server', 'node_modules', 'ssh2'));

const VM_CONFIG = {
  host: '70.153.151.62',
  port: 22,
  username: 'azureuser',
  password: 'RaghavFood@2026!',
  readyTimeout: 40000
};

const newEnv = `PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://127.0.0.1:27017/raghav_food_machinery
JWT_SECRET=rfpm_super_secure_jwt_token_2026_raghav_food_machinery
CLIENT_URL=https://raghavfoodprocessingmachines.com,https://www.raghavfoodprocessingmachines.com,http://70.153.151.62
USE_CLOUDINARY=true
CLOUDINARY_CLOUD_NAME=vgmmtb5k
CLOUDINARY_API_KEY=919773624795616
CLOUDINARY_API_SECRET=rPo72E7Jjf_NE_tOV8N80gy3S4c
`;

async function main() {
  console.log('Connecting to Azure VM...');
  const conn = new Client();
  await new Promise((resolve, reject) => {
    conn.on('ready', resolve).on('error', reject).connect(VM_CONFIG);
  });

  console.log('Connected. Writing .env file...');
  const b64 = Buffer.from(newEnv).toString('base64');
  const cmd = `echo "${VM_CONFIG.password}" | sudo -S bash -c "echo '${b64}' | base64 -d > /var/www/rfpm/app/server/.env"`;
  
  await new Promise((resolve, reject) => {
    conn.exec(cmd, { pty: true }, (err, stream) => {
      if (err) return reject(err);
      stream.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error('Failed with code ' + code));
      });
      stream.on('data', (d) => process.stdout.write(d));
      stream.stderr.on('data', (d) => process.stderr.write(d));
    });
  });

  console.log('✅ Remote .env updated successfully.');
  
  console.log('Reloading PM2 backend on VM (with --update-env)...');
  await new Promise((resolve, reject) => {
    conn.exec(`echo "${VM_CONFIG.password}" | sudo -S pm2 reload rfpm-backend --update-env || echo "${VM_CONFIG.password}" | sudo -S pm2 restart rfpm-backend --update-env`, { pty: true }, (err, stream) => {
      if (err) return reject(err);
      stream.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error('PM2 reload failed with code ' + code));
      });
      stream.on('data', (d) => process.stdout.write(d));
      stream.stderr.on('data', (d) => process.stderr.write(d));
    });
  });
  console.log('✅ PM2 reloaded.');
  conn.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

