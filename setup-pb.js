// Run: node setup-pb.js <admin-email> <admin-password>
// Example: node setup-pb.js admin@admin.com Admin123456

const PB_URL = 'https://web-linkcenter.chhindustry.com';
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log('Usage: node setup-pb.js <admin-email> <admin-password>');
  console.log('Example: node setup-pb.js admin@admin.com Admin123456');
  process.exit(1);
}

async function main() {
  // 1. Authenticate as superuser
  console.log('Authenticating...');
  const authRes = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: email, password }),
  });
  if (!authRes.ok) {
    console.error('Auth failed:', await authRes.text());
    process.exit(1);
  }
  const { token } = await authRes.json();
  console.log('Authenticated!');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token,
  };

  // 2. Create "pages" collection
  console.log('Creating "pages" collection...');
  const pagesRes = await fetch(`${PB_URL}/api/collections`, {
    method: 'POST', headers,
    body: JSON.stringify({
      name: 'pages',
      type: 'base',
      listRule: '',    // public read
      viewRule: '',    // public read
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id = user.id',
      deleteRule: '@request.auth.id = user.id',
      fields: [
        { name: 'user', type: 'relation', required: true, options: { collectionId: '_pb_users_auth_', maxSelect: 1 } },
        { name: 'displayName', type: 'text', options: { maxLength: 100 } },
        { name: 'bio', type: 'text', options: { maxLength: 500 } },
        { name: 'avatar', type: 'file', options: { maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] } },
        { name: 'selectedTheme', type: 'text', options: { maxLength: 50 } },
        { name: 'selectedButton', type: 'text', options: { maxLength: 50 } },
        { name: 'selectedFont', type: 'text', options: { maxLength: 50 } },
        { name: 'customTextColor', type: 'text', options: { maxLength: 20 } },
        { name: 'customBgColor', type: 'text', options: { maxLength: 20 } },
        { name: 'customBgSecondary', type: 'text', options: { maxLength: 20 } },
        { name: 'selectedPattern', type: 'text', options: { maxLength: 50 } },
        { name: 'selectedPatternAnim', type: 'text', options: { maxLength: 50 } },
        { name: 'patternGlow', type: 'bool' },
        { name: 'buttonAnimation', type: 'bool' },
        { name: 'activeSocials', type: 'json' },
        { name: 'socialUrls', type: 'json' },
      ],
    }),
  });
  if (pagesRes.ok) {
    console.log('"pages" created!');
  } else {
    const err = await pagesRes.text();
    if (err.includes('already exists')) console.log('"pages" already exists, skipping.');
    else { console.error('Failed:', err); process.exit(1); }
  }

  // Get pages collection ID for relations
  const pagesColRes = await fetch(`${PB_URL}/api/collections/pages`, { headers });
  const pagesCol = await pagesColRes.json();
  const pagesColId = pagesCol.id;

  // 3. Create "links" collection
  console.log('Creating "links" collection...');
  const linksRes = await fetch(`${PB_URL}/api/collections`, {
    method: 'POST', headers,
    body: JSON.stringify({
      name: 'links',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
      fields: [
        { name: 'page', type: 'relation', required: true, options: { collectionId: pagesColId, maxSelect: 1 } },
        { name: 'title', type: 'text', options: { maxLength: 200 } },
        { name: 'url', type: 'text', options: { maxLength: 500 } },
        { name: 'enabled', type: 'bool' },
        { name: 'order', type: 'number' },
        { name: 'color', type: 'text', options: { maxLength: 20 } },
        { name: 'thumbnail', type: 'file', options: { maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] } },
        { name: 'clicks', type: 'number' },
      ],
    }),
  });
  if (linksRes.ok) {
    console.log('"links" created!');
  } else {
    const err = await linksRes.text();
    if (err.includes('already exists')) console.log('"links" already exists, skipping.');
    else { console.error('Failed:', err); process.exit(1); }
  }

  // 4. Create "analytics" collection
  console.log('Creating "analytics" collection...');
  const analyticsRes = await fetch(`${PB_URL}/api/collections`, {
    method: 'POST', headers,
    body: JSON.stringify({
      name: 'analytics',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',  // public (anyone can track views/clicks)
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
      fields: [
        { name: 'page', type: 'relation', required: true, options: { collectionId: pagesColId, maxSelect: 1 } },
        { name: 'type', type: 'text', options: { maxLength: 20 } },
        { name: 'linkId', type: 'text', options: { maxLength: 50 } },
        { name: 'linkTitle', type: 'text', options: { maxLength: 200 } },
        { name: 'linkUrl', type: 'text', options: { maxLength: 500 } },
      ],
    }),
  });
  if (analyticsRes.ok) {
    console.log('"analytics" created!');
  } else {
    const err = await analyticsRes.text();
    if (err.includes('already exists')) console.log('"analytics" already exists, skipping.');
    else { console.error('Failed:', err); process.exit(1); }
  }

  console.log('\nAll collections created! Your app should now work.');
}

main().catch(err => { console.error(err); process.exit(1); });
