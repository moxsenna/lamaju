import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Curated list of Unsplash high-res photos for each portfolio
const imageCatalog = [
  // 1. FORMA Interior (interior.html)
  {
    category: 'interior',
    filename: 'interior-kemang-living.jpg',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=85',
    desc: 'Modern minimalist luxury living room with wood slats and cream sofa'
  },
  {
    category: 'interior',
    filename: 'interior-sora-bedroom.jpg',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&auto=format&fit=crop&q=85',
    desc: 'Japandi warm wood minimalist master bedroom with soothing daylight'
  },
  {
    category: 'interior',
    filename: 'interior-olive-dining.jpg',
    url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&auto=format&fit=crop&q=85',
    desc: 'Architectural dining room with travertine marble dining table'
  },
  {
    category: 'interior',
    filename: 'interior-living-room.jpg',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=85',
    desc: 'Curated warm aesthetic living room'
  },
  {
    category: 'interior',
    filename: 'interior-bedroom.jpg',
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&auto=format&fit=crop&q=85',
    desc: 'Serene master bedroom suite'
  },
  {
    category: 'interior',
    filename: 'interior-kitchen-dining.jpg',
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=85',
    desc: 'Modern kitchen and open dining space'
  },

  // 2. Atelier Dapur (kitchen-set.html)
  {
    category: 'kitchen-set',
    filename: 'kitchen-hero.jpg',
    url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&auto=format&fit=crop&q=85',
    desc: 'Custom architectural kitchen set with warm oak cabinets and island'
  },
  {
    category: 'kitchen-set',
    filename: 'kitchen-japandi.jpg',
    url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=85',
    desc: 'Japandi warm wood kitchen with clean lines and quartz top'
  },
  {
    category: 'kitchen-set',
    filename: 'kitchen-modern-classic.jpg',
    url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&auto=format&fit=crop&q=85',
    desc: 'Modern classic dark matte grey kitchen with marble backsplash'
  },
  {
    category: 'kitchen-set',
    filename: 'kitchen-compact-studio.jpg',
    url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&auto=format&fit=crop&q=85',
    desc: 'Compact studio kitchen with smart concealed storage'
  },

  // 3. Dapur Bekuin (frozen-food.html)
  {
    category: 'frozen-food',
    filename: 'frozen-hero.jpg',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=85',
    desc: 'Artisanal delicious food platter freshly prepared and ready to serve'
  },
  {
    category: 'frozen-food',
    filename: 'frozen-dimsum.jpg',
    url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&auto=format&fit=crop&q=85',
    desc: 'Juicy steamed dimsum dumplings in bamboo steamer'
  },
  {
    category: 'frozen-food',
    filename: 'frozen-beef-yakiniku.jpg',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=85',
    desc: 'Sizzling marinated beef yakiniku meat slices'
  },
  {
    category: 'frozen-food',
    filename: 'frozen-chicken-katsu.jpg',
    url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=85',
    desc: 'Crispy golden fried chicken katsu cutlet'
  },
  {
    category: 'frozen-food',
    filename: 'frozen-singkong-keju.jpg',
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=85',
    desc: 'Crispy golden savory snack cassava'
  },

  // 4. PawPaw Grooming (pet-grooming.html)
  {
    category: 'pet-grooming',
    filename: 'pet-hero.jpg',
    url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&auto=format&fit=crop&q=85',
    desc: 'Happy cute well-groomed dog with fluffy clean fur'
  },
  {
    category: 'pet-grooming',
    filename: 'pet-poodle.jpg',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=85',
    desc: 'Adorable toy poodle after grooming teddy bear style'
  },
  {
    category: 'pet-grooming',
    filename: 'pet-persian.jpg',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=85',
    desc: 'Fluffy clean Persian cat with silky groomed coat'
  },

  // 5. RodaKita Rent (rental-mobil.html)
  {
    category: 'rental-mobil',
    filename: 'rental-hero.jpg',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85',
    desc: 'Sleek luxury modern car on a scenic open road'
  },
  {
    category: 'rental-mobil',
    filename: 'rental-city-car.jpg',
    url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=85',
    desc: 'Modern compact city car hatchback'
  },
  {
    category: 'rental-mobil',
    filename: 'rental-family-mpv.jpg',
    url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=85',
    desc: 'Spacious modern family MPV vehicle'
  },
  {
    category: 'rental-mobil',
    filename: 'rental-premium-suv.jpg',
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=85',
    desc: 'Executive premium SUV for executive business rental'
  },

  // 6. Asteria Wedding (wedding-organizer.html)
  {
    category: 'wedding-organizer',
    filename: 'wedding-hero.jpg',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85',
    desc: 'Romantic wedding couple in sunlit bridal setting'
  },
  {
    category: 'wedding-organizer',
    filename: 'wedding-garden.jpg',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=85',
    desc: 'Lush outdoor garden intimate wedding dining setup'
  },
  {
    category: 'wedding-organizer',
    filename: 'wedding-modern.jpg',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&auto=format&fit=crop&q=85',
    desc: 'Modern editorial wedding table styling with candles and clean lines'
  },
  {
    category: 'wedding-organizer',
    filename: 'wedding-traditional.jpg',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200&auto=format&fit=crop&q=85',
    desc: 'Elegant traditional rich warm cultural wedding details'
  },

  // 7. Maison Vow (wedding-ecosystem.html)
  {
    category: 'wedding-ecosystem',
    filename: 'wedding-eco-hero1.jpg',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&auto=format&fit=crop&q=85',
    desc: 'Lavish floral wedding reception banquet'
  },
  {
    category: 'wedding-ecosystem',
    filename: 'wedding-eco-hero2.jpg',
    url: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=1200&auto=format&fit=crop&q=85',
    desc: 'Editorial bridal elegance detail'
  },
  {
    category: 'wedding-ecosystem',
    filename: 'wedding-eco-garden.jpg',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&auto=format&fit=crop&q=85',
    desc: 'Airy botanical wedding celebration'
  },
  {
    category: 'wedding-ecosystem',
    filename: 'wedding-eco-monolith.jpg',
    url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&auto=format&fit=crop&q=85',
    desc: 'Contemporary monochrome wedding design'
  },
  {
    category: 'wedding-ecosystem',
    filename: 'wedding-eco-heritage.jpg',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=85',
    desc: 'Warm heritage wedding decor with golden accents'
  },

  // 8. VANTA Auto Lab (automotive-detailing.html)
  {
    category: 'automotive-detailing',
    filename: 'auto-hero.jpg',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&auto=format&fit=crop&q=85',
    desc: 'Supercar in professional detailing studio with high gloss ceramic coating reflection'
  },
  {
    category: 'automotive-detailing',
    filename: 'auto-ppf.jpg',
    url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&auto=format&fit=crop&q=85',
    desc: 'Precision paint correction and car detailing process'
  },

  // 9. NEXA Secure (cctv-smart-home.html)
  {
    category: 'cctv-smart-home',
    filename: 'cctv-hero.jpg',
    url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&auto=format&fit=crop&q=85',
    desc: 'Smart security camera monitoring sleek modern residence'
  },
  {
    category: 'cctv-smart-home',
    filename: 'cctv-smart-lock.jpg',
    url: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1200&auto=format&fit=crop&q=85',
    desc: 'Digital smart lock installed on front entrance door'
  },

  // 10. Little Grove Daycare (daycare-premium.html)
  {
    category: 'daycare-premium',
    filename: 'daycare-hero.jpg',
    url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&auto=format&fit=crop&q=85',
    desc: 'Bright clean Montessori playroom with safe wooden toys and cheerful ambiance'
  },
  {
    category: 'daycare-premium',
    filename: 'daycare-activity.jpg',
    url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200&auto=format&fit=crop&q=85',
    desc: 'Children happily learning and playing in bright daycare room'
  },

  // 11. RuangTeduh Home Care (home-care-lansia.html)
  {
    category: 'home-care-lansia',
    filename: 'homecare-hero.jpg',
    url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&auto=format&fit=crop&q=85',
    desc: 'Gentle caring nurse caregiver companion assisting elderly senior at home'
  },
  {
    category: 'home-care-lansia',
    filename: 'homecare-comfort.jpg',
    url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1200&auto=format&fit=crop&q=85',
    desc: 'Elderly person enjoying peaceful moments with companion at home'
  },

  // 12. RapiBangun (renovasi.html)
  {
    category: 'renovasi',
    filename: 'renovasi-hero.jpg',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=85',
    desc: 'Architectural home renovation blueprint and modern structure'
  },
  {
    category: 'renovasi',
    filename: 'renovasi-result.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85',
    desc: 'Beautiful modern renovated home interior'
  },

  // 13. Shiftly (pindahan-storage.html)
  {
    category: 'pindahan-storage',
    filename: 'pindahan-hero.jpg',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&auto=format&fit=crop&q=85',
    desc: 'Neat organized moving boxes inside modern bright apartment'
  },
  {
    category: 'pindahan-storage',
    filename: 'pindahan-storage.jpg',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=85',
    desc: 'Modern secure climate-controlled storage facility warehouse'
  },

  // 14. KeringTotal (waterproofing.html)
  {
    category: 'waterproofing',
    filename: 'waterproof-hero.jpg',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1200&auto=format&fit=crop&q=85',
    desc: 'Professional building construction and rooftop waterproofing protection'
  },
  {
    category: 'waterproofing',
    filename: 'waterproof-inspection.jpg',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=85',
    desc: 'Building inspector diagnosing structural integrity and moisture'
  },

  // 15. KelasKata (kelas-bahasa.html)
  {
    category: 'kelas-bahasa',
    filename: 'kelaskata-hero.jpg',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=85',
    desc: 'Confident professional students in an active conversational English class'
  },
  {
    category: 'kelas-bahasa',
    filename: 'kelaskata-coaching.jpg',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=85',
    desc: 'Interactive 1-on-1 language coaching session'
  }
];

async function downloadAll() {
  const baseDir = path.join(__dirname, '../clients/lajupage-umkm-48jam/src/assets/portfolio/images');
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  console.log(`Starting download of ${imageCatalog.length} curated images...`);
  
  let successCount = 0;
  for (const item of imageCatalog) {
    const itemDir = path.join(baseDir, item.category);
    if (!fs.existsSync(itemDir)) {
      fs.mkdirSync(itemDir, { recursive: true });
    }
    const targetFile = path.join(itemDir, item.filename);
    
    try {
      console.log(`Fetching [${item.category}] ${item.filename}...`);
      const res = await fetch(item.url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(targetFile, buffer);
      console.log(`  -> Saved ${item.filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (err) {
      console.error(`  -> FAILED ${item.filename}: ${err.message}`);
    }
  }

  console.log(`\nDownload summary: ${successCount}/${imageCatalog.length} images downloaded successfully.`);
}

downloadAll();
