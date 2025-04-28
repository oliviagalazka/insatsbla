// LandingPage
// Kopplat till uppdragsknappar
const missions = [
    { missionId: 1, text: '1. Giftiga Bullar', locked: false },
    { missionId: 2, text: '2. Cykelstölden', locked: false },
    { missionId: 3, text: '3. Hemlöse Pia', locked: false },
    { missionId: 4, text: '4. Kokainjakten', locked: false }
];

// ReportPage
// Kopplat till frågorna i inputfälten
const reportContent = [
    {
        missionId: 1,
        mission: '1. Giftiga Bullar',
        questions: [
            'Bullens koordinater:',
            'Bullens koordinater:',
            'Bullens koordinater:',
            'Bullens koordinater:',
            'Bullens koordinater:',
            'Bullens koordinater:',
            'Bullens koordinater:',
            'Bullens koordinater:',
            'Bullens koordinater:',
            'Bullens koordinater:']
    },
    {
        missionId: 2,
        mission: '2. Cykelstölden',
        questions: [
            'Hade förövaren något på huvudet?',
            'Vilken färg hade jackan?',
            'Kommer du ihåg vad förövaren hade på fötterna?',
            'Bar förövaren på något?',
            'Var befann sig förövaren när du såg hen?'
        ]
    },
    {
        missionId: 3,
        mission: '3. Hemlöse Pia',
        questions: [
            'Namn: Pia Nyberg',
            'Kön: Kvinna',
            'Objekt: Brun läderplånbok',
            'Plats: Kattsundsgatan',
            'Personnummer:'
        ]
    },
    {
        missionId: 4,
        mission: '4. Kokainjakten',
        questions: [
            'Post-it 1:',
            'Post-it 2:',
            'Post-it 3:',
            'Post-it 4:',
            'Hittad knarkpåse:'
        ]
    }
];

//Nyhetssidan
let newsText = [
    {
        missionId: 1,
        notis1: "Farliga bullar i Kungsparken",
        notis2: "Polisens duktiga arbete i parken",
        imgSource: "./media/pictures/giftiga_bullar.webp",
        text: "Bamse är en labrador med glittrande ögon. Han älskar att springa runt i Kungsparken, nosa på varje buske och jaga löv som virvlar i vinden. Varje morgon promenerar han där med sin matte, Ella. En tisdag, strax innan lunch, svängde de av mot dammen. Bamse nosade ivrigt vid några träd, där någon hade tappat en bulle på marken. Innan Ella hann reagera hade han redan glufsat i sig halva. <br><br> Den 19 januari 2024 hittades ett 30-tal bullar i en park i Malmö, preparerade med metallbitar. Polisen utreder händelserna, försöker identifiera gärningspersoner och arbetar för att förhindra att det sker igen."
    },
    {
        missionId: 2,
        notis1: "Cykeltjuv i farten",
        notis2: "Cykelstölder i Malmö ökar lavinartat",
        imgSource: "./media/pictures/cykeltjuven.png",
        text: "<b>Cykelsäsongen börjar dra igång på allvar - och med den kommer cykelstölderna. Från april och framåt ökar antalet anmälda cykelstölder månad för månad.</b><br><br> Inte minst märks det i Malmö. 2024 gjordes 4 712 anmälningar om cykelstölder i kommunen, enligt siffror från Brottsförebyggande rådet, vilket motsvarar 13 anmälningar per 1 000 invånare. Det är tredje flest i landet och näst flest i Skåne, efter Lund - där det noterades 15,6 anmälningar per 1 000 invånare. <br><br> Dock är inte alla delar av Malmö lika hårt drabbade. Det visar data för de senaste fem åren. Det rör sig om mellan en handfull och drygt 800 anmälda stölder per område. Området med flest anmälda cykelstölder i Malmö kommun är Västra hamnen, det det handlar om 826 anmälningar under perioden 2020-2024."
    },
    {
        missionId: 3,
        notis1: "Malmö, andra staden med högst hemlöshet",
        notis2: "Polisens arbete för hemlösa tar aldrig slut",
        imgSource: "./media/pictures/hemlose_pia.jpeg",
        text: "För tre år sedan förlorade Pia, 47 år, vårdnaden om sina barn. Hon fyllde saknaden av sina två söner med alkohol. Det tog inte lång tid innan hon blev avskedad från sitt kontorsjobb och drunknade i skulder hos kronofogden. Hon är numera hemlös och försöker överleva på Malmös gator. <br><br>Pia pratar sällan om sitt förflutna, men hon bär det med sig hela tiden. Bilderna på barnen har hon kvar i en sliten plastficka i jackfickan. ´Jag vet att jag gjorde misstag´, säger hon, ´men jag är fortfarande en människa. Och jag är fortfarande deras mamma.´<br><br>Trots allt håller hon fast vid en gnista hopp. Hon har börjat gå till ett stödcenter i Sankt Knut några gånger i veckan, där hon får varm mat, kläder och möjlighet att prata med en kurator. ´Det är inte mycket, men det är något. Och ibland är något tillräckligt för att orka en dag till.´"
    },
    {
        missionId: 4,
        notis1: "Droger funna på skola i Malmö",
        notis2: "Polisen hatar droger!",
        imgSource: "./media/pictures/kokainjakten.webp",
        text: "Under 2024 rapporterade polisen i Malmö 27 % fler narkotikarelaterade ärenden än året innan. Mycket av det sker inte i mörka gränder, utan på skolor, innergårdar och ungdomars telefoner. En undersökning visar att nästan var femte Malmöbo upplever att narkotikapåverkade personer är ett problem i deras närmiljö<br><br>Polisen har gjort ett omfattande arbete kring dagens kryptiska chattar. Detta för att lättare stoppa gängkriminalitet och illegal narkotikaförsäljning. Idag har de som säljer narkotika hittat nya sätt att kommunicera med sina köpare. Polisen har upptäckt att det börjat ske en fysisk kommunikation i form av gömda handskrivna lappar."
    },
];