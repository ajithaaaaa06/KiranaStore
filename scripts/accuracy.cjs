"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// scripts/accuracy.ts
var fs = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);

// src/services/numberParser.ts
function normalizeIndicDigits(text) {
  return text.replace(/[०-९೦-೯௦-௯౦-౯]/g, (char) => {
    const code = char.charCodeAt(0);
    if (code >= 2406 && code <= 2415) return String(code - 2406);
    if (code >= 3302 && code <= 3311) return String(code - 3302);
    if (code >= 3046 && code <= 3055) return String(code - 3046);
    if (code >= 3174 && code <= 3183) return String(code - 3174);
    return char;
  });
}
var NUMBER_WORDS = {
  // --- 0 ---
  "shunya": 0,
  "shoonya": 0,
  "shunye": 0,
  "zero": 0,
  "\u0936\u0942\u0928\u094D\u092F": 0,
  "\u0CB8\u0CCA\u0CA8\u0CCD\u0CA8\u0CC6": 0,
  "sonne": 0,
  "\u0BAA\u0BC2\u0B9C\u0BCD\u0B9C\u0BBF\u0BAF\u0BAE\u0BCD": 0,
  "poojiyam": 0,
  "\u0C38\u0C41\u0C28\u0C4D\u0C28\u0C3E": 0,
  "sunna": 0,
  // --- 1 ---
  "ek": 1,
  "aik": 1,
  "yek": 1,
  "yeka": 1,
  "yekk": 1,
  "one": 1,
  "\u090F\u0915": 1,
  "ondu": 1,
  "\u0C92\u0C82\u0CA6\u0CC1": 1,
  "ondru": 1,
  "onnu": 1,
  "\u0B92\u0BA9\u0BCD\u0BB1\u0BC1": 1,
  "\u0B92\u0BA9\u0BCD\u0BA9\u0BC1": 1,
  "okati": 1,
  "vokati": 1,
  "\u0C12\u0C15\u0C1F\u0C3F": 1,
  // --- 2 ---
  "do": 2,
  "doh": 2,
  "two": 2,
  "\u0926\u094B": 2,
  "eradu": 2,
  "yeradu": 2,
  "erdu": 2,
  "\u0C8E\u0CB0\u0CA1\u0CC1": 2,
  "irandu": 2,
  "rendu": 2,
  "randu": 2,
  "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1": 2,
  "\u0BB0\u0BC6\u0BA3\u0BCD\u0B9F\u0BC1": 2,
  "\u0C30\u0C46\u0C02\u0C21\u0C41": 2,
  // --- 3 ---
  "teen": 3,
  "tin": 3,
  "theen": 3,
  "three": 3,
  "\u0924\u0940\u0928": 3,
  "mooru": 3,
  "muru": 3,
  "\u0CAE\u0CC2\u0CB0\u0CC1": 3,
  "moondru": 3,
  "moonu": 3,
  "munu": 3,
  "\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1": 3,
  "\u0BAE\u0BC2\u0BA9\u0BC1": 3,
  "moodu": 3,
  "mudu": 3,
  "\u0C2E\u0C42\u0C21\u0C41": 3,
  // --- 4 ---
  "chaar": 4,
  "char": 4,
  "chhar": 4,
  "four": 4,
  "\u091A\u093E\u0930": 4,
  "naalku": 4,
  "nalku": 4,
  "\u0CA8\u0CBE\u0CB2\u0CCD\u0C95\u0CC1": 4,
  "naangu": 4,
  "naalu": 4,
  "nalu": 4,
  "\u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1": 4,
  "\u0BA8\u0BBE\u0BB2\u0BC1": 4,
  "naalugu": 4,
  "nalugu": 4,
  "\u0C28\u0C3E\u0C32\u0C41\u0C17\u0C41": 4,
  // --- 5 ---
  "paanch": 5,
  "panch": 5,
  "paanchan": 5,
  "paach": 5,
  "five": 5,
  "\u092A\u093E\u0901\u091A": 5,
  "\u092A\u093E\u0902\u091A": 5,
  "aidu": 5,
  "aydu": 5,
  "aaydu": 5,
  "\u0C90\u0CA6\u0CC1": 5,
  "aindhu": 5,
  "anju": 5,
  "ainthu": 5,
  "\u0B90\u0BA8\u0BCD\u0BA4\u0BC1": 5,
  "\u0B85\u0B9E\u0BCD\u0B9A\u0BC1": 5,
  "\u0C10\u0C26\u0C41": 5,
  // --- 6 ---
  "chhe": 6,
  "chhah": 6,
  "che": 6,
  "chhey": 6,
  "chha": 6,
  "\u091B\u0939": 6,
  "\u091B\u0903": 6,
  "six": 6,
  "aaru": 6,
  "aru": 6,
  "\u0C86\u0CB0\u0CC1": 6,
  "\u0B86\u0BB1\u0BC1": 6,
  "\u0C06\u0C30\u0C41": 6,
  // --- 7 ---
  "saat": 7,
  "sat": 7,
  "seven": 7,
  "\u0938\u093E\u0924": 7,
  "eelu": 7,
  "elu": 7,
  "yeelu": 7,
  "\u0C8F\u0CB3\u0CC1": 7,
  "ezhu": 7,
  "yezhu": 7,
  "yelu": 7,
  "\u0B8F\u0BB4\u0BC1": 7,
  "eedu": 7,
  "yedu": 7,
  "\u0C0F\u0C21\u0C41": 7,
  // --- 8 ---
  "aath": 8,
  "ath": 8,
  "aat": 8,
  "eight": 8,
  "\u0906\u0920": 8,
  "entu": 8,
  "yentu": 8,
  "\u0C8E\u0C82\u0C9F\u0CC1": 8,
  "ettu": 8,
  "yettu": 8,
  "\u0B8E\u0B9F\u0BCD\u0B9F\u0BC1": 8,
  "enimidi": 8,
  "yenimidi": 8,
  "\u0C0E\u0C28\u0C3F\u0C2E\u0C3F\u0C26\u0C3F": 8,
  // --- 9 ---
  "nau": 9,
  "now": 9,
  "nine": 9,
  "\u0928\u094C": 9,
  "ombattu": 9,
  "ombhatthu": 9,
  "ombathu": 9,
  "\u0C92\u0C82\u0CAC\u0CA4\u0CCD\u0CA4\u0CC1": 9,
  "onbadhu": 9,
  "ombadhu": 9,
  "\u0B92\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1": 9,
  "tommidi": 9,
  "thommidi": 9,
  "\u0C24\u0C4A\u0C2E\u0C4D\u0C2E\u0C3F\u0C26\u0C3F": 9,
  // --- 10 ---
  "das": 10,
  "duss": 10,
  "dus": 10,
  "ten": 10,
  "\u0926\u0938": 10,
  "hattu": 10,
  "\u0CB9\u0CA4\u0CCD\u0CA4\u0CC1": 10,
  "patthu": 10,
  "pathu": 10,
  "\u0BAA\u0BA4\u0BCD\u0BA4\u0BC1": 10,
  "padi": 10,
  "\u0C2A\u0C26\u0C3F": 10,
  // --- 11-19 (Teens) ---
  "gyarah": 11,
  "gyaarah": 11,
  "gyara": 11,
  "eleven": 11,
  "\u0917\u094D\u092F\u093E\u0930\u0939": 11,
  "hannondu": 11,
  "padhinondru": 11,
  "pathinonnu": 11,
  "padakondu": 11,
  "barah": 12,
  "baarah": 12,
  "bara": 12,
  "twelve": 12,
  "\u092C\u093E\u0930\u0939": 12,
  "hanneradu": 12,
  "pannirandu": 12,
  "pannendu": 12,
  "terah": 13,
  "teyrah": 13,
  "tera": 13,
  "thirteen": 13,
  "\u0924\u0947\u0930\u0939": 13,
  "hadimooru": 13,
  "pathimoondru": 13,
  "padamoodu": 13,
  "chaudah": 14,
  "chauda": 14,
  "chodah": 14,
  "choudah": 14,
  "fourteen": 14,
  "\u091A\u094C\u0926\u0939": 14,
  "hadinaalku": 14,
  "pathinaangu": 14,
  "padnaalugu": 14,
  "pandrah": 15,
  "pandra": 15,
  "fifteen": 15,
  "\u092A\u0902\u0926\u094D\u0930\u0939": 15,
  "hadinaidu": 15,
  "pathinaindhu": 15,
  "pathinanju": 15,
  "padihenu": 15,
  "solah": 16,
  "sola": 16,
  "sowlah": 16,
  "sixteen": 16,
  "\u0938\u094B\u0932\u0939": 16,
  "hadinaaru": 16,
  "pathinaaru": 16,
  "padahaaru": 16,
  "satrah": 17,
  "satra": 17,
  "seventeen": 17,
  "\u0938\u0924\u094D\u0930\u0939": 17,
  "hadineelu": 17,
  "pathinezhu": 17,
  "padihedu": 17,
  "atharah": 18,
  "athaarah": 18,
  "athara": 18,
  "eighteen": 18,
  "\u0905\u0920\u093E\u0930\u0939": 18,
  "hadinentu": 18,
  "pathinettu": 18,
  "paddhenimidi": 18,
  "unnees": 19,
  "unnis": 19,
  "unees": 19,
  "nineteen": 19,
  "\u0909\u0928\u094D\u0928\u0940\u0938": 19,
  "hatombattu": 19,
  "pathonbadhu": 19,
  "pandhommidi": 19,
  // --- 20-29 ---
  "bees": 20,
  "bis": 20,
  "twenty": 20,
  "\u092C\u0940\u0938": 20,
  "ippattu": 20,
  "ippathu": 20,
  "\u0C87\u0CAA\u0CCD\u0CAA\u0CA4\u0CCD\u0CA4\u0CC1": 20,
  "irubadhu": 20,
  "iruvadhu": 20,
  "irupadhu": 20,
  "\u0B87\u0BB0\u0BC1\u0BAA\u0BA4\u0BC1": 20,
  "iravai": 20,
  "iruvai": 20,
  "\u0C07\u0C30\u0C35\u0C48": 20,
  "ikkees": 21,
  "ikkis": 21,
  "ikis": 21,
  "ikees": 21,
  "twenty-one": 21,
  "twenty one": 21,
  "\u0907\u0915\u094D\u0915\u0940\u0938": 21,
  "baaees": 22,
  "baais": 22,
  "bayees": 22,
  "baees": 22,
  "twenty-two": 22,
  "twenty two": 22,
  "\u092C\u093E\u0908\u0938": 22,
  "teees": 23,
  "teis": 23,
  "tayees": 23,
  "twenty-three": 23,
  "twenty three": 23,
  "\u0924\u0947\u0908\u0938": 23,
  "chaubees": 24,
  "chaubis": 24,
  "chobis": 24,
  "twenty-four": 24,
  "twenty four": 24,
  "\u091A\u094C\u092C\u0940\u0938": 24,
  "pachchees": 25,
  "pachis": 25,
  "pachees": 25,
  "pacchis": 25,
  "twenty-five": 25,
  "twenty five": 25,
  "\u092A\u091A\u094D\u091A\u0940\u0938": 25,
  "chhabbees": 26,
  "chhabis": 26,
  "chabbis": 26,
  "twenty-six": 26,
  "twenty six": 26,
  "\u091B\u092C\u094D\u092C\u0940\u0938": 26,
  "sattaees": 27,
  "sattais": 27,
  "satais": 27,
  "twenty-seven": 27,
  "twenty seven": 27,
  "\u0938\u0924\u094D\u0924\u093E\u0908\u0938": 27,
  "atthaees": 28,
  "atthais": 28,
  "athais": 28,
  "twenty-eight": 28,
  "twenty eight": 28,
  "\u0905\u091F\u094D\u0920\u093E\u0908\u0938": 28,
  "untees": 29,
  "untis": 29,
  "twenty-nine": 29,
  "twenty nine": 29,
  "\u0909\u0928\u0924\u0940\u0938": 29,
  // --- 30-39 ---
  "tees": 30,
  "tis": 30,
  "thirty": 30,
  "\u0924\u0940\u0938": 30,
  "moovattu": 30,
  "muvattu": 30,
  "\u0CAE\u0CC2\u0CB5\u0CA4\u0CCD\u0CA4\u0CC1": 30,
  "muppadhu": 30,
  "\u0BAE\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BC1": 30,
  "muppai": 30,
  "\u0C2E\u0C41\u0C2A\u0C4D\u0C2A\u0C48": 30,
  "iktees": 31,
  "iktis": 31,
  "thirty-one": 31,
  "thirty one": 31,
  "\u0907\u0915\u0924\u0940\u0938": 31,
  "battees": 32,
  "battis": 32,
  "thirty-two": 32,
  "thirty two": 32,
  "\u092C\u0924\u094D\u0924\u0940\u0938": 32,
  "teintees": 33,
  "taintis": 33,
  "tentees": 33,
  "tentis": 33,
  "thirty-three": 33,
  "\u0924\u0948\u0902\u0924\u0940\u0938": 33,
  "chauntees": 34,
  "chauntis": 34,
  "chontis": 34,
  "thirty-four": 34,
  "\u091A\u094C\u0902\u0924\u0940\u0938": 34,
  "paintees": 35,
  "paintis": 35,
  "pentees": 35,
  "pentis": 35,
  "thirty-five": 35,
  "\u092A\u0948\u0902\u0924\u0940\u0938": 35,
  "chhattees": 36,
  "chhattis": 36,
  "chattis": 36,
  "thirty-six": 36,
  "\u091B\u0924\u094D\u0924\u0940\u0938": 36,
  "saintees": 37,
  "saintis": 37,
  "sentees": 37,
  "sentis": 37,
  "thirty-seven": 37,
  "\u0938\u0948\u0902\u0924\u0940\u0938": 37,
  "adtees": 38,
  "adtis": 38,
  "athtees": 38,
  "athtis": 38,
  "arhtees": 38,
  "thirty-eight": 38,
  "\u0905\u0921\u093C\u0924\u0940\u0938": 38,
  "untaalees": 39,
  "untalis": 39,
  "unchalis": 39,
  "thirty-nine": 39,
  "\u0909\u0928\u0924\u093E\u0932\u0940\u0938": 39,
  // --- 40-49 ---
  "chaalees": 40,
  "chaalis": 40,
  "chalis": 40,
  "chalees": 40,
  "forty": 40,
  "\u091A\u093E\u0932\u0940\u0938": 40,
  "nalavattu": 40,
  "nalavathu": 40,
  "\u0CA8\u0CB2\u0CB5\u0CA4\u0CCD\u0CA4\u0CC1": 40,
  "naarpadhu": 40,
  "narpadhu": 40,
  "\u0BA8\u0BBE\u0BB1\u0BCD\u0BAA\u0BA4\u0BC1": 40,
  "nalabhai": 40,
  "nalabai": 40,
  "\u0C28\u0C32\u0C2D\u0C48": 40,
  "iktaalees": 41,
  "iktalis": 41,
  "forty-one": 41,
  "\u0907\u0915\u0924\u093E\u0932\u0940\u0938": 41,
  "bayaalees": 42,
  "bayalis": 42,
  "byalis": 42,
  "forty-two": 42,
  "\u092C\u092F\u093E\u0932\u0940\u0938": 42,
  "taintaalees": 43,
  "taintalis": 43,
  "tetalis": 43,
  "forty-three": 43,
  "\u0924\u0948\u0902\u0924\u093E\u0932\u0940\u0938": 43,
  "chawaalees": 44,
  "chavalis": 44,
  "chawalis": 44,
  "chavalees": 44,
  "forty-four": 44,
  "\u091A\u0935\u093E\u0932\u0940\u0938": 44,
  "paintaalees": 45,
  "paintalis": 45,
  "petalis": 45,
  "forty-five": 45,
  "\u092A\u0948\u0902\u0924\u093E\u0932\u0940\u0938": 45,
  "chhiyaalees": 46,
  "chhiyalis": 46,
  "chhyalis": 46,
  "forty-six": 46,
  "\u091B\u093F\u092F\u093E\u0932\u0940\u0938": 46,
  "saintaalees": 47,
  "saintalis": 47,
  "sentalis": 47,
  "forty-seven": 47,
  "\u0938\u0948\u0902\u0924\u093E\u0932\u0940\u0938": 47,
  "adtaalees": 48,
  "adtalis": 48,
  "arhtalis": 48,
  "forty-eight": 48,
  "\u0905\u0921\u093C\u0924\u093E\u0932\u0940\u0938": 48,
  "unchaas": 49,
  "unchas": 49,
  "forty-nine": 49,
  "\u0909\u0928\u091A\u093E\u0938": 49,
  // --- 50-59 ---
  "pachaas": 50,
  "pachas": 50,
  "fifty": 50,
  "\u092A\u091A\u093E\u0938": 50,
  "aivattu": 50,
  "aivathu": 50,
  "aivatthu": 50,
  "aivaththu": 50,
  "ayvattu": 50,
  "\u0C90\u0CB5\u0CA4\u0CCD\u0CA4\u0CC1": 50,
  "aimbadhu": 50,
  "ambadhu": 50,
  "ampadhu": 50,
  "\u0B90\u0BAE\u0BCD\u0BAA\u0BA4\u0BC1": 50,
  "yaabhai": 50,
  "yabai": 50,
  "aabhai": 50,
  "\u0C2F\u0C3E\u0C2D\u0C48": 50,
  "ikyaavan": 51,
  "ikyawan": 51,
  "ikyavan": 51,
  "fifty-one": 51,
  "\u0907\u0915\u094D\u092F\u093E\u0935\u0928": 51,
  "baavan": 52,
  "baawan": 52,
  "bawan": 52,
  "fifty-two": 52,
  "\u092C\u093E\u0935\u0928": 52,
  "tirepan": 53,
  "tirpan": 53,
  "fifty-three": 53,
  "\u0924\u093F\u0930\u0947\u092A\u0928": 53,
  "chauvan": 54,
  "chauwan": 54,
  "chawan": 54,
  "fifty-four": 54,
  "\u091A\u094C\u0935\u0928": 54,
  "pachpan": 55,
  "fifty-five": 55,
  "\u092A\u091A\u092A\u0928": 55,
  "chhappan": 56,
  "chappan": 56,
  "fifty-six": 56,
  "\u091B\u092A\u094D\u092A\u0928": 56,
  "sattaavan": 57,
  "sattawan": 57,
  "satawan": 57,
  "fifty-seven": 57,
  "\u0938\u0924\u094D\u0924\u093E\u0935\u0928": 57,
  "atthaavan": 58,
  "atthawan": 58,
  "athawan": 58,
  "fifty-eight": 58,
  "\u0905\u091F\u094D\u0920\u093E\u0935\u0928": 58,
  "unsath": 59,
  "fifty-nine": 59,
  "\u0909\u0928\u0938\u0920": 59,
  // --- 60-69 ---
  "saath": 60,
  "sath": 60,
  "sixty": 60,
  "\u0938\u093E\u0920": 60,
  "aravattu": 60,
  "aravathu": 60,
  "\u0C85\u0CB0\u0CB5\u0CA4\u0CCD\u0CA4\u0CC1": 60,
  "arubadhu": 60,
  "\u0B85\u0BB1\u0BC1\u0BAA\u0BA4\u0BC1": 60,
  "aravai": 60,
  "\u0C05\u0C30\u0C35\u0C48": 60,
  "iksath": 61,
  "sixty-one": 61,
  "\u0907\u0915\u0938\u0920": 61,
  "baasath": 62,
  "basath": 62,
  "sixty-two": 62,
  "\u092C\u093E\u0938\u0920": 62,
  "tirsath": 63,
  "tirasath": 63,
  "sixty-three": 63,
  "\u0924\u093F\u0930\u0938\u0920": 63,
  "chausath": 64,
  "chonsath": 64,
  "sixty-four": 64,
  "\u091A\u094C\u0902\u0938\u0920": 64,
  "painsath": 65,
  "pensath": 65,
  "sixty-five": 65,
  "\u092A\u0948\u0902\u0938\u0920": 65,
  "chhiyasath": 66,
  "chhyasath": 66,
  "sixty-six": 66,
  "\u091B\u093F\u092F\u093E\u0938\u0920": 66,
  "sarsath": 67,
  "sarasath": 67,
  "sixty-seven": 67,
  "\u0938\u0930\u0938\u0920": 67,
  "adsath": 68,
  "arhsath": 68,
  "sixty-eight": 68,
  "\u0905\u0921\u093C\u0938\u0920": 68,
  "unhattar": 69,
  "unhatar": 69,
  "sixty-nine": 69,
  "\u0909\u0928\u0939\u0924\u094D\u0924\u0930": 69,
  // --- 70-79 ---
  "sattar": 70,
  "satar": 70,
  "seventy": 70,
  "\u0938\u0924\u094D\u0924\u0930": 70,
  "eppattu": 70,
  "eppathu": 70,
  "\u0C8E\u0CAA\u0CCD\u0CAA\u0CA4\u0CCD\u0CA4\u0CC1": 70,
  "ezhubadhu": 70,
  "\u0B8E\u0BB4\u0BC1\u0BAA\u0BA4\u0BC1": 70,
  "debbai": 70,
  "\u0C21\u0C46\u0C2C\u0C4D\u0C2C\u0C48": 70,
  "ikhattar": 71,
  "ikhatar": 71,
  "seventy-one": 71,
  "\u0907\u0915\u0939\u0924\u094D\u0924\u0930": 71,
  "bahattar": 72,
  "bahatar": 72,
  "seventy-two": 72,
  "\u092C\u0939\u0924\u094D\u0924\u0930": 72,
  "tihattar": 73,
  "tihatar": 73,
  "seventy-three": 73,
  "\u0924\u093F\u0939\u0924\u094D\u0924\u0930": 73,
  "chauhattar": 74,
  "chohattar": 74,
  "seventy-four": 74,
  "\u091A\u094C\u0939\u0924\u094D\u0924\u0930": 74,
  "pachhattar": 75,
  "pachhatar": 75,
  "seventy-five": 75,
  "\u092A\u091A\u0939\u0924\u094D\u0924\u0930": 75,
  "chhihattar": 76,
  "chhatar": 76,
  "seventy-six": 76,
  "\u091B\u093F\u0939\u0924\u094D\u0924\u0930": 76,
  "sathattar": 77,
  "sat-hattar": 77,
  "seventy-seven": 77,
  "\u0938\u0924\u0939\u0924\u094D\u0924\u0930": 77,
  "athhattar": 78,
  "ath-hattar": 78,
  "seventy-eight": 78,
  "\u0905\u0920\u0939\u0924\u094D\u0924\u0930": 78,
  "unyasee": 79,
  "unaasi": 79,
  "unasi": 79,
  "unnasi": 79,
  "unyasi": 79,
  "seventy-nine": 79,
  "\u0909\u0928\u093E\u0938\u0940": 79,
  "\u0909\u0928\u094D\u0928\u093E\u0938\u0940": 79,
  // --- 80-89 ---
  "assee": 80,
  "assi": 80,
  "asi": 80,
  "eighty": 80,
  "\u0905\u0938\u094D\u0938\u0940": 80,
  "embattu": 80,
  "embathu": 80,
  "\u0C8E\u0C82\u0CAC\u0CA4\u0CCD\u0CA4\u0CC1": 80,
  "enbadhu": 80,
  "\u0B8E\u0BA3\u0BCD\u0BAA\u0BA4\u0BC1": 80,
  "enabhai": 80,
  "enabai": 80,
  "\u0C0E\u0C28\u0C2D\u0C48": 80,
  "ikyaasee": 81,
  "ikyasi": 81,
  "eighty-one": 81,
  "\u0907\u0915\u094D\u092F\u093E\u0938\u0940": 81,
  "bayaasee": 82,
  "bayasi": 82,
  "byasi": 82,
  "eighty-two": 82,
  "\u092C\u092F\u093E\u0938\u0940": 82,
  "tiraasee": 83,
  "tirasi": 83,
  "eighty-three": 83,
  "\u0924\u093F\u0930\u093E\u0938\u0940": 83,
  "chauraasee": 84,
  "chaurasi": 84,
  "chorasi": 84,
  "eighty-four": 84,
  "\u091A\u094C\u0930\u093E\u0938\u0940": 84,
  "pachaasee": 85,
  "pachasi": 85,
  "eighty-five": 85,
  "\u092A\u091A\u093E\u0938\u0940": 85,
  "chhiyaasee": 86,
  "chhiyasi": 86,
  "chhyasi": 86,
  "eighty-six": 86,
  "\u091B\u093F\u092F\u093E\u0938\u0940": 86,
  "sattaasee": 87,
  "sattasi": 87,
  "satasi": 87,
  "eighty-seven": 87,
  "\u0938\u0924\u094D\u0924\u093E\u0938\u0940": 87,
  "atthaasee": 88,
  "atthasi": 88,
  "athasi": 88,
  "eighty-eight": 88,
  "\u0905\u091F\u094D\u0920\u093E\u0938\u0940": 88,
  "nawaasee": 89,
  "navasee": 89,
  "nawasi": 89,
  "navasi": 89,
  "eighty-nine": 89,
  "\u0928\u0935\u093E\u0938\u0940": 89,
  // --- 90-99 ---
  "nabbe": 90,
  "nabey": 90,
  "nawwe": 90,
  "ninety": 90,
  "\u0928\u092C\u094D\u092C\u0947": 90,
  "tombattu": 90,
  "tombathu": 90,
  "\u0CA4\u0CCA\u0C82\u0CAC\u0CA4\u0CCD\u0CA4\u0CC1": 90,
  "thonnooru": 90,
  "\u0BA4\u0BCA\u0BA3\u0BCD\u0BA3\u0BC2\u0BB1\u0BC1": 90,
  "tombhai": 90,
  "tombai": 90,
  "\u0C24\u0C4A\u0C02\u0C2D\u0C48": 90,
  "ikyaanve": 91,
  "ikyanwe": 91,
  "ikyanve": 91,
  "ninety-one": 91,
  "\u0907\u0915\u094D\u092F\u093E\u0928\u0935\u0947": 91,
  "baanve": 92,
  "baanwe": 92,
  "banve": 92,
  "banwe": 92,
  "ninety-two": 92,
  "\u092C\u093E\u0928\u0935\u0947": 92,
  "tiraanve": 93,
  "tiranwe": 93,
  "tiranve": 93,
  "ninety-three": 93,
  "\u0924\u093F\u0930\u093E\u0928\u0935\u0947": 93,
  "chauraanve": 94,
  "chauranwe": 94,
  "choranve": 94,
  "ninety-four": 94,
  "\u091A\u094C\u0930\u093E\u0928\u0935\u0947": 94,
  "pachaanve": 95,
  "panchanwe": 95,
  "panchanve": 95,
  "pachanve": 95,
  "ninety-five": 95,
  "\u092A\u0902\u091A\u093E\u0928\u0935\u0947": 95,
  "\u092A\u091A\u093E\u0928\u0935\u0947": 95,
  "chhiyaanve": 96,
  "chhiyanwe": 96,
  "chhiyanve": 96,
  "chhanve": 96,
  "ninety-six": 96,
  "\u091B\u093F\u092F\u093E\u0928\u0935\u0947": 96,
  "\u091B\u093E\u0928\u0935\u0947": 96,
  "sattaanve": 97,
  "sattanwe": 97,
  "sattanve": 97,
  "ninety-seven": 97,
  "\u0938\u0924\u094D\u0924\u093E\u0928\u0935\u0947": 97,
  "atthaanve": 98,
  "atthawne": 98,
  "atthanve": 98,
  "ninety-eight": 98,
  "\u0905\u091F\u094D\u0920\u093E\u0928\u0935\u0947": 98,
  "ninyaanve": 99,
  "ninyanwe": 99,
  "ninyanve": 99,
  "neenyanve": 99,
  "ninety-nine": 99,
  "\u0928\u093F\u0928\u094D\u092F\u093E\u0928\u0935\u0947": 99,
  // --- 100 ---
  "sau": 100,
  "so": 100,
  "sow": 100,
  "hundred": 100,
  "\u0938\u094C": 100,
  "nooru": 100,
  "noora": 100,
  "nuru": 100,
  "\u0CA8\u0CC2\u0CB0\u0CC1": 100,
  "\u0CA8\u0CC2\u0CB0": 100,
  "vanda": 100,
  "vandalu": 100,
  "vandala": 100,
  "vandha": 100,
  "\u0C35\u0C02\u0C26": 100,
  "\u0C35\u0C02\u0C26\u0C32\u0C41": 100,
  "\u0C35\u0C02\u0C26\u0C32": 100,
  "noothi": 100,
  "\u0BA8\u0BC2\u0BB1\u0BC1": 100,
  // --- Kannada Compound Multiples of 100 ---
  "innooru": 200,
  "eranooru": 200,
  "eradu nooru": 200,
  "\u0C87\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 200,
  "munnooru": 300,
  "murnooru": 300,
  "murnuru": 300,
  "munnuru": 300,
  "muru nooru": 300,
  "\u0CAE\u0CC1\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 300,
  "naannooru": 400,
  "naanooru": 400,
  "nanuru": 400,
  "naalu nooru": 400,
  "\u0CA8\u0CBE\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 400,
  "ainnooru": 500,
  "ainooru": 500,
  "aivannooru": 500,
  "aivattooru": 500,
  "ainuru": 500,
  "aanooru": 500,
  "aidu nooru": 500,
  "\u0C90\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 500,
  "aaranuru": 600,
  "aarnooru": 600,
  "aaru nooru": 600,
  "\u0C86\u0CB0\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 600,
  "eplanooru": 700,
  "ezhunooru": 700,
  "elu nooru": 700,
  "\u0C8F\u0CB3\u0CC1\u0CA8\u0CC2\u0CB0\u0CC1": 700,
  "entunooru": 800,
  "entanooru": 800,
  "entu nooru": 800,
  "\u0C8E\u0C82\u0C9F\u0CC1\u0CA8\u0CC2\u0CB0\u0CC1": 800,
  "ombainooru": 900,
  "ombanooru": 900,
  "ombattu nooru": 900,
  "\u0C92\u0C82\u0CAC\u0CC8\u0CA8\u0CC2\u0CB0\u0CC1": 900,
  // --- Tamil Compound Multiples of 100 ---
  "irunooru": 200,
  "\u0B87\u0BB0\u0BC1\u0BA8\u0BC2\u0BB1\u0BC1": 200,
  "munnuru": 300,
  "\u0BAE\u0BC1\u0BA8\u0BCD\u0BA8\u0BC2\u0BB1\u0BC1": 300,
  "nannooru": 400,
  "\u0BA8\u0BBE\u0BA9\u0BC2\u0BB1\u0BC1": 400,
  "ainuru": 500,
  "\u0B90\u0BA8\u0BC2\u0BB1\u0BC1": 500,
  "aanooru": 600,
  "\u0B85\u0BB1\u0BC1\u0BA8\u0BC2\u0BB1\u0BC1": 600,
  "ezhunooru": 700,
  "\u0B8E\u0BB4\u0BC1\u0BA8\u0BC2\u0BB1\u0BC1": 700,
  "ennuru": 800,
  "\u0B8E\u0BA3\u0BCD\u0BA3\u0BC2\u0BB1\u0BC1": 800,
  "tollayiram": 900,
  "\u0BA4\u0BCA\u0BB3\u0BCD\u0BB3\u0BBE\u0BAF\u0BBF\u0BB0\u0BAE\u0BCD": 900,
  // --- Telugu Compound Multiples of 100 ---
  "irunooru_te": 200,
  "munnooru_te": 300,
  "veyyi": 1e3,
  "veye": 1e3,
  "veyi": 1e3,
  "\u0C35\u0C46\u0C2F\u0C4D\u0C2F\u0C3F": 1e3
};
var MULTIPLIERS = {
  // Hundred
  "sau": 100,
  "so": 100,
  "sow": 100,
  "hundred": 100,
  "\u0938\u094C": 100,
  "nooru": 100,
  "noora": 100,
  "nuru": 100,
  "\u0CA8\u0CC2\u0CB0\u0CC1": 100,
  "\u0CA8\u0CC2\u0CB0": 100,
  "vanda": 100,
  "vandalu": 100,
  "vandala": 100,
  "vandha": 100,
  "\u0C35\u0C02\u0C26": 100,
  "\u0C35\u0C02\u0C26\u0C32\u0C41": 100,
  "\u0C35\u0C02\u0C26\u0C32": 100,
  "noothi": 100,
  "\u0BA8\u0BC2\u0BB1\u0BC1": 100,
  // Thousand
  "hazaar": 1e3,
  "hazar": 1e3,
  "hajar": 1e3,
  "\u0939\u091C\u093C\u093E\u0930": 1e3,
  "\u0939\u091C\u093E\u0930": 1e3,
  "thousand": 1e3,
  "k": 1e3,
  "saavira": 1e3,
  "savira": 1e3,
  "\u0CB8\u0CBE\u0CB5\u0CBF\u0CB0": 1e3,
  "aayiram": 1e3,
  "ayiram": 1e3,
  "\u0B86\u0BAF\u0BBF\u0BB0\u0BAE\u0BCD": 1e3,
  "veyyi": 1e3,
  "veye": 1e3,
  "veyi": 1e3,
  "velu": 1e3,
  "\u0C35\u0C47\u0C2F\u0C3F": 1e3,
  "\u0C35\u0C47\u0C32\u0C41": 1e3,
  "\u0C35\u0C46\u0C2F\u0C4D\u0C2F\u0C3F": 1e3,
  // Lakh (100,000)
  "lakh": 1e5,
  "lac": 1e5,
  "laakh": 1e5,
  "\u0932\u093E\u0916": 1e5,
  "laksha": 1e5,
  "\u0CB2\u0C95\u0CCD\u0CB7": 1e5,
  "latcham": 1e5,
  "laksham": 1e5,
  "\u0BB2\u0B9F\u0BCD\u0B9A\u0BAE\u0BCD": 1e5,
  "\u0C32\u0C15\u0C4D\u0C37": 1e5,
  // Crore (10,000,000)
  "crore": 1e7,
  "karor": 1e7,
  "\u0915\u0930\u094B\u0921\u093C": 1e7,
  "koti": 1e7,
  "\u0C95\u0CCB\u0C9F\u0CBF": 1e7,
  "\u0B95\u0BCB\u0B9F\u0BBF": 1e7,
  "\u0C15\u0C4B\u0C1F\u0C3F": 1e7
};
var CURRENCY_MARKERS = [
  "\u20B9",
  "rs",
  "rs.",
  "rupee",
  "rupees",
  "rupaye",
  "rupay",
  "rupaya",
  "roopaye",
  "roopya",
  "rupiya",
  "rupiye",
  "inr",
  "re",
  "\u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF",
  "\u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF\u0C97\u0CB3\u0CC1",
  "\u0CB0\u0CC2",
  "\u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD",
  "\u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD\u0B95\u0BB3\u0BCD",
  "\u0BB0\u0BC2",
  "\u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C32\u0C41",
  "\u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C3F",
  "\u0C30\u0C42",
  "\u0930\u0941\u092A\u092F\u0947",
  "\u0930\u0941\u092A\u092F\u093E",
  "\u0930\u0941\u092A\u090F"
];
var DO_VERB_PRECEDING_WORDS = ["de", "kar", "likh", "daal", "bhej", "khata", "bata", "rakh"];
function normalizeFractions(text) {
  let s = text;
  s = s.replace(/(?:^|\s|\b)(?:dedh|derh|deydh|ded|डेढ़)\s+(?:sau|so|sow|hundred|nooru|nuru|vanda|vandha|நூறு|ನೂರು|వంద|सौ)(?:\s|$|\b|[.,!?])/gi, " 150 ");
  s = s.replace(/(?:^|\s|\b)(?:dedh|derh|deydh|ded|डेढ़)\s+(?:hazaar|hazar|hajar|thousand|saavira|savira|aayiram|ayiram|velu|veye|k|हज़ार|हजार|ಸಾವಿರ|ஆயிரம்|వేలు|వేయి)(?:\s|$|\b|[.,!?])/gi, " 1500 ");
  s = s.replace(/(?:^|\s|\b)(?:dedh|derh|deydh|ded|डेढ़)\s+(?:lakh|lac|laakh|laksha|latcham|लाख|ಲಕ್ಷ|லட்சம்|లక్ష)(?:\s|$|\b|[.,!?])/gi, " 150000 ");
  s = s.replace(/(?:^|\s|\b)(?:dhai|dhaai|dayee|dahi|ढाई)\s+(?:sau|so|sow|hundred|nooru|nuru|vanda|vandha|நூறு|ನೂರು|వంద|सौ)(?:\s|$|\b|[.,!?])/gi, " 250 ");
  s = s.replace(/(?:^|\s|\b)(?:dhai|dhaai|dayee|dahi|ढाई)\s+(?:hazaar|hazar|hajar|thousand|saavira|savira|aayiram|ayiram|velu|veye|k|हज़ार|हजार|ಸಾವಿರ|ஆயிரம்|వేలు|వేయి)(?:\s|$|\b|[.,!?])/gi, " 2500 ");
  s = s.replace(/(?:^|\s|\b)(?:dhai|dhaai|dayee|dahi|ढाई)\s+(?:lakh|lac|laakh|laksha|latcham|लाख|ಲಕ್ಷ|லட்சம்|లక్ష)(?:\s|$|\b|[.,!?])/gi, " 250000 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 125 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+do\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 225 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+teen\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 325 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 1250 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+do\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 2250 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+(?:lakh|lac|लाख)(?:\s|$|\b|[.,!?])/gi, " 125000 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 75 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:do|दोन?)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 175 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:teen|तीन)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 275 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:chaar|char|चार)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 375 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:paanch|panch|पांच)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 475 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 750 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:do|दो)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 1750 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:teen|तीन)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 2750 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:chaar|char|चार)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 3750 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:ek\s+)?(?:lakh|lac|लाख)(?:\s|$|\b|[.,!?])/gi, " 75000 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:teen|तीन)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 350 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:chaar|char|चार)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 450 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:paanch|panch|पांच)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 550 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:chhe|chhah|छह)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 650 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:saat|सात)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 750 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:aath|आठ)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 850 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:nau|नौ)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 950 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:teen|तीन)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 3500 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:chaar|char|चार)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 4500 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:paanch|panch|पांच)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 5500 ");
  return s;
}
function parseNumberPhrase(phrase) {
  if (!phrase) return null;
  let clean = normalizeIndicDigits(phrase).trim().toLowerCase();
  clean = clean.replace(/[₹$€,]/g, "").replace(/\/[-=]/g, "").replace(/\b(?:rs\.?|rupees?|rupaye?|rupay|rupaya|roopaye|roopya|rupiya|rupiye|inr|re|రూపాయలు|రూపాయి|రూ|ರೂಪಾಯಿ|ರೂಪಾಯಿಗಳು|ರೂ|ரூபாய்|ரூபாய்கள்|ரூ|रुपये|रुपया|रुपए)\b/gi, "").trim();
  if (!clean) return null;
  clean = normalizeFractions(clean).trim();
  if (/^\d+$/.test(clean)) {
    return parseInt(clean, 10);
  }
  const kMatch = clean.match(/^(\d+)\s*k$/i);
  if (kMatch) {
    return parseInt(kMatch[1], 10) * 1e3;
  }
  const spacedMatch = clean.match(/^(\d{1,2})\s+(\d{2,3})$/);
  if (spacedMatch) {
    const combined = spacedMatch[1] + spacedMatch[2];
    return parseInt(combined, 10);
  }
  const rawTokens = clean.split(/\s+/).filter(Boolean);
  if (rawTokens.length === 0) return null;
  let total = 0;
  let currentGroup = 0;
  let hasValidNumberWord = false;
  for (let i = 0; i < rawTokens.length; i++) {
    const token = rawTokens[i].replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
    if (!token) continue;
    if (/^\d+$/.test(token)) {
      const num = parseInt(token, 10);
      currentGroup += num;
      hasValidNumberWord = true;
      continue;
    }
    const multVal = MULTIPLIERS[token];
    if (multVal !== void 0) {
      hasValidNumberWord = true;
      const count = currentGroup === 0 ? 1 : currentGroup;
      if (multVal >= 1e3) {
        total += count * multVal;
        currentGroup = 0;
      } else {
        currentGroup = count * multVal;
      }
      continue;
    }
    const wordVal = NUMBER_WORDS[token];
    if (wordVal !== void 0) {
      hasValidNumberWord = true;
      currentGroup += wordVal;
      continue;
    }
    if (["and", "aur", "mattu", "mariyu", "um"].includes(token)) {
      continue;
    }
  }
  total += currentGroup;
  if (hasValidNumberWord) {
    return total;
  }
  return null;
}
function extractAmounts(text) {
  if (!text || typeof text !== "string") return [];
  const normalizedText = normalizeIndicDigits(text);
  const results = [];
  const addResult = (item) => {
    const overlapping = results.filter(
      (r) => Math.max(r.start, item.start) < Math.min(r.end, item.end)
    );
    if (overlapping.length === 0) {
      results.push(item);
      return;
    }
    const enclosedByExisting = overlapping.some(
      (existing) => existing.start <= item.start && existing.end >= item.end && existing.raw.length > item.raw.length
    );
    if (enclosedByExisting) {
      return;
    }
    const isSuperior = overlapping.every(
      (existing) => item.raw.length > existing.raw.length || item.confidence > existing.confidence
    );
    if (isSuperior) {
      for (const ex of overlapping) {
        const idx = results.indexOf(ex);
        if (idx >= 0) results.splice(idx, 1);
      }
      results.push(item);
    }
  };
  const currencyPatterns = [
    // Symbol before number: ₹ 500, Rs. 500, Rs 500
    /(?:₹|rs\.?|inr)\s*(\d+(?:,\d+)*(?:\.\d+)?|\d+\s*k)\b/gi,
    // Number followed by currency word: 500 rupaye, 340 rs, 200 ರೂಪಾಯಿ, 500 ரூபாய், 500 రూపాయలు
    /\b(\d+(?:,\d+)*(?:\.\d+)?|\d+\s*k)\s*(?:₹|rs\.?|rupees?|rupaye?|rupay|rupaya|roopaye|roopya|rupiya|rupiye|inr|re|రూపాయలు|రూపాయి|రూ|ರೂಪಾಯಿ|ರೂಪಾಯಿಗಳು|ರೂ|ரூபாய்|ரூபாய்கள்|ரூ|रुपये|रुपया|रुपए)\b/gi
  ];
  for (const regex of currencyPatterns) {
    let match;
    while ((match = regex.exec(normalizedText)) !== null) {
      const rawSpan = match[0];
      const parsedVal = parseNumberPhrase(match[1]);
      if (parsedVal !== null && parsedVal > 0) {
        addResult({
          value: parsedVal,
          start: match.index,
          end: match.index + rawSpan.length,
          confidence: 0.98,
          raw: text.slice(match.index, match.index + rawSpan.length)
        });
      }
    }
  }
  const words = normalizedText.split(/(\s+)/);
  let currentIndex = 0;
  const wordTokens = [];
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
    const cleanWord = wordTokens[i].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
    if (cleanWord === "do" && i > 0) {
      const prevWord = wordTokens[i - 1].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
      if (DO_VERB_PRECEDING_WORDS.includes(prevWord)) {
        i++;
        continue;
      }
    }
    const isNumberStart = NUMBER_WORDS[cleanWord] !== void 0 || MULTIPLIERS[cleanWord] !== void 0 || /^\d+$/.test(cleanWord) || ["dedh", "dhai", "sawa", "paune", "saadhe", "\u0921\u0947\u0922\u093C", "\u0922\u093E\u0908", "\u0938\u0935\u093E", "\u092A\u094C\u0928\u0947", "\u0938\u093E\u0922\u093C\u0947", "pone", "dhaai", "deydh", "sawwa", "savva"].includes(cleanWord);
    if (isNumberStart) {
      let j = i;
      let phraseWords = [];
      while (j < wordTokens.length) {
        const w = wordTokens[j].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
        if (w === "do" && j > i) {
          const prevW = wordTokens[j - 1].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
          if (DO_VERB_PRECEDING_WORDS.includes(prevW)) {
            break;
          }
        }
        const isPartOfNumber = NUMBER_WORDS[w] !== void 0 || MULTIPLIERS[w] !== void 0 || /^\d+$/.test(w) || ["dedh", "dhai", "sawa", "paune", "saadhe", "\u0921\u0947\u0922\u093C", "\u0922\u093E\u0908", "\u0938\u0935\u093E", "\u092A\u094C\u0928\u0947", "\u0938\u093E\u0922\u093C\u0947", "pone", "dhaai", "deydh", "sawwa", "savva", "and", "aur", "mattu", "mariyu"].includes(w) || CURRENCY_MARKERS.includes(w);
        if (isPartOfNumber) {
          phraseWords.push(wordTokens[j].word);
          j++;
        } else {
          break;
        }
      }
      if (phraseWords.length > 0) {
        const phraseSpan = phraseWords.join(" ");
        const phraseVal = parseNumberPhrase(phraseSpan);
        if (phraseVal !== null && phraseVal > 0) {
          const startIdx = wordTokens[i].start;
          const endIdx = wordTokens[j - 1].end;
          const isPureSpacedDigits = phraseWords.length > 1 && phraseWords.every((w) => /^\d+$/.test(w.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "")));
          const isSingleSmallWord = phraseWords.length === 1 && phraseVal < 5;
          const hasCurrency = phraseWords.some(
            (w) => CURRENCY_MARKERS.includes(w.toLowerCase().replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, ""))
          );
          const confidence = isPureSpacedDigits ? hasCurrency ? 0.85 : 0.65 : isSingleSmallWord && !hasCurrency ? 0.55 : hasCurrency ? 0.98 : 0.95;
          addResult({
            value: phraseVal,
            start: startIdx,
            end: endIdx,
            confidence,
            raw: text.slice(startIdx, endIdx)
          });
          i = j;
          continue;
        }
      }
    }
    i++;
  }
  const spacedRegex = /\b(\d{1,2})\s+(\d{2,3})\b/g;
  let spacedMatch;
  while ((spacedMatch = spacedRegex.exec(normalizedText)) !== null) {
    const start = spacedMatch.index;
    const end = start + spacedMatch[0].length;
    const combinedVal = parseInt(spacedMatch[1] + spacedMatch[2], 10);
    const contextAround = normalizedText.slice(Math.max(0, start - 15), Math.min(normalizedText.length, end + 15));
    const tokensAround = contextAround.toLowerCase().split(/\s+/).map((t) => t.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, ""));
    const hasCurrency = contextAround.includes("\u20B9") || tokensAround.some((t) => CURRENCY_MARKERS.includes(t));
    addResult({
      value: combinedVal,
      start,
      end,
      confidence: hasCurrency ? 0.85 : 0.65,
      raw: text.slice(start, end)
    });
  }
  const digitRegex = /\b\d+(?:,\d+)*\b/g;
  let digitMatch;
  while ((digitMatch = digitRegex.exec(normalizedText)) !== null) {
    const rawDigits = digitMatch[0];
    const val = parseInt(rawDigits.replace(/,/g, ""), 10);
    const start = digitMatch.index;
    const end = start + rawDigits.length;
    const isSmallAmbiguous = val < 5;
    const confidence = isSmallAmbiguous ? 0.6 : 0.95;
    addResult({
      value: val,
      start,
      end,
      confidence,
      raw: text.slice(start, end)
    });
  }
  results.sort((a, b) => a.start - b.start);
  return results;
}

// src/services/parser.ts
var CONFIRM_WORDS = /* @__PURE__ */ new Set([
  "haan",
  "ha",
  "haa",
  "yes",
  "save",
  "theek hai",
  "theek",
  "thik hai",
  "sahi hai",
  "sahi",
  "sari",
  "aama",
  "\u0B86\u0BAE\u0BBE",
  "avunu",
  "\u0C05\u0C35\u0C41\u0C28\u0C41",
  "save karo",
  "karein",
  "pakka",
  "done",
  "confirm",
  "ok",
  "okay",
  "\u0939\u0942\u0901",
  "\u0939\u093E\u0901",
  "\u0920\u0940\u0915 \u0939\u0948",
  "\u0CB8\u0CB0\u0CBF",
  "\u0B9A\u0BB0\u0BBF",
  "\u0C38\u0C30\u0C47"
]);
var CANCEL_WORDS = /* @__PURE__ */ new Set([
  "cancel",
  "ruko",
  "mat karo",
  "benda",
  "vendaam",
  "oddu",
  "\u0C35\u0C26\u0C4D\u0C26\u0C41",
  "\u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBE\u0BAE\u0BCD",
  "beda",
  "b\xEAda",
  "reject",
  "hatao",
  "\u0930\u0926\u094D\u0926",
  "\u0928\u0915\u094B",
  "\u0CAC\u0CC7\u0CA1",
  "stop"
]);
var CORRECTION_TRIGGERS = [
  /^(?:nahi|nahin|no|sorry|galat|actually|badal ke|thappu|alla|illai|kaadu|गलत|नहीं|तಪ್ಪು|இல்லை|తప్పు)[,\s]+/i,
  /(?:badal ke|change to|make it|kar do|bana do)\s*$/i
];
var QUERY_PATTERNS = [
  /\b(?:total|baaki|bakki|kitna|balance|how much|hisaab|hisab|otti baaki|mottham baakee|tell me|batao|owe|owes)\b/i,
  /(?:बाकी|हिसाब|टोटल|कितना|बताओ)/,
  /(?:ಬಾಕಿ|ಎಷ್ಟು|ಖಾತೆ|ಒಟ್ಟು ಬಾಕಿ)/,
  /(?:மொத்தம்|மீதி|எவ்வளவு|கணக்கு)/,
  /(?:మొత్తం|బాకీ|ఎంత బాకీ|ఎంత|ఖాతా)/
];
var CREDIT_KEYWORDS = [
  "udhaar",
  "udhar",
  "\u0909\u0927\u093E\u0930",
  "baaki",
  "\u092C\u093E\u0915\u0940",
  "khata",
  "\u0916\u093E\u0924\u093E",
  "credit",
  "borrowed",
  "borrow",
  "due",
  "debt",
  "lent",
  "owes",
  "owe",
  "saala",
  "sala",
  "\u0CB8\u0CBE\u0CB2",
  "kadan",
  "\u0B95\u0B9F\u0BA9\u0BCD",
  "\u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF",
  "appu",
  "\u0C05\u0C2A\u0C4D\u0C2A\u0C41"
];
var PAYMENT_KEYWORDS = [
  // Hindi / Hinglish / English
  "diye",
  "mila",
  "aaya",
  "aaye",
  "jama",
  "paid",
  "payment",
  "pay",
  "received",
  "receive",
  "wapas",
  "chuka diya",
  "vasool",
  "clear",
  "cleared",
  "settled",
  "settle",
  "returned",
  "repaid",
  "\u0926\u093F\u090F",
  "\u092E\u093F\u0932\u093E",
  "\u0906\u092F\u093E",
  "\u091C\u092E\u093E",
  "\u0935\u093E\u092A\u0938",
  "\u091A\u0941\u0915\u093E\u092F\u093E",
  "\u0935\u0938\u0942\u0932",
  "diye hain",
  "diya hai",
  // Kannada
  "kotta",
  "kottu",
  "kotte",
  "kottaru",
  "kottiddare",
  "kottiddaare",
  "kottidini",
  "kottidare",
  "hana bandide",
  "bandide",
  "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F",
  "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F\u0CB0\u0CC1",
  "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6",
  "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F\u0CBF\u0CA6\u0CBE\u0CB0\u0CC6",
  "\u0C9C\u0CAE\u0CBE",
  "\u0CB5\u0CBE\u0CAA\u0CB8\u0CCD",
  "\u0CB9\u0CA3 \u0CAC\u0C82\u0CA6\u0CBF\u0CA6\u0CC6",
  // Tamil
  "koduthaar",
  "kuduthaar",
  "koduthar",
  "kuduthar",
  "koduthaanga",
  "kuduthaanga",
  "koduthanga",
  "kuduthanga",
  "panam vandhadhu",
  "vandhadhu",
  "vandhuchu",
  "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD",
  "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD\u0B95\u0BB3\u0BCD",
  "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0B99\u0BCD\u0B95",
  "\u0BB5\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  "\u0B9C\u0BAE\u0BBE",
  "\u0BAA\u0BA3\u0BAE\u0BCD \u0BB5\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  // Telugu
  "icharu",
  "ichaaru",
  "ichadu",
  "ichhaaru",
  "ichharu",
  "ichindi",
  "jama ayyindi",
  "vachindi",
  "thirigi icharu",
  "\u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C1A\u0C3E\u0C30\u0C41",
  "\u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C30\u0C41",
  "\u0C35\u0C1A\u0C4D\u0C1A\u0C3F\u0C02\u0C26\u0C3F",
  "\u0C24\u0C3F\u0C30\u0C3F\u0C17\u0C3F \u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C30\u0C41"
];
var STOP_WORDS = /* @__PURE__ */ new Set([
  "ko",
  "ka",
  "ke",
  "ki",
  "se",
  "ne",
  "gave",
  "to",
  "for",
  "from",
  "in",
  "on",
  "at",
  "kiya",
  "tha",
  "thi",
  "the",
  "hai",
  "hain",
  "dene",
  "wali",
  "wala",
  "please",
  "bhai",
  "ji",
  "anna",
  "garu",
  "avargal",
  "sir",
  "madam",
  "store",
  "kirana",
  "dokan",
  "account",
  "cash",
  "and",
  "aur",
  "mattu",
  "mariyu",
  "matrum",
  "plus",
  "lekin",
  "phir",
  "then",
  "also",
  "bhi",
  "kooda",
  "\u0C15\u0C42\u0C21\u0C3E",
  "\u0B95\u0BC2\u0B9F",
  "\u0C95\u0CC2\u0CA1",
  "rupaye",
  "rupees",
  "rs",
  "re",
  "inr",
  "\u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C3F",
  "\u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF",
  "\u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD",
  "\u0930\u0941\u092A\u092F\u0947",
  "panam",
  "hana",
  "dabbu",
  "roopayi",
  "rupai",
  "khatte",
  "diya",
  "diye",
  "mila",
  "aaya",
  "wapas",
  "jama"
]);
function resolveRelativeDate(text, baseDate = /* @__PURE__ */ new Date()) {
  const lower = text.toLowerCase();
  if (/\b(?:parso|parson|day before yesterday|monne|mundhanal|monna)\b/i.test(lower) || /(?:परसों|ಮೊನ್ನೆ|முந்தாநாள்|మొన్న)/.test(lower)) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - 2);
    return {
      date: d.toISOString(),
      label: "parso",
      matchedText: "parso"
    };
  }
  const daysAgoMatch = lower.match(/(?:(\d+|do|teen|chaar|two|three|four)\s*(?:din|days?|dina|naatkal|rojulu)\s*(?:pehle|ago|hinde|munbu|mundu))/i);
  if (daysAgoMatch) {
    let days = parseInt(daysAgoMatch[1], 10);
    if (isNaN(days)) {
      const map = { do: 2, two: 2, teen: 3, three: 3, chaar: 4, four: 4 };
      days = map[daysAgoMatch[1].toLowerCase()] || 2;
    }
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - days);
    return {
      date: d.toISOString(),
      label: `${days} din pehle`,
      matchedText: daysAgoMatch[0]
    };
  }
  const lastDayMatch = lower.match(/\b(?:last|pichle)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|somwar|mangalwar|budhwar|guruwar|shukrawar|shaniwar|ravivar)\b/i);
  if (lastDayMatch) {
    const dayName = lastDayMatch[1].toLowerCase();
    const dayMap = {
      sunday: 0,
      ravivar: 0,
      monday: 1,
      somwar: 1,
      tuesday: 2,
      mangalwar: 2,
      wednesday: 3,
      budhwar: 3,
      thursday: 4,
      guruwar: 4,
      friday: 5,
      shukrawar: 5,
      saturday: 6,
      shaniwar: 6
    };
    const targetDay = dayMap[dayName] ?? 1;
    const currentDay = baseDate.getDay();
    let diff = currentDay - targetDay;
    if (diff <= 0) diff += 7;
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - diff);
    return {
      date: d.toISOString(),
      label: lastDayMatch[0],
      matchedText: lastDayMatch[0]
    };
  }
  if (/\b(?:kal|yesterday|ninne|netru|ninna)\b/i.test(lower) || /(?:कल|ನಿನ್ನೆ|நேற்று|నిన్న)/.test(lower)) {
    const isFuture = /\b(?:dega|degi|aayega|dene wala|tomorrow|naale|naalai|repu)\b/i.test(lower);
    const offset = isFuture ? 1 : -1;
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + offset);
    return {
      date: d.toISOString(),
      label: isFuture ? "kal (tomorrow)" : "kal",
      matchedText: "kal"
    };
  }
  if (/\b(?:aaj|today|indu|inru|ee roju|eerodu)\b/i.test(lower) || /(?:आज|ಇಂದು|இன்று|ఈ రోజు)/.test(lower)) {
    return {
      date: baseDate.toISOString(),
      label: "aaj",
      matchedText: "aaj"
    };
  }
  return null;
}
function containsKeyword(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.some((kw) => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<=^|\\s|[.,!?])${escaped}(?=$|\\s|[.,!?])`, "i");
    return regex.test(lower);
  });
}
function resolveDirection(text) {
  const lower = text.toLowerCase();
  const hasExplicitCreditMarker = /\b(?:udhaar|udhar|credit|borrowed|borrow|saala|sala|kadan|appu)\b/i.test(lower) || /(?:उधार|खाता|ಸಾಲ|கடன்|அప్పు)/.test(lower);
  const hasSettlementReversal = /\b(?:chuka|wapas|clear|cleared|settled|settle|vasool)\b/i.test(lower) || /(?:चुकाया|वापस|वसूल)/.test(lower);
  if (hasExplicitCreditMarker && !hasSettlementReversal) {
    return { type: "credit", confidence: 0.95 };
  }
  if (/\bne\s+(?:diye|diya|jama|bhar|bhara)\b/i.test(lower) || /\bse\s+(?:mila|aaya|wapas|prapt)\b/i.test(lower) || /\bhana\s+bandide\b/i.test(lower) || /\bpanam\s+vandhadhu\b/i.test(lower) || /\bjama\s+ayyindi\b/i.test(lower) || /\bdiya\s+tha\b/i.test(lower)) {
    return { type: "payment", confidence: 0.95 };
  }
  if (/\bko\s+(?:udhaar|udhar|credit|diya|de diya)\b/i.test(lower)) {
    return { type: "credit", confidence: 0.95 };
  }
  if (/\b(?:kal|parso|pehle|ago|ninne|netru|ninna)\b/i.test(lower) && /\b(?:diya|diye|kotta|koduthaar|kuduthaar|icharu|ichaaru|kottaru|kottiddare)\b/i.test(lower) && !/\bko\b/i.test(lower)) {
    return { type: "payment", confidence: 0.92 };
  }
  const hasCredit = containsKeyword(lower, CREDIT_KEYWORDS);
  const hasPayment = containsKeyword(lower, PAYMENT_KEYWORDS);
  if (hasCredit && !hasPayment) {
    return { type: "credit", confidence: 0.95 };
  }
  if (hasPayment && !hasCredit) {
    return { type: "payment", confidence: 0.95 };
  }
  if (hasCredit && hasPayment) {
    if (lower.includes("udhaar") || lower.includes("udhar") || lower.includes("credit") || lower.includes("saala") || lower.includes("kadan") || lower.includes("appu")) {
      return { type: "credit", confidence: 0.92 };
    }
    return { type: "payment", confidence: 0.85 };
  }
  return { type: "credit", confidence: 0.7 };
}
function extractCustomerName(text, consumedSpans = []) {
  let working = text;
  const sortedSpans = [...consumedSpans].sort((a, b) => b.start - a.start);
  for (const span of sortedSpans) {
    working = working.slice(0, span.start) + " " + working.slice(span.end);
  }
  let cleaned = normalizeIndicDigits(working);
  const multiWordRemovals = [
    "diya tha",
    "de diya",
    "diye the",
    "hana bandide",
    "panam vandhadhu",
    "jama ayyindi",
    "thirigi icharu",
    "chuka diya",
    "kadan koduthen",
    "appu ichanu",
    "rupayi kottaru",
    "rupayi kotte",
    "vanda appu",
    "how much does",
    "how much",
    "otti baaki",
    "mottham baakee",
    "enta baaki",
    "hisaab batao",
    "do din pehle",
    "last monday",
    "day before yesterday"
  ];
  for (const phrase of multiWordRemovals) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<=^|\\s|[.,!?])${escaped}(?=$|\\s|[.,!?])`, "gi");
    cleaned = cleaned.replace(regex, " ");
  }
  cleaned = cleaned.replace(/[0-9₹$]/g, " ").replace(/[.,/#!$%^&*;:{}=\-_`~()?"'<>]/g, " ").trim();
  const singleWordRemovals = new Set([
    ...CREDIT_KEYWORDS.filter((k) => !k.includes(" ")),
    ...PAYMENT_KEYWORDS.filter((k) => !k.includes(" ")),
    ...Array.from(STOP_WORDS),
    "total",
    "baaki",
    "kitna",
    "balance",
    "hisaab",
    "hisab",
    "batao",
    "tell me",
    "kal",
    "aaj",
    "parso",
    "yesterday",
    "today",
    "ninne",
    "netru",
    "ninna",
    "monne",
    "indu",
    "inru",
    "pehle",
    "ago",
    "diya",
    "diye",
    "mila",
    "aaya",
    "aaye",
    "jama",
    "paid",
    "credit",
    "rupaye",
    "rupees",
    "rs",
    "re",
    "inr",
    "panam",
    "hana",
    "dabbu",
    "roopayi",
    "rupai",
    "\u0C8E\u0CB7\u0CCD\u0C9F\u0CC1",
    "\u0CAC\u0CBE\u0C95\u0CBF",
    "\u0C96\u0CBE\u0CA4\u0CC6",
    "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF",
    "\u0CB8\u0CBE\u0CB2",
    "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F",
    "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F\u0CB0\u0CC1",
    "\u0C9C\u0CAE\u0CBE",
    "\u0CB5\u0CBE\u0CAA\u0CB8\u0CCD",
    "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    "\u0BAE\u0BC0\u0BA4\u0BBF",
    "\u0B8E\u0BB5\u0BCD\u0BB5\u0BB3\u0BB5\u0BC1",
    "\u0B95\u0B9F\u0BA9\u0BCD",
    "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD",
    "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC7\u0BA9\u0BCD",
    "\u0BB5\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
    "\u0B9C\u0BAE\u0BBE",
    "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02",
    "\u0C2C\u0C3E\u0C15\u0C40",
    "\u0C0E\u0C02\u0C24 \u0C2C\u0C3E\u0C15\u0C40",
    "\u0C0E\u0C02\u0C24",
    "\u0C05\u0C2A\u0C4D\u0C2A\u0C41",
    "\u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C30\u0C41",
    "\u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C28\u0C41",
    "\u0C35\u0C1A\u0C4D\u0C1A\u0C3F\u0C02\u0C26\u0C3F",
    "\u0C1C\u0C2E\u0C3E",
    "\u092C\u093E\u0915\u0940",
    "\u0939\u093F\u0938\u093E\u092C",
    "\u091F\u094B\u091F\u0932",
    "\u0915\u093F\u0924\u0928\u093E",
    "\u0909\u0927\u093E\u0930",
    "\u091C\u092E\u093E",
    "\u092E\u093F\u0932\u093E",
    "\u0906\u092F\u093E",
    "\u0926\u093F\u090F",
    "\u0926\u093F\u092F\u093E",
    "\u0932\u093F\u092F\u093E",
    "\u0925\u093E",
    "\u0925\u0940",
    "\u0925\u0947",
    "\u0939\u0948",
    "\u0939\u0948\u0902",
    "\u0915\u094B",
    "\u0915\u093E",
    "\u0915\u0940",
    "\u0915\u0947",
    "\u0938\u0947",
    "\u0928\u0947"
  ].map((w) => w.toLowerCase()));
  const tokens = cleaned.split(/\s+/).map((t) => t.trim()).filter((t) => {
    if (t.length <= 1) return false;
    const lower = t.toLowerCase();
    if (singleWordRemovals.has(lower)) return false;
    if (/^\d+$/.test(lower)) return false;
    return true;
  });
  if (tokens.length === 0) {
    return { name: "", confidence: 0.5 };
  }
  const formatted = tokens.slice(0, 3).map((tok) => {
    if (/^[a-zA-Z]+$/.test(tok)) {
      return tok.charAt(0).toUpperCase() + tok.slice(1).toLowerCase();
    }
    return tok;
  }).join(" ");
  const confidence = formatted.length >= 2 ? 0.95 : 0.6;
  return { name: formatted, confidence };
}
function splitCompoundClauses(transcript) {
  const delimiterPattern = /[,;]|\b(?:aur|and|mattu|matrum|mariyu|plus|lekin)\b/i;
  if (delimiterPattern.test(transcript)) {
    const rawParts = transcript.split(delimiterPattern).map((p) => p.trim()).filter(Boolean);
    if (rawParts.length >= 2) {
      const partsWithAmounts = rawParts.filter((p) => extractAmounts(p).length > 0);
      if (partsWithAmounts.length >= 2) {
        return rawParts;
      }
    }
  }
  return [transcript];
}
async function parseTranscript(transcript, previousContext) {
  const trimmed = transcript.trim();
  const now = /* @__PURE__ */ new Date();
  const buildResult = (intent, entries, confidence, extra = {}) => {
    const primaryEntry = entries[0] || {
      customerName: extra.customerName || extra.queryCustomer || "Customer",
      amount: extra.correctionAmount || 0,
      type: "credit",
      date: now.toISOString(),
      confidence,
      rawTranscript: trimmed
    };
    return {
      intent,
      type: intent,
      entries,
      data: primaryEntry,
      confidence,
      rawTranscript: trimmed,
      ...extra
    };
  };
  if (!trimmed) {
    return buildResult("unknown", [], 0, {
      message: "Kuch sunayi nahi diya (No speech heard)"
    });
  }
  const lower = trimmed.toLowerCase();
  const cleanPunct = lower.replace(/[.,!?]/g, "").trim();
  if (CONFIRM_WORDS.has(cleanPunct)) {
    return buildResult("confirm", [], 0.95);
  }
  if (CANCEL_WORDS.has(cleanPunct)) {
    return buildResult("cancel", [], 0.95);
  }
  const amountsInText = extractAmounts(trimmed);
  if ((cleanPunct === "nahi" || cleanPunct === "no" || cleanPunct === "reject") && amountsInText.length === 0) {
    return buildResult("cancel", [], 0.95);
  }
  const isCorrectionTrigger = CORRECTION_TRIGGERS.some((rgx) => rgx.test(lower));
  if (isCorrectionTrigger && amountsInText.length > 0) {
    const correctionAmt = amountsInText[0].value;
    const prevCust = previousContext?.customerName || "";
    const prevType = previousContext?.type || "credit";
    const prevDate = previousContext?.date || now.toISOString();
    const correctedEntry = {
      customerName: prevCust || "Customer",
      amount: correctionAmt,
      type: prevType,
      date: prevDate,
      confidence: 0.95,
      rawTranscript: trimmed,
      isLowConfidence: false
    };
    return buildResult("correction", [correctedEntry], 0.95, {
      correctionAmount: correctionAmt,
      isCorrection: true,
      customerName: prevCust
    });
  }
  const isQuery = QUERY_PATTERNS.some((rgx) => rgx.test(lower));
  if (isQuery && amountsInText.length === 0) {
    const { name: queryCust, confidence: nameConf } = extractCustomerName(trimmed);
    const finalCust = queryCust || "Customer";
    const confidence = Math.min(0.92, nameConf);
    return buildResult("query", [], confidence, {
      queryCustomer: finalCust,
      customerName: finalCust,
      queryType: "balance"
    });
  }
  const clauses = splitCompoundClauses(trimmed);
  if (clauses.length >= 2) {
    const parsedEntries = [];
    let sharedCustomerName = "";
    let minClauseConfidence = 1;
    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i];
      const clauseAmounts = extractAmounts(clause);
      const amountVal = clauseAmounts[0]?.value || 0;
      const amountConf2 = clauseAmounts[0]?.confidence || 0.5;
      const dateMatch2 = resolveRelativeDate(clause, now);
      const entryDate = dateMatch2 ? dateMatch2.date : now.toISOString();
      const relativeDateLabel = dateMatch2?.label || (i === 0 ? "aaj" : void 0);
      const { type: entryType, confidence: typeConf2 } = resolveDirection(clause);
      const consumedSpans2 = clauseAmounts.map((a) => ({ start: a.start, end: a.end }));
      const { name: clauseCust, confidence: custConf2 } = extractCustomerName(clause, consumedSpans2);
      if (clauseCust && !sharedCustomerName) {
        sharedCustomerName = clauseCust;
      }
      const clauseConf = Math.min(amountConf2, typeConf2, custConf2);
      minClauseConfidence = Math.min(minClauseConfidence, clauseConf);
      parsedEntries.push({
        customerName: clauseCust,
        amount: amountVal,
        type: entryType,
        date: entryDate,
        relativeDateLabel,
        confidence: clauseConf,
        rawTranscript: clause
      });
    }
    for (const entry of parsedEntries) {
      if (!entry.customerName) {
        entry.customerName = sharedCustomerName || "Customer";
      }
    }
    if (parsedEntries.length >= 2 && parsedEntries.every((e) => (e.amount || 0) > 0)) {
      const subEntries = parsedEntries.map((e, idx) => ({
        id: `sub-${idx + 1}`,
        amount: e.amount || 0,
        type: e.type || "credit",
        date: e.date || now.toISOString(),
        relativeDateLabel: e.relativeDateLabel,
        note: e.type === "credit" ? "Udhaar" : "Jama"
      }));
      const creditSum = parsedEntries.filter((e) => e.type === "credit").reduce((acc, e) => acc + (e.amount || 0), 0);
      const paymentSum = parsedEntries.filter((e) => e.type === "payment").reduce((acc, e) => acc + (e.amount || 0), 0);
      const net = creditSum - paymentSum;
      const compoundDetails = {
        creditAmount: creditSum,
        paymentAmount: paymentSum,
        netAmount: net,
        explanation: `\u20B9${creditSum} udhaar - \u20B9${paymentSum} jama = Net \u20B9${net}`
      };
      const primary = {
        ...parsedEntries[0],
        entries: subEntries,
        compoundDetails
      };
      return buildResult("entry", parsedEntries, minClauseConfidence, {
        data: primary,
        isCompound: true,
        explanation: compoundDetails.explanation
      });
    }
  }
  const dateMatch = resolveRelativeDate(trimmed, now);
  const dateIso = dateMatch ? dateMatch.date : now.toISOString();
  const dateLabel = dateMatch?.label || "aaj";
  const dateConf = dateMatch ? 0.95 : 0.9;
  let textForAmounts = trimmed;
  if (dateMatch?.matchedText) {
    const escaped = dateMatch.matchedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    textForAmounts = trimmed.replace(new RegExp(`(?<=^|\\s|[.,!?])${escaped}(?=$|\\s|[.,!?])`, "i"), " ");
  }
  const extractedAmounts = extractAmounts(textForAmounts);
  const primaryAmount = extractedAmounts[0]?.value || 0;
  const amountConf = extractedAmounts[0]?.confidence || 0.4;
  const { type: txType, confidence: typeConf } = resolveDirection(trimmed);
  const consumedSpans = extractedAmounts.map((a) => ({ start: a.start, end: a.end }));
  const { name: custName, confidence: custConf } = extractCustomerName(trimmed, consumedSpans);
  const finalCustomer = custName || "Grahak (Customer)";
  const overallConfidence = Math.min(amountConf, typeConf, custConf, dateConf);
  const isLowConf = overallConfidence < 0.7 || primaryAmount <= 0;
  let lowConfidenceField = void 0;
  if (isLowConf) {
    if (amountConf < 0.7 || primaryAmount <= 0) lowConfidenceField = "amount";
    else if (custConf < 0.7) lowConfidenceField = "customer";
    else lowConfidenceField = "type";
  }
  if (primaryAmount <= 0 && !custName) {
    return buildResult("unknown", [], 0, {
      message: "Hisaab samajh nahi aaya. Kripya naam aur raashi dobara bolein."
    });
  }
  const singleEntry = {
    customerName: finalCustomer,
    amount: primaryAmount,
    type: txType,
    date: dateIso,
    relativeDateLabel: dateLabel,
    confidence: overallConfidence,
    rawTranscript: trimmed,
    isLowConfidence: isLowConf,
    lowConfidenceField
  };
  return buildResult("entry", [singleEntry], overallConfidence);
}

// src/services/customerMatcher.ts
var DEVANAGARI_MAP = {
  halant: 2381,
  anusvara: 2306,
  visarga: 2307,
  vowels: {
    2309: "a",
    2310: "a",
    2311: "i",
    2312: "i",
    2313: "u",
    2314: "u",
    2315: "ri",
    2319: "e",
    2320: "ai",
    2323: "o",
    2324: "au"
  },
  matras: {
    2366: "a",
    2367: "i",
    2368: "i",
    2369: "u",
    2370: "u",
    2371: "ri",
    2375: "e",
    2376: "ai",
    2379: "o",
    2380: "au"
  },
  consonants: {
    2325: "k",
    2326: "kh",
    2327: "g",
    2328: "gh",
    2329: "ng",
    2330: "ch",
    2331: "chh",
    2332: "j",
    2333: "jh",
    2334: "ny",
    2335: "t",
    2336: "th",
    2337: "d",
    2338: "dh",
    2339: "n",
    2340: "t",
    2341: "th",
    2342: "d",
    2343: "dh",
    2344: "n",
    2346: "p",
    2347: "ph",
    2348: "b",
    2349: "bh",
    2350: "m",
    2351: "y",
    2352: "r",
    2354: "l",
    2357: "v",
    2358: "sh",
    2359: "sh",
    2360: "s",
    2361: "h",
    2392: "q",
    2393: "kh",
    2394: "gh",
    2395: "z",
    2396: "r",
    2397: "rh",
    2398: "f"
  }
};
var KANNADA_MAP = {
  halant: 3277,
  anusvara: 3202,
  visarga: 3203,
  vowels: {
    3205: "a",
    3206: "a",
    3207: "i",
    3208: "i",
    3209: "u",
    3210: "u",
    3211: "ri",
    3214: "e",
    3215: "e",
    3216: "ai",
    3218: "o",
    3219: "o",
    3220: "au"
  },
  matras: {
    3262: "a",
    3263: "i",
    3264: "i",
    3265: "u",
    3266: "u",
    3267: "ri",
    3270: "e",
    3271: "e",
    3272: "ai",
    3274: "o",
    3275: "o",
    3276: "au"
  },
  consonants: {
    3221: "k",
    3222: "kh",
    3223: "g",
    3224: "gh",
    3225: "ng",
    3226: "ch",
    3227: "chh",
    3228: "j",
    3229: "jh",
    3230: "ny",
    3231: "t",
    3232: "th",
    3233: "d",
    3234: "dh",
    3235: "n",
    3236: "t",
    3237: "th",
    3238: "d",
    3239: "dh",
    3240: "n",
    3242: "p",
    3243: "ph",
    3244: "b",
    3245: "bh",
    3246: "m",
    3247: "y",
    3248: "r",
    3249: "r",
    3250: "l",
    3251: "l",
    3253: "v",
    3254: "sh",
    3255: "sh",
    3256: "s",
    3257: "h"
  }
};
var TAMIL_MAP = {
  halant: 3021,
  anusvara: 2946,
  visarga: 2947,
  vowels: {
    2949: "a",
    2950: "a",
    2951: "i",
    2952: "i",
    2953: "u",
    2954: "u",
    2958: "e",
    2959: "e",
    2960: "ai",
    2962: "o",
    2963: "o",
    2964: "au"
  },
  matras: {
    3006: "a",
    3007: "i",
    3008: "i",
    3009: "u",
    3010: "u",
    3014: "e",
    3015: "e",
    3016: "ai",
    3018: "o",
    3019: "o",
    3020: "au"
  },
  consonants: {
    2965: "k",
    2969: "ng",
    2970: "s",
    2974: "ny",
    2975: "t",
    2979: "n",
    2980: "t",
    2984: "n",
    2986: "p",
    2990: "m",
    2991: "y",
    2992: "r",
    2993: "r",
    2994: "l",
    2995: "l",
    2996: "zh",
    2997: "v",
    2998: "sh",
    2999: "sh",
    3e3: "s",
    3001: "h",
    2985: "n",
    2972: "j"
  }
};
var TELUGU_MAP = {
  halant: 3149,
  anusvara: 3074,
  visarga: 3075,
  vowels: {
    3077: "a",
    3078: "a",
    3079: "i",
    3080: "i",
    3081: "u",
    3082: "u",
    3083: "ri",
    3086: "e",
    3087: "e",
    3088: "ai",
    3090: "o",
    3091: "o",
    3092: "au"
  },
  matras: {
    3134: "a",
    3135: "i",
    3136: "i",
    3137: "u",
    3138: "u",
    3142: "e",
    3143: "e",
    3144: "ai",
    3146: "o",
    3147: "o",
    3148: "au"
  },
  consonants: {
    3093: "k",
    3094: "kh",
    3095: "g",
    3096: "gh",
    3097: "ng",
    3098: "ch",
    3099: "chh",
    3100: "j",
    3101: "jh",
    3102: "ny",
    3103: "t",
    3104: "th",
    3105: "d",
    3106: "dh",
    3107: "n",
    3108: "t",
    3109: "th",
    3110: "d",
    3111: "dh",
    3112: "n",
    3114: "p",
    3115: "ph",
    3116: "b",
    3117: "bh",
    3118: "m",
    3119: "y",
    3120: "r",
    3121: "r",
    3122: "l",
    3123: "l",
    3125: "v",
    3126: "sh",
    3127: "sh",
    3128: "s",
    3129: "h"
  }
};
function getIndicScriptMap(code) {
  if (code >= 2304 && code <= 2431) return DEVANAGARI_MAP;
  if (code >= 3200 && code <= 3327) return KANNADA_MAP;
  if (code >= 2944 && code <= 3071) return TAMIL_MAP;
  if (code >= 3072 && code <= 3199) return TELUGU_MAP;
  return null;
}
function transliterateIndicToLatin(text) {
  if (!text) return "";
  let working = text.replace(/[శशಶஶ]్రీ/g, "sri").replace(/[शశಶஶ]्रि/g, "sri");
  let result = "";
  for (let i = 0; i < working.length; i++) {
    const code = working.charCodeAt(i);
    const scriptMap = getIndicScriptMap(code);
    if (!scriptMap) {
      result += working.charAt(i);
      continue;
    }
    if (scriptMap.vowels[code]) {
      result += scriptMap.vowels[code];
      continue;
    }
    if (code === scriptMap.anusvara || code === 2305) {
      result += "n";
      continue;
    }
    if (code === scriptMap.visarga) {
      result += "h";
      continue;
    }
    let cons = scriptMap.consonants[code];
    if (cons) {
      if (code === 2965 && result.length > 0) {
        const lastChar = result.charAt(result.length - 1);
        if (/[aeiour]/.test(lastChar)) {
          cons = "g";
        }
      }
      const nextCode = i + 1 < working.length ? working.charCodeAt(i + 1) : 0;
      const isNextHalant = nextCode === scriptMap.halant;
      const nextMatra = scriptMap.matras[nextCode];
      if (isNextHalant) {
        result += cons;
        i++;
      } else if (nextMatra) {
        result += cons + nextMatra;
        i++;
      } else {
        const isEndOfWord = i + 1 >= working.length || /\s|[.,!?]/.test(working.charAt(i + 1));
        if (isEndOfWord) {
          result += cons;
        } else {
          result += cons + "a";
        }
      }
      continue;
    }
    if (scriptMap.matras[code]) {
      result += scriptMap.matras[code];
      continue;
    }
  }
  return result;
}

// scripts/accuracy.ts
function normalizeName(name) {
  if (!name) return "";
  const transliterated = transliterateIndicToLatin(name);
  return transliterated.toLowerCase().replace(/[^\w\s]/g, "").trim();
}
function matchCustomer(actual, expected) {
  if (!expected) return true;
  if (!actual) return false;
  const normActual = normalizeName(actual);
  const normExpected = normalizeName(expected);
  if (normActual === normExpected) return true;
  if (normActual.includes(normExpected) || normExpected.includes(normActual)) return true;
  const actualTokens = normActual.split(/\s+/);
  const expectedTokens = normExpected.split(/\s+/);
  return expectedTokens.some((t) => t.length > 2 && actualTokens.includes(t));
}
async function runAccuracy() {
  const phrasesPath = path.resolve(process.cwd(), "test-data/phrases.json");
  if (!fs.existsSync(phrasesPath)) {
    console.error(`Error: test-data/phrases.json not found at ${phrasesPath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(phrasesPath, "utf8");
  const testCases = JSON.parse(raw);
  console.log("=".repeat(70));
  console.log(`VOICE KHATA ACCURACY BENCHMARK (${testCases.length} NOISY/CODE-MIXED PHRASES)`);
  console.log("=".repeat(70));
  const results = [];
  for (const tc of testCases) {
    const text = tc.text || tc.phrase || "";
    const res = await parseTranscript(text);
    const expCustomer = tc.expectedCustomer || tc.customer || "";
    const expAmount = tc.expectedAmount !== void 0 ? tc.expectedAmount : tc.amount ?? 0;
    const expType = tc.expectedType || tc.type || "credit";
    const firstEntry = res.entries && res.entries.length > 0 ? res.entries[0] : null;
    const actCustomer = firstEntry?.customerName || res.queryCustomer || res.data?.customerName || "";
    const actAmount = firstEntry?.amount ?? res.correctionAmount ?? res.data?.amount ?? 0;
    const actType = firstEntry?.type || res.data?.type || (res.intent === "query" ? "query" : "");
    const customerOk = matchCustomer(actCustomer, expCustomer);
    const amountOk = Number(actAmount) === Number(expAmount);
    const typeOk = actType === expType;
    const fullyOk = customerOk && amountOk && typeOk;
    results.push({
      id: tc.id,
      language: tc.language || "mixed",
      text,
      expectedCustomer: expCustomer,
      actualCustomer: actCustomer,
      customerOk,
      expectedAmount: expAmount,
      actualAmount: actAmount,
      amountOk,
      expectedType: expType,
      actualType: actType,
      typeOk,
      fullyOk,
      confidence: res.confidence,
      intent: res.intent,
      dateOffsetExpected: tc.dateOffset
    });
  }
  const byLang = {};
  for (const r of results) {
    if (!byLang[r.language]) byLang[r.language] = [];
    byLang[r.language].push(r);
  }
  console.log("\n--- ACCURACY BREAKDOWN BY LANGUAGE ---");
  console.log(
    "Language".padEnd(10) + "Count".padStart(6) + "Customer".padStart(12) + "Amount".padStart(12) + "Type".padStart(10) + "Overall Pass".padStart(16)
  );
  console.log("-".repeat(70));
  let totalCustomerOk = 0;
  let totalAmountOk = 0;
  let totalTypeOk = 0;
  let totalFullyOk = 0;
  for (const [lang, items] of Object.entries(byLang)) {
    const count = items.length;
    const custOk = items.filter((i) => i.customerOk).length;
    const amtOk = items.filter((i) => i.amountOk).length;
    const typOk = items.filter((i) => i.typeOk).length;
    const fullOk = items.filter((i) => i.fullyOk).length;
    totalCustomerOk += custOk;
    totalAmountOk += amtOk;
    totalTypeOk += typOk;
    totalFullyOk += fullOk;
    const custPct = (custOk / count * 100).toFixed(1) + "%";
    const amtPct = (amtOk / count * 100).toFixed(1) + "%";
    const typPct = (typOk / count * 100).toFixed(1) + "%";
    const fullPct = `${fullOk}/${count} (${(fullOk / count * 100).toFixed(1)}%)`;
    console.log(
      lang.padEnd(10) + String(count).padStart(6) + custPct.padStart(12) + amtPct.padStart(12) + typPct.padStart(10) + fullPct.padStart(16)
    );
  }
  console.log("-".repeat(70));
  const total = results.length;
  const overallPct = (totalFullyOk / total * 100).toFixed(1);
  const custTotalPct = (totalCustomerOk / total * 100).toFixed(1) + "%";
  const amtTotalPct = (totalAmountOk / total * 100).toFixed(1) + "%";
  const typTotalPct = (totalTypeOk / total * 100).toFixed(1) + "%";
  const fullTotalStr = `${totalFullyOk}/${total} (${overallPct}%)`;
  console.log(
    "TOTAL".padEnd(10) + String(total).padStart(6) + custTotalPct.padStart(12) + amtTotalPct.padStart(12) + typTotalPct.padStart(10) + fullTotalStr.padStart(16)
  );
  console.log("=".repeat(70));
  const failures = results.filter((r) => !r.fullyOk);
  if (failures.length > 0) {
    console.log(`
FAILURES TABLE (${failures.length} issues to resolve):`);
    console.log("-".repeat(85));
    console.log(
      "ID".padEnd(4) + "Lang".padEnd(6) + "Text".padEnd(36) + "Issues".padEnd(20) + "Details"
    );
    console.log("-".repeat(85));
    for (const f of failures) {
      const issues = [];
      if (!f.customerOk) issues.push(`Cust(exp:${f.expectedCustomer},act:${f.actualCustomer || "NONE"})`);
      if (!f.amountOk) issues.push(`Amt(exp:${f.expectedAmount},act:${f.actualAmount})`);
      if (!f.typeOk) issues.push(`Type(exp:${f.expectedType},act:${f.actualType})`);
      const textSnippet = f.text.length > 34 ? f.text.substring(0, 31) + "..." : f.text;
      console.log(
        String(f.id).padEnd(4) + f.language.padEnd(6) + textSnippet.padEnd(36) + issues.join("; ").padEnd(35)
      );
    }
    console.log("-".repeat(85));
  } else {
    console.log("\n[PERFECT] 100% accuracy! All 50 phrases parsed customer, amount, and type with zero failures.");
  }
  const passedThreshold = Number(overallPct) >= 90;
  console.log(`
PRD SLA REQUIREMENT: Target >= 90.0% accuracy`);
  console.log(`ACHIEVED ACCURACY:  ${overallPct}%`);
  console.log(`STATUS:             ${passedThreshold ? "PASSED (>= 90%)" : "FAILED (< 90%)"}`);
  if (!passedThreshold) {
    process.exit(1);
  }
}
runAccuracy().catch((err) => {
  console.error("Accuracy benchmark error:", err);
  process.exit(1);
});
