/* ============================================================
   SMART LIZT — DATA MODULE
   All item data for every category + smart suggestion rules
   ============================================================ */

/* ────────────────────────────────────────────────────────────
   CATEGORY META
   Each category has: name, icon, slug, desc, link, image
   (Insert your image paths/URLs into `image:` and links into `link:`)
   ──────────────────────────────────────────────────────────── */
const CATEGORIES = {
  kitchen:     { name: 'Kitchen',      icon: '🍳', slug: 'kitchen',     desc: 'Everything you may need to keep your kitchen stocked and organized.', link: 'category/kitchen.html',     image: 'images/categories/kitchen.jpg' },
  bathroom:    { name: 'Bathroom',     icon: '🚿', slug: 'bathroom',    desc: 'Stock your bathroom with all daily-use essentials.',                   link: 'category/bathroom.html',    image: 'images/categories/bathroom.jpg' },
  bedroom:     { name: 'Bedroom',      icon: '🛏️', slug: 'bedroom',     desc: 'Make your bedroom comfortable and well-organized.',                   link: 'category/bedroom.html',     image: 'images/categories/bedroom.jpg' },
  office:      { name: 'Office',       icon: '💼', slug: 'office',      desc: 'Keep your office space fully equipped and productive.',               link: 'category/office.html',      image: 'images/categories/office.jpg' },
  'study-room':{ name: 'Study Room',   icon: '📚', slug: 'study-room',  desc: 'Everything a student or learner may need at their desk.',             link: 'category/study-room.html',  image: 'images/categories/study-room.jpg' },
  'staff-room':{ name: 'Staff Room',   icon: '☕', slug: 'staff-room',  desc: 'Keep the common staff area well-stocked for everyone.',               link: 'category/staff-room.html',  image: 'images/categories/staff-room.jpg' },
  'living-room':{ name: 'Living Room', icon: '🛋️', slug: 'living-room', desc: 'Keep your living space fresh, clean and comfortable.',               link: 'category/living-room.html', image: 'images/categories/living-room.jpg' },
  'dining-room':{ name: 'Dining Room', icon: '🍽️', slug: 'dining-room', desc: 'Everything needed for a well-set dining experience.',               link: 'category/dining-room.html', image: 'images/categories/dining-room.jpg' },
  garden:      { name: 'Garden',       icon: '🌿', slug: 'garden',      desc: 'Supplies to keep your garden green and thriving.',                    link: 'category/garden.html',      image: 'images/categories/garden.jpg' },
  laundry:     { name: 'Laundry',      icon: '👕', slug: 'laundry',     desc: 'All laundry essentials for clean, fresh clothes.',                     link: 'category/laundry.html',     image: 'images/categories/laundry.jpg' },
};

/* ────────────────────────────────────────────────────────────
   BRAND OPTIONS PER CATEGORY (used in item cards)
   ──────────────────────────────────────────────────────────── */
const BRANDS = {
  kitchen:      ['Any Brand', 'Fortune', 'Aashirvaad', 'Tata', 'Britannia', 'Nescafé', 'Saffola', 'Patanjali', 'Other'],
  bathroom:     ['Any Brand', 'Dettol', 'Dove', 'Colgate', 'Listerine', 'Pantene', 'Head & Shoulders', 'Gillette', 'Pears', 'Other'],
  bedroom:      ['Any Brand', 'Bombay Dyeing', 'Spaces', 'D\'Decor', 'Kuber Industries', 'Other'],
  office:       ['Any Brand', 'Classmate', 'Reynolds', 'Cello', 'Camlin', 'HP', 'Canon', 'Epson', 'Other'],
  'study-room': ['Any Brand', 'Classmate', 'Reynolds', 'Camlin', 'Faber-Castell', 'Staedtler', 'Other'],
  'staff-room': ['Any Brand', 'Tata', 'Nescafé', 'Britannia', 'Parle', 'Other'],
  'living-room':['Any Brand', 'Colin', 'HIT', 'Glade', 'Godrej', 'Other'],
  'dining-room':['Any Brand', 'Borosil', 'Milton', 'Cello', 'Tupperware', 'Other'],
  garden:       ['Any Brand', 'Tata Rallis', 'Bayer', 'Coromandel', 'Other'],
  laundry:      ['Any Brand', 'Surf Excel', 'Ariel', 'Tide', 'Rin', 'Comfort', 'Vanish', 'Robin', 'Other'],
};

/* ────────────────────────────────────────────────────────────
   ITEM DATA BY CATEGORY
   Each item: { name, desc, emoji, tags, defaultQty, unit, link, image }
   tags: 'essentials' | 'cleaning' | 'consumables' | 'equipment' | 'optional'
   (Insert your custom image paths / URLs in `image:` and URLs in `link:`)
   ──────────────────────────────────────────────────────────── */
const ITEMS = {

  kitchen: [
    { name:'Rice',              emoji:'🌾', desc:'Daily staple grain.',                       tags:'consumables',  defaultQty:5,  unit:'kg', link: '#', image: 'images/items/rice.jpg' },
    { name:'Wheat Flour',       emoji:'🌾', desc:'For rotis and bread.',                      tags:'consumables',  defaultQty:5,  unit:'kg', link: '#', image: 'images/items/wheat-flour.jpg' },
    { name:'Cooking Oil',       emoji:'🛢️', desc:'Essential for daily cooking.',              tags:'consumables',  defaultQty:2,  unit:'L',  link: '#', image: 'images/items/cooking-oil.jpg' },
    { name:'Sugar',             emoji:'🍚', desc:'Everyday sweetener.',                       tags:'consumables',  defaultQty:2,  unit:'kg', link: '#', image: 'images/items/sugar.jpg' },
    { name:'Salt',              emoji:'🧂', desc:'Table salt for cooking.',                   tags:'consumables',  defaultQty:1,  unit:'kg', link: '#', image: 'images/items/salt.jpg' },
    { name:'Tea',               emoji:'🍵', desc:'Premium tea leaves or bags.',               tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/tea.jpg' },
    { name:'Coffee',            emoji:'☕', desc:'Instant or ground coffee.',                 tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/coffee.jpg' },
    { name:'Spices',            emoji:'🌶️', desc:'Mixed masalas and whole spices.',           tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/spices.jpg' },
    { name:'Pulses',            emoji:'🫘', desc:'Dal and legumes.',                          tags:'consumables',  defaultQty:2,  unit:'kg', link: '#', image: 'images/items/pulses.jpg' },
    { name:'Vegetables',        emoji:'🥦', desc:'Fresh seasonal vegetables.',                tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/vegetables.jpg' },
    { name:'Fruits',            emoji:'🍎', desc:'Fresh seasonal fruits.',                    tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/fruits.jpg' },
    { name:'Milk',              emoji:'🥛', desc:'Fresh or packaged milk.',                   tags:'consumables',  defaultQty:1,  unit:'L',  link: '#', image: 'images/items/milk.jpg' },
    { name:'Bread',             emoji:'🍞', desc:'Fresh or packaged bread loaf.',             tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/bread.jpg' },
    { name:'Eggs',              emoji:'🥚', desc:'Farm fresh eggs.',                          tags:'consumables',  defaultQty:12, unit:'',   link: '#', image: 'images/items/eggs.jpg' },
    { name:'Biscuits',          emoji:'🍪', desc:'Assorted biscuits for tea time.',           tags:'consumables',  defaultQty:2,  unit:'',   link: '#', image: 'images/items/biscuits.jpg' },
    { name:'Snacks',            emoji:'🍿', desc:'Chips, namkeen and snack packets.',         tags:'consumables',  defaultQty:2,  unit:'',   link: '#', image: 'images/items/snacks.jpg' },
    { name:'Foil',              emoji:'🪙', desc:'Aluminium foil for packing.',               tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/foil.jpg' },
    { name:'Food Containers',   emoji:'📦', desc:'Airtight containers for storage.',          tags:'equipment',    defaultQty:2,  unit:'',   link: '#', image: 'images/items/food-containers.jpg' },
    { name:'Dishwash Liquid',   emoji:'🧴', desc:'Dish cleaning liquid soap.',                tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/dishwash-liquid.jpg' },
    { name:'Scrub Pad',         emoji:'🧽', desc:'Kitchen scrubber for utensils.',            tags:'cleaning',     defaultQty:3,  unit:'',   link: '#', image: 'images/items/scrub-pad.jpg' },
    { name:'Garbage Bags',      emoji:'🗑️', desc:'Kitchen bin liner bags.',                   tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/garbage-bags.jpg' },
    { name:'Tissue Paper',      emoji:'🧻', desc:'Kitchen tissue roll.',                      tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/tissue-paper.jpg' },
  ],

  bathroom: [
    { name:'Soap',              emoji:'🧼', desc:'Bathing soap bar.',                         tags:'essentials',   defaultQty:3,  unit:'',   link: '#', image: 'images/items/soap.jpg' },
    { name:'Shampoo',           emoji:'🧴', desc:'Hair cleansing shampoo.',                   tags:'essentials',   defaultQty:1,  unit:'',   link: '#', image: 'images/items/shampoo.jpg' },
    { name:'Conditioner',       emoji:'🧴', desc:'Hair conditioner.',                         tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/conditioner.jpg' },
    { name:'Toothpaste',        emoji:'🦷', desc:'Fluoride toothpaste.',                      tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/toothpaste.jpg' },
    { name:'Toothbrush',        emoji:'🪥', desc:'Soft or medium bristle brush.',             tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/toothbrush.jpg' },
    { name:'Mouthwash',         emoji:'💧', desc:'Antibacterial oral rinse.',                 tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/mouthwash.jpg' },
    { name:'Toilet Cleaner',    emoji:'🚽', desc:'Disinfectant toilet cleaning liquid.',      tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/toilet-cleaner.jpg' },
    { name:'Floor Cleaner',     emoji:'🧹', desc:'Multipurpose floor cleaning liquid.',       tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/floor-cleaner.jpg' },
    { name:'Hand Wash',         emoji:'🤲', desc:'Antibacterial hand wash liquid.',           tags:'essentials',   defaultQty:1,  unit:'',   link: '#', image: 'images/items/hand-wash.jpg' },
    { name:'Tissues',           emoji:'🧻', desc:'Facial tissue box.',                        tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/tissues.jpg' },
    { name:'Towels',            emoji:'🏖️', desc:'Bath and hand towels.',                     tags:'equipment',    defaultQty:2,  unit:'',   link: '#', image: 'images/items/towels.jpg' },
    { name:'Bucket',            emoji:'🪣', desc:'Plastic utility bucket.',                   tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/bucket.jpg' },
    { name:'Mug',               emoji:'🍶', desc:'Bathroom mug.',                             tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/mug.jpg' },
    { name:'Toilet Brush',      emoji:'🚿', desc:'Toilet cleaning brush.',                    tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/toilet-brush.jpg' },
    { name:'Air Freshener',     emoji:'🌸', desc:'Bathroom air freshener spray.',             tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/air-freshener-bath.jpg' },
    { name:'Razor',             emoji:'🪒', desc:'Shaving razor blades.',                     tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/razor.jpg' },
    { name:'Shaving Cream',     emoji:'🧴', desc:'Shaving foam or gel.',                      tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/shaving-cream.jpg' },
    { name:'Hair Oil',          emoji:'💆', desc:'Nourishing hair oil.',                      tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/hair-oil.jpg' },
  ],

  bedroom: [
    { name:'Bedsheet',          emoji:'🛏️', desc:'Cotton or microfibre bed sheet set.',      tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/bedsheet.jpg' },
    { name:'Pillow',            emoji:'😴', desc:'Comfortable sleeping pillow.',               tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/pillow.jpg' },
    { name:'Pillow Covers',     emoji:'🛏️', desc:'Cotton pillow covers set.',                 tags:'essentials',   defaultQty:4,  unit:'',   link: '#', image: 'images/items/pillow-covers.jpg' },
    { name:'Blanket',           emoji:'🌡️', desc:'Warm winter blanket.',                      tags:'essentials',   defaultQty:1,  unit:'',   link: '#', image: 'images/items/blanket.jpg' },
    { name:'Mattress Protector',emoji:'🛡️', desc:'Waterproof mattress protector.',            tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/mattress-protector.jpg' },
    { name:'Curtains',          emoji:'🪟', desc:'Room darkening or sheer curtains.',         tags:'equipment',    defaultQty:2,  unit:'',   link: '#', image: 'images/items/curtains.jpg' },
    { name:'Hangers',           emoji:'🧥', desc:'Clothes hangers pack.',                     tags:'equipment',    defaultQty:12, unit:'',   link: '#', image: 'images/items/hangers.jpg' },
    { name:'Wardrobe Organizer',emoji:'🗂️', desc:'Drawer dividers and organizers.',           tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/wardrobe-organizer.jpg' },
    { name:'Laundry Basket',    emoji:'🧺', desc:'Fabric or plastic laundry hamper.',         tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/laundry-basket-bed.jpg' },
    { name:'Night Lamp',        emoji:'💡', desc:'Bedside night reading lamp.',               tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/night-lamp.jpg' },
    { name:'Air Freshener',     emoji:'🌸', desc:'Room spray or diffuser.',                   tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/air-freshener-bed.jpg' },
    { name:'Mosquito Repellent',emoji:'🦟', desc:'Coil, mat or spray repellent.',             tags:'essentials',   defaultQty:1,  unit:'',   link: '#', image: 'images/items/mosquito-repellent.jpg' },
  ],

  office: [
    { name:'A4 Paper',          emoji:'📄', desc:'500 sheets printer paper ream.',            tags:'consumables',  defaultQty:2,  unit:'ream', link: '#', image: 'images/items/a4-paper.jpg' },
    { name:'Pens',              emoji:'🖊️', desc:'Ball point pens pack.',                    tags:'essentials',   defaultQty:10, unit:'',   link: '#', image: 'images/items/pens.jpg' },
    { name:'Pencils',           emoji:'✏️', desc:'HB pencil pack.',                          tags:'essentials',   defaultQty:10, unit:'',   link: '#', image: 'images/items/pencils.jpg' },
    { name:'Notebooks',         emoji:'📓', desc:'A4 or A5 lined notebooks.',                tags:'consumables',  defaultQty:5,  unit:'',   link: '#', image: 'images/items/notebooks.jpg' },
    { name:'Files',             emoji:'📁', desc:'Document filing folders.',                  tags:'equipment',    defaultQty:5,  unit:'',   link: '#', image: 'images/items/files.jpg' },
    { name:'Folders',           emoji:'📂', desc:'Plastic document folders.',                 tags:'equipment',    defaultQty:10, unit:'',   link: '#', image: 'images/items/folders.jpg' },
    { name:'Sticky Notes',      emoji:'📌', desc:'Coloured sticky note pads.',               tags:'consumables',  defaultQty:3,  unit:'',   link: '#', image: 'images/items/sticky-notes.jpg' },
    { name:'Stapler',           emoji:'📎', desc:'Heavy duty desktop stapler.',              tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/stapler.jpg' },
    { name:'Staples',           emoji:'📎', desc:'Staple pin box refill.',                   tags:'consumables',  defaultQty:2,  unit:'',   link: '#', image: 'images/items/staples.jpg' },
    { name:'Scissors',          emoji:'✂️', desc:'Stainless steel office scissors.',          tags:'equipment',    defaultQty:2,  unit:'',   link: '#', image: 'images/items/scissors.jpg' },
    { name:'Tape',              emoji:'📼', desc:'Transparent sticky tape rolls.',            tags:'consumables',  defaultQty:3,  unit:'',   link: '#', image: 'images/items/tape.jpg' },
    { name:'Markers',           emoji:'🖊️', desc:'Permanent and whiteboard markers.',        tags:'equipment',    defaultQty:5,  unit:'',   link: '#', image: 'images/items/markers.jpg' },
    { name:'Printer Ink',       emoji:'🖨️', desc:'Printer cartridge replacement.',           tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/printer-ink.jpg' },
    { name:'USB Drive',         emoji:'💾', desc:'USB flash drive.',                          tags:'equipment',    defaultQty:2,  unit:'',   link: '#', image: 'images/items/usb-drive.jpg' },
    { name:'Batteries',         emoji:'🔋', desc:'AA and AAA battery packs.',                tags:'consumables',  defaultQty:2,  unit:'',   link: '#', image: 'images/items/batteries.jpg' },
    { name:'Desk Organizer',    emoji:'🗂️', desc:'Desktop pen and stationery organizer.',    tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/desk-organizer.jpg' },
    { name:'Cleaning Wipes',    emoji:'🧻', desc:'Multipurpose desk cleaning wipes.',        tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/cleaning-wipes.jpg' },
  ],

  'study-room': [
    { name:'Notebook',          emoji:'📓', desc:'Ruled or blank notebook.',                  tags:'consumables',  defaultQty:5,  unit:'',   link: '#', image: 'images/items/notebook.jpg' },
    { name:'Pen',               emoji:'🖊️', desc:'Blue or black ink pen.',                   tags:'essentials',   defaultQty:10, unit:'',   link: '#', image: 'images/items/pen.jpg' },
    { name:'Pencil',            emoji:'✏️', desc:'HB graphite pencil.',                      tags:'essentials',   defaultQty:10, unit:'',   link: '#', image: 'images/items/pencil.jpg' },
    { name:'Eraser',            emoji:'⬜', desc:'Rubber eraser.',                             tags:'essentials',   defaultQty:3,  unit:'',   link: '#', image: 'images/items/eraser.jpg' },
    { name:'Sharpener',         emoji:'✏️', desc:'Pencil sharpener.',                         tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/sharpener.jpg' },
    { name:'Highlighter',       emoji:'🖍️', desc:'Fluorescent highlighter pens.',            tags:'essentials',   defaultQty:4,  unit:'',   link: '#', image: 'images/items/highlighter.jpg' },
    { name:'Marker',            emoji:'🖊️', desc:'Permanent markers.',                        tags:'equipment',    defaultQty:4,  unit:'',   link: '#', image: 'images/items/marker.jpg' },
    { name:'A4 Sheets',         emoji:'📄', desc:'Loose A4 ruled/plain sheets.',              tags:'consumables',  defaultQty:1,  unit:'pack', link: '#', image: 'images/items/a4-sheets.jpg' },
    { name:'Sticky Notes',      emoji:'📌', desc:'Coloured sticky note pads.',               tags:'consumables',  defaultQty:2,  unit:'',   link: '#', image: 'images/items/sticky-notes-study.jpg' },
    { name:'File',              emoji:'📁', desc:'Document file folder.',                     tags:'equipment',    defaultQty:3,  unit:'',   link: '#', image: 'images/items/file.jpg' },
    { name:'Folder',            emoji:'📂', desc:'Plastic document folder.',                  tags:'equipment',    defaultQty:5,  unit:'',   link: '#', image: 'images/items/folder.jpg' },
    { name:'Calculator',        emoji:'🖩', desc:'Scientific or basic calculator.',           tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/calculator.jpg' },
    { name:'USB Drive',         emoji:'💾', desc:'USB flash drive for notes.',                tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/usb-drive-study.jpg' },
    { name:'Headphones',        emoji:'🎧', desc:'Study headphones or earphones.',            tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/headphones.jpg' },
    { name:'Desk Lamp',         emoji:'💡', desc:'LED desk reading lamp.',                   tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/desk-lamp.jpg' },
    { name:'Books',             emoji:'📚', desc:'Textbooks and reference material.',         tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/books.jpg' },
    { name:'Printer Paper',     emoji:'📄', desc:'A4 white printing paper.',                  tags:'consumables',  defaultQty:1,  unit:'ream', link: '#', image: 'images/items/printer-paper.jpg' },
  ],

  'staff-room': [
    { name:'Tea Powder',        emoji:'🍵', desc:'Strong tea leaves for making chai.',        tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/tea-powder.jpg' },
    { name:'Coffee',            emoji:'☕', desc:'Instant coffee jar.',                       tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/coffee-staff.jpg' },
    { name:'Sugar',             emoji:'🍚', desc:'Granulated sugar bag.',                     tags:'consumables',  defaultQty:2,  unit:'kg', link: '#', image: 'images/items/sugar-staff.jpg' },
    { name:'Milk',              emoji:'🥛', desc:'Tetra pack or fresh milk.',                 tags:'consumables',  defaultQty:2,  unit:'L',  link: '#', image: 'images/items/milk-staff.jpg' },
    { name:'Paper Cups',        emoji:'🥤', desc:'Disposable paper cups.',                    tags:'consumables',  defaultQty:1,  unit:'pack', link: '#', image: 'images/items/paper-cups.jpg' },
    { name:'Glasses',           emoji:'🥛', desc:'Reusable drinking glasses.',                tags:'equipment',    defaultQty:12, unit:'',   link: '#', image: 'images/items/glasses.jpg' },
    { name:'Water Bottles',     emoji:'💧', desc:'1-litre reusable water bottles.',           tags:'equipment',    defaultQty:5,  unit:'',   link: '#', image: 'images/items/water-bottles.jpg' },
    { name:'Biscuits',          emoji:'🍪', desc:'Assorted tea time biscuits.',               tags:'consumables',  defaultQty:3,  unit:'',   link: '#', image: 'images/items/biscuits-staff.jpg' },
    { name:'Snacks',            emoji:'🍿', desc:'Light snack packets for staff.',            tags:'consumables',  defaultQty:3,  unit:'',   link: '#', image: 'images/items/snacks-staff.jpg' },
    { name:'Tissues',           emoji:'🧻', desc:'Paper tissue box.',                         tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/tissues-staff.jpg' },
    { name:'Hand Wash',         emoji:'🤲', desc:'Liquid hand wash soap.',                    tags:'essentials',   defaultQty:1,  unit:'',   link: '#', image: 'images/items/hand-wash-staff.jpg' },
    { name:'Cleaning Wipes',    emoji:'🧹', desc:'Surface cleaning wipes.',                   tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/cleaning-wipes-staff.jpg' },
    { name:'Disposable Plates', emoji:'🍽️', desc:'Paper or plastic disposable plates.',      tags:'consumables',  defaultQty:1,  unit:'pack', link: '#', image: 'images/items/disposable-plates.jpg' },
    { name:'Disposable Spoons', emoji:'🥄', desc:'Plastic disposable spoons.',               tags:'consumables',  defaultQty:1,  unit:'pack', link: '#', image: 'images/items/disposable-spoons.jpg' },
    { name:'Trash Bags',        emoji:'🗑️', desc:'Large bin liner bags.',                    tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/trash-bags.jpg' },
  ],

  'living-room': [
    { name:'Curtains',          emoji:'🪟', desc:'Decorative or blackout curtains.',          tags:'equipment',    defaultQty:2,  unit:'',   link: '#', image: 'images/items/curtains-living.jpg' },
    { name:'Cushions',          emoji:'🛋️', desc:'Decorative sofa cushions.',                tags:'optional',     defaultQty:4,  unit:'',   link: '#', image: 'images/items/cushions.jpg' },
    { name:'Cushion Covers',    emoji:'🛋️', desc:'Washable cushion cover set.',              tags:'essentials',   defaultQty:4,  unit:'',   link: '#', image: 'images/items/cushion-covers.jpg' },
    { name:'Floor Cleaner',     emoji:'🧹', desc:'Living room floor cleaning liquid.',        tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/floor-cleaner-living.jpg' },
    { name:'Furniture Cleaner', emoji:'✨', desc:'Wood and furniture polish spray.',          tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/furniture-cleaner.jpg' },
    { name:'Air Freshener',     emoji:'🌸', desc:'Room air freshener or diffuser.',           tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/air-freshener-living.jpg' },
    { name:'Tissue Box',        emoji:'🧻', desc:'Facial tissue box for the side table.',    tags:'essentials',   defaultQty:2,  unit:'',   link: '#', image: 'images/items/tissue-box.jpg' },
    { name:'Decorative Items',  emoji:'🖼️', desc:'Photo frames, vases, ornaments.',          tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/decorative-items.jpg' },
    { name:'Bulbs',             emoji:'💡', desc:'LED energy saving bulbs.',                 tags:'essentials',   defaultQty:4,  unit:'',   link: '#', image: 'images/items/bulbs.jpg' },
    { name:'Batteries',         emoji:'🔋', desc:'Remote control batteries.',                tags:'consumables',  defaultQty:4,  unit:'',   link: '#', image: 'images/items/batteries-remote.jpg' },
    { name:'Cleaning Cloth',    emoji:'🧽', desc:'Microfibre dusting and cleaning cloth.',   tags:'cleaning',     defaultQty:3,  unit:'',   link: '#', image: 'images/items/cleaning-cloth.jpg' },
  ],

  'dining-room': [
    { name:'Plates',            emoji:'🍽️', desc:'Dinner plates for regular use.',           tags:'equipment',    defaultQty:6,  unit:'',   link: '#', image: 'images/items/plates.jpg' },
    { name:'Bowls',             emoji:'🥣', desc:'Soup and cereal bowls.',                   tags:'equipment',    defaultQty:6,  unit:'',   link: '#', image: 'images/items/bowls.jpg' },
    { name:'Spoons',            emoji:'🥄', desc:'Stainless steel spoon set.',               tags:'equipment',    defaultQty:6,  unit:'',   link: '#', image: 'images/items/spoons.jpg' },
    { name:'Forks',             emoji:'🍴', desc:'Stainless steel fork set.',                tags:'equipment',    defaultQty:6,  unit:'',   link: '#', image: 'images/items/forks.jpg' },
    { name:'Glasses',           emoji:'🥛', desc:'Water and juice glasses.',                 tags:'equipment',    defaultQty:6,  unit:'',   link: '#', image: 'images/items/glasses-dining.jpg' },
    { name:'Table Cloth',       emoji:'🍽️', desc:'Dining table cloth or runner.',           tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/table-cloth.jpg' },
    { name:'Napkins',           emoji:'🧻', desc:'Cloth or paper napkins.',                  tags:'essentials',   defaultQty:12, unit:'',   link: '#', image: 'images/items/napkins.jpg' },
    { name:'Food Containers',   emoji:'📦', desc:'Airtight food storage containers.',        tags:'equipment',    defaultQty:4,  unit:'',   link: '#', image: 'images/items/food-containers-dining.jpg' },
    { name:'Serving Spoons',    emoji:'🥄', desc:'Large serving spoons and ladles.',         tags:'equipment',    defaultQty:3,  unit:'',   link: '#', image: 'images/items/serving-spoons.jpg' },
    { name:'Cleaning Spray',    emoji:'🧴', desc:'Multi-surface dining table cleaner.',      tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/cleaning-spray.jpg' },
  ],

  garden: [
    { name:'Seeds',             emoji:'🌱', desc:'Vegetable, flower or herb seeds.',          tags:'consumables',  defaultQty:3,  unit:'',   link: '#', image: 'images/items/seeds.jpg' },
    { name:'Soil',              emoji:'🌍', desc:'Potting mix or garden soil bag.',           tags:'consumables',  defaultQty:2,  unit:'bag', link: '#', image: 'images/items/soil.jpg' },
    { name:'Fertilizer',        emoji:'💊', desc:'Organic or chemical plant fertilizer.',     tags:'consumables',  defaultQty:1,  unit:'',   link: '#', image: 'images/items/fertilizer.jpg' },
    { name:'Gardening Gloves',  emoji:'🧤', desc:'Protective gardening gloves.',              tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/gardening-gloves.jpg' },
    { name:'Watering Can',      emoji:'🪣', desc:'Plastic or metal watering can.',            tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/watering-can.jpg' },
    { name:'Plant Pots',        emoji:'🪴', desc:'Terracotta or plastic plant pots.',         tags:'equipment',    defaultQty:4,  unit:'',   link: '#', image: 'images/items/plant-pots.jpg' },
    { name:'Garden Hose',       emoji:'🌊', desc:'Garden watering hose with nozzle.',         tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/garden-hose.jpg' },
    { name:'Pruning Scissors',  emoji:'✂️', desc:'Plant pruning shears.',                     tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/pruning-scissors.jpg' },
    { name:'Plant Support',     emoji:'🌿', desc:'Garden stakes and plant ties.',             tags:'equipment',    defaultQty:5,  unit:'',   link: '#', image: 'images/items/plant-support.jpg' },
    { name:'Insect Repellent',  emoji:'🦟', desc:'Garden insect and pest spray.',             tags:'essentials',   defaultQty:1,  unit:'',   link: '#', image: 'images/items/insect-repellent.jpg' },
  ],

  laundry: [
    { name:'Washing Powder',    emoji:'🧼', desc:'Detergent powder for clothes.',             tags:'consumables',  defaultQty:2,  unit:'kg', link: '#', image: 'images/items/washing-powder.jpg' },
    { name:'Liquid Detergent',  emoji:'🧴', desc:'Liquid detergent for delicates.',           tags:'consumables',  defaultQty:1,  unit:'L',  link: '#', image: 'images/items/liquid-detergent.jpg' },
    { name:'Fabric Softener',   emoji:'🌸', desc:'Fabric conditioner for soft clothes.',      tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/fabric-softener.jpg' },
    { name:'Stain Remover',     emoji:'✨', desc:'Stain remover stick or spray.',             tags:'essentials',   defaultQty:1,  unit:'',   link: '#', image: 'images/items/stain-remover.jpg' },
    { name:'Bleach',            emoji:'💧', desc:'Fabric whitening bleach.',                  tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/bleach.jpg' },
    { name:'Laundry Basket',    emoji:'🧺', desc:'Large laundry hamper.',                     tags:'equipment',    defaultQty:1,  unit:'',   link: '#', image: 'images/items/laundry-basket.jpg' },
    { name:'Hangers',           emoji:'🧥', desc:'Plastic or metal clothes hangers.',         tags:'equipment',    defaultQty:20, unit:'',   link: '#', image: 'images/items/hangers-laundry.jpg' },
    { name:'Cloth Clips',       emoji:'📎', desc:'Clothes pegs / drying clips.',              tags:'equipment',    defaultQty:20, unit:'',   link: '#', image: 'images/items/cloth-clips.jpg' },
    { name:'Cleaning Brush',    emoji:'🧹', desc:'Scrubbing brush for stains.',               tags:'cleaning',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/cleaning-brush.jpg' },
    { name:'Ironing Spray',     emoji:'🧴', desc:'Starch or smooth-iron spray.',             tags:'optional',     defaultQty:1,  unit:'',   link: '#', image: 'images/items/ironing-spray.jpg' },
  ],

};

/* ────────────────────────────────────────────────────────────
   SMART SUGGESTION RULES
   Map: itemName.toLowerCase() → [relatedItemNames]
   ──────────────────────────────────────────────────────────── */
const SUGGESTIONS = {
  'cooking oil':      ['Salt', 'Dishwash Liquid', 'Food Containers', 'Scrub Pad'],
  'rice':             ['Pulses', 'Salt', 'Cooking Oil', 'Food Containers'],
  'wheat flour':      ['Cooking Oil', 'Sugar', 'Salt'],
  'sugar':            ['Tea', 'Coffee', 'Milk'],
  'tea':              ['Sugar', 'Milk', 'Biscuits'],
  'coffee':           ['Sugar', 'Milk', 'Paper Cups'],
  'milk':             ['Sugar', 'Tea', 'Bread'],
  'eggs':             ['Bread', 'Cooking Oil', 'Salt'],
  'dishwash liquid':  ['Scrub Pad', 'Garbage Bags', 'Tissue Paper'],
  'toothpaste':       ['Toothbrush', 'Mouthwash', 'Soap'],
  'toothbrush':       ['Toothpaste', 'Mouthwash'],
  'shampoo':          ['Conditioner', 'Hair Oil', 'Towels'],
  'soap':             ['Shampoo', 'Hand Wash', 'Towels'],
  'hand wash':        ['Tissues', 'Soap', 'Towels'],
  'toilet cleaner':   ['Toilet Brush', 'Floor Cleaner', 'Air Freshener'],
  'bedsheet':         ['Pillow Covers', 'Blanket', 'Mosquito Repellent'],
  'pillow':           ['Pillow Covers', 'Bedsheet', 'Night Lamp'],
  'curtains':         ['Hangers', 'Bedsheet', 'Cushion Covers'],
  'pens':             ['Notebooks', 'Sticky Notes', 'Files'],
  'notebooks':        ['Pens', 'Highlighter', 'Files'],
  'printer ink':      ['A4 Paper', 'USB Drive'],
  'a4 paper':         ['Pens', 'Stapler', 'Files', 'Printer Ink'],
  'washing powder':   ['Fabric Softener', 'Stain Remover', 'Hangers'],
  'liquid detergent': ['Fabric Softener', 'Stain Remover', 'Cloth Clips'],
  'seeds':            ['Soil', 'Fertilizer', 'Plant Pots', 'Watering Can'],
  'soil':             ['Seeds', 'Fertilizer', 'Plant Pots'],
  'plant pots':       ['Soil', 'Seeds', 'Fertilizer'],
  'plates':           ['Bowls', 'Spoons', 'Glasses', 'Napkins'],
  'tea powder':       ['Sugar', 'Milk', 'Paper Cups', 'Biscuits'],
  'biscuits':         ['Tea', 'Coffee', 'Snacks'],
  'fabric softener':  ['Washing Powder', 'Cloth Clips', 'Hangers'],
};

/**
 * Get smart suggestions for a given item name
 * @param {string} itemName
 * @returns {string[]} — array of suggestion names
 */
function getSmartSuggestions(itemName) {
  const key = itemName.toLowerCase().trim();
  return SUGGESTIONS[key] || [];
}

/* ────────────────────────────────────────────────────────────
   WIZARD LOGIC — area + shopping type → suggested items
   ──────────────────────────────────────────────────────────── */
const WIZARD_PRESETS = {
  // kitchen
  'kitchen|regular restocking':  ['Rice', 'Wheat Flour', 'Cooking Oil', 'Sugar', 'Salt', 'Milk', 'Eggs', 'Pulses'],
  'kitchen|monthly shopping':    ['Rice', 'Wheat Flour', 'Cooking Oil', 'Sugar', 'Salt', 'Tea', 'Coffee', 'Spices', 'Pulses', 'Milk', 'Tissue Paper', 'Dishwash Liquid'],
  'kitchen|moving in':           ['Rice', 'Wheat Flour', 'Cooking Oil', 'Sugar', 'Salt', 'Food Containers', 'Scrub Pad', 'Dishwash Liquid', 'Garbage Bags', 'Tissue Paper'],
  'kitchen|cleaning':            ['Dishwash Liquid', 'Scrub Pad', 'Garbage Bags', 'Tissue Paper'],
  'kitchen|party':               ['Snacks', 'Biscuits', 'Fruits', 'Milk', 'Tea', 'Coffee', 'Sugar', 'Tissue Paper'],
  'kitchen|emergency':           ['Rice', 'Salt', 'Cooking Oil', 'Pulses', 'Tissue Paper'],
  // bathroom
  'bathroom|regular restocking': ['Soap', 'Toothpaste', 'Shampoo', 'Hand Wash', 'Tissues'],
  'bathroom|monthly shopping':   ['Soap', 'Toothpaste', 'Toothbrush', 'Shampoo', 'Conditioner', 'Hand Wash', 'Toilet Cleaner', 'Floor Cleaner', 'Tissues', 'Air Freshener'],
  'bathroom|moving in':          ['Soap', 'Toothpaste', 'Toothbrush', 'Shampoo', 'Hand Wash', 'Toilet Cleaner', 'Floor Cleaner', 'Bucket', 'Mug', 'Toilet Brush', 'Towels'],
  'bathroom|cleaning':           ['Toilet Cleaner', 'Floor Cleaner', 'Toilet Brush', 'Air Freshener'],
  'bathroom|emergency':          ['Soap', 'Toothpaste', 'Hand Wash', 'Tissues'],
  // bedroom
  'bedroom|moving in':           ['Bedsheet', 'Pillow', 'Pillow Covers', 'Blanket', 'Curtains', 'Hangers', 'Night Lamp', 'Mosquito Repellent'],
  'bedroom|regular restocking':  ['Pillow Covers', 'Mosquito Repellent', 'Air Freshener'],
  'bedroom|monthly shopping':    ['Pillow Covers', 'Mosquito Repellent', 'Air Freshener', 'Hangers'],
  'bedroom|cleaning':            ['Air Freshener', 'Mosquito Repellent'],
  // office
  'office|regular restocking':   ['Pens', 'Notebooks', 'Sticky Notes', 'A4 Paper'],
  'office|monthly shopping':     ['Pens', 'Pencils', 'Notebooks', 'A4 Paper', 'Sticky Notes', 'Files', 'Staples', 'Tape', 'Cleaning Wipes'],
  'office|moving in':            ['A4 Paper', 'Pens', 'Pencils', 'Notebooks', 'Files', 'Folders', 'Stapler', 'Scissors', 'Tape', 'Desk Organizer', 'Markers', 'USB Drive'],
  'office|cleaning':             ['Cleaning Wipes'],
  // whole house
  'whole house|moving in':       ['Rice', 'Cooking Oil', 'Salt', 'Soap', 'Toothpaste', 'Hand Wash', 'Bedsheet', 'Pillow', 'Curtains', 'Hangers', 'Tissue Paper', 'Garbage Bags'],
  'whole house|monthly shopping':['Rice', 'Cooking Oil', 'Salt', 'Milk', 'Tea', 'Coffee', 'Sugar', 'Soap', 'Shampoo', 'Toothpaste', 'Hand Wash', 'Toilet Cleaner', 'Dishwash Liquid', 'Tissue Paper'],
  'whole house|regular restocking':['Rice', 'Cooking Oil', 'Milk', 'Soap', 'Toothpaste', 'Hand Wash'],
  'whole house|emergency':       ['Rice', 'Salt', 'Cooking Oil', 'Soap', 'Hand Wash', 'Tissue Paper'],
};

/**
 * Get wizard-suggested items for a given area + shopping type
 * @param {string} area
 * @param {string} type
 * @returns {string[]}
 */
function getWizardSuggestions(area, type) {
  const key = `${area.toLowerCase()}|${type.toLowerCase()}`;
  return WIZARD_PRESETS[key] || [];
}

/* ────────────────────────────────────────────────────────────
   SEARCH — search items across all categories
   ──────────────────────────────────────────────────────────── */

/**
 * Search all items across all categories
 * @param {string} query
 * @returns {Array<{ item, category, categorySlug }>}
 */
function searchAllItems(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results = [];
  for (const [slug, items] of Object.entries(ITEMS)) {
    const catMeta = CATEGORIES[slug];
    for (const item of items) {
      if (
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        catMeta.name.toLowerCase().includes(q)
      ) {
        results.push({ item, category: catMeta, categorySlug: slug });
      }
    }
  }
  return results;
}

/* ────────────────────────────────────────────────────────────
   CATEGORY IMAGE FALLBACKS (gradient + emoji combos)
   ──────────────────────────────────────────────────────────── */
const CAT_GRADIENTS = {
  kitchen:      'linear-gradient(135deg, #D4AF37 0%, #8B5E3C 100%)',
  bathroom:     'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  bedroom:      'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  office:       'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
  'study-room': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'staff-room': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'living-room':'linear-gradient(135deg, #4facfe 0%, #a18cd1 100%)',
  'dining-room':'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  garden:       'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
  laundry:      'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
};
