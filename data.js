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