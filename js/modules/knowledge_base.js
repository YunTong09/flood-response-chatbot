// === 1️⃣ Static knowledge base ===
export const knowledgeBase = {
    intro: [
        "⚠️ I am not an emergency service. If you are in danger, call 000.",
        "I provide general flood safety guidance for Brisbane based on official sources.",
        "Type 1️⃣ for before a flood, 2️⃣ for during, 3️⃣ for after.\nOr ask questions like 'What should I put in my emergency kit?'",
    ],
    replies: {
        before: "Before a flood:\n• Make your emergency plan.\n• Prepare an emergency kit (food, water, medicine, documents).\n• Sign up for Brisbane’s Severe Weather Alert Service.\n• Clear drains and plan evacuation routes.\n• If your area is prone to flooding, lay sandbags around doors and low entry points to protect your property.\n\nSource: Brisbane City Council; Get Ready Queensland.",
        during: "During a flood:\n• Never drive or walk through floodwater.\n• Move to higher ground.\n• Follow BoM and Council updates via Emergency Dashboard.\n\nSource: BoM; Brisbane City Council.",
        after: "After a flood:\n• Only return home when authorities say it’s safe.\n• Wear gloves and boots when cleaning.\n• Call Lifeline (13 11 14) for support.\n\nSource: Brisbane City Council; Queensland Government.",
    },
    qna: [
        {
            keywords: [
                "warning levels",
                "what do warning levels mean",
                "flood warning meaning",
                "minor flood",
                "moderate flood",
                "major flood",
                "what is flood warning",
            ],
            answer:
                "⚠️ <b>Understanding Flood Warning Levels</b><br><br>" +
                "The Bureau of Meteorology (BoM) issues flood warnings with three main levels of severity:<br><br>" +
                "• <b>Minor Flooding</b> – Water covers low-lying areas, roads and parks. Some houses may be affected.<br>" +
                "• <b>Moderate Flooding</b> – Floodwater may enter homes and isolate communities. Roads and bridges can be cut off.<br>" +
                "• <b>Major Flooding</b> – Widespread flooding with significant impact on communities, requiring evacuation.<br><br>" +
                "You can view current warning levels and updates here:<br>" +
                "🔗 <a href='https://www.bom.gov.au/qld/warnings/' target='_blank' rel='noopener noreferrer'>BoM Queensland Warnings</a><br>" +
                "🔗 <a href='https://www.bom.gov.au/water/floods/floodWarningServices.shtml' target='_blank' rel='noopener noreferrer'>BoM – Flood Warning Services</a><br><br>" +
                "Source: Bureau of Meteorology (BoM) – Queensland Flood Warnings.",
        },
        {
            keywords: [
                "power goes out",
                "power outage",
                "electricity cut",
                "no power",
                "blackout",
                "outage",
                "lost power",
            ],
            answer:
                "💡 <b>What to do if the power goes out during a flood</b><br><br>" +
                "• Stay calm and use a <b>torch</b> instead of candles to avoid fire risks.<br>" +
                "• Turn off and unplug electrical appliances to prevent damage when power returns.<br>" +
                "• Keep refrigerator and freezer doors closed to preserve food for as long as possible.<br>" +
                "• Avoid touching electrical equipment if it’s wet or you’re standing in water.<br>" +
                "• Check the <a href='https://www.energex.com.au/outages/outage-finder/outage-finder-map/' target='_blank' rel='noopener noreferrer'>Energex Outage Finder</a> for <b>real-time outage information</b> in your area.<br>" +
                "• Report life-threatening emergencies (e.g. fallen power lines) to <b>Energex 13 19 62</b> or call <b>000</b>.<br><br>" +
                "Source: Energex",
        },
        {
            keywords: [
                "live update",
                "updates",
                "update",
                "real time update",
                "live information",
                "where can i get updates",
                "flood warning update",
                "weather update",
                "current flood",
                "ongoing flood",
                "latest flood alert",
                "road closures",
                "road closed",
                "traffic update",
                "blocked road",
                "bridge closed",
                "flooded roads",
                "power outage",
                "no electricity",
                "blackout",
                "power cut",
                "safe to drive",
                "drive",
            ],
            answer:
                "📢 <b>Where to get live flood updates</b><br><br>" +
                "• Visit the <a href='https://www.bom.gov.au/qld/warnings/' target='_blank' rel='noopener noreferrer'>Bureau of Meteorology (BoM) Queensland Warnings</a> page for <b>real-time flood and weather alerts</b>.<br>" +
                "• Visit the <a href='https://www.energex.com.au/outages/outage-finder/outage-finder-map/' target='_blank' rel='noopener noreferrer'>Energex Outage Finder</a> for <b>real-time power outage updates</b> across Brisbane.<br>" +
                "• Tune in to <b>ABC Radio Brisbane (612 AM)</b> for live emergency broadcasts.<br><br>" +
                "💬 You can also type <b>'BOM alert'</b> to check the latest official BoM warnings directly through this chatbot.<br><br>" +
                "Source: Bureau of Meteorology; Brisbane City Council.",
        },
        {
            keywords: [
                "Emergency plan",
                "make plan",
                "create plan",
                "how to plan",
                "prepare plan",
                "plan",
            ],
            answer:
                "Here is the official <b>Emergency Plan Guide</b> from Get Ready Queensland (Queensland Government):<br><br>" +
                "🔗<a href='https://plan.getready.qld.gov.au/' target='_blank' rel='noopener noreferrer'>Make a plan on Get Ready Queensland</a><br><br>",
        },
        {
            keywords: ["kit", "emergency", "prepare"],
            answer: "Your emergency kit should include:\n• Water\n• Food\n• First-aid kit\n• Torch\n• Phone charger\n• Medicines\n• Pet items\n\nSource: Get Ready Queensland.",
        },
        {
            keywords: [
                "checklist",
                "kit list",
                "items",
                "prepare list",
                "what should i pack",
                "what to pack",
                "how to prepare",
                "how many",
                "how much",
                "how much water",
                "how much water do i need",
                "many",
                "quantity",
                "water amount",
                "water litres",
                "water liters",
                "detailed list",
            ],
            answer:
                "Here’s the official <b>Emergency Kit Checklist</b> from Get Ready Queensland (Queensland Government):<br><br>" +
                "🧃 Water for three days – at least <b>10 litres per person</b><br>" +
                "🥫 Non-perishable food for three days<br>" +
                "💊 Medications and first-aid supplies (1 week’s supply)<br>" +
                "🧴 Toiletries – soap, sanitiser, sunscreen, toilet paper<br>" +
                "📄 Important documents – ID, insurance, contacts<br>" +
                "👶 Baby supplies – nappies, formula, wipes<br>" +
                "🐶 Pet food, water and bowls (3-day supply)<br>" +
                "🔦 Torch, radio, batteries, power bank, thick gloves<br>" +
                "🧥 Spare clothes, waterproof jacket, bedding<br>" +
                "💰 Cash, cards, and small entertainment items<br><br>" +
                "🔗 <a href='https://www.getready.qld.gov.au/sites/default/files/2023-12/GRQ%20Emergency%20Kit%20checklist.pdf' target='_blank' rel='noopener noreferrer'>View full checklist on Get Ready Queensland</a><br><br>" +
                "Source: Queensland Government – Get Ready Queensland Emergency Kit Checklist (2024).",
        },
        {
            keywords: ["alert", "sms", "warning"],
            answer:
                "You can register for Brisbane’s Severe Weather Alert Service for SMS or email warnings.<br><br>" +
                "🔗 <a href='https://bswa.brisbane.qld.gov.au/' target='_blank' rel='noopener noreferrer'>Brisbane City Council – Severe Weather Alert Service</a>",
        },
        {
            keywords: [
                "risk",
                "flood",
                "flood map",
                "flood awareness",
                "likelihood",
                "impact",
                "check risk",
            ],
            answer:
                "🗺️ <b>Brisbane Flood Awareness Map</b><br><br>" +
                "The Flood Awareness Map shows the probability and impact of flooding from:<br>" +
                "• Creek and river flooding<br>" +
                "• Storm tide<br>" +
                "• Overland flow<br><br>" +
                "Understanding the terms:<br>" +
                "• <b>Flood likelihood</b>: The probability of a flood occurring<br>" +
                "• <b>Impact</b>: The potential effects of flooding in your area<br><br>" +
                "🔗 <a href='https://www.brisbane.qld.gov.au/community-and-safety/community-safety/disasters-and-emergencies/be-prepared/flooding-in-brisbane/flood-awareness-map' target='_blank' rel='noopener noreferrer'>Check your property on the Flood Awareness Map</a><br><br>" +
                "Source: Brisbane City Council Flood Awareness Information",
        },
        {
            keywords: [
                "after flood",
                "assistance",
                "recovery",
                "financial help",
                "disaster assistance",
            ],
            answer:
                "For recovery and financial help after a flood, visit Queensland Government Disaster Assistance.<br><br>" +
                "💰 <a href='https://www.qld.gov.au/community/disasters-emergencies' target='_blank' rel='noopener noreferrer'>QLD Disaster Assistance</a>",
        },

        {
            keywords: [
                "store sandbag",
                "keep sandbag",
                "storage sandbag",
                "how to store sandbags",
                "where to store sandbags",
            ],
            answer:
                "🪣 <b>How to store sandbags</b><br><br>" +
                "• Store sandbags in a cool, dry area away from direct sunlight.<br>" +
                "• Keep them protected from the elements (rain and moisture).<br>" +
                "• When stored correctly, sandbags can last up to 12 months before use.<br><br>" +
                "🔗 <a href='https://www.brisbane.qld.gov.au/community-support-and-safety/natural-disasters-and-emergencies/prepare-for-an-emergency' target='_blank' rel='noopener noreferrer'>Brisbane City Council – Sandbag Storage Advice</a><br><br>" +
                "Source: Brisbane City Council (2024).",
        },
        {
            keywords: [
                "dispose sandbag",
                "throw sandbag",
                "remove sandbag",
                "after flood sandbag",
                "sandbag disposal",
            ],
            answer:
                "🚮 <b>Disposing of sandbags</b><br><br>" +
                "• Don’t put sand or full sandbags in household bins (general, recycling, or green waste).<br>" +
                "• Spread unused sand on your garden or lawn and keep empty bags for reuse.<br>" +
                "• Contaminated sandbags (stormwater, oil, or waste) can be taken to <b>resource recovery centres</b> — general waste fees apply.<br>" +
                "• If you can’t dispose of them yourself, ask family, friends, or community support agencies for help.<br><br>" +
                "🔗 <a href='https://www.brisbane.qld.gov.au/community-support-and-safety/natural-disasters-and-emergencies/prepare-for-an-emergency' target='_blank' rel='noopener noreferrer'>Brisbane City Council – Sandbag Disposal Information</a><br><br>" +
                "Source: Brisbane City Council (2024).",
        },
        {
            keywords: [
                "lay sandbag",
                "put sandbag",
                "how to use sandbag",
                "set up sandbag",
                "stack sandbag",
                "install sandbag",
            ],
            answer:
                "🧱 <b>How to lay sandbags</b><br><br>" +
                "• Place sandbags in front of doorways and low areas to redirect water flow.<br>" +
                "• Lay them like bricks – staggered and overlapping, with ends tucked in tightly.<br>" +
                "• Avoid stacking them higher than 3 layers; water pressure can push them over.<br>" +
                "• Use plastic sheeting between layers if possible to reduce leaks.<br><br>" +
                "🔗 <a href='https://www.getready.qld.gov.au/be-prepared/household/sandbags' target='_blank' rel='noopener noreferrer'>Learn more: Get Ready Queensland – Sandbag Preparation Guide</a><br><br>" +
                "Source: Queensland Government – Get Ready Queensland.",
        },
        {
            keywords: [
                "pets",
                "pet supplies",
                "dog",
                "cat",
                "animal",
                "pet food",
                "pet water",
            ],
            answer: "You can prepare some dry food, water and feeding bowls for your pet.<br>",
        },

        {
            keywords: [
                "psychological support",
                "mental health",
                "feel anxious",
                "feeling sad",
                "emotional help",
                "stress",
                "trauma",
                "need support",
                "talk to someone",
            ],
            answer:
                "<b>Psychological and Emotional Support Services</b><br><br>" +
                "If you’re feeling anxious, overwhelmed, or emotionally affected by the flood, these services can help:<br><br>" +
                "<b>Lifeline (24/7)</b><br>" +
                "📞 13 11 14<br>" +
                "<a href='https://www.lifeline.org.au' target='_blank' rel='noopener noreferrer'>lifeline.org.au</a><br><br>" +
                "<b>Beyond Blue (24/7)</b><br>" +
                "📞 1300 22 4636<br>" +
                "<a href='https://www.beyondblue.org.au' target='_blank' rel='noopener noreferrer'>beyondblue.org.au</a><br><br>" +
                "<b>Community Recovery Hotline (Queensland Government)</b><br>" +
                "📞 1800 173 349<br>" +
                "Offers social, emotional, and practical support after disasters.<br><br>" +
                "<b>UQ Student Support (for students)</b><br>" +
                "📞 +61 7 3365 1704<br>" +
                "<a href='https://my.uq.edu.au/student-support/wellbeing' target='_blank' rel='noopener noreferrer'>UQ Wellbeing Support</a><br><br>" +
                "<b>Queensland Health – Mental Health Support</b><br>" +
                "<a href='https://www.qld.gov.au/health/mental-health' target='_blank' rel='noopener noreferrer'>qld.gov.au/health/mental-health</a><br><br>" +
                "You’re not alone. It’s okay to reach out for help — trained counsellors are available 24/7.",
        },
        {
            keywords: [
                "clean up",
                "cleaning",
                "cleanup",
                "safely clean",
                "after flood clean",
                "wash",
                "disinfect",
            ],
            answer:
                "🧽 <b>Cleaning up safely after a flood</b><br><br>" +
                "• Always wear gloves, boots, and protective clothing.<br>" +
                "• Do not enter your home until authorities confirm it’s safe.<br>" +
                "• Wash and disinfect all surfaces that have been in contact with floodwater.<br>" +
                "• Discard food, mattresses, and soft furnishings that were soaked.<br>" +
                "• Open windows and use fans to dry out rooms and prevent mould.<br><br>" +
                "💬 If you feel anxious or need emotional support, contact <b>Lifeline (13 11 14)</b>.<br><br>" +
                "🔗 <a href='https://www.qld.gov.au/community/disasters-emergencies/disasters/rebuilding-cleaning/returning-home/home-property-repairs' target='_blank' rel='noopener noreferrer'>Queensland Government – Cleaning Up After a Disaster</a><br><br>" +
                "Source: Queensland Government; Brisbane City Council.",
        },
        {
            keywords: [
                "sign up for alerts",
                "register for alerts",
                "subscribe alert",
                "receive alert",
                "weather alert service",
                "get notifications",
                "get alerts",
            ],
            answer:
                "📢 <b>Signing up or subscribe for flood and weather alerts</b><br><br>" +
                "You can register for Brisbane’s <b>Severe Weather Alert Service</b> to receive free SMS, email warnings during severe weather events.<br><br>" +
                "🔗 <a href='https://subscribe.bom.gov.au/weather-app-warnings/' target='_blank' rel='noopener noreferrer'>Brisbane City Council – Severe Weather Alert Service</a><br><br>" +
                "🔗 <a href='https://info.bom.gov.au/subscribe/' target='_blank' rel='noopener noreferrer'>Brisbane City Council – Severe Weather Alert Service</a><br><br>" +
                "Source: Brisbane City Council.",
        },
        {
            keywords: [
                "evacuation",
                "evacuation centre",
                "shelter",
                "cyclone shelter",
                "where to go",
                "evacuation information",
            ],
            answer:
                "🚨 <b>Evacuation Centres and Shelters</b><br><br>" +
                "During a disaster, information about evacuations and cyclone shelters will be broadcast through official channels such as:<br>" +
                "• Local <b>ABC radio</b> and commercial radio stations<br>" +
                "• <b>Emergency Alert</b> phone warnings<br>" +
                "• Local TV news<br>" +
                "• Your <b>local council</b> website and updates<br>" +
                "• Door-knocking by emergency services<br><br>" +
                "If you are asked to evacuate, it means there is a <b>real danger</b>. Please follow the instructions from authorities immediately.<br><br>" +
                "📻 <a href='https://www.qld.gov.au/community/disasters-emergencies/prepare/evacuation-centres' target='_blank' rel='noopener noreferrer'>Queensland Government – Evacuation Centres</a><br><br>" +
                "Source: Queensland Government – Disaster and Emergency Management.",
        },
        {
            keywords: [
                "store kit",
                "keep kit",
                "where should i store the kit",
                "emergency kit location",
                "where to keep emergency kit",
            ],
            answer:
                "📦 <b>Where to store your emergency kit</b><br><br>" +
                "• Keep your emergency kit in a <b>cool, dry, and easy-to-reach place</b> that all family members know.<br>" +
                "• Store it <b>off the floor</b> and away from flood-prone areas such as basements or garages.<br>" +
                "• If you have a car, consider keeping a smaller emergency kit inside it.<br>" +
                "• Check and update your kit every 6 months — replace expired food, batteries, and medications.<br><br>" +
                "Source: Get Ready Queensland – Emergency Kit Preparation Guide.",
        },
    ],
};