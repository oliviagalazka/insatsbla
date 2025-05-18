// LandingPage
// Kopplat till uppdragsknappar
const missions = [
  { missionId: 1, text: '1. Giftiga Bullar', locked: false },
  { missionId: 2, text: '2. Cykelstölden', locked: true },
  { missionId: 3, text: '3. Hemlöse Pia', locked: true },
  { missionId: 4, text: '4. Kokainjakten', locked: true }
];

const originalMissions = JSON.parse(JSON.stringify(missions));

// // ReportPage
// // Kopplat till frågorna i inputfälten
const reportContent = [
  {
    missionId: 1,
    mission: '1. Giftiga Bullar',
    questions: [
      {
        question: '1. Bullens kod:',
        correctAnswers: ["6382"]
      },
      {
        question: '2. Bullens kod:',
        correctAnswers: ["9834"]
      },
      {
        question: '3. Bullens kod:',
        correctAnswers: ["9823"]
      },
      {
        question: '4. Bullens kod:',
        correctAnswers: ["0234"]
      },
      {
        question: '5. Bullens kod:',
        correctAnswers: ["2984"]
      },
      {
        question: '6. Bullens kod:',
        correctAnswers: ["9274"]
      },
      {
        question: '7. Bullens kod:',
        correctAnswers: ["0480"]
      },
      {
        question: '8. Bullens kod:',
        correctAnswers: ["1425"]
      },
      {
        question: '9. Bullens kod:',
        correctAnswers: ["8344"]
      },
      {
        question: '10. Bullens kod:',
        correctAnswers: ["7362"]
      }
    ]
  },
  {
    missionId: 2,
    mission: '2. Cykelstölden',
    questions: [
      {
        question: 'Vad hade förövaren för något på huvudet?',
        correctAnswers: ['En hatt', 'hatt', 'cowboyhatt', 'brun hatt', 'en brun hatt', 'foodora', 'brun foodora', 'fodora', 'brun fodora', 'fedora', 'brun fedora']
      },
      {
        question: 'Vilken färg hade förövarens jacka?',
        correctAnswers: ['Brun', 'brun färg', 'mörkbrun färg', 'beige', 'brun jacka', 'en brun jacka', 'mörkbrun', 'mörkbrun jacka', 'en mörkbrun jacka']
      },
      {
        question: 'Kommer du ihåg vilken färg förövarens byxor var?',
        correctAnswers: ['Blå', 'ljusblå', 'jeansblå', 'blåa', 'ljusblåa', 'jeansblåa']
      },
      {
        question: 'Vad bar förövaren på?',
        correctAnswers: ['En påse', 'påse', 'en påse', 'kasse', 'papperspåse', 'papperskasse', 'systemetpåse', 'systemetkasse', 'systembolagetpåse', 'systembolagetspåse', 'påse från systembolaget', 'kasse från systembolaget', 'en papperskasse', 'en papperspåse', 'systembolaget påse', 'systembolaget kasse']
      },
      {
        question: 'Vad kastade förövaren ifrån sig?',
        correctAnswers: ['Ett cykellås', 'cykellås', 'cykel lås', 'ett cykel lås', 'lås']
      },
      {
        question: 'Vad är cykelns koordinater?',
        correctAnswers: ['55.6023916, 13.0038505', '55.6023916,13.0038505', '55.6023916 13.0038505'],
        visibleIfSecondStep: true
      }
    ]
  },
  {
    missionId: 3,
    mission: '3. Hemlöse Pia',
    questions: [
      {
        question: 'Fullständigt namn:',
        correctAnswers: ['Pia Helena Nyberg']
      },
      {
        question: 'Kön:',
        correctAnswers: ['Kvinna', 'Dam', 'Tjej', 'Tant']
      },
      {
        question: 'Borttappat objekt:',
        correctAnswers: ['Brun läderplånbok', 'plånbok', 'brun plånbok', 'läderplånbok']
      },
      {
        question: 'Personnummer:',
        correctAnswers: ['780211-1780', '7802111780']
      }
    ]
  },
  {
    missionId: 4,
    mission: '4. Kokainjakten',
    questions: [
      {
        question: 'Gärningpersonens telefonnummer:',
        correctAnswers: ['0723995982']
      }
    ]
  }
];

// NEWS PAGE ARTICLES
let newsText = [
  {
    missionId: 1,
    notis1: 'Trycket på polisen ökar - "Vi hinner inte andas"',
    notis2: "Polisinsats stormade till Kungsparken för att hitta hundbullar",
    imgSource: "./media/pictures/hundbullar1.avif",
    text: '<b>Bamse skadad av preparerad bulle - nya fynd av "hundbullar" i Malmö</b><br><br>Labradoren Bamse brukar springa lyckligt genom Kungsparken varje morgon, nosa på buskar och jaga löv. Men imorse tog promenaden en oväntad och smärtsam vändning. Vid dammen hann han bara nosa ett ögonblick innan han slukade en bulle någon slängt, en bulle fylld med vassa metallbitar. - Det gick så snabbt. Jag såg inte ens vad det var förrän det var för sent, säger hans matte Ella, som snabbt fick bära honom till bilen och köra till djursjukhuset. Bamse överlevde, men skadades allvarligt internt. Veterinärer lyckades rädda honom - den här gången...<br><br>Det här är tyvärr inte ett enskilt fall. Sedan 2020 har Malmö drabbats av över 180 anmälningar om så kallade "hundbullar", enligt polisens presstalesperson Nils Norling.<br><br>– Det är fruktansvärt. Man vågar knappt gå ut längre. Det känns som ett hot mot min bästa vän, säger Ella. Polisen arbetar aktivt för att spåra gärningspersoner och stoppa de medvetna försök som görs för att skada djur. Hundägare uppmanas nu till extra försiktighet. För många som Ella har vardagens enkla glädjestunder, en promenad med sin hund, förvandlats till något fyllt av oro.'
  },
  {
    missionId: 2,
    notis1: "Cykeltjuv i farten - fångad på video",
    notis2: 'Polisen: "Vi hinner inte med alla cykelstölder"',
    imgSource: "./media/pictures/cykeltjuven.png",
    text: "<b>Cykelsäsongen börjar dra igång på allvar - och med den kommer cykelstölderna. Från april och framåt ökar antalet anmälda cykelstölder månad för månad</b><br><br> Inte minst märks det i Malmö. 2024 gjordes 4 712 anmälningar om cykelstölder i kommunen, enligt siffror från Brottsförebyggande rådet, vilket motsvarar 13 anmälningar per 1 000 invånare. Det är tredje flest i landet och näst flest i Skåne, efter Lund - där det noterades 15,6 anmälningar per 1 000 invånare. <br><br> Dock är inte alla delar av Malmö lika hårt drabbade. Det visar data för de senaste fem åren. Det rör sig om mellan en handfull och drygt 800 anmälda stölder per område. Området med flest anmälda cykelstölder i Malmö kommun är Västra hamnen, där det handlar om 826 anmälningar under perioden 2020-2024."
  },
  {
    missionId: 3,
    notis1: "Malmö, andra staden med högst hemlöshet",
    notis2: "Psykologstödet räcker inte till - fler poliser söker hjälp privat",
    imgSource: "./media/pictures/hemlose_pia.jpeg",
    text: '<b>För tre år sedan förlorade Pia, 47 år, vårdnaden om sina barn. Hon fyllde saknaden av sina två söner med alkohol</b><br><br>Det tog inte lång tid innan hon blev avskedad från sitt kontorsjobb och drunknade i skulder hos Kronofogden. Hon är numera hemlös och försöker överleva på Malmös gator. <br><br>Pia pratar sällan om sitt förflutna, men hon bär det med sig hela tiden. Bilderna på barnen har hon kvar i en sliten plastficka i jackfickan. "Jag vet att jag gjorde misstag", säger hon, "Men jag är fortfarande en människa och jag är fortfarande deras mamma."<br><br>Trots allt håller hon fast vid en gnista hopp. Hon har börjat gå till ett stödcenter i Sankt Knut några gånger i veckan, där hon får varm mat, kläder och möjlighet att prata med en kurator. "Det är inte mycket, men det är något. Och ibland är något tillräckligt för att orka en dag till."'
  },
  {
    missionId: 4,
    notis1: "Larm om droger på skola i Malmö - polisinsats tillkallas omedelbart",
    notis2: "Poliser larmar: Arbetet mot narkotika skapar oro, sömnsvårigheter och utmattning",
    imgSource: "./media/pictures/kokainjakten.webp",
    text: "<b>Under 2024 rapporterade polisen i Malmö 27% fler narkotikarelaterade ärenden än året innan</b><br><br>Mycket av det sker inte i mörka gränder, utan på skolor, innergårdar och ungdomars telefoner. En undersökning visar att nästan var femte Malmöbo upplever att narkotikapåverkade personer är ett problem i deras närmiljö.<br><br>Polisen har gjort ett omfattande arbete kring dagens kryptiska chattar. Detta för att lättare stoppa gängkriminalitet och illegal narkotikaförsäljning. Idag har de som säljer narkotika hittat nya sätt att kommunicera med sina köpare. Polisen har upptäckt att det börjat ske en fysisk kommunikation i form av gömda handskrivna lappar."
  },
];

// TWEETS
const tweets = [
  {
    missionId: 1,
    good: [
      { username: "KalleAnka78", text: "Äntligen kan jag och min hund våga oss ut igen, så tacksam för polisens insatser" },
      { username: "ScoobyDoobySebbe", text: "Lilla Bella tackar polisen" }
    ],
    bad: [
      { username: "KalleAnka78", text: "Polisen klarar inte ens av att hitta några bullar i en park… patetiskt!" },
      { username: "ScoobyDoobySebbe", text: "Som vanligt trumfar civilkurage över riktigt polisarbete" }
    ]
  },
  {
    missionId: 2,
    good: [
      { username: "KodErik69", text: "Stort tack till poliserna som tog sig tid att leta spår efter min stulna cykel" },
      { username: "KebabKungen", text: "TACK POLISEN, Jag kan äntligen känna mig säker som cyklist!" }
    ],
    bad: [
      { username: "KodErik69", text: "Vad fan är poängen med er? Cykeltjuvarna skrattar åt er." },
      { username: "KebabKungen", text: "Ska bli cykeltjuv bara för att stjäla polisens cykel" }
    ]
  },
  {
    missionId: 3,
    good: [
      { username: "KattKarin", text: "Tack för att ni såg och hjälpte en som annars blir osynlig." },
      { username: "RäkmackaRolf", text: "Fantastiskt att se poliser visa medmänsklighet på riktigt." }
    ],
    bad: [
      { username: "KattKarin", text: "Era hjärtan är lika kalla som gatan Pia sover på!" },
      { username: "RäckmackaRolf", text: "Polisen trampar på de som redan ligger ner. Ni är vidriga." }
    ]
  },
  {
    missionId: 4,
    good: [
      { username: "Johannezswag", text: "Respekt till polisen som gör allt för att stoppa gängkriminaliteten!" },
      { username: "SurströmmingStefan", text: "Känns tryggt att veta att ni är där ute och gör ert bästa" }
    ],
    bad: [
      { username: "Johannezswag", text: "Snut = statens slav, inget annat" },
      { username: "SurströmmingStefan", text: "Ni är bara våldsamma fegisar med vapen. Utan brickan är ni inget" }
    ]
  }
];

const ending = [
  {
    goodHeader: "VÄL UTFÖRT ARBETE!",
    goodTxt: "Vi har utvärderat er insats under aspiranttjänstsgöringen. Er goda prestation har lett till ett godkänt resultat. Ni har uppfyllt kraven och visat det som krävs för att bli godkända.<br><br>Ni är välkomna att ladda ner ert välförtjänta certifikat. Bra jobbat!",
    badHeader: "EJ GODKÄNT!",
    badTxt: "Vi har utvärderat er insats under aspiranttjänstsgöringen. Er prestation har INTE lett till ett godkänt resultat. Ni har INTE uppfyllt kraven eller visat det som krävs för att bli godkända.<br><br>Bättre lycka nästa gång! Ni är välkomna att delta i Insats Blå igen, förutsatt att ni är redo att höja er insats och visa att ni har det som krävs."
  }
];