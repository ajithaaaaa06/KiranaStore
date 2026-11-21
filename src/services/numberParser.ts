/**
 * Offline Pure TypeScript Number Parser (/services/numberParser.ts)
 * 
 * Converts spoken and written amounts to integers from:
 * - Hindi (full 0-100 irregular lookup + fractions like dedh, dhai, sawa, paune, saadhe)
 * - English
 * - Kannada (native script ೦-೯ + romanized words)
 * - Tamil (native script ௦-௯ + romanized words)
 * - Telugu (native script ౦-౯ + romanized words)
 * - Code-mixed speech (e.g. "teen sau 40", "3 sau 40", "5 hazaar 200")
 * - Digits in Latin or Indic scripts (०-९, ೦-೯, ௦-௯, ౦-౯)
 * - ASR quirks (spaced digits "3 40", commas "1,24,500", trailing currency words)
 * 
 * Exports:
 * - extractAmounts(text): ExtractedAmount[]
 * - parseNumberPhrase(text): number | null
 */

export interface ExtractedAmount {
  value: number;
  start: number;
  end: number;
  confidence: number;
  raw: string;
}

// ---------------------------------------------------------------------------
// 1. NATIVE INDIC DIGIT NORMALIZATION
// ---------------------------------------------------------------------------

/**
 * Converts native Indic digits (Devanagari, Kannada, Tamil, Telugu) to standard 0-9
 */
export function normalizeIndicDigits(text: string): string {
  return text.replace(/[०-९೦-೯௦-௯౦-౯]/g, (char) => {
    const code = char.charCodeAt(0);
    // Devanagari: 0x0966 (०) - 0x096F (९)
    if (code >= 0x0966 && code <= 0x096F) return String(code - 0x0966);
    // Kannada: 0x0CE6 (೦) - 0x0CEF (೯)
    if (code >= 0x0CE6 && code <= 0x0CEF) return String(code - 0x0CE6);
    // Tamil: 0x0BE6 (௦) - 0x0BEF (௯)
    if (code >= 0x0BE6 && code <= 0x0BEF) return String(code - 0x0BE6);
    // Telugu: 0x0C66 (౦) - 0x0C6F (౯)
    if (code >= 0x0C66 && code <= 0x0C6F) return String(code - 0x0C66);
    return char;
  });
}

// ---------------------------------------------------------------------------
// 2. COMPREHENSIVE HINDI 0-100 LOOKUP TABLE + ENGLISH + KANNADA + TAMIL + TELUGU
// ---------------------------------------------------------------------------

export const NUMBER_WORDS: Record<string, number> = {
  // --- 0 ---
  'shunya': 0, 'shoonya': 0, 'shunye': 0, 'zero': 0, 'शून्य': 0, 'ಸೊನ್ನೆ': 0, 'sonne': 0, 'பூஜ்ஜியம்': 0, 'poojiyam': 0, 'సున్నా': 0, 'sunna': 0,

  // --- 1 ---
  'ek': 1, 'aik': 1, 'yek': 1, 'yeka': 1, 'yekk': 1, 'one': 1, 'एक': 1,
  'ondu': 1, 'ಒಂದು': 1,
  'ondru': 1, 'onnu': 1, 'ஒன்று': 1, 'ஒன்னு': 1,
  'okati': 1, 'vokati': 1, 'ఒకటి': 1,

  // --- 2 ---
  'do': 2, 'doh': 2, 'two': 2, 'दो': 2,
  'eradu': 2, 'yeradu': 2, 'erdu': 2, 'ಎರಡು': 2,
  'irandu': 2, 'rendu': 2, 'randu': 2, 'இரண்டு': 2, 'ரெண்டு': 2,
  'రెండు': 2,

  // --- 3 ---
  'teen': 3, 'tin': 3, 'theen': 3, 'three': 3, 'तीन': 3,
  'mooru': 3, 'muru': 3, 'ಮೂರು': 3,
  'moondru': 3, 'moonu': 3, 'munu': 3, 'மூன்று': 3, 'மூனு': 3,
  'moodu': 3, 'mudu': 3, 'మూడు': 3,

  // --- 4 ---
  'chaar': 4, 'char': 4, 'chhar': 4, 'four': 4, 'चार': 4,
  'naalku': 4, 'nalku': 4, 'ನಾಲ್ಕು': 4,
  'naangu': 4, 'naalu': 4, 'nalu': 4, 'நான்கு': 4, 'நாலு': 4,
  'naalugu': 4, 'nalugu': 4, 'నాలుగు': 4,

  // --- 5 ---
  'paanch': 5, 'panch': 5, 'paanchan': 5, 'paach': 5, 'five': 5, 'पाँच': 5, 'पांच': 5,
  'aidu': 5, 'aydu': 5, 'aaydu': 5, 'ಐದು': 5,
  'aindhu': 5, 'anju': 5, 'ainthu': 5, 'ஐந்து': 5, 'அஞ்சு': 5,
  'ఐదు': 5,

  // --- 6 ---
  'chhe': 6, 'chhah': 6, 'che': 6, 'chhey': 6, 'chha': 6, 'छह': 6, 'छः': 6, 'six': 6,
  'aaru': 6, 'aru': 6, 'ಆರು': 6, 'ஆறு': 6, 'ఆరు': 6,

  // --- 7 ---
  'saat': 7, 'sat': 7, 'seven': 7, 'सात': 7,
  'eelu': 7, 'elu': 7, 'yeelu': 7, 'ಏಳು': 7,
  'ezhu': 7, 'yezhu': 7, 'yelu': 7, 'ஏழு': 7,
  'eedu': 7, 'yedu': 7, 'ఏడు': 7,

  // --- 8 ---
  'aath': 8, 'ath': 8, 'aat': 8, 'eight': 8, 'आठ': 8,
  'entu': 8, 'yentu': 8, 'ಎಂಟು': 8,
  'ettu': 8, 'yettu': 8, 'எட்டு': 8,
  'enimidi': 8, 'yenimidi': 8, 'ఎనిమిది': 8,

  // --- 9 ---
  'nau': 9, 'now': 9, 'nine': 9, 'नौ': 9,
  'ombattu': 9, 'ombhatthu': 9, 'ombathu': 9, 'ಒಂಬತ್ತು': 9,
  'onbadhu': 9, 'ombadhu': 9, 'ஒன்பது': 9,
  'tommidi': 9, 'thommidi': 9, 'తొమ్మిది': 9,

  // --- 10 ---
  'das': 10, 'duss': 10, 'dus': 10, 'ten': 10, 'दस': 10,
  'hattu': 10, 'ಹತ್ತು': 10,
  'patthu': 10, 'pathu': 10, 'பத்து': 10,
  'padi': 10, 'పది': 10,

  // --- 11-19 (Teens) ---
  'gyarah': 11, 'gyaarah': 11, 'gyara': 11, 'eleven': 11, 'ग्यारह': 11, 'hannondu': 11, 'padhinondru': 11, 'pathinonnu': 11, 'padakondu': 11,
  'barah': 12, 'baarah': 12, 'bara': 12, 'twelve': 12, 'बारह': 12, 'hanneradu': 12, 'pannirandu': 12, 'pannendu': 12,
  'terah': 13, 'teyrah': 13, 'tera': 13, 'thirteen': 13, 'तेरह': 13, 'hadimooru': 13, 'pathimoondru': 13, 'padamoodu': 13,
  'chaudah': 14, 'chauda': 14, 'chodah': 14, 'choudah': 14, 'fourteen': 14, 'चौदह': 14, 'hadinaalku': 14, 'pathinaangu': 14, 'padnaalugu': 14,
  'pandrah': 15, 'pandra': 15, 'fifteen': 15, 'पंद्रह': 15, 'hadinaidu': 15, 'pathinaindhu': 15, 'pathinanju': 15, 'padihenu': 15,
  'solah': 16, 'sola': 16, 'sowlah': 16, 'sixteen': 16, 'सोलह': 16, 'hadinaaru': 16, 'pathinaaru': 16, 'padahaaru': 16,
  'satrah': 17, 'satra': 17, 'seventeen': 17, 'सत्रह': 17, 'hadineelu': 17, 'pathinezhu': 17, 'padihedu': 17,
  'atharah': 18, 'athaarah': 18, 'athara': 18, 'eighteen': 18, 'अठारह': 18, 'hadinentu': 18, 'pathinettu': 18, 'paddhenimidi': 18,
  'unnees': 19, 'unnis': 19, 'unees': 19, 'nineteen': 19, 'उन्नीस': 19, 'hatombattu': 19, 'pathonbadhu': 19, 'pandhommidi': 19,

  // --- 20-29 ---
  'bees': 20, 'bis': 20, 'twenty': 20, 'बीस': 20, 'ippattu': 20, 'ippathu': 20, 'ಇಪ್ಪತ್ತು': 20, 'irubadhu': 20, 'iruvadhu': 20, 'irupadhu': 20, 'இருபது': 20, 'iravai': 20, 'iruvai': 20, 'ఇరవై': 20,
  'ikkees': 21, 'ikkis': 21, 'ikis': 21, 'ikees': 21, 'twenty-one': 21, 'twenty one': 21, 'इक्कीस': 21,
  'baaees': 22, 'baais': 22, 'bayees': 22, 'baees': 22, 'twenty-two': 22, 'twenty two': 22, 'बाईस': 22,
  'teees': 23, 'teis': 23, 'tayees': 23, 'twenty-three': 23, 'twenty three': 23, 'तेईस': 23,
  'chaubees': 24, 'chaubis': 24, 'chobis': 24, 'twenty-four': 24, 'twenty four': 24, 'चौबीस': 24,
  'pachchees': 25, 'pachis': 25, 'pachees': 25, 'pacchis': 25, 'twenty-five': 25, 'twenty five': 25, 'पच्चीस': 25,
  'chhabbees': 26, 'chhabis': 26, 'chabbis': 26, 'twenty-six': 26, 'twenty six': 26, 'छब्बीस': 26,
  'sattaees': 27, 'sattais': 27, 'satais': 27, 'twenty-seven': 27, 'twenty seven': 27, 'सत्ताईस': 27,
  'atthaees': 28, 'atthais': 28, 'athais': 28, 'twenty-eight': 28, 'twenty eight': 28, 'अट्ठाईस': 28,
  'untees': 29, 'untis': 29, 'twenty-nine': 29, 'twenty nine': 29, 'उनतीस': 29,

  // --- 30-39 ---
  'tees': 30, 'tis': 30, 'thirty': 30, 'तीस': 30, 'moovattu': 30, 'muvattu': 30, 'ಮೂವತ್ತು': 30, 'muppadhu': 30, 'முப்பது': 30, 'muppai': 30, 'ముప్పై': 30,
  'iktees': 31, 'iktis': 31, 'thirty-one': 31, 'thirty one': 31, 'इकतीस': 31,
  'battees': 32, 'battis': 32, 'thirty-two': 32, 'thirty two': 32, 'बत्तीस': 32,
  'teintees': 33, 'taintis': 33, 'tentees': 33, 'tentis': 33, 'thirty-three': 33, 'तैंतीस': 33,
  'chauntees': 34, 'chauntis': 34, 'chontis': 34, 'thirty-four': 34, 'चौंतीस': 34,
  'paintees': 35, 'paintis': 35, 'pentees': 35, 'pentis': 35, 'thirty-five': 35, 'पैंतीस': 35,
  'chhattees': 36, 'chhattis': 36, 'chattis': 36, 'thirty-six': 36, 'छत्तीस': 36,
  'saintees': 37, 'saintis': 37, 'sentees': 37, 'sentis': 37, 'thirty-seven': 37, 'सैंतीस': 37,
  'adtees': 38, 'adtis': 38, 'athtees': 38, 'athtis': 38, 'arhtees': 38, 'thirty-eight': 38, 'अड़तीस': 38,
  'untaalees': 39, 'untalis': 39, 'unchalis': 39, 'thirty-nine': 39, 'उनतालीस': 39,

  // --- 40-49 ---
  'chaalees': 40, 'chaalis': 40, 'chalis': 40, 'chalees': 40, 'forty': 40, 'चालीस': 40,
  'nalavattu': 40, 'nalavathu': 40, 'ನಲವತ್ತು': 40, 'naarpadhu': 40, 'narpadhu': 40, 'நாற்பது': 40, 'nalabhai': 40, 'nalabai': 40, 'నలభై': 40,
  'iktaalees': 41, 'iktalis': 41, 'forty-one': 41, 'इकतालीस': 41,
  'bayaalees': 42, 'bayalis': 42, 'byalis': 42, 'forty-two': 42, 'बयालीस': 42,
  'taintaalees': 43, 'taintalis': 43, 'tetalis': 43, 'forty-three': 43, 'तैंतालीस': 43,
  'chawaalees': 44, 'chavalis': 44, 'chawalis': 44, 'chavalees': 44, 'forty-four': 44, 'चवालीस': 44,
  'paintaalees': 45, 'paintalis': 45, 'petalis': 45, 'forty-five': 45, 'पैंतालीस': 45,
  'chhiyaalees': 46, 'chhiyalis': 46, 'chhyalis': 46, 'forty-six': 46, 'छियालीस': 46,
  'saintaalees': 47, 'saintalis': 47, 'sentalis': 47, 'forty-seven': 47, 'सैंतालीस': 47,
  'adtaalees': 48, 'adtalis': 48, 'arhtalis': 48, 'forty-eight': 48, 'अड़तालीस': 48,
  'unchaas': 49, 'unchas': 49, 'forty-nine': 49, 'उनचास': 49,

  // --- 50-59 ---
  'pachaas': 50, 'pachas': 50, 'fifty': 50, 'पचास': 50,
  'aivattu': 50, 'aivathu': 50, 'aivatthu': 50, 'aivaththu': 50, 'ayvattu': 50, 'ಐವತ್ತು': 50,
  'aimbadhu': 50, 'ambadhu': 50, 'ampadhu': 50, 'ஐம்பது': 50,
  'yaabhai': 50, 'yabai': 50, 'aabhai': 50, 'యాభై': 50,
  'ikyaavan': 51, 'ikyawan': 51, 'ikyavan': 51, 'fifty-one': 51, 'इक्यावन': 51,
  'baavan': 52, 'baawan': 52, 'bawan': 52, 'fifty-two': 52, 'बावन': 52,
  'tirepan': 53, 'tirpan': 53, 'fifty-three': 53, 'तिरेपन': 53,
  'chauvan': 54, 'chauwan': 54, 'chawan': 54, 'fifty-four': 54, 'चौवन': 54,
  'pachpan': 55, 'fifty-five': 55, 'पचपन': 55,
  'chhappan': 56, 'chappan': 56, 'fifty-six': 56, 'छप्पन': 56,
  'sattaavan': 57, 'sattawan': 57, 'satawan': 57, 'fifty-seven': 57, 'सत्तावन': 57,
  'atthaavan': 58, 'atthawan': 58, 'athawan': 58, 'fifty-eight': 58, 'अट्ठावन': 58,
  'unsath': 59, 'fifty-nine': 59, 'उनसठ': 59,

  // --- 60-69 ---
  'saath': 60, 'sath': 60, 'sixty': 60, 'साठ': 60,
  'aravattu': 60, 'aravathu': 60, 'ಅರವತ್ತು': 60, 'arubadhu': 60, 'அறுபது': 60, 'aravai': 60, 'అరవై': 60,
  'iksath': 61, 'sixty-one': 61, 'इकसठ': 61,
  'baasath': 62, 'basath': 62, 'sixty-two': 62, 'बासठ': 62,
  'tirsath': 63, 'tirasath': 63, 'sixty-three': 63, 'तिरसठ': 63,
  'chausath': 64, 'chonsath': 64, 'sixty-four': 64, 'चौंसठ': 64,
  'painsath': 65, 'pensath': 65, 'sixty-five': 65, 'पैंसठ': 65,
  'chhiyasath': 66, 'chhyasath': 66, 'sixty-six': 66, 'छियासठ': 66,
  'sarsath': 67, 'sarasath': 67, 'sixty-seven': 67, 'सरसठ': 67,
  'adsath': 68, 'arhsath': 68, 'sixty-eight': 68, 'अड़सठ': 68,
  'unhattar': 69, 'unhatar': 69, 'sixty-nine': 69, 'उनहत्तर': 69,

  // --- 70-79 ---
  'sattar': 70, 'satar': 70, 'seventy': 70, 'सत्तर': 70,
  'eppattu': 70, 'eppathu': 70, 'ಎಪ್ಪತ್ತು': 70, 'ezhubadhu': 70, 'எழுபது': 70, 'debbai': 70, 'డెబ్బై': 70,
  'ikhattar': 71, 'ikhatar': 71, 'seventy-one': 71, 'इकहत्तर': 71,
  'bahattar': 72, 'bahatar': 72, 'seventy-two': 72, 'बहत्तर': 72,
  'tihattar': 73, 'tihatar': 73, 'seventy-three': 73, 'तिहत्तर': 73,
  'chauhattar': 74, 'chohattar': 74, 'seventy-four': 74, 'चौहत्तर': 74,
  'pachhattar': 75, 'pachhatar': 75, 'seventy-five': 75, 'पचहत्तर': 75,
  'chhihattar': 76, 'chhatar': 76, 'seventy-six': 76, 'छिहत्तर': 76,
  'sathattar': 77, 'sat-hattar': 77, 'seventy-seven': 77, 'सतहत्तर': 77,
  'athhattar': 78, 'ath-hattar': 78, 'seventy-eight': 78, 'अठहत्तर': 78,
  'unyasee': 79, 'unaasi': 79, 'unasi': 79, 'unnasi': 79, 'unyasi': 79, 'seventy-nine': 79, 'उनासी': 79, 'उन्नासी': 79,

  // --- 80-89 ---
  'assee': 80, 'assi': 80, 'asi': 80, 'eighty': 80, 'अस्सी': 80,
  'embattu': 80, 'embathu': 80, 'ಎಂಬತ್ತು': 80, 'enbadhu': 80, 'எண்பது': 80, 'enabhai': 80, 'enabai': 80, 'ఎనభై': 80,
  'ikyaasee': 81, 'ikyasi': 81, 'eighty-one': 81, 'इक्यासी': 81,
  'bayaasee': 82, 'bayasi': 82, 'byasi': 82, 'eighty-two': 82, 'बयासी': 82,
  'tiraasee': 83, 'tirasi': 83, 'eighty-three': 83, 'तिरासी': 83,
  'chauraasee': 84, 'chaurasi': 84, 'chorasi': 84, 'eighty-four': 84, 'चौरासी': 84,
  'pachaasee': 85, 'pachasi': 85, 'eighty-five': 85, 'पचासी': 85,
  'chhiyaasee': 86, 'chhiyasi': 86, 'chhyasi': 86, 'eighty-six': 86, 'छियासी': 86,
  'sattaasee': 87, 'sattasi': 87, 'satasi': 87, 'eighty-seven': 87, 'सत्तासी': 87,
  'atthaasee': 88, 'atthasi': 88, 'athasi': 88, 'eighty-eight': 88, 'अट्ठासी': 88,
  'nawaasee': 89, 'navasee': 89, 'nawasi': 89, 'navasi': 89, 'eighty-nine': 89, 'नवासी': 89,

  // --- 90-99 ---
  'nabbe': 90, 'nabey': 90, 'nawwe': 90, 'ninety': 90, 'नब्बे': 90,
  'tombattu': 90, 'tombathu': 90, 'ತೊಂಬತ್ತು': 90, 'thonnooru': 90, 'தொண்ணூறு': 90, 'tombhai': 90, 'tombai': 90, 'తొంభై': 90,
  'ikyaanve': 91, 'ikyanwe': 91, 'ikyanve': 91, 'ninety-one': 91, 'इक्यानवे': 91,
  'baanve': 92, 'baanwe': 92, 'banve': 92, 'banwe': 92, 'ninety-two': 92, 'बानवे': 92,
  'tiraanve': 93, 'tiranwe': 93, 'tiranve': 93, 'ninety-three': 93, 'तिरानवे': 93,
  'chauraanve': 94, 'chauranwe': 94, 'choranve': 94, 'ninety-four': 94, 'चौरानवे': 94,
  'pachaanve': 95, 'panchanwe': 95, 'panchanve': 95, 'pachanve': 95, 'ninety-five': 95, 'पंचानवे': 95, 'पचानवे': 95,
  'chhiyaanve': 96, 'chhiyanwe': 96, 'chhiyanve': 96, 'chhanve': 96, 'ninety-six': 96, 'छियानवे': 96, 'छानवे': 96,
  'sattaanve': 97, 'sattanwe': 97, 'sattanve': 97, 'ninety-seven': 97, 'सत्तानवे': 97,
  'atthaanve': 98, 'atthawne': 98, 'atthanve': 98, 'ninety-eight': 98, 'अट्ठानवे': 98,
  'ninyaanve': 99, 'ninyanwe': 99, 'ninyanve': 99, 'neenyanve': 99, 'ninety-nine': 99, 'निन्यानवे': 99,

  // --- 100 ---
  'sau': 100, 'so': 100, 'sow': 100, 'hundred': 100, 'सौ': 100,
  'nooru': 100, 'noora': 100, 'nuru': 100, 'ನೂರು': 100, 'ನೂರ': 100,
  'vanda': 100, 'vandalu': 100, 'vandala': 100, 'vandha': 100, 'వంద': 100, 'వందలు': 100, 'వందల': 100,
  'noothi': 100, 'நூறு': 100,

  // --- Kannada Compound Multiples of 100 ---
  'innooru': 200, 'eranooru': 200, 'eradu nooru': 200, 'ಇನ್ನೂರು': 200,
  'munnooru': 300, 'murnooru': 300, 'murnuru': 300, 'muru nooru': 300, 'ಮುನ್ನೂರು': 300,
  'naannooru': 400, 'naanooru': 400, 'nanuru': 400, 'naalu nooru': 400, 'ನಾನ್ನೂರು': 400,
  'ainnooru': 500, 'ainooru': 500, 'aivannooru': 500, 'aivattooru': 500, 'aidu nooru': 500, 'ಐನ್ನೂರು': 500,
  'aaranuru': 600, 'aarnooru': 600, 'aaru nooru': 600, 'ಆರನ್ನೂರು': 600,
  'eplanooru': 700, 'elu nooru': 700, 'ಏಳುನೂರು': 700,
  'entunooru': 800, 'entanooru': 800, 'entu nooru': 800, 'ಎಂಟುನೂರು': 800,
  'ombainooru': 900, 'ombanooru': 900, 'ombattu nooru': 900, 'ಒಂಬೈನೂರು': 900,

  // --- Tamil Compound Multiples of 100 ---
  'irunooru': 200, 'இருநூறு': 200,
  'munnuru': 300, 'முந்நூறு': 300,
  'nannooru': 400, 'நானூறு': 400,
  'ainuru': 500, 'ஐநூறு': 500,
  'aanooru': 600, 'அறுநூறு': 600,
  'ezhunooru': 700, 'எழுநூறு': 700,
  'ennuru': 800, 'எண்ணூறு': 800,
  'tollayiram': 900, 'தொள்ளாயிரம்': 900,

  // --- Telugu Compound Multiples of 100 ---
  'irunooru_te': 200,
  'munnooru_te': 300,
  'veyyi': 1000, 'veye': 1000, 'veyi': 1000, 'వెయ్యి': 1000,
};

// Multipliers
export const MULTIPLIERS: Record<string, number> = {
  // Hundred
  'sau': 100, 'so': 100, 'sow': 100, 'hundred': 100, 'सौ': 100,
  'nooru': 100, 'noora': 100, 'nuru': 100, 'ನೂರು': 100, 'ನೂರ': 100,
  'vanda': 100, 'vandalu': 100, 'vandala': 100, 'vandha': 100, 'వంద': 100, 'వందలు': 100, 'వందల': 100,
  'noothi': 100, 'நூறு': 100,

  // Thousand
  'hazaar': 1000, 'hazar': 1000, 'hajar': 1000, 'हज़ार': 1000, 'हजार': 1000,
  'thousand': 1000, 'k': 1000,
  'saavira': 1000, 'savira': 1000, 'ಸಾವಿರ': 1000,
  'aayiram': 1000, 'ayiram': 1000, 'ஆயிரம்': 1000,
  'veyyi': 1000, 'veye': 1000, 'veyi': 1000, 'velu': 1000, 'వేయి': 1000, 'వేలు': 1000, 'వెయ్యి': 1000,

  // Lakh (100,000)
  'lakh': 100000, 'lac': 100000, 'laakh': 100000, 'लाख': 100000,
  'laksha': 100000, 'ಲಕ್ಷ': 100000,
  'latcham': 100000, 'laksham': 100000, 'லட்சம்': 100000,
  'లక్ష': 100000,

  // Crore (10,000,000)
  'crore': 10000000, 'karor': 10000000, 'करोड़': 10000000,
  'koti': 10000000, 'ಕೋಟಿ': 10000000, 'கோடி': 10000000, 'కోటి': 10000000,
};

// Currency markers for confidence boosting and boundary detection
export const CURRENCY_MARKERS = [
  '₹', 'rs', 'rs.', 'rupee', 'rupees', 'rupaye', 'rupay', 'rupaya', 'roopaye', 'roopya', 'rupiya', 'rupiye',
  'inr', 're', 'ರೂಪಾಯಿ', 'ರೂಪಾಯಿಗಳು', 'ರೂ', 'ரூபாய்', 'ரூபாய்கள்', 'ரூ',
  'రూపాయలు', 'రూపాయి', 'రూ', 'रुपये', 'रुपया', 'रुपए'
];

// Common Hindi verbs that should not be mistaken for the number 2 ("do")
const DO_VERB_PRECEDING_WORDS = ['de', 'kar', 'likh', 'daal', 'bhej', 'khata', 'bata', 'rakh'];

// ---------------------------------------------------------------------------
// 3. IDIOMATIC COMPOUND REPLACEMENTS (dedh, dhai, sawa, paune, saadhe)
// ---------------------------------------------------------------------------

function normalizeFractions(text: string): string {
  let s = text;

  // Dedh (1.5x)
  s = s.replace(/(?:^|\s|\b)(?:dedh|derh|deydh|ded|डेढ़)\s+(?:sau|so|sow|hundred|nooru|nuru|vanda|vandha|நூறு|ನೂರು|వంద|सौ)(?:\s|$|\b|[.,!?])/gi, ' 150 ');
  s = s.replace(/(?:^|\s|\b)(?:dedh|derh|deydh|ded|डेढ़)\s+(?:hazaar|hazar|hajar|thousand|saavira|savira|aayiram|ayiram|velu|veye|k|हज़ार|हजार|ಸಾವಿರ|ஆயிரம்|వేలు|వేయి)(?:\s|$|\b|[.,!?])/gi, ' 1500 ');
  s = s.replace(/(?:^|\s|\b)(?:dedh|derh|deydh|ded|डेढ़)\s+(?:lakh|lac|laakh|laksha|latcham|लाख|ಲಕ್ಷ|லட்சம்|లక్ష)(?:\s|$|\b|[.,!?])/gi, ' 150000 ');

  // Dhai (2.5x)
  s = s.replace(/(?:^|\s|\b)(?:dhai|dhaai|dayee|dahi|ढाई)\s+(?:sau|so|sow|hundred|nooru|nuru|vanda|vandha|நூறு|ನೂರು|వంద|सौ)(?:\s|$|\b|[.,!?])/gi, ' 250 ');
  s = s.replace(/(?:^|\s|\b)(?:dhai|dhaai|dayee|dahi|ढाई)\s+(?:hazaar|hazar|hajar|thousand|saavira|savira|aayiram|ayiram|velu|veye|k|हज़ार|हजार|ಸಾವಿರ|ஆயிரம்|వేలు|వేయి)(?:\s|$|\b|[.,!?])/gi, ' 2500 ');
  s = s.replace(/(?:^|\s|\b)(?:dhai|dhaai|dayee|dahi|ढाई)\s+(?:lakh|lac|laakh|laksha|latcham|लाख|ಲಕ್ಷ|லட்சம்|లక్ష)(?:\s|$|\b|[.,!?])/gi, ' 250000 ');

  // Sawa (1.25x or +0.25)
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 125 ');
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+do\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 225 ');
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+teen\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 325 ');
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, ' 1250 ');
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+do\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, ' 2250 ');
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+(?:lakh|lac|लाख)(?:\s|$|\b|[.,!?])/gi, ' 125000 ');

  // Paune (0.75x or -0.25)
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 75 ');
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:do|दोन?)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 175 ');
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:teen|तीन)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 275 ');
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:chaar|char|चार)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 375 ');
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:paanch|panch|पांच)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 475 ');
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, ' 750 ');
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:do|दो)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, ' 1750 ');
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:teen|तीन)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, ' 2750 ');
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:chaar|char|चार)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, ' 3750 ');
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:ek\s+)?(?:lakh|lac|लाख)(?:\s|$|\b|[.,!?])/gi, ' 75000 ');

  // Saadhe (+0.5)
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:teen|तीन)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 350 ');
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:chaar|char|चार)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 450 ');
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:paanch|panch|पांच)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 550 ');
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:chhe|chhah|छह)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 650 ');
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:saat|सात)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 750 ');
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:aath|आठ)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 850 ');
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:nau|नौ)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, ' 950 ');

  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:teen|तीन)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, ' 3500 ');
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:chaar|char|चार)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, ' 4500 ');
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:paanch|panch|पांच)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, ' 5500 ');

  return s;
}

// ---------------------------------------------------------------------------
// 4. PARSE A SINGLE NUMBER PHRASE
// ---------------------------------------------------------------------------

/**
 * Parses an isolated spoken/written phrase into an integer amount or null
 */
export function parseNumberPhrase(phrase: string): number | null {
  if (!phrase) return null;

  // 1. Normalize native digits (०-९ -> 0-9)
  let clean = normalizeIndicDigits(phrase).trim().toLowerCase();

  // 2. Strip currency markers, bill symbols & separators
  clean = clean
    .replace(/[₹$€,]/g, '')
    .replace(/\/[-=]/g, '')
    .replace(/\b(?:rs\.?|rupees?|rupaye?|rupay|rupaya|roopaye|roopya|rupiya|rupiye|inr|re|రూపాయలు|రూపాయి|రూ|ರೂಪಾಯಿ|ರೂಪಾಯಿಗಳು|ರೂ|ரூபாய்|ரூபாய்கள்|ரூ|रुपये|रुपया|रुपए)\b/gi, '')
    .trim();

  if (!clean) return null;

  // 3. Normalize fractions
  clean = normalizeFractions(clean).trim();

  // 4. Direct pure digit check e.g. "340", "124500", "0"
  if (/^\d+$/.test(clean)) {
    return parseInt(clean, 10);
  }

  // 5. Handle "5k" / "10k"
  const kMatch = clean.match(/^(\d+)\s*k$/i);
  if (kMatch) {
    return parseInt(kMatch[1], 10) * 1000;
  }

  // 6. Handle ASR spaced digits like "3 40" -> 340, "1 500" -> 1500
  const spacedMatch = clean.match(/^(\d{1,2})\s+(\d{2,3})$/);
  if (spacedMatch) {
    const combined = spacedMatch[1] + spacedMatch[2];
    return parseInt(combined, 10);
  }

  // 7. Token evaluation for multi-word or mixed numbers
  // e.g. "teen sau chaalis", "3 sau 40", "eradu nooru", "moodu vanda"
  const rawTokens = clean.split(/\s+/).filter(Boolean);
  if (rawTokens.length === 0) return null;

  let total = 0;
  let currentGroup = 0;
  let hasValidNumberWord = false;

  for (let i = 0; i < rawTokens.length; i++) {
    const token = rawTokens[i].replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, '');
    if (!token) continue;

    // Check if token is a direct digit string (e.g. "40", "3", "500")
    if (/^\d+$/.test(token)) {
      const num = parseInt(token, 10);
      currentGroup += num;
      hasValidNumberWord = true;
      continue;
    }

    // Check if token is a multiplier (hundred, thousand, lakh, crore)
    const multVal = MULTIPLIERS[token];
    if (multVal !== undefined) {
      hasValidNumberWord = true;
      const count = currentGroup === 0 ? 1 : currentGroup;
      if (multVal >= 1000) {
        total += count * multVal;
        currentGroup = 0;
      } else {
        currentGroup = count * multVal;
      }
      continue;
    }

    // Check if token is a number word (0-100)
    const wordVal = NUMBER_WORDS[token];
    if (wordVal !== undefined) {
      hasValidNumberWord = true;
      currentGroup += wordVal;
      continue;
    }

    // Check if word is connective like "and", "aur", "mattu", "mariyu"
    if (['and', 'aur', 'mattu', 'mariyu', 'um'].includes(token)) {
      continue;
    }
  }

  total += currentGroup;

  if (hasValidNumberWord) {
    return total;
  }

  return null;
}

// ---------------------------------------------------------------------------
// 5. EXTRACT ALL AMOUNTS WITH SPANS AND CONFIDENCE
// ---------------------------------------------------------------------------

/**
 * Extracts all amount occurrences from a given text string.
 * Returns sorted list of ExtractedAmount objects.
 */
export function extractAmounts(text: string): ExtractedAmount[] {
  if (!text || typeof text !== 'string') return [];

  // Transliterate native digits for uniform processing while maintaining character alignment
  const normalizedText = normalizeIndicDigits(text);
  const results: ExtractedAmount[] = [];

  // Helper to add or replace overlapping amounts cleanly
  const addResult = (item: ExtractedAmount) => {
    // Find all existing items that overlap with item
    const overlapping = results.filter(
      (r) => Math.max(r.start, item.start) < Math.min(r.end, item.end)
    );

    if (overlapping.length === 0) {
      results.push(item);
      return;
    }

    // If an existing item strictly encloses this candidate (e.g. "3 40" already encloses "40"), do not split it
    const enclosedByExisting = overlapping.some(
      (existing) =>
        existing.start <= item.start &&
        existing.end >= item.end &&
        existing.raw.length > item.raw.length
    );
    if (enclosedByExisting) {
      return;
    }

    // Check if the new item is superior (longer or higher confidence)
    const isSuperior = overlapping.every(
      (existing) =>
        item.raw.length > existing.raw.length ||
        item.confidence > existing.confidence
    );

    if (isSuperior) {
      // Remove all overlapping inferior items
      for (const ex of overlapping) {
        const idx = results.indexOf(ex);
        if (idx >= 0) results.splice(idx, 1);
      }
      results.push(item);
    }
  };

  // -------------------------------------------------------------------------
  // PASS 1: Explicit Currency Amounts (e.g. "₹340", "340 rupaye", "Rs. 1,500", "500 ರೂಪಾಯಿ")
  // -------------------------------------------------------------------------
  const currencyPatterns = [
    // Symbol before number: ₹ 500, Rs. 500, Rs 500
    /(?:₹|rs\.?|inr)\s*(\d+(?:,\d+)*(?:\.\d+)?|\d+\s*k)\b/gi,
    // Number followed by currency word: 500 rupaye, 340 rs, 200 ರೂಪಾಯಿ, 500 ரூபாய், 500 రూపాయలు
    /\b(\d+(?:,\d+)*(?:\.\d+)?|\d+\s*k)\s*(?:₹|rs\.?|rupees?|rupaye?|rupay|rupaya|roopaye|roopya|rupiya|rupiye|inr|re|రూపాయలు|రూపాయి|రూ|ರೂಪಾಯಿ|ರೂಪಾಯಿಗಳು|ರೂ|ரூபாய்|ரூபாய்கள்|ரூ|रुपये|रुपया|रुपए)\b/gi,
  ];

  for (const regex of currencyPatterns) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(normalizedText)) !== null) {
      const rawSpan = match[0];
      const parsedVal = parseNumberPhrase(match[1]);
      if (parsedVal !== null && parsedVal > 0) {
        addResult({
          value: parsedVal,
          start: match.index,
          end: match.index + rawSpan.length,
          confidence: 0.98,
          raw: text.slice(match.index, match.index + rawSpan.length),
        });
      }
    }
  }

  // -------------------------------------------------------------------------
  // PASS 2: Spoken Indic & English Number Phrases (e.g. "teen sau chaalis", "dhai hazaar")
  // -------------------------------------------------------------------------
  const words = normalizedText.split(/(\s+)/);
  let currentIndex = 0;
  const wordTokens: { word: string; start: number; end: number }[] = [];

  for (const part of words) {
    const start = currentIndex;
    const end = start + part.length;
    currentIndex = end;
    if (part.trim()) {
      wordTokens.push({ word: part.trim().toLowerCase(), start, end });
    }
  }

  let i = 0;
  while (i < wordTokens.length) {
    const cleanWord = wordTokens[i].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, '');

    // Skip Hindi verb "do" when preceded by "de", "kar", "likh", "khata", etc.
    if (cleanWord === 'do' && i > 0) {
      const prevWord = wordTokens[i - 1].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, '');
      if (DO_VERB_PRECEDING_WORDS.includes(prevWord)) {
        i++;
        continue;
      }
    }

    const isNumberStart =
      NUMBER_WORDS[cleanWord] !== undefined ||
      MULTIPLIERS[cleanWord] !== undefined ||
      /^\d+$/.test(cleanWord) ||
      ['dedh', 'dhai', 'sawa', 'paune', 'saadhe', 'डेढ़', 'ढाई', 'सवा', 'पौने', 'साढ़े', 'pone', 'dhaai', 'deydh', 'sawwa', 'savva'].includes(cleanWord);

    if (isNumberStart) {
      let j = i;
      let phraseWords: string[] = [];

      while (j < wordTokens.length) {
        const w = wordTokens[j].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, '');

        // Skip Hindi verb "do" if preceded by verb words
        if (w === 'do' && j > i) {
          const prevW = wordTokens[j - 1].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, '');
          if (DO_VERB_PRECEDING_WORDS.includes(prevW)) {
            break;
          }
        }

        const isPartOfNumber =
          NUMBER_WORDS[w] !== undefined ||
          MULTIPLIERS[w] !== undefined ||
          /^\d+$/.test(w) ||
          ['dedh', 'dhai', 'sawa', 'paune', 'saadhe', 'डेढ़', 'ढाई', 'सवा', 'पौने', 'साढ़े', 'pone', 'dhaai', 'deydh', 'sawwa', 'savva', 'and', 'aur', 'mattu', 'mariyu'].includes(w) ||
          CURRENCY_MARKERS.includes(w);

        if (isPartOfNumber) {
          phraseWords.push(wordTokens[j].word);
          j++;
        } else {
          break;
        }
      }

      if (phraseWords.length > 0) {
        const phraseSpan = phraseWords.join(' ');
        const phraseVal = parseNumberPhrase(phraseSpan);

        if (phraseVal !== null && phraseVal > 0) {
          const startIdx = wordTokens[i].start;
          const endIdx = wordTokens[j - 1].end;

          // Ambiguity check:
          // 1. Spaced digits quirk without currency ("3 40" -> 340) is ambiguous ASR output
          const isPureSpacedDigits =
            phraseWords.length > 1 &&
            phraseWords.every((w) => /^\d+$/.test(w.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, '')));
          // 2. Single small digit word ("ek", "do") without currency is ambiguous
          const isSingleSmallWord = phraseWords.length === 1 && phraseVal < 5;
          const hasCurrency = phraseWords.some((w) =>
            CURRENCY_MARKERS.includes(w.toLowerCase().replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, ''))
          );

          const confidence = isPureSpacedDigits
            ? (hasCurrency ? 0.85 : 0.65)
            : isSingleSmallWord && !hasCurrency
            ? 0.55
            : hasCurrency
            ? 0.98
            : 0.95;

          addResult({
            value: phraseVal,
            start: startIdx,
            end: endIdx,
            confidence,
            raw: text.slice(startIdx, endIdx),
          });

          i = j;
          continue;
        }
      }
    }
    i++;
  }

  // -------------------------------------------------------------------------
  // PASS 3: ASR Spaced Digits Quirk (e.g. "3 40" -> 340, "1 500" -> 1500)
  // -------------------------------------------------------------------------
  const spacedRegex = /\b(\d{1,2})\s+(\d{2,3})\b/g;
  let spacedMatch: RegExpExecArray | null;
  while ((spacedMatch = spacedRegex.exec(normalizedText)) !== null) {
    const start = spacedMatch.index;
    const end = start + spacedMatch[0].length;
    const combinedVal = parseInt(spacedMatch[1] + spacedMatch[2], 10);

    const contextAround = normalizedText.slice(Math.max(0, start - 15), Math.min(normalizedText.length, end + 15));
    const tokensAround = contextAround.toLowerCase().split(/\s+/).map((t) => t.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, ''));
    const hasCurrency =
      contextAround.includes('₹') ||
      tokensAround.some((t) => CURRENCY_MARKERS.includes(t));

    addResult({
      value: combinedVal,
      start,
      end,
      confidence: hasCurrency ? 0.85 : 0.65,
      raw: text.slice(start, end),
    });
  }

  // -------------------------------------------------------------------------
  // PASS 4: Plain Digits and Numbers (e.g. "340", "1,24,500", "500")
  // -------------------------------------------------------------------------
  const digitRegex = /\b\d+(?:,\d+)*\b/g;
  let digitMatch: RegExpExecArray | null;
  while ((digitMatch = digitRegex.exec(normalizedText)) !== null) {
    const rawDigits = digitMatch[0];
    const val = parseInt(rawDigits.replace(/,/g, ''), 10);
    const start = digitMatch.index;
    const end = start + rawDigits.length;

    const isSmallAmbiguous = val < 5;
    const confidence = isSmallAmbiguous ? 0.60 : 0.95;

    addResult({
      value: val,
      start,
      end,
      confidence,
      raw: text.slice(start, end),
    });
  }

  // Sort by start position
  results.sort((a, b) => a.start - b.start);

  return results;
}
