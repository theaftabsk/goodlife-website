"use client";

import React from "react";
import SubpageTemplate from "../../components/SubpageTemplate";

export default function HeavyBulkyCommercePage() {
  return (
    <SubpageTemplate
      badge="Specialised Commerce • Large Appliances & Fragile Bulky"
      title={
        <>
          Heavy & Bulky Commerce: <br />
          <span style={{ color: "#2563EB" }}>Engineered Logistics for Large-Format Brands</span>
        </>
      }
      subtitle="Ceiling fans, kitchen chimneys, water heaters, commercial cookware, and large consumer appliances cannot be operated like standard small-parcel ecommerce. Good Life provides purpose-built bulky infrastructure across India."
      stats={[
        { value: "<0.4%", label: "In-Transit Damage Rate", sub: "Engineered crating & palletized handling" },
        { value: "12 Hubs", label: "Bulky-Ready Facilities", sub: "Dock levelers, heavy racking & forklifts" },
        { value: "48-72h", label: "Pan-India Delivery SLA", sub: "Pre-positioned regional inventory" },
        { value: "100%", label: "Scheduled Slot Delivery", sub: "Two-person white-glove doorstep delivery" }
      ]}
      overviewTitle="Why Traditional 3PLs Fail at Heavy & Bulky Commerce"
      overviewText="Selling 15kg to 80kg appliances online comes with severe operational hurdles: excessive volumetric shipping fees, catastrophic transit breakage in standard parcel conveyor belts, soaring return freight costs, and customer cancellations caused by multi-week delivery delays. Standard ecommerce agencies treat large appliances like fashion items. Good Life operates specialized heavy-handling infrastructure: reinforced pallet racking, custom drop-tested packaging, freight carrier volume contracts, and integrated installation coordination."
      challenges={[
        {
          title: "Catastrophic Transit Breakage & Dent Rates",
          desc: "Glass chimney canopies, enameled water heater tanks, and painted fan blades crack or bend when handled by automated small-parcel courier sorting chutes."
        },
        {
          title: "Crippling Volumetric Weight Overcharges",
          desc: "Large dimensional boxes attract astronomical courier charges if deadweight-to-volume ratios are mismanaged or master carton sizes are unoptimized."
        },
        {
          title: "Post-Delivery Installation Friction & Cancellations",
          desc: "Customers cancel orders or request returns simply because the marketplace technician did not arrive within 24 hours of appliance delivery."
        }
      ]}
      pillarsTitle="End-to-End Heavy & Bulky Operating Capabilities"
      pillarsSubtitle="Every operational aspect—from factory container de-stuffing to doorstep white-glove unboxing—is managed under our accountable standard."
      pillars={[
        {
          num: "01",
          title: "Drop-Tested Packaging & Custom Crating",
          desc: "Custom-engineered packaging designed specifically to survive rough Indian transit conditions and multiple transshipment touches.",
          deliverables: [
            "ISTA-certified drop test and vibration impact packaging validation",
            "Custom foam corner caps, honeycombed edge boards, and wooden crating",
            "Tamper-evident strapping and water-resistant protective wrapping",
            "Carrier dimensional certification to eliminate volumetric billing disputes"
          ]
        },
        {
          num: "02",
          title: "Specialized Bulky Racking & Material Handling",
          desc: "Heavy-duty warehouse facilities equipped with dock levelers, battery forklifts, and wide-aisle pallet storage.",
          deliverables: [
            "Palletized storage systems supporting up to 1,500kg per bay",
            "Zero-crush vertical stacking protocols for boxed appliances",
            "Forklift-operated container loading and unloading bays",
            "24/7 climate-controlled, dry-floor storage protecting electrical components"
          ]
        },
        {
          num: "03",
          title: "Heavy Freight Carrier Integration & Surface SLAs",
          desc: "Direct operational line-hauls with dedicated surface carriers: Delhivery Heavy, SpotOn, Rivigo, and Safexpress.",
          deliverables: [
            "Negotiated enterprise LTL (Less-than-Truckload) and FTL freight contracts",
            "Priority dock clearance bypassing standard sorting conveyor lines",
            "End-to-end GPS-tracked line-haul tracking across national arterial highways",
            "Multi-piece shipment handling ensuring motors, blades, and accessories travel together"
          ]
        },
        {
          num: "04",
          title: "Two-Person Delivery & White-Glove Doorstep Service",
          desc: "Specialized last-mile crews trained to carry bulky appliances up stairwells and inside customer premises safely.",
          deliverables: [
            "Customer pre-call appointment scheduling before dispatch attempt",
            "Two-man delivery teams equipped with stair-climbing hand trucks",
            "Open-box delivery option allowing immediate customer visual verification",
            "Instant digital proof-of-delivery (e-POD) with timestamped unboxing photos"
          ]
        },
        {
          num: "05",
          title: "Integrated Technician Installation Scheduling",
          desc: "Synchronizing physical parcel delivery with OEM or marketplace installation technicians to eliminate buyer friction.",
          deliverables: [
            "Automated technician ticket generation upon out-for-delivery status",
            "Customer WhatsApp notifications with designated service engineer contact",
            "Sub-24h installation turn-around tracking across metro clusters",
            "Proactive customer support resolving accessory or demo queries"
          ]
        },
        {
          num: "06",
          title: "Bulky Reverse Logistics & Damage Repair Hub",
          desc: "Dedicated reverse transport and regional repair workflows that prevent costly long-distance return shipping.",
          deliverables: [
            "Regional inspection docks testing returned motors and compressors",
            "Minor cosmetic repair, touch-up, and repackaging to Grade A status",
            "Filing of comprehensive carrier damage insurance and SAFE-T claims",
            "Vendor return consolidation eliminating fragmented reverse freight bills"
          ]
        }
      ]}
      workflowTitle="Our Bulky Operating Framework"
      workflowSteps={[
        {
          step: "01",
          title: "Packaging Engineering Audit",
          desc: "We analyze carton dimensions, corner buffers, and weight ratios, eliminating dead space and carrier overcharges.",
          timeline: "Week 1 - 2"
        },
        {
          step: "02",
          title: "Regional Warehouse Inwarding",
          desc: "Stock is deployed across our 12 regional bulky hubs, enabling next-day surface delivery across India.",
          timeline: "Week 2 - 3"
        },
        {
          step: "03",
          title: "Marketplace Listing & Buybox Calibration",
          desc: "Configuring heavy-bulky shipping templates on Amazon & Flipkart with localized pin-code serviceability.",
          timeline: "Week 3 - 4"
        },
        {
          step: "04",
          title: "Scaled Execution & Installation Sync",
          desc: "Daily automated order dispatch, scheduled two-person delivery, and seamless installation tracking.",
          timeline: "Ongoing Daily"
        }
      ]}
      faqs={[
        {
          q: "What product categories are considered Heavy & Bulky?",
          a: "Products exceeding 10kg deadweight or significant volumetric dimensions: ceiling & pedestal fans, kitchen chimneys, water geysers, air coolers, microwaves, exercise treadmills, large cookware sets, and modular furniture."
        },
        {
          q: "How does Good Life prevent transit damage on glass and enamelled appliances?",
          a: "We conduct drop-test simulations and mandate reinforced honeycombed edge protectors, heavy-duty 5-ply cartons, and shrink-wrapped palletization. Furthermore, our shipments bypass rough mechanical sorting conveyors and travel via direct palletized surface line-hauls."
        },
        {
          q: "Can you provide localized next-day delivery for large appliances?",
          a: "Yes. By distributing your inventory across our 12 regional fulfillment centers (Bhiwandi, Gurugram, Bengaluru, Kolkata, etc.), orders are fulfilled locally within 24 to 48 hours rather than shipping across the country from a single factory warehouse."
        },
        {
          q: "How are customer returns handled for large items?",
          a: "We deploy specialized reverse surface logistics to retrieve the item, conduct an on-dock technical assessment at the nearest regional hub, and determine whether the unit can be repaired/repacked locally or requires a manufacturer credit dispute."
        }
      ]}
      relatedSolutions={[
        { name: "Warehousing & Fulfilment", href: "/capabilities/warehousing-fulfilment", tag: "Capability 04" },
        { name: "Fulfilment Network Map", href: "/specialised/fulfilment-network", tag: "Specialised 02" },
        { name: "Scale Pan-India Solution", href: "/solutions/scale-pan-india", tag: "Solution 03" }
      ]}
    />
  );
}
