export interface Billboard {
  id: number
  title: string
  location: string
  state: string
  type: string
  size: string
  impressions: string
  facing: string
  illuminated: boolean
  available: boolean
  image: string
  views: string
  badge: string
  features: string[]
}

const KEY = "bl_billboards"

const SEED: Billboard[] = [
  { id: 1,  title: "Lekki-Epe Expressway Unipole",    location: "Lekki Phase 1, Lagos",           state: "Lagos",       type: "Unipole / Monopole",   size: "48ft × 24ft",  impressions: "85,000/day",  facing: "Dual-faced",   illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",  views: "2.4M", badge: "Top Pick",  features: ["Illuminated (24hrs)", "Dual-faced", "Prime Lekki corridor", "Verified impressions"] },
  { id: 2,  title: "Adeola Odeku LED Screen",          location: "Victoria Island, Lagos",          state: "Lagos",       type: "LED Digital Screen",   size: "20ft × 10ft",  impressions: "120,000/day", facing: "Single-faced", illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",  views: "1.8M", badge: "Digital",   features: ["LED full-colour", "High visibility", "VI business district", "24hr display"] },
  { id: 3,  title: "Airport Road Gantry",              location: "Ikeja Along, Lagos",              state: "Lagos",       type: "Gantry / Bridge",      size: "60ft × 15ft",  impressions: "95,000/day",  facing: "Overhead",     illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80", views: "3.1M", badge: "Premium",   features: ["Overhead gantry", "Illuminated", "Airport road corridor", "Mass reach"] },
  { id: 4,  title: "Wuse 2 Wall Drape",                location: "Wuse Zone 2, Abuja",              state: "FCT - Abuja", type: "Wall Drape / Wrap",    size: "40ft × 30ft",  impressions: "42,000/day",  facing: "Single-faced", illuminated: false, available: true,  image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80",  views: "980K", badge: "Hot Deal",  features: ["Large format", "CBD Abuja", "High income audience", "Premium placement"] },
  { id: 5,  title: "Trans Amadi Rooftop",              location: "Trans Amadi, Port Harcourt",      state: "Rivers",      type: "Rooftop Billboard",    size: "36ft × 18ft",  impressions: "38,000/day",  facing: "Dual-faced",   illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",  views: "1.2M", badge: "New",       features: ["Rooftop visibility", "Industrial zone", "Dual-faced", "Illuminated"] },
  { id: 6,  title: "Ahmadu Bello Way Unipole",         location: "Central Business District, Abuja",state: "FCT - Abuja", type: "Unipole / Monopole",   size: "48ft × 24ft",  impressions: "55,000/day",  facing: "Single-faced", illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", views: "2.0M", badge: "Top Pick",  features: ["Abuja CBD", "Government district audience", "Illuminated", "Verified traffic"] },
  { id: 7,  title: "Kano City Gate Billboard",         location: "Bompai Road, Kano",               state: "Kano",        type: "Unipole / Monopole",   size: "60ft × 30ft",  impressions: "55,000/day",  facing: "Dual-faced",   illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80", views: "1.5M", badge: "Top Pick",  features: ["City gateway", "North Nigeria reach", "Large format", "Dual-faced"] },
  { id: 8,  title: "Benin Ring Road LED",              location: "Ring Road, Benin City",           state: "Edo",         type: "LED Digital Screen",   size: "16ft × 8ft",   impressions: "30,000/day",  facing: "Single-faced", illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",  views: "820K", badge: "Available", features: ["LED display", "Ring Road corridor", "Commercial audience", "Digital flexibility"] },
  { id: 9,  title: "Calabar Marina Transit Shelter",   location: "Marina, Calabar",                 state: "Cross River", type: "Transit / Bus Shelter", size: "12ft × 5ft",   impressions: "22,000/day",  facing: "Single-faced", illuminated: false, available: true,  image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",  views: "450K", badge: "Available", features: ["Transit format", "Marina area", "Street-level impact", "Pedestrian audience"] },
  { id: 10, title: "Murtala Muhammed Airport Terminal",location: "International Arrivals, Lagos",   state: "Lagos",       type: "Airport Advertising",  size: "Various",      impressions: "180,000/day", facing: "Multiple",     illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",  views: "4.2M", badge: "Premium",   features: ["Airport terminal", "International audience", "Multiple formats", "High dwell time"] },
  { id: 11, title: "Ikeja City Mall LED Wall",         location: "Ikeja, Lagos",                    state: "Lagos",       type: "Mall / Indoor",        size: "24ft × 12ft",  impressions: "45,000/day",  facing: "Indoor",       illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",   views: "1.1M", badge: "Digital",   features: ["Indoor LED", "Mall traffic", "Affluent audience", "Air-conditioned environment"] },
  { id: 12, title: "Onitsha Head Bridge Gantry",       location: "Upper Iweka, Onitsha",            state: "Anambra",     type: "Gantry / Bridge",      size: "50ft × 12ft",  impressions: "62,000/day",  facing: "Overhead",     illuminated: true,  available: true,  image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",  views: "2.8M", badge: "Hot Deal",  features: ["Bridge gantry", "Major trade route", "Overhead dominance", "High traffic"] },
]

export function getBillboards(): Billboard[] {
  if (typeof window === "undefined") return SEED
  try {
    const stored = localStorage.getItem(KEY)
    if (!stored) {
      localStorage.setItem(KEY, JSON.stringify(SEED))
      return SEED
    }
    return JSON.parse(stored)
  } catch { return SEED }
}

export function saveBillboards(data: Billboard[]): void {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function addBillboard(b: Omit<Billboard, "id">): Billboard {
  const all = getBillboards()
  const next = { ...b, id: Date.now() }
  saveBillboards([...all, next])
  return next
}

export function updateBillboard(updated: Billboard): void {
  saveBillboards(getBillboards().map((b) => (b.id === updated.id ? updated : b)))
}

export function deleteBillboard(id: number): void {
  saveBillboards(getBillboards().filter((b) => b.id !== id))
}
