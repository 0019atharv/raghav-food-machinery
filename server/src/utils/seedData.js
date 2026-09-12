export const initialCategories = [
  {
    name: "Retort & Sterilization",
    slug: "retort-sterilization",
    description: "High-pressure food sterilization autoclaves for retort pouches, tin cans, glass bottles, and ready-to-eat (RTE) meals.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    icon: "ShieldCheck",
    machineCount: 3,
    isPublished: true
  },
  {
    name: "Snacks & Extrusion Lines",
    slug: "snacks-extrusion-lines",
    description: "Continuous puff extruders, kurkure machines, roasting drums, and complete automated snack food processing lines.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    icon: "Layers",
    machineCount: 4,
    isPublished: true
  },
  {
    name: "Vegetable & Fruit Processing",
    slug: "vegetable-fruit-processing",
    description: "Heavy-duty commercial fruit pulpers, tomato juicers, industrial vegetable dryers, washing flumes, and peelers.",
    image: "https://images.unsplash.com/photo-1574314144368-232eb12bd1d0?auto=format&fit=crop&w=800&q=80",
    icon: "Wheat",
    machineCount: 3,
    isPublished: true
  },
  {
    name: "Commercial Kettles & Cooking",
    slug: "commercial-kettles-cooking",
    description: "Steam jacketed tilting kettles, vacuum boiling pans, and heavy duty sauce & paste preparation tanks.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    icon: "Flame",
    machineCount: 2,
    isPublished: true
  },
  {
    name: "Spices & Grain Pulverizers",
    slug: "spices-grain-pulverizers",
    description: "Micro pulverizers, pin mills, hammer crushers, and cyclone dust collectors for spices, sugar, and grains.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    icon: "Cpu",
    machineCount: 2,
    isPublished: true
  },
  {
    name: "Packaging & Sealing",
    slug: "packaging-sealing",
    description: "Continuous band sealers with nitrogen flushing, batch coding, and pouch packaging systems.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    icon: "PackageCheck",
    machineCount: 2,
    isPublished: true
  }
];

export const initialProducts = [
  {
    name: "Automatic Canning Retort Sterilization Machine (500 Ltr)",
    slug: "automatic-canning-retort-500l",
    category: "Retort & Sterilization",
    categorySlug: "retort-sterilization",
    shortDescription: "Industrial grade high-pressure steam autoclave retort engineered for canned foods, pouch meals, and baby food sterilization.",
    fullDescription: "Raghav Food Machinery's 500L Automatic Retort Machine is specifically engineered to achieve commercial sterility (Fo value calculation) for ready-to-eat (RTE) foods, curries, meats, sweet corn, mushrooms, and beverage cans. Built from certified SS-304/SS-316 with hydraulic quick-locking door, digital temperature controllers, and precision overpressure protection.",
    price: "₹3,75,000 - ₹5,50,000",
    priceUnit: "Ex-Factory / Turnkey Setup",
    capacity: "500 Liters / Batch (~250-300 standard cans)",
    power: "12 kW Electric Immersion or Direct Boiler Steam",
    materialGrade: "Food Grade SS-304 Contact Parts (SS-316 optional)",
    automationGrade: "Fully Automatic PLC with Touchscreen HMI",
    voltage: "415 V, 3-Phase, 50 Hz",
    dimensions: "2100 mm x 1200 mm x 1850 mm",
    weight: "850 kg approx",
    warranty: "1 Year Comprehensive Warranty + Lifetime Online Tech Support",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
    ],
    specifications: [
      { label: "Working Pressure", value: "0.22 - 0.25 MPa (Tested up to 0.4 MPa)" },
      { label: "Design Temperature", value: "Up to 135°C (275°F)" },
      { label: "Vessel Material", value: "Stainless Steel SS-304 (6mm Shell Thickness)" },
      { label: "Basket Capacity", value: "2 x Stainless Steel Perforated Loading Baskets" },
      { label: "Cooling Method", value: "Compressed Air Counter-Pressure Water Shower" },
      { label: "Safety System", value: "Dual Mechanical Safety Valves + Electronic Interlock" }
    ],
    applications: [
      "Ready-to-Eat (RTE) Curries & Meals",
      "Tin Can Foods (Sweet Corn, Mushroom, Pineapple)",
      "Retort Pouches & Spouted Pouches",
      "Glass Jar Pickles & Baby Food"
    ],
    features: [
      "High thermal distribution efficiency with +/- 0.5°C uniformity",
      "Touchscreen HMI with 20 programmable recipe memory cycles",
      "Automatic air venting and rapid counter-pressure cooling",
      "Hydrostatically pressure tested and CE certified safety standards"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Compact Industrial Retort Machine (120 Ltr)",
    slug: "compact-industrial-retort-120l",
    category: "Retort & Sterilization",
    categorySlug: "retort-sterilization",
    shortDescription: "Pilot plant and small-batch sterilization autoclave for food entrepreneurs and R&D testing laboratories.",
    fullDescription: "The 120L Canning Retort is engineered for boutique food processing units, agricultural universities, and R&D food testing centers. Delivers the exact same thermal penetration kinetics as our large 1000L plants while maintaining a compact factory footprint.",
    price: "₹1,85,000 - ₹2,40,000",
    priceUnit: "Ex-Factory",
    capacity: "120 Liters / Batch (~60-80 standard cans)",
    power: "6 kW Electric Heating",
    materialGrade: "SS-304 Food Grade",
    automationGrade: "Digital PID Semi-Automatic Controller",
    voltage: "230V Single Phase / 415V 3-Phase",
    dimensions: "950 mm x 850 mm x 1350 mm",
    weight: "280 kg",
    warranty: "1 Year Warranty",
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
    ],
    specifications: [
      { label: "Working Pressure", value: "0.15 - 0.20 MPa" },
      { label: "Design Temperature", value: "126°C" },
      { label: "Basket System", value: "1 x Heavy-Duty SS-304 Basket" },
      { label: "Water Level Indicator", value: "Tubular Sight Glass Gauge" }
    ],
    applications: [
      "Pilot Food Laboratories",
      "Specialty Retort Pouch Startups",
      "Canned Fish & Meat Trial Batches"
    ],
    features: [
      "Self-sealing silicone gasket with quick radial locking arms",
      "Independent temperature and pressure sensor gauges",
      "Stainless steel trolley for effortless basket loading"
    ],
    isFeatured: false,
    isPublished: true
  },
  {
    name: "High-Capacity Snacks & Kurkure Extruder Machine",
    slug: "kurkure-snacks-extruder-machine",
    category: "Snacks & Extrusion Lines",
    categorySlug: "snacks-extrusion-lines",
    shortDescription: "Direct drive rotary die extruder producing crunchy kurkure, corn rings, cheese balls, and puffed snacks.",
    fullDescription: "Our signature Snacks Extruder is the backbone of snack food production in North and Western India. Featuring hardened alloy steel barrel and screws, variable frequency drive (VFD) for precision cutting speed, and high-shear friction design for optimal expansion without pre-cooking.",
    price: "₹2,60,000 - ₹4,20,000",
    priceUnit: "Machine with Cutter & Hopper",
    capacity: "120 - 150 kg/hr finished output",
    power: "15 HP Main Motor + 1 HP Cutter + 0.5 HP Feeder",
    materialGrade: "Mild Steel Heavy Base Frame + SS-304 Contact Sheets",
    automationGrade: "Continuous Automated Extrusion",
    voltage: "415 V, 3-Phase, 50 Hz",
    dimensions: "1850 mm x 950 mm x 1500 mm",
    weight: "720 kg",
    warranty: "1 Year Complete Warranty",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
    ],
    specifications: [
      { label: "Output Capacity", value: "100 - 150 kg/hr" },
      { label: "Raw Material", value: "Corn Meal, Rice Meal, Gram Grit (Besan)" },
      { label: "Drive Mechanism", value: "Direct Coupled Heavy Duty Gearbox" },
      { label: "Speed Control", value: "Schneider / Delta VFD on Cutting Assembly" }
    ],
    applications: [
      "Kurkure & Collets",
      "Cheese Puffs & Rice Balls",
      "3D Pellets & Twisted Snacks"
    ],
    features: [
      "Special alloy friction screws for long lifespan and minimum wear",
      "Water jacket cooling manifold on extruder barrel",
      "Vibration-free dynamic balancing base structure"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Continuous Namkeen & Potato Chips Automatic Fryer",
    slug: "continuous-namkeen-chips-fryer",
    category: "Snacks & Extrusion Lines",
    categorySlug: "snacks-extrusion-lines",
    shortDescription: "Automated continuous conveyor fryer with oil circulation filter and digital heat management.",
    fullDescription: "Engineered for high-volume snack manufacturers producing sev, bhujia, boondi, potato wafers, and extruded snacks. Features low oil volume design to preserve FFA (Free Fatty Acid) levels and maximize product shelf life.",
    price: "₹4,80,000 - ₹8,50,000",
    priceUnit: "Turnkey Line with Filter & De-oiler",
    capacity: "250 - 500 kg/hr",
    power: "3 HP Conveyor Motor + 2 HP Circulation Pump",
    materialGrade: "Full SS-304 Food Grade Construction",
    automationGrade: "Fully Automatic Heat & Conveyor Speed Sync",
    voltage: "415 V, 3-Phase",
    dimensions: "4500 mm x 1200 mm x 1750 mm",
    weight: "1400 kg",
    warranty: "1 Year AMC Included",
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80"
    ],
    specifications: [
      { label: "Heating Media", value: "Diesel Burner / Gas Burner / Thermic Fluid" },
      { label: "Frying Time", value: "Adjustable from 30 seconds to 5 minutes via VFD" },
      { label: "Belt System", value: "Teflon coated top submerger & bottom SS wire mesh" },
      { label: "Oil Filtration", value: "Continuous paper continuous drum filtration" }
    ],
    applications: [
      "Aloo Bhujia, Ratlami Sev, Boondi",
      "Potato Chips & Banana Wafers",
      "Coated Peanuts & Fried Dal"
    ],
    features: [
      "Hood lifting system for effortless sanitation and daily cleaning",
      "Overheat emergency shutoff and burner interlock sensors",
      "Integrated centrifugal de-oiling conveyor output"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Industrial 48-Tray Vegetable & Fruit Dryer Machine",
    slug: "industrial-48-tray-vegetable-dryer",
    category: "Vegetable & Fruit Processing",
    categorySlug: "vegetable-fruit-processing",
    shortDescription: "Hot air circulation cabinet dehydrator for vegetables, onion flakes, garlic, spices, and dried fruits.",
    fullDescription: "Engineered to deliver uniform cross-flow hot air across all 48 trays. Maintains accurate relative humidity and temperature up to 120°C, preserving aroma, natural pigments, and vitamin content in dehydrated food products.",
    price: "₹1,95,000 - ₹2,75,000",
    priceUnit: "Ex-Factory with 48 SS Trays",
    capacity: "100 - 150 kg per batch (48 trays)",
    power: "9 kW Electric Heating + 1.5 HP High CFM Blower",
    materialGrade: "Inner Chamber SS-304, Outer Powder Coated / SS",
    automationGrade: "Digital Temperature & Digital Timer Controller",
    voltage: "415 V, 3-Phase",
    dimensions: "1850 mm x 1150 mm x 1950 mm",
    weight: "480 kg",
    warranty: "1 Year Warranty",
    images: [
      "https://images.unsplash.com/photo-1574314144368-232eb12bd1d0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
    ],
    specifications: [
      { label: "Number of Trays", value: "48 Trays (Size: 16\" x 32\" x 1.25\" SS-304)" },
      { label: "Temperature Range", value: "Ambient + 5°C up to 120°C" },
      { label: "Insulation", value: "75 mm High-Density Glass Wool / Rockwool" },
      { label: "Air Circulation", value: "Axial flow aerodynamic fan with adjustable dampers" }
    ],
    applications: [
      "Dehydrated Onion Flakes & Garlic Powder",
      "Dried Mango, Banana Chips, Apple Slices",
      "Herbs, Tea Leaves, Red Chili Drying"
    ],
    features: [
      "Adjustable air exhaust dampers for optimal moisture removal",
      "Heavy duty heat-resistant silicone gasket on double-walled doors",
      "Detachable trolley system for fast loading & unloading"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Commercial Heavy-Duty Fruit Pulper & Juice Extractor",
    slug: "heavy-duty-fruit-pulper-juice-extractor",
    category: "Vegetable & Fruit Processing",
    categorySlug: "vegetable-fruit-processing",
    shortDescription: "High-yield dual-stage pulping and seed separating machine for mango, tomato, guava, and berries.",
    fullDescription: "Raghav Food Machinery's industrial fruit pulper separates pulp, skins, seeds, and fiber in a single continuous operation. Stainless steel rotary beaters and fine sieves ensure maximum yield with minimal seed breakage.",
    price: "₹1,45,000 - ₹2,20,000",
    priceUnit: "Ex-Factory",
    capacity: "500 - 1000 kg/hr fruit feed",
    power: "3 HP / 5 HP High Torque Motor",
    materialGrade: "All Food Contact Parts Stainless Steel SS-304",
    automationGrade: "Continuous Duty Mechanical",
    voltage: "415 V, 3-Phase",
    dimensions: "1400 mm x 750 mm x 1250 mm",
    weight: "310 kg",
    warranty: "1 Year Guarantee",
    images: [
      "https://images.unsplash.com/photo-1574314144368-232eb12bd1d0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80"
    ],
    specifications: [
      { label: "Sieve Sizes", value: "Interchangeable 0.5 mm, 1 mm, 1.5 mm screens" },
      { label: "Rotor Blades", value: "Adjustable clearance food-grade nylon/SS paddles" },
      { label: "Discharge", value: "Twin chutes (Separate clean pulp and waste seed outlet)" }
    ],
    applications: [
      "Mango Pulping & Canning Lines",
      "Tomato Puree & Ketchup Processing",
      "Guava, Papaya, Apple & Berry Crushing"
    ],
    features: [
      "Zero seed crushing ensures 100% natural taste without bitterness",
      "Easy hinged inspection hood for rapid clean-in-place (CIP)",
      "Corrosion-proof food contact sanitary finish"
    ],
    isFeatured: false,
    isPublished: true
  },
  {
    name: "Steam Jacketed Tilting Cooking Kettle (300 Ltr)",
    slug: "steam-jacketed-tilting-kettle-300l",
    category: "Commercial Kettles & Cooking",
    categorySlug: "commercial-kettles-cooking",
    shortDescription: "Spherical hemispherical cooking vat with PTFE scraper agitator and worm-gear tilting discharge.",
    fullDescription: "Ideal for high-volume commercial cooking, boiling, frying, and concentrating sauces, syrups, jams, gravies, and milk sweets. Double-jacketed steam heating prevents scorching while the motorised PTFE scraper keeps products moving smoothly.",
    price: "₹1,65,000 - ₹2,60,000",
    priceUnit: "Ex-Factory",
    capacity: "300 Liters Gross Volume",
    power: "2 HP Agitator Geared Motor",
    materialGrade: "Inner Pan SS-316, Outer Jacket SS-304",
    automationGrade: "Manual Worm Tilting / Motorised Agitation",
    voltage: "415 V, 3-Phase",
    dimensions: "1350 mm x 1100 mm x 1650 mm",
    weight: "390 kg",
    warranty: "1 Year Warranty",
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
    ],
    specifications: [
      { label: "Jacket Pressure", value: "Tested up to 4 bar steam pressure" },
      { label: "Scraper Material", value: "Food-grade PTFE Teflon self-adjusting scrapers" },
      { label: "Tilting Angle", value: "Up to 90 degrees with ergonomic handwheel gear" }
    ],
    applications: [
      "Tomato Paste, Ketchup, Chutneys",
      "Fruit Jams, Jellies & Marmalades",
      "Commercial Curries & Gravy Bases"
    ],
    features: [
      "Hemispherical bottom provides 40% faster heat transfer",
      "Steam trap, pressure relief valve, and vacuum breaker included",
      "Hygienic mirror polish on inner food contact surfaces"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Micro Spice Pulverizer & Masala Pin Mill",
    slug: "micro-spice-pulverizer-pin-mill",
    category: "Spices & Grains Pulverizers",
    categorySlug: "spices-grain-pulverizers",
    shortDescription: "Ultra-fine continuous spice grinder with water-jacket cooling and cyclone collector for dust-free operation.",
    fullDescription: "Precision engineered for grinding dry spices like turmeric, coriander, red chili, black pepper, and grains. The internal water circulation jacket keeps the grinding chamber cool, preventing heat degradation and retaining essential aromatic spice oils.",
    price: "₹1,35,000 - ₹2,10,000",
    priceUnit: "Machine with Cyclone & Blower",
    capacity: "100 - 250 kg/hr (depending on fineness)",
    power: "10 HP / 15 HP Electric Motor",
    materialGrade: "SS-304 Contact Blades & Housing",
    automationGrade: "Continuous Duty Grinding",
    voltage: "415 V, 3-Phase",
    dimensions: "1600 mm x 850 mm x 1950 mm",
    weight: "520 kg",
    warranty: "1 Year Warranty",
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
    ],
    specifications: [
      { label: "Fineness Mesh", value: "60 to 200 Mesh adjustable screens" },
      { label: "Chamber Cooling", value: "Water cooling jacket on stator ring" },
      { label: "Collection System", value: "High efficiency cyclone separator with bag filter" }
    ],
    applications: [
      "Turmeric, Red Chili, Coriander, Garam Masala",
      "Sugar, Salt, Chemical & Herb Grinding",
      "Gram Flour (Besan) & Wheat Processing"
    ],
    features: [
      "Retains natural color, aroma, and essential volatile oils",
      "Dust-free clean factory operation with pneumatic cyclone transfer",
      "Hardened alloy hammers for wear resistance"
    ],
    isFeatured: false,
    isPublished: true
  },
  {
    name: "Raghav 500 Ltr Stainless Steel Conical Storage Tank",
    slug: "raghav-500ltr-conical-storage-tank",
    category: "Commercial Kettles & Cooking",
    categorySlug: "commercial-kettles-cooking",
    shortDescription: "Food-grade SS-304 500-liter conical bottom storage and balancing tank designed for hygienic holding of sauces, fruit pulp, juices, syrup, and pastes with zero product retention.",
    fullDescription: "The Raghav 500 Ltr Stainless Steel Conical Storage Tank is an industrial-grade hygienic processing vessel engineered for commercial food plants, beverage processors, dairy operations, and sauce manufacturers. Fabricated with heavy-gauge 16-gauge SS-304 stainless steel, it features a 60-degree steep conical cone bottom that ensures 100% complete gravity drainage with zero stagnant product residue. Supported on four heavy-duty tubular stainless steel legs with pre-drilled flange anchor pads for exceptional floor stability. The interior is mirror-finished and sanitary TIG-welded with radius corners to prevent bacterial harborage and facilitate swift CIP (Clean-In-Place) washdowns. Features sanitary tri-clamp / butterfly discharge port, top dust cover flange, and level indicator ports.",
    price: "₹ 65,000",
    priceUnit: "Ex-Factory (GST Extra)",
    capacity: "500 Liters",
    power: "Gravity / Pump Flow",
    materialGrade: "Food Grade SS-304 (16 Gauge Heavy Duty)",
    automationGrade: "Manual / Semi-Automatic",
    voltage: "Not applicable",
    dimensions: "1100 mm (Dia) x 1650 mm (H)",
    weight: "140 kg",
    warranty: "1 Year Comprehensive Warranty",
    images: [
      "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789137497/raghav-food-processing-machines/raghav-500ltr-storage-tank.png"
    ],
    specifications: [
      { label: "Holding Capacity", value: "500 Liters" },
      { label: "Sheet Thickness", value: "16 Gauge (approx 1.6 mm)" },
      { label: "Bottom Cone Angle", value: "60° Conical Hopper Bottom (Zero Residue)" },
      { label: "Discharge Port", value: "2-inch / 2.5-inch Sanitary Butterfly / TC Flange" },
      { label: "Leg Support", value: "4 Heavy-Duty SS Tubular Legs with Flange Base Pads" },
      { label: "Internal Polish", value: "Mirror Polish (Ra < 0.4 µm) Food Grade" },
      { label: "Cleaning Method", value: "CIP Compatible Radius Sanitary Welds" }
    ],
    applications: [
      "Fruit Pulp, Tomato Puree, Ketchup & Sauce Storage",
      "Sugar Syrup, Liquid Glucose, Honey & Edible Oil",
      "Milk, Dairy Liquids & Ready-to-Serve Beverages"
    ],
    features: [
      "Zero product retention with steep 60° conical bottom",
      "Certified food-grade SS-304 with mirror sanitary finish",
      "Heavy-duty tubular legs with level-leveling floor flanges",
      "Corrosion-resistant and 100% compatible with hot washdowns"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Raghav Heavy-Duty Manual Crown Corking & Bottle Capping Machine",
    slug: "raghav-heavy-duty-crown-corking-machine",
    category: "Packaging & Sealing",
    categorySlug: "packaging-sealing",
    shortDescription: "Precision manual crown corking machine built for commercial micro-breweries, craft beverage makers, artisanal juice bottlers, and sauce packaging lines.",
    fullDescription: "The Raghav Heavy-Duty Manual Crown Corking Machine is engineered for professional-grade bottle sealing across craft beverage, cold-brew coffee, kombucha, fruit juice, tomato sauce, and micro-brewery plants. Constructed from high-density cast iron with an industrial emerald powder-coat finish and a precision chrome-plated solid steel column. Equipped with a hardened magnetic crimping bell that securely retains standard 26mm (and optional 29mm) crown caps, ensuring airtight, hermetic, leak-proof crimping without chipping glass rims. The smooth leverage handle mechanism delivers high mechanical advantage with minimal operator hand fatigue. Includes tool-free height adjustment to swiftly accommodate bottles from 150ml nip bottles up to 1000ml tall beverage bottles, and a stable bench-mount base with pre-cast bolt holes.",
    price: "₹ 4,000",
    priceUnit: "Ex-Factory Unit",
    capacity: "300 - 500 Bottles / Hour",
    power: "Manual Mechanical (Zero Electricity Required)",
    materialGrade: "Cast Iron Base + Chrome-Plated Solid Steel Column",
    automationGrade: "Manual Leverage Action",
    voltage: "Zero Power Required",
    dimensions: "250 mm x 200 mm x 520 mm",
    weight: "4.8 kg",
    warranty: "1 Year Replacement Warranty on Crimp Head",
    images: [
      "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789137653/raghav-food-processing-machines/raghav-heavy-duty-crown-corking-machine.png"
    ],
    specifications: [
      { label: "Capping Speed", value: "300 - 500 Bottles per hour" },
      { label: "Cap Standard", value: "26 mm Crown Caps (Optional 29 mm Bell)" },
      { label: "Bottle Height Range", value: "100 mm to 380 mm (Tool-Free Quick Clamp)" },
      { label: "Crimp Die", value: "Hardened Steel Magnetic Crimping Bell" },
      { label: "Base Structure", value: "High-Tension Cast Iron with Rubber Centering Pad" },
      { label: "Mounting", value: "Pre-drilled bench mounting holes" }
    ],
    applications: [
      "Glass Bottle Sealing: Craft Beer, Cider & Kombucha",
      "Fruit Juices, Cold Drinks, Flavored Milks & Sharbat",
      "Ketchup, Sauce & Vinegar Glass Packaging"
    ],
    features: [
      "Magnetic capping bell securely holds cap before crimping",
      "Ergonomic extended lever arm minimizes operator effort",
      "Heavy cast iron base prevents tipping during operation",
      "Airtight, leak-proof hermetic seal every single cycle"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Raghav Blower Cyclone Spice & Grain Pulverizer Machine",
    slug: "raghav-blower-cyclone-pulverizer-machine",
    category: "Spices & Grain Pulverizers",
    categorySlug: "spices-grain-pulverizers",
    shortDescription: "Heavy-duty industrial grinding mill with centrifugal air blower and stainless steel cyclone dust separator for cool, continuous, dust-free spice and grain pulverizing.",
    fullDescription: "The Raghav Blower Cyclone Spice & Grain Pulverizer Machine is an advanced industrial grinding plant designed for spice processors, grain millers, Ayurvedic herb producers, and commercial food facilities. Unlike standard hammer mills that heat up and lose volatile spice aromas, this unit integrates an internal pneumatic draft air blower and a conical cyclone collector that actively draws cool ambient air through the grinding chamber. Raw spices (red chili, turmeric, coriander, black pepper, dry ginger) and grains are pulverized by high-speed hardened serrated beaters against grooved liners, instantly aspirated through precision perforated sieves, and conveyed pneumatically into the cyclone separator. This yields consistent, ultra-fine mesh output (40 to 120 mesh) with zero dust dispersion in the work area, zero moisture sweating, and 100% color & aroma retention.",
    price: "₹ 145,000",
    priceUnit: "Complete Unit with Motor & Cyclone",
    capacity: "100 - 250 kg/hr (Depending on spice & fineness)",
    power: "7.5 HP to 10 HP Heavy-Duty Induction Motor",
    materialGrade: "Full SS-304 Contact Chamber & Cyclone / Heavy MS Base",
    automationGrade: "Semi-Automatic Continuous Operation",
    voltage: "415 V, 3-Phase, 50 Hz",
    dimensions: "1650 mm x 1150 mm x 1850 mm",
    weight: "380 kg",
    warranty: "1 Year Comprehensive Industrial Warranty",
    images: [
      "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789137654/raghav-food-processing-machines/raghav-blower-cyclone-pulverizer.jpg"
    ],
    specifications: [
      { label: "Output Capacity", value: "100 - 250 kg per hour" },
      { label: "Motor Requirement", value: "7.5 HP / 10 HP (Three Phase 415V)" },
      { label: "Dust Separation", value: "Stainless Steel Cyclone Collector with Bag Filter" },
      { label: "Grinding Fineness", value: "40 Mesh to 120 Mesh (Interchangeable Sieves)" },
      { label: "Beater Type", value: "Dynamic Balanced Hardened SS Beaters" },
      { label: "Air System", value: "Centrifugal Blower for Rapid Cooling & Transfer" }
    ],
    applications: [
      "Turmeric, Red Chili, Coriander, Cumin, Black Pepper",
      "Pulses, Gram Flour (Besan), Rice & Wheat Grinding",
      "Ayurvedic Herbs, Dry Leaves, Sugar & Salt"
    ],
    features: [
      "100% Dust-free operation with pneumatic cyclone discharge",
      "Cold-grinding airflow prevents thermal degradation of volatile oils",
      "Heavy-duty dynamically balanced rotor ensures vibration-free run",
      "Quick-clamp screen changeover in under 2 minutes"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Raghav Tilting Steam Jacketed Cooking Kettle (Commercial Boiling Pan)",
    slug: "raghav-tilting-steam-jacketed-kettle-commercial",
    category: "Commercial Kettles & Cooking",
    categorySlug: "commercial-kettles-cooking",
    shortDescription: "Commercial hemispherical tilting steam kettle for rapid, scorch-free boiling, simmering, and batch concentration of sauces, syrups, pastes, soups, and dairy products.",
    fullDescription: "The Raghav Tilting Steam Jacketed Cooking Kettle is an indispensable commercial cooking vessel engineered for industrial kitchens, confectionery manufacturers, sauce & ketchup plants, dairy plants, and catering operations. Constructed with a deep, seamless hemispherical inner bowl surrounded by an outer pressurised steam jacket rated up to 3-4 bar. Because heat is transferred uniformly across the entire curved surface rather than a concentrated flame point, delicate viscous foods like tomato purée, milk khoya, sugar syrups, gravies, and fruit jams cook 3x faster without scorching, burning, or caramelization. Mounted on robust A-frame stainless steel stanchions with dual hollow trunnions for steam supply and condensate discharge. Includes a precision worm-gear manual tilting handwheel with self-locking safety brake, allowing the operator to pour out molten batches with pinpoint control.",
    price: "₹ 95,000",
    priceUnit: "Ex-Factory (GST Extra)",
    capacity: "150 to 250 Liters (Batch Processing)",
    power: "External Steam Boiler / Optional 0.5 HP Stirrer",
    materialGrade: "Inner Bowl SS-304/SS-316 (10 Gauge), Steam Jacket SS-304",
    automationGrade: "Manual Worm-Gear Tilting Handwheel",
    voltage: "Steam Operated (No Electric Motor needed for basic kettle)",
    dimensions: "1450 mm x 1050 mm x 1250 mm",
    weight: "220 kg",
    warranty: "1 Year Comprehensive Industrial Warranty",
    images: [
      "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789137658/raghav-food-processing-machines/raghav-tilting-steam-jacketed-kettle.jpg"
    ],
    specifications: [
      { label: "Pan Capacity", value: "150 - 250 Liters per batch" },
      { label: "Working Pressure", value: "Up to 3.5 bar (50 PSI) Steam Pressure" },
      { label: "Inner Vessel", value: "Heavy-Gauge SS-304 / SS-316 (10 Gauge / 3.2 mm)" },
      { label: "Outer Jacket", value: "Reinforced SS-304 Jacket with Safety Relief Valve" },
      { label: "Tilting Control", value: "Manual Worm-Gear Handwheel with Safety Self-Lock" },
      { label: "Steam In/Out", value: "Dual Hollow Rotary Trunnions with Condensate Steam Trap" },
      { label: "Safety Rating", value: "Hydraulic Tested to 1.5x Working Steam Pressure" }
    ],
    applications: [
      "Tomato Sauce, Ketchup, Puree & Paste Cooking",
      "Milk Boiling, Khoya, Basundi & Dairy Products",
      "Sugar Syrup, Chikki, Gulab Jamun Syrup & Confectionery",
      "Commercial Gravies, Dal Makhani & Bulk Catering Curries"
    ],
    features: [
      "Indirect 360° steam jacket heating eliminates scorching & hotspots",
      "Precision worm gear tilting handwheel enables smooth, safe pouring",
      "Sanitary food-grade stainless steel with polished seamless inner bowl",
      "Heavy A-frame construction engineered for decades of daily factory use"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Raghav Industrial Screw Type Juicer & Cold-Press Spiral Juice Extractor",
    slug: "raghav-screw-type-spiral-juicer-machine",
    category: "Vegetable & Fruit Processing",
    categorySlug: "vegetable-fruit-processing",
    price: "₹ 32,000",
    priceUnit: "Ex-Factory (GST Extra)",
    capacity: "100 - 300 kg/hr (Raw Fruit & Vegetable Feed)",
    power: "1.5 HP to 2 HP Single Phase / Three Phase Geared Motor",
    materialGrade: "Food Grade SS-304 Contact Screws, Filter Mesh & Hopper",
    automationGrade: "Semi-Automatic Continuous Auger Extraction",
    voltage: "220V Single Phase / 415V Three Phase, 50 Hz",
    dimensions: "950 mm x 450 mm x 750 mm",
    weight: "75 kg",
    warranty: "1 Year Comprehensive Manufacturer Warranty",
    shortDescription: "Continuous spiral auger slow juice press engineered for high-yield, cold-press extraction of ginger, amla, sugarcane, apples, carrots, pineapples, tomatoes, and citrus fruits.",
    fullDescription: "The Raghav Industrial Screw Type Juicer (Spiral Auger Juice Extractor) is an industrial cold-press extraction machine built for commercial beverage processors, herbal health-juice units, ginger/garlic processing plants, and food manufacturing units. Unlike high-speed centrifugal extractors that generate heat and cause rapid juice oxidation, this unit utilizes a slow-turning, heavy-duty stainless steel spiral auger operating inside a precision conical perforated screen. As raw fruits or vegetables travel along the narrowing screw pitch, they are progressively compressed under mechanical pressure. Clean, natural juice drains through the micron filter screen into the lower collector chute, while dry fibrous pomace/pulp is continuously expelled from the front conical discharge port. The low RPM preserves natural color, vitamins, enzymes, and fresh flavor with zero foam generation.",
    images: [
      "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789202425/raghav-food-processing-machines/raghav-screw-type-juicer.png"
    ],
    specifications: [
      { label: "Extraction Mechanism", value: "Progressive Mechanical Spiral Auger Compression" },
      { label: "Processing Capacity", value: "100 - 300 kg per hour" },
      { label: "Motor Specification", value: "1.5 HP / 2 HP Heavy-Duty Induction Gear Motor" },
      { label: "Screen Mesh", value: "0.6 mm to 1.2 mm SS-304 Perforated Sieve Filter" },
      { label: "Hopper Design", value: "Flanged SS-304 Funnel Hopper with Anti-Splash Guard" },
      { label: "Discharge", value: "Dual Outlet (Pure Liquid Chute + Dry Pomace Cone)" },
      { label: "Chassis", value: "Powder-Coated Heavy MS Frame with SS-304 Enclosure" }
    ],
    applications: [
      "Ginger & Garlic Juice, Amla, Sugarcane, Pineapple, Apple, Carrot, Beetroot, Citrus, Wheatgrass & Herbal Extracts"
    ],
    features: [
      "Cold-press technology prevents thermal oxidation and nutritional loss",
      "Maximum juice yield with extremely dry cake/pomace discharge",
      "Sanitary CIP-friendly design with quick-disassembly filter cylinder",
      "Heavy-duty geared transmission designed for continuous production runs"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Raghav Automatic Vertical Form Fill Seal (FFS) Pouch Packing Machine",
    slug: "raghav-automatic-ffs-pouch-packing-machine",
    category: "Packaging & Sealing",
    categorySlug: "packaging-sealing",
    price: "₹ 165,000",
    priceUnit: "Ex-Factory (GST Extra)",
    capacity: "20 - 60 Pouches / Minute (Depending on pack volume & product)",
    power: "2.5 kW / Single Phase 220V or Three Phase 415V",
    materialGrade: "SS-304 Product Contact Parts & Exterior Stainless Cladding",
    automationGrade: "Fully Automatic PLC / Microprocessor Controlled",
    voltage: "220 V / 415 V, 50 Hz",
    dimensions: "850 mm x 950 mm x 1950 mm",
    weight: "350 kg",
    warranty: "1 Year Comprehensive On-Site Warranty",
    shortDescription: "Versatile automated vertical pouch packaging system that forms, fills, and heat-seals continuous pillow or center-seal pouches for liquids, pastes, powders, and spices.",
    fullDescription: "The Raghav Automatic Vertical Form Fill Seal (FFS) Machine is a high-speed, continuous packaging solution engineered for food manufacturers, spice packagers, sauce processors, and edible oil/dairy plants. Starting from a continuous roll of laminated packaging film, the machine smoothly pulls the web over a precision former collar, seals the vertical back seam, accurately doses the product, and creates an airtight horizontal end-seal before knife cut-off. Equipped with dual digital PID intelligent temperature controllers for independent horizontal and vertical sealing jaws, an emergency stop console, motorized film unwind tension control, and quick-change forming shoulders. Mounted on heavy-duty lockable swivel caster wheels for effortless relocation within processing facilities.",
    images: [
      "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789202428/raghav-food-processing-machines/raghav-ffs-pouch-packing-machine.jpg"
    ],
    specifications: [
      { label: "Packing Speed", value: "20 to 60 Pouches per minute" },
      { label: "Pouch Types", value: "Center Seal, Pillow Pouch, 3-Side / 4-Side Seal" },
      { label: "Pack Volume Range", value: "10 ml to 200 ml / 10 g to 250 g (Model Configurable)" },
      { label: "Film Compatibility", value: "Laminated Film, Polyester/Poly, Aluminum Foil Laminates" },
      { label: "Temperature Control", value: "Dual Digital Microprocessor PID Controllers" },
      { label: "Sealing Mechanism", value: "Pneumatic / Mechanical Heat-Sealing Jaws with Serrated Cut-off" },
      { label: "Mobility", value: "Heavy-Duty 360° Industrial Swivel Casters with Leveling Locks" }
    ],
    applications: [
      "Tomato Ketchup, Liquid Sauces, Edible Oils, Milk, Masala Powders, Spices, Ghee, Shampoos & Pastes"
    ],
    features: [
      "All-in-one automatic pouch forming, accurate dosing, and sealing",
      "Consistent airtight, leak-proof seal prevents product spoilage",
      "High precision photo-mark sensor for accurate printed film registration",
      "Easy tool-free pouch width changeover with modular forming tubes"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Raghav Motorized Tilting Steam Jacketed Mixing Kettle (with Scraper Agitator)",
    slug: "raghav-motorized-mixing-steam-jacketed-kettle",
    category: "Commercial Kettles & Cooking",
    categorySlug: "commercial-kettles-cooking",
    price: "₹ 135,000",
    priceUnit: "Ex-Factory (GST Extra)",
    capacity: "150 to 300 Liters per batch",
    power: "1 HP / 1.5 HP Flange-Mounted Electric Gear Motor (415V 3-Phase)",
    materialGrade: "Inner Vessel SS-304/SS-316 (10 Gauge / 3.2 mm), Outer Jacket SS-304",
    automationGrade: "Motorized Agitator + Manual Worm-Gear Tilting Handwheel",
    voltage: "415 V, 3-Phase, 50 Hz (Steam Heated Jacket)",
    dimensions: "1550 mm x 1150 mm x 1450 mm",
    weight: "260 kg",
    warranty: "1 Year Comprehensive Industrial Warranty",
    shortDescription: "Commercial steam-jacketed cooking pan with top-mounted electric motorized agitator and food-grade Teflon scrapers to cook and blend thick sauces, ketchup, khoya, and jams without scorching.",
    fullDescription: "The Raghav Motorized Tilting Steam Jacketed Mixing Kettle is designed specifically for cooking, concentrating, and blending high-viscosity, burn-prone food products. Combining 360-degree indirect steam jacket heating with a heavy-duty top-mounted gear motor drive, the central anchor agitator sweeps food-grade PTFE (Teflon) scraper blades along the entire inner hemispherical bowl. This continuous wall wiping prevents heat-sensitive foods like tomato ketchup, fruit jams, confectionery syrup, milk khoya, and viscous gravies from adhering to hot metal surfaces, completely eliminating caramelization, burning, and hotspots. Mounted on heavy structural stainless steel stanchions with rotary steam trunnions and a precision self-locking worm-gear tilting handwheel for effortless batch pouring. Includes heavy-duty mobile polyurethane caster wheels for flexible plant positioning.",
    images: [
      "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789202430/raghav-food-processing-machines/raghav-mixing-steam-jacket-kettle.jpg"
    ],
    specifications: [
      { label: "Batch Capacity", value: "150 - 300 Liters" },
      { label: "Steam Jacket Pressure", value: "Rated up to 3.5 bar (50 PSI) Hydro-tested" },
      { label: "Agitator Drive", value: "Top-Mounted Helical Bevel Geared Motor (30 - 45 RPM)" },
      { label: "Scraper Blades", value: "Food-Grade Virgin Teflon (PTFE) Self-Adjusting Scrapers" },
      { label: "Vessel Metallurgy", value: "Heavy SS-304 (SS-316 Acid-Resistant Bowl Option)" },
      { label: "Tilting Mechanism", value: "Heavy-Duty Worm Gear Handwheel (Self-Locking Safety Pour)" },
      { label: "Steam Ports", value: "Rotary Joint Steam Inlet, Air Vent & Condensate Steam Trap" },
      { label: "Mobility", value: "4 Industrial Swivel Caster Wheels with Foot-Pedal Brakes" }
    ],
    applications: [
      "Tomato Paste, Ketchup, Fruit Jams, Marmalade, Khoya, Basundi, Toffee/Caramel, Ayurvedic Syrups & Commercial Curries"
    ],
    features: [
      "PTFE scrapers continuously wipe inner surface for 100% scorch-free cooking",
      "Uniform indirect steam heat cuts batch processing time by up to 50%",
      "Smooth worm gear tilting wheel ensures safe, controlled hot liquid discharge",
      "Sanitary mirror-polished contact surfaces facilitate rapid clean-in-place (CIP)"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Raghav Industrial Rectangular Vibratory Sifter & Grading Screen Machine",
    slug: "raghav-industrial-vibratory-shifter-machine",
    category: "Spices & Grain Pulverizers",
    categorySlug: "spices-grain-pulverizers",
    price: "₹ 45,000",
    priceUnit: "Ex-Factory (GST Extra)",
    capacity: "200 - 800 kg/hr (Depending on bulk density & screen mesh)",
    power: "1 HP / 1.5 HP Vibratory Flange Motor (Three Phase 415V / Single Phase 220V)",
    materialGrade: "All Contact Parts Food Grade SS-304 / Heavy SS Support Frame",
    automationGrade: "Continuous Linear Vibratory Screening",
    voltage: "220 V / 415 V, 50 Hz",
    dimensions: "1350 mm x 750 mm x 950 mm",
    weight: "110 kg",
    warranty: "1 Year Comprehensive Manufacturer Warranty",
    shortDescription: "Heavy-duty linear motion rectangular vibro sifter and screening machine with perforated stainless steel decks and dual discharge chutes for grading, de-dusting, and classifying dry foods.",
    fullDescription: "The Raghav Industrial Rectangular Vibratory Sifter (Vibro Shifter & Grading Machine) is an essential classification unit engineered for dry food packaging lines, spice pulverizing plants, namkeen snacks facilities, and grain mills. Utilizing an adjustable eccentric vibratory motor mounted beneath the screening bed, the machine generates linear harmonic vibrations that rapidly convey material across the perforated stainless steel screen deck. Oversized agglomerates, unground lumps, foreign fibers, and fine dust are cleanly separated and discharged through side collection spouts, while graded clean product falls through the precision mesh to the downstream line. Built entirely from hygienic stainless steel with tensioned, quick-change clamp screens and rubber vibration-dampening suspension mounts that isolate vibrations from the factory floor.",
    images: [
      "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789202431/raghav-food-processing-machines/raghav-vibratory-shifter-machine.jpg"
    ],
    specifications: [
      { label: "Screening Capacity", value: "200 - 800 kg per hour" },
      { label: "Screen Deck Area", value: "1000 mm x 550 mm Rectangular SS-304 Perforated Deck" },
      { label: "Mesh Compatibility", value: "1 mm to 15 mm Perforated Sheets & Wire Mesh Screens" },
      { label: "Vibration Motor", value: "1 HP / 1.5 HP Heavy-Duty Eccentric Vibratory Drive (1440 RPM)" },
      { label: "Discharge Spouts", value: "Dual Side Chutes for Oversize and Undersize Fractions" },
      { label: "Vibration Isolation", value: "High-Resilience Elastomer Rubber Suspension Bushings" },
      { label: "Floor Base", value: "Heavy-Gauge SS Box Section Legs with Anchor Flange Pads" }
    ],
    applications: [
      "Namkeen & Sev Grading, Ground Spices, Besan & Flour Sieving, Dry Grains, Pulses, Tea Leaves, Dehydrated Vegetables & Granules"
    ],
    features: [
      "Rapid high-capacity linear separation with zero mesh blinding",
      "Dual side collection chutes allow continuous, unhindered material flow",
      "Modular screen frame enables mesh changeover in less than 3 minutes",
      "Quiet, low-noise operation with floor-isolated vibration dampeners"
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    name: "Raghav Horizontal Continuous Band Sealing Machine (with Digital PID Controller)",
    slug: "raghav-horizontal-continuous-band-sealing-machine",
    category: "Packaging & Sealing",
    categorySlug: "packaging-sealing",
    price: "₹ 25,000",
    priceUnit: "Ex-Factory (GST Extra)",
    capacity: "0 - 12 Meters / Minute Continuous Sealing Speed",
    power: "500 W Heating Elements + 60 W Conveyor Motor (220V Single Phase)",
    materialGrade: "Stainless Steel 304 Casing & Conveyor Bed, Solid Brass Heating Blocks",
    automationGrade: "Automated Continuous Conveyor Sealing",
    voltage: "220 V, 50 Hz Single Phase",
    dimensions: "850 mm x 420 mm x 380 mm",
    weight: "28 kg",
    warranty: "1 Year Warranty on Heating Elements & Drive System",
    shortDescription: "Automated tabletop continuous band sealer with motorized green conveyor, solid brass heating/cooling blocks, digital PID temperature display, and embossing coder for pre-filled pouches.",
    fullDescription: "The Raghav Horizontal Continuous Band Sealing Machine is an automated pouch packaging sealer engineered for snacks, spices, grains, seeds, bakery goods, and food packaging lines. Pre-filled thermoplastic, foil, or laminated pouches are laid on the motor-driven green conveyor belt and guided through solid brass heating blocks followed by high-efficiency air-cooling blocks. Seamless Teflon sealing belts apply uniform pressure and heat, creating an airtight, hermetic, leak-proof 10 mm wide knurled or smooth seal. Equipped with a digital intelligent PID temperature controller (0°C - 300°C), variable conveyor speed knob, adjustable conveyor height/width, and an interchangeable steel date/batch embossing wheel to imprint manufacturing dates and MRP during the sealing process.",
    images: [
      "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789202433/raghav-food-processing-machines/raghav-continuous-band-sealer-machine.jpg"
    ],
    specifications: [
      { label: "Sealing Speed", value: "0 - 12 Meters per minute (Infinitely Variable)" },
      { label: "Seal Width", value: "8 mm - 12 mm Knurled / Diamond / Striped Hermetic Seal" },
      { label: "Temperature Range", value: "0°C to 300°C (Dual Digital PID Intelligent Display)" },
      { label: "Conveyor Load", value: "Max 5 kg Total Conveyor Load (Single pouch up to 1 kg)" },
      { label: "Film Materials", value: "PE, PP, OPP, Aluminum Foil, Kraft Paper Laminated Pouches" },
      { label: "Coding Wheel", value: "Embossing Wheel for Expiry Date, Batch No. & MRP Imprinting" },
      { label: "Structure", value: "Food-Grade Satin Finish SS-304 Housing with Cooling Fan Vents" }
    ],
    applications: [
      "Snacks & Namkeen, Tea & Coffee Pouches, Spices, Dry Fruits, Seeds, Frozen Foods, Confectionery & Hardware Packaging"
    ],
    features: [
      "Continuous high-speed operation significantly outperforms manual impulse sealers",
      "Digital PID controller maintains exact sealing temperature without scorching film",
      "Teflon guide belts prevent plastic adhesion and ensure mirror-clean seam",
      "Built-in cooling fan blocks instantly set the seal for maximum tensile strength"
    ],
    isFeatured: true,
    isPublished: true
  }
];

export const initialBlogs = [
  {
    title: "The Comprehensive Guide to Canning Retort Sterilization for Ready-to-Eat (RTE) Foods",
    slug: "guide-to-canning-retort-sterilization-rte-foods",
    excerpt: "Learn how commercial retort autoclaves eliminate bacterial pathogens, calculate Fo values, and maintain shelf life without chemical preservatives.",
    content: `Food preservation has undergone an enormous revolution with modern retort packaging and canning technology. Whether processing savory curries, tender sweet corn, meat cuts, or pureed baby food, achieving commercial sterility while preserving vitamins, flavor, and texture is paramount.

### Understanding Commercial Sterility & The Fo Value
In thermal food processing, commercial sterility is defined as the inactivation of all microorganisms of public health significance, specifically *Clostridium botulinum* spores. The industrial benchmark for low-acid foods (pH > 4.5) requires a minimum lethal heat exposure known as the Fo value of 3.0 minutes at 121.1°C (250°F).

Raghav Food Machinery's 500L and 120L Automatic Retorts incorporate precision PLC modules that continuously log multi-point thermocouple readings inside food containers, dynamically calculating cumulative Fo lethality values in real-time.

### Overpressure Counter-Balancing
When heating canned goods or flexible retort pouches, internal pressure within the package increases dramatically due to moisture vapor and trapped headspace gases. If the external autoclave steam pressure drops unexpectedly during cooling, pouches will burst or tin seams will deform. Our retorts utilize compressed air overpressure management to ensure absolute package integrity throughout the thermal cycle.

### Key Factors for Selecting a Retort Machine:
1. **Container Type**: Rigid tin cans, spouted foil pouches, or vacuum trays.
2. **Batch Volume**: 120L for R&D startups versus 500L - 1500L for commercial lines.
3. **Heating Source**: Built-in high-efficiency electric elements versus external industrial steam boilers.
4. **Data Logging**: Compliant digital recording for FSSAI, US FDA, and ISO audit trails.`,
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    author: "Er. Raghav Sharma (Chief Technical Director)",
    category: "Retort Technology",
    tags: ["Retort", "Canning", "Food Safety", "Sterilization", "FSSAI"],
    readingTime: "6 min read",
    isPublished: true
  },
  {
    title: "Selecting Food Grade Stainless Steel: Why SS-304 vs SS-316 Matters in Machinery",
    slug: "selecting-food-grade-stainless-steel-ss304-vs-ss316",
    excerpt: "A deep dive into metallurgical requirements for food machinery fabrication to prevent pitting, acid corrosion, and contamination.",
    content: `When commissioning food processing machinery, one of the most critical decisions made during engineering design is alloy selection. Food safety standards worldwide mandate non-toxic, non-porous, corrosion-resistant surfaces that withstand caustic washdowns and acidic ingredients.

### What is SS-304?
Grade 304 contains approximately 18% chromium and 8% nickel (often termed 18/8). It provides outstanding resistance to standard organic foods, snacks, doughs, dry spices, and dairy products. At Raghav Food Machinery, all our standard conveyor frames, pulverizer blades, and dryer trays are fabricated from prime SS-304.

### When is SS-316 Necessary?
Grade 316 incorporates 2% to 3% molybdenum into the metallurgical matrix. This key addition dramatically resists chloride pitting and severe corrosion from:
- High-saline brines and pickles
- Concentrated tomato paste and citrus pulps
- High-acid vinegar solutions
- Aggressive Clean-in-Place (CIP) chemical cleansers

For our heavy-duty Steam Jacketed Kettles and specialized Fruit Pulpers handling acidic purees, we strongly recommend SS-316 contact pans to extend service life up to 15+ years.`,
    coverImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
    author: "Metallurgical Engineering Dept",
    category: "Machinery Standards",
    tags: ["Stainless Steel", "SS304", "SS316", "Manufacturing", "Sanitation"],
    readingTime: "4 min read",
    isPublished: true
  },
  {
    title: "How to Set Up a Profitable Snacks & Namkeen Manufacturing Facility in India",
    slug: "how-to-set-up-namkeen-snacks-plant-india",
    excerpt: "Complete roadmap: machinery selection, factory layout planning, oil management, and turnkey cost breakdown.",
    content: `The Indian packaged snack and ethnic namkeen market is growing at an incredible CAGR of over 11%. Starting a modern processing unit requires balancing automated efficiency, consistent flavor seasoning, and low oil oxidation.

### Step-by-Step Plant Configuration:
1. **Raw Material Preparation**: Automatic flour sieving and continuous besan mixer.
2. **Forming & Extrusion**: Raghav rotary snacks extruder or continuous sev extruder.
3. **Continuous Frying**: Temperature-controlled indirect frying lines that keep free fatty acids below 1%.
4. **De-Oiling**: High-speed centrifugal conveyors to reduce excess oil content by up to 25%.
5. **Flavour Coating**: Rotating drum applicators for consistent masala dusting.
6. **Nitrogen Packing**: Multi-head weighers or continuous band sealers with nitrogen flush.

Raghav Food Machinery provides complete turnkey assistance — from factory CAD layouts to technician commissioning across India.`,
    coverImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80",
    author: "Turnkey Project Advisory",
    category: "Business Guide",
    tags: ["Namkeen Plant", "Turnkey", "Food Business", "Snacks Extrusion"],
    readingTime: "5 min read",
    isPublished: true
  }
];

export const initialGallery = [
  {
    title: "Automatic Retort Autoclave Pressure Vessel Assembly",
    category: "Retort Machines",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    caption: "Hydrostatic pressure testing of 500L SS-304 retort autoclave at our Kundli manufacturing facility.",
    isFeatured: true
  },
  {
    title: "Precision CNC Laser Cutting of Food-Grade Stainless Sheets",
    category: "Factory Floor",
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
    caption: "High-precision fiber laser cutting machine ensuring micro-millimeter tolerance on food machine chassis.",
    isFeatured: true
  },
  {
    title: "Continuous Automated Snacks Frying Line Assembly",
    category: "Snacks Line",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80",
    caption: "Continuous frying system with integrated heat exchanger undergoing factory dry run testing.",
    isFeatured: true
  },
  {
    title: "300L Steam Jacketed Tilting Cooking Kettle Inspection",
    category: "Cooking Kettles",
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
    caption: "Food-grade mirror polish finish inspection on SS-316 contact bowl prior to client dispatch.",
    isFeatured: true
  },
  {
    title: "Client Factory Commissioning - Fruit Pulping Line",
    category: "Client Plant",
    imageUrl: "https://images.unsplash.com/photo-1574314144368-232eb12bd1d0?auto=format&fit=crop&w=1000&q=80",
    caption: "On-site installation and operator training session for mango pulp processing facility in Gujarat.",
    isFeatured: false
  },
  {
    title: "Spice Grinding & Cyclone Dust Collector Array",
    category: "Machinery",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80",
    caption: "Dust-free cyclone pulse collection setup on micro spice pulverizer unit.",
    isFeatured: false
  }
];

export const initialTestimonials = [
  {
    clientName: "Rajesh Singhania",
    company: "Singhania Foods & Agro Ltd",
    location: "Sonipat, Haryana",
    rating: 5,
    review: "We commissioned a 500L Automatic Retort Machine from Raghav Food Machinery for our ready-to-eat curry project. The thermal Fo calculation is spot-on and we achieved FSSAI commercial sterility on our first trial run. Their technical team stayed on-site for 3 days until our operators were 100% confident.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    machinePurchased: "500L Automatic Retort Machine",
    isApproved: true
  },
  {
    clientName: "Vikas Patel",
    company: "Gujarat Spices & Condiments",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    review: "The micro spice pulverizer with water cooling jacket preserved the bright natural yellow color and essential aroma of our organic turmeric. Zero burnt aroma and absolutely dust-free cyclone collection. Best Indian machinery manufacturer for spices!",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    machinePurchased: "Micro Spice Pulverizer (15 HP)",
    isApproved: true
  },
  {
    clientName: "Gurpreet Singh",
    company: "Doon Valley Agro Enterprises",
    location: "Amritsar, Punjab",
    rating: 5,
    review: "Extremely rugged kurkure extruder and continuous namkeen fryer line. We run 16 hours daily without any breakdown. Spare parts are dispatched same day from Delhi NCR. Strongly recommend Raghav Food Machinery to any snack manufacturer.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    machinePurchased: "Continuous Snacks Extrusion Line",
    isApproved: true
  }
];

export const initialSettings = {
  companyName: "Raghav Food Machinery Company",
  websiteUrl: "https://raghavfoodprocessingmachines.com",
  tagline: "Precision Engineering for Food Processing, Canning & Snacks Machinery",
  phone: "+91 98734 56789",
  secondaryPhone: "+91 98112 34567",
  whatsappNumber: "+919873456789",
  email: "sales@raghavfoodprocessingmachines.com",
  supportEmail: "info@raghavfoodprocessingmachines.com",
  gstin: "07AAACR1234F1Z8",
  factoryAddress: "Plot No. 48, Industrial Area Phase II, Kundli, Sonipat, Delhi NCR, Haryana - 131028",
  corporateOffice: "Office No. 302, Industrial Complex, Wazirpur, Delhi - 110052",
  workingHours: "Monday – Saturday: 9:00 AM – 7:00 PM IST (Sunday Closed)",
  bannerNotice: {
    active: true,
    text: "⭐ Factory Direct Supply: Avail special festive commercial discounts on Automatic Retort & Extruder Lines!",
    link: "/machines"
  },
  hero: {
    badge: "India's Leading Industrial Food Machinery Engineering",
    titleLine1: "Industrial Food",
    titleHighlight: "Processing, Canning",
    titleLine3: "& Snacks Machinery",
    description: "Engineered with certified Food-Grade SS-304/SS-316. From high-pressure Canning Retorts and Snacks Extruders to turnkey automated plants — delivered with factory direct warranty and on-site commissioning across India.",
    stat1Number: "500+",
    stat1Label: "Installed Plants Across India",
    stat2Number: "30+",
    stat2Label: "Years Food Tech Expertise",
    stat3Number: "100%",
    stat3Label: "Food-Grade SS-304/SS-316",
    stat4Number: "24/7",
    stat4Label: "Engineer AMC Support",
    showcaseTag: "Flagship: Automatic Canning Retort 500L",
    showcaseImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    showcaseModel: "RFPM-RET-500",
    showcaseStockStatus: "In Stock / Ready Dispatch",
    showcaseSpec1Label: "Batch Capacity",
    showcaseSpec1Value: "500 Liters",
    showcaseSpec2Label: "Temperature",
    showcaseSpec2Value: "Up to 135°C",
    showcaseSpec3Label: "Automation",
    showcaseSpec3Value: "PLC + HMI",
    showcaseButtonText: "View Machine Specs",
    showcaseButtonLink: "/product/automatic-canning-retort-500l"
  },
  socialLinks: {
    indiamart: "https://www.indiamart.com/raghavfoodmachinery/",
    youtube: "https://youtube.com/@raghavfoodmachinery",
    linkedin: "https://linkedin.com/company/raghav-food-machinery",
    facebook: "https://facebook.com/raghavfoodmachinery"
  }
};

