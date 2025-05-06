if (!localStorage.getItem('missions')) {
    localStorage.setItem('missions', JSON.stringify(missions));
}





// window.addEventListener('DOMContentLoaded', () => {
//     const currentView = localStorage.getItem('currentView');
//     const missionId = parseInt(localStorage.getItem('currentMissionId'), 10);
//     const mission = missions.find(m => m.missionId === missionId);

//     if (currentView === 'radio' && mission) {
//         renderRadioPage('body', mission);
//     } else if (currentView === 'report' && mission) {
//         renderReportPage('body');
//     } else if (currentView === 'news') {
//         renderNewsPage('body');
//     } else if (currentView === 'video' && mission) {
//         renderbikeVideoPage('body');
//     } else {
//         renderStartGamePage('body'); // Om inget sparat, visa startsidan
//     }
// });


window.addEventListener('DOMContentLoaded', () => {
    const currentView = localStorage.getItem('currentView');
    const missionId = parseInt(localStorage.getItem('currentMissionId'), 10);
    const mission = missions.find(m => m.missionId === missionId);

    if (currentView === 'intro') {
        renderIntroVideoPage('body');
    } else if (currentView === 'landing') {
        renderLandingPage('body');
    } else if (currentView === 'radio' && mission) {
        renderRadioPage('body', mission);
    } else if (currentView === 'report' && mission) {
        renderReportPage('body');
    } else if (currentView === 'news') {
        renderNewsPage('body');
    } else {
        renderStartGamePage('body');
    }
});

function resumeLastView() {
    const view = localStorage.getItem('currentView');
    const missionId = parseInt(localStorage.getItem('currentMissionId'), 10);

    if (view === 'radio' && missionId) {
        const mission = missions.find(m => m.missionId === missionId);
        if (mission) {
            renderRadioPage('body', mission);
        }
    } else {
        renderLandingPage('body'); // fallback
    }
}

// Kör detta direkt vid sidladdning:
resumeLastView();



// function navigateTo(view, 