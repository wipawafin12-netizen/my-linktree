# PocketBase Setup Guide for LinkTree

## วิธีตั้งค่า PocketBase Database

### ขั้นตอนที่ 1: เข้า PocketBase Admin Panel

1. เปิดเบราว์เซอร์ไปที่: `https://web-linkcenter.chhindustry.com/_/`
2. Login ด้วย Admin account

---

### ขั้นตอนที่ 2: สร้าง Collections

ต้องสร้าง 3 collections:

## 📄 Collection 1: `pages`

**Settings:**
- Type: `Base collection`
- Name: `pages`

**Fields:**

| Field Name | Type | Required | Options |
|------------|------|----------|---------|
| `user` | Relation | ✅ | → users (Single, Cascade delete) |
| `displayName` | Text | ❌ | Max: none |
| `bio` | Text | ❌ | Max: 500 characters |
| `avatar` | File | ❌ | Max 1 file, 5MB, Images only |
| `bgImage` | File | ❌ | Max 1 file, 5MB, Images only |
| `selectedTheme` | Text | ❌ | - |
| `selectedButton` | Text | ❌ | - |
| `selectedFont` | Text | ❌ | - |
| `customBgColor` | Text | ❌ | - |
| `customBgSecondary` | Text | ❌ | - |
| `buttonAnimation` | Bool | ❌ | Default: false |
| `activeSocials` | JSON | ❌ | - |
| `socialUrls` | JSON | ❌ | - |
| `productImages` | JSON | ❌ | - |

**API Rules:**
- **List rule:** `@request.auth.id != "" && user = @request.auth.id`
- **View rule:** *(empty - public read)*
- **Create rule:** `@request.auth.id != ""`
- **Update rule:** `@request.auth.id != "" && user = @request.auth.id`
- **Delete rule:** `@request.auth.id != "" && user = @request.auth.id`

**Indexes:**
```sql
CREATE INDEX idx_pages_user ON pages (user)
```

---

## 🔗 Collection 2: `links`

**Settings:**
- Type: `Base collection`
- Name: `links`

**Fields:**

| Field Name | Type | Required | Options |
|------------|------|----------|---------|
| `page` | Relation | ✅ | → pages (Single, Cascade delete) |
| `title` | Text | ✅ | Min: 1, Max: 200 |
| `url` | URL | ✅ | - |
| `enabled` | Bool | ❌ | Default: true |
| `color` | Text | ❌ | - |
| `order` | Number | ❌ | - |
| `clicks` | Number | ❌ | Min: 0 |

**API Rules:**
- **List rule:** *(empty - public read)*
- **View rule:** *(empty - public read)*
- **Create rule:** `@request.auth.id != "" && page.user = @request.auth.id`
- **Update rule:** `@request.auth.id != "" && page.user = @request.auth.id`
- **Delete rule:** `@request.auth.id != "" && page.user = @request.auth.id`

**Indexes:**
```sql
CREATE INDEX idx_links_page ON links (page)
CREATE INDEX idx_links_order ON links (order)
```

---

## 📊 Collection 3: `analytics`

**Settings:**
- Type: `Base collection`
- Name: `analytics`

**Fields:**

| Field Name | Type | Required | Options |
|------------|------|----------|---------|
| `page` | Relation | ✅ | → pages (Single, Cascade delete) |
| `type` | Select | ✅ | Values: `view`, `click` |
| `linkId` | Text | ❌ | - |

**API Rules:**
- **List rule:** `@request.auth.id != "" && page.user = @request.auth.id`
- **View rule:** `@request.auth.id != "" && page.user = @request.auth.id`
- **Create rule:** *(empty - allow public)*
- **Update rule:** `null` (no updates allowed)
- **Delete rule:** `@request.auth.id != "" && page.user = @request.auth.id`

**Indexes:**
```sql
CREATE INDEX idx_analytics_page ON analytics (page)
CREATE INDEX idx_analytics_created ON analytics (created)
```

---

## 🚀 วิธีสร้างแบบเร็ว (Import Schema)

ถ้า PocketBase รองรับการ import schema (version 0.8+):

1. ไปที่ **Settings → Import collections**
2. อัพโหลดไฟล์ `pocketbase-schema.json`
3. กด **Import**

---

## ✅ ตรวจสอบว่าตั้งค่าสำเร็จ

1. เข้า Collections → ต้องเห็น 4 collections:
   - ✅ `users` (auth collection)
   - ✅ `pages`
   - ✅ `links`
   - ✅ `analytics`

2. ลอง Login ที่เว็บ `https://linktree.chhindustry.com`
   - ถ้า Login สำเร็จ และไม่มี 404 error = ตั้งค่าเรียบร้อย!

---

## 🔧 หมายเหตุ

- Collection `users` มีอยู่แล้วตั้งแต่ตอนติดตั้ง PocketBase
- ถ้าสร้างผิด สามารถลบ collection แล้วสร้างใหม่ได้
- Cascade delete จะลบข้อมูลที่เกี่ยวข้องทั้งหมดเมื่อลบ user หรือ page
