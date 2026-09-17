export type Question = {
  id: string;
  topic: string;
  q: string;
  choices: string[];
  answer: number;
  why: string;
  ref: string;
};

/**
 * DRAFT CONTENT — NOT YET LICENSED-REVIEWER APPROVED.
 *
 * Every question below is original, written against the published topic
 * structure of the Tennessee Business and Law exam. Citations marked
 * "(reviewer: confirm...)" are ones where the governing statute is
 * identified but the exact subsection still needs verification.
 *
 * Nothing here should be shown to a paying student until the reviewer has
 * signed off. The free/early-access site may show it labelled as draft.
 */
export const QUESTIONS: Question[] = [
  {
    id: "BL-101",
    topic: "Licensing law",
    q: "Below what total contract value (labor and materials) is a general contractor's license generally NOT required for construction, alteration, repair, or improvement work in Tennessee?",
    choices: ["$10,000", "$25,000", "$50,000", "$100,000"],
    answer: 1,
    why: "The $25,000 threshold is the baseline trigger for most contractor license classifications. Below it, work typically falls under the home improvement contractor registration framework instead of full licensure.",
    ref: "Tenn. Code Ann. § 62-6-101 et seq.",
  },
  {
    id: "BL-102",
    topic: "Licensing law",
    q: "At what dollar threshold does masonry work require a licensed masonry contractor, even if a general contractor's overall project is smaller?",
    choices: ["$25,000", "$50,000", "$100,000", "$250,000"],
    answer: 2,
    why: "Masonry carries its own higher threshold. A masonry portion of a project must exceed $100,000 in materials and labor before a licensed masonry contractor is required.",
    ref: "Tenn. Code Ann. § 62-6-102(5)",
  },
  {
    id: "BL-103",
    topic: "Licensing law",
    q: "How does Tennessee law define a Limited Licensed Electrician (LLE)?",
    choices: [
      "Any electrician with under 2 years of experience",
      "A person or entity performing electrical work totaling less than $25,000, registered under § 68-102-150",
      "An apprentice working under a master electrician's supervision",
      "Any electrician working only in residential settings",
    ],
    answer: 1,
    why: "The LLE classification is defined by project dollar value, not experience level or setting: electrical work under $25,000 that is registered under the separate electrical registration statute.",
    ref: "Tenn. Code Ann. § 62-6-102(6)",
  },
  {
    id: "BL-104",
    topic: "Licensing law",
    q: "On a bid for a project valued at $25,000 or more, what must a prime contractor disclose about certain subcontractors in the bid documents?",
    choices: [
      "Nothing, subcontractor licensing is the subcontractor's own responsibility",
      "Only the subcontractor's business name",
      "The subcontractor's licensed name, license ID number, classification, and expiration date",
      "Only a certificate of insurance",
    ],
    answer: 2,
    why: "For projects at or above $25,000, the prime contractor must list this licensing detail for subcontractors performing electrical, plumbing, mechanical, HVAC, and (over $100,000) masonry work.",
    ref: "Tenn. Code Ann. § 62-6-119",
  },
  {
    id: "BL-105",
    topic: "Licensing law",
    q: "A contractor bids on and is awarded a project without holding the required license. Under Tennessee law, what is one direct consequence?",
    choices: [
      "A written warning only, with no other penalty",
      "The license, once later obtained, may be denied or held for up to six months, and the contractor becomes ineligible for that award or any re-bid",
      "The contractor must simply refund 10% of the contract price",
      "No consequence if the work is completed satisfactorily",
    ],
    answer: 1,
    why: "Bidding, contracting, or pulling a permit without the proper license and classification is a violation with real licensing consequences, not just a completion-quality issue.",
    ref: "Tenn. Code Ann. § 62-6-120",
  },
  {
    id: "BL-106",
    topic: "Licensing law",
    q: "Beyond licensing-board consequences, what is the criminal exposure for contracting without a required license in Tennessee?",
    choices: [
      "It is a civil matter only, never criminal",
      "A Class A felony",
      "A misdemeanor",
      "There is no criminal exposure under state law, only local ordinance violations",
    ],
    answer: 2,
    why: "Unlicensed contracting above the threshold carries misdemeanor liability under state law, separate from and in addition to any licensing-board penalty.",
    ref: "Tenn. Code Ann. § 62-6-136",
  },
  {
    id: "BL-107",
    topic: "Licensing law",
    q: "How does Tennessee law define a 'prime contractor'?",
    choices: [
      "The contractor with the largest dollar value on a project",
      "One who contracts directly with the owner",
      "The first contractor hired on a project's timeline",
      "Any contractor holding a commercial classification",
    ],
    answer: 1,
    why: "Privity with the owner is what defines a prime contractor, not project size, hiring order, or license classification.",
    ref: "Tenn. Code Ann. § 62-6-102(7)",
  },
  {
    id: "BL-108",
    topic: "Licensing law",
    q: "A contractor's work is limited to construction, remodeling, repair, or improvement of one to four family unit residences not exceeding three stories. What classification does this describe?",
    choices: [
      "Commercial building contractor",
      "Residential contractor",
      "Prime contractor",
      "Home improvement registrant",
    ],
    answer: 1,
    why: "This is the statutory definition of a residential contractor: unit count and height cap, not project dollar value.",
    ref: "Tenn. Code Ann. § 62-6-102(8)",
  },
  {
    id: "BL-109",
    topic: "Licensing law",
    q: "A subcontractor is hired to perform landscaping on a project, contracting directly with the general contractor rather than the property owner. Does Tennessee generally require this subcontractor to hold a contractor's license?",
    choices: [
      "Yes, always, regardless of trade or value",
      "No, landscaping is among the trades that generally do not require a contractor's license when subcontracting, unless it crosses into electrical, plumbing, mechanical, HVAC, or masonry thresholds",
      "Only if the landscaping contract exceeds $5,000",
      "Only if the general contractor is unlicensed",
    ],
    answer: 1,
    why: "Certain trades, including landscaping, excavation, and painting, generally fall outside the license requirement when subcontracting, unless the work crosses into the regulated trades and their thresholds.",
    ref: "Tenn. Code Ann. § 62-6-101 et seq. (reviewer: confirm exact subsection)",
  },
  {
    id: "BL-110",
    topic: "Licensing law",
    q: "What limits does Tennessee law place on Board for Licensing Contractors membership by geography and classification?",
    choices: [
      "All board members must reside in Nashville",
      "No more than one board member per specific classification may reside in any one grand division, and no more than three board members total may reside in any one grand division",
      "Board members must rotate out every year with no reappointment allowed",
      "There are no geographic or classification limits on board membership",
    ],
    answer: 1,
    why: "The statute spreads board membership across the state's grand divisions and caps how concentrated any one license classification or region can be on the board.",
    ref: "Tenn. Code Ann. § 62-6-104 (reviewer: confirm exact subsection)",
  },
  {
    id: "BL-111",
    topic: "Licensing law",
    q: "An applicant wants to register a business name that is nearly identical to an existing licensee's name and could confuse the public. What must the board do?",
    choices: [
      "Approve it as long as the applicant pays an extra fee",
      "Deny the application, unless the applicant holds an exclusive federal trademark registration for that name",
      "Approve it automatically since names cannot be regulated",
      "Refer the matter to a court for a ruling before acting",
    ],
    answer: 1,
    why: "The board must deny confusingly similar names, with a narrow exception for an applicant who already holds the exclusive federal trademark right to that name.",
    ref: "Tenn. Code Ann. § 62-6-111(m)",
  },
  {
    id: "BL-112",
    topic: "Licensing law",
    q: "A contractor holds a full, unexpired contracting license from another state and wants to work in Tennessee. What licensing concept may allow them to obtain a Tennessee license without repeating every step of the standard process?",
    choices: [
      "Automatic dual licensure with no Tennessee application required",
      "Reciprocity",
      "Grandfathering",
      "There is no path; every applicant must start from zero regardless of other-state licensure",
    ],
    answer: 1,
    why: "Reciprocity is the mechanism by which Tennessee may recognize qualifications an applicant already holds from another jurisdiction, though it does not eliminate the Tennessee application process entirely.",
    ref: "NASCLA Tennessee Guide, Ch. 3 (reviewer: confirm current reciprocity agreements)",
  },
  {
    id: "BL-113",
    topic: "Licensing law",
    q: "What is the stated purpose of the Tennessee Board for Licensing Contractors?",
    choices: [
      "To maximize state tax revenue from construction",
      "To protect public health, safety, and welfare through regulation of contractors and related trades",
      "To guarantee contractors a minimum profit margin",
      "To set uniform pricing across the construction industry",
    ],
    answer: 1,
    why: "The board's mission is protective regulation of the public, not revenue collection, profit guarantees, or price-setting.",
    ref: "Tennessee Board for Licensing Contractors, mission statement",
  },
  {
    id: "BL-114",
    topic: "Licensing law",
    q: "As of mid-2026, which organization administers Tennessee's contractor licensing trade exams?",
    choices: ["PSI", "Pearson VUE", "Prov", "NASCLA directly"],
    answer: 2,
    why: "Prov became the board's trade exam provider beginning July 1, 2026, replacing the previous vendor. Older materials and some state pages may still reference the prior vendor.",
    ref: "Tennessee Board for Licensing Contractors website",
  },
  {
    id: "BL-201",
    topic: "Lien law",
    q: "A remote contractor (not in direct contract with the owner) on a commercial project performs unpaid work in March. Within how many days of the last day of March must they serve a Notice of Nonpayment to preserve lien rights for that month's work?",
    choices: ["30 days", "60 days", "90 days", "120 days"],
    answer: 2,
    why: "Remote contractors must serve a notice of nonpayment within 90 days of the last day of each month in which unpaid work, labor, or materials were provided, or they risk losing lien rights for that period.",
    ref: "Tenn. Code Ann. § 66-11-145",
  },
  {
    id: "BL-202",
    topic: "Lien law",
    q: "The 90-day monthly Notice of Nonpayment requirement for remote contractors applies to most commercial projects. Which project type is generally excluded from this specific notice requirement?",
    choices: [
      "Public works projects over $1,000,000",
      "One, two, three, and four family residential units",
      "Any project under $25,000",
      "Projects with a single subcontractor",
    ],
    answer: 1,
    why: "Residential projects of one to four family units are carved out of this particular notice requirement, distinguishing them from the general commercial rule.",
    ref: "Tenn. Code Ann. § 66-11-145(a)",
  },
  {
    id: "BL-203",
    topic: "Lien law",
    q: "A prime contractor who contracted directly with the owner completes work and is not paid. Compared to a remote contractor, what is different about how their lien arises?",
    choices: [
      "A prime contractor has no lien rights at all",
      "A prime contractor's lien arises automatically upon furnishing labor or materials, without needing the monthly notice a remote contractor must serve",
      "A prime contractor must also serve monthly notices, identical to a remote contractor",
      "A prime contractor's lien only arises after a court order",
    ],
    answer: 1,
    why: "Privity with the owner is what excuses the prime contractor from the monthly notice requirement that applies to remote contractors, since the owner already knows who they are.",
    ref: "Tenn. Code Ann. § 66-11-101 et seq. (reviewer: confirm exact subsection)",
  },
  {
    id: "BL-204",
    topic: "Lien law",
    q: "An owner records a Notice of Completion on a one-family residential project. How many days do lien claimants generally have before their rights under that notice expire?",
    choices: ["10 days", "30 days", "60 days", "1 year"],
    answer: 0,
    why: "For one, two, three, and four family residential units, the expiration window after a recorded Notice of Completion is 10 days. Other project types get a longer, 30-day window.",
    ref: "Tenn. Code Ann. § 66-11-146",
  },
  {
    id: "BL-205",
    topic: "Lien law",
    q: "On a project that is NOT one to four family residential, how many days do lien claimants have after a Notice of Completion is recorded before their rights expire?",
    choices: ["10 days", "20 days", "30 days", "45 days"],
    answer: 2,
    why: "Non-residential and larger residential projects get a 30-day window after the Notice of Completion is recorded, compared to the 10-day window for one to four family residential units.",
    ref: "Tenn. Code Ann. § 66-11-146",
  },
  {
    id: "BL-206",
    topic: "Lien law",
    q: "What is the practical purpose of an owner recording a Notice of Completion?",
    choices: [
      "It permanently waives all lien rights on the project",
      "It starts a countdown clock that limits how long lien claimants have left to act before losing priority or rights",
      "It is purely informational and has no legal effect on lien claimants",
      "It automatically releases the prime contractor from further liability",
    ],
    answer: 1,
    why: "A Notice of Completion is a tool that shortens the window lien claimants have to record or enforce their rights, rather than eliminating those rights outright or releasing liability.",
    ref: "Tenn. Code Ann. § 66-11-146",
  },
  {
    id: "BL-207",
    topic: "Lien law",
    q: "A supplier delivers materials to a subcontractor, who in turn used them on a project for the general contractor. The supplier never contracted directly with the owner or the general contractor. How would this supplier's lien position typically be described?",
    choices: [
      "As a prime lienor",
      "As a direct lienor",
      "As an indirect (remote) lienor",
      "As having no lien rights whatsoever",
    ],
    answer: 2,
    why: "A party without a direct contractual relationship to the owner, sitting further down the contracting chain, is treated as an indirect or remote lienor, with its own notice obligations to preserve lien rights.",
    ref: "NASCLA Tennessee Guide, Ch. 16 (reviewer: confirm exact terminology and statute cite)",
  },
  {
    id: "BL-208",
    topic: "Lien law",
    q: "A remote contractor's account goes unpaid and they intend to serve a Notice of Nonpayment. Who must receive that notice?",
    choices: [
      "Only the property owner",
      "Only the prime contractor",
      "Both the owner and the prime contractor in contractual privity with the remote contractor",
      "Only the county register of deeds",
    ],
    answer: 2,
    why: "The notice must go to both the owner and the prime contractor the remote contractor is connected to in the contracting chain, not just one party.",
    ref: "Tenn. Code Ann. § 66-11-145(a)",
  },
  {
    id: "BL-209",
    topic: "Lien law",
    q: "Under Tennessee lien law, when is a project generally considered 'abandoned'?",
    choices: [
      "Immediately when a single payment is late",
      "After a cessation of operations for 90 days with intent to permanently or indefinitely stop work",
      "After any 30-day gap in work, regardless of intent",
      "Tennessee law does not define project abandonment",
    ],
    answer: 1,
    why: "Abandonment requires both a 90-day cessation of operations and an intent element, either a permanent stop or an indefinite one, not just any pause in activity.",
    ref: "Tenn. Code Ann. § 66-11-101 et seq. (reviewer: confirm exact subsection)",
  },
  {
    id: "BL-210",
    topic: "Lien law",
    q: "Which of the following is generally NOT permitted as part of the dollar amount claimed in a Tennessee mechanics' lien?",
    choices: [
      "The cost of labor actually performed",
      "The cost of materials actually furnished",
      "Attorney fees, interest, and late or service charges",
      "The fee paid to file the lien with the register's office",
    ],
    answer: 2,
    why: "A lien amount is limited to the value that actually went into improving the property, such as labor and materials. Add-on charges like interest, service fees, and attorney fees are generally excluded, while the recording fee itself is allowed.",
    ref: "Tenn. Code Ann. § 66-11-112(d) (reviewer: confirm exact subsection)",
  },
];

export const TOPICS = Array.from(new Set(QUESTIONS.map((q) => q.topic)));
