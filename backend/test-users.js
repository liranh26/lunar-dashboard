const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  console.log('✅ JSON is valid');
  console.log('📊 User count:', data.length);
  console.log('👤 First user:', data[0]?.name);
  console.log('👤 Last user:', data[data.length - 1]?.name);
} catch (error) {
  console.error('❌ JSON Error:', error.message);
}
